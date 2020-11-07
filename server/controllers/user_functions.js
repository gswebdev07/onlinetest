// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const verify_email = async (user_email, secret_code) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testpencil.help@gmail.com",
      pass: "myPASSword911",
    },
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: '"TestPencil" <testpencil.help@gmail.com>', // sender address
      to: user_email, // list of receivers
      subject: "Email verification.", // Subject line
      text: `Welcome to Testpencil.com.
      We offer free online tests for various classes, covering many subjects.
      `,
      html: `<h2>Welcome to Testpencil.com.<br/>
      We offer free online tests for various classes, covering many subjects.</h2>
      <h1>Your secret code: ${secret_code}</h1>
      <h2>Testpencil.com Team</h2>
      `, // html body
    })
    .then(({ secret_code }) => secret_code)
    .catch((err) => console.log({ err }));
};
const send_password = async (user_email, user_password) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testpencil.help@gmail.com",
      pass: "myPASSword911",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"TestPencil" <testpencil.help@gmail.com>', // sender address
    to: user_email, // list of receivers
    subject: "Your password.", // Subject line
    text: "Your TestPencil account password.",
    html: `<h1>Your password: ${user_password}</h1>`, // html body
  });
};

// Model:
const User = require("../models/User");
const Result = require("../models/Result");
const QA = require("../models/QA");

// Utils
const { JWT_token } = require("../utils/token");
const { is } = require("../utils/validation");

exports.get_users = (res) => {
  User.find()
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.update_credentials = (res, user_credentials) => {
  User.findByIdAndUpdate(user_credentials._id, {
    $set: { ...user_credentials },
  })
    .then((result) =>
      res.status(202).json({ message: "Account credentials were updated." })
    )
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.delete_user = (res, user_id) => {
  Result.deleteMany({ user_id })
    .then(() =>
      QA.deleteMany({ user_id })
        .then(() =>
          User.findByIdAndDelete(user_id)
            .then(() =>
              res
                .status(202)
                .json({ message: `User with ${user_id} id was deleted.` })
            )
            .catch((err) => res.status(500).json({ error: err.code }))
        )
        .catch((err) => res.status(400).json({ error: err.code }))
    )
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.sign_up = (res, user_credentials, verify_email_codes) => {
  const new_user = new User({ ...user_credentials });
  // Validating user credentials

  // Checking for an email
  User.findOne({ email: user_credentials.email })
    .then((result) => {
      if (result) {
        return res.status(403).json({ error: "The email is already in use." });
      }
      if (!verify_email_codes) {
        const secret_code = Math.floor(Math.random() * 1000000);
        return verify_email(user_credentials.email, secret_code)
          .then(() => res.status(202).json({ secret_code }))
          .catch((err) => console.log({ error: err }));
      } else if (verify_email_codes.user === verify_email_codes.browser) {
        new_user
          .save()
          .then((result) => {
            const token = JWT_token({ _id: result._id, email: result.email });
            return res.status(201).json({ token });
          })
          .catch((err) => res.status(500).json({ error: err.code }));
      } else
        res
          .status(403)
          .json({ error: "Secure code is not valid! Please, try again." });
    })
    .catch((err) => res.status(400).status.json({ error: err.code }));
};

exports.sign_in = (res, user_credentials) => {
  // user.findOne({})
  User.findOne({
    email: user_credentials.email,
  })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ error: "User email not found" });
      }
      User.findOne({
        email: user_credentials.email,
        password: user_credentials.password,
      })
        .then((result) => {
          if (!result)
            return res
              .status(404)
              .json({ error: "Wrong credentials, please, try again." });
          const token = JWT_token({ _id: result._id, email: result.email });
          return res.status(202).json({ token });
        })
        .catch((err) => res.status(400).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.get_user = (req, res) => {
  User.findById(req.id)
    .then((result) => res.status(202).json({ data: result }))
    .catch((err) => res.status({ error: err.code }));
};

exports.forgot_password = (res, email) => {
  User.findOne({ email })
    .then((result) => send_password(email, result.password))
    .then(() =>
      res
        .status(202)
        .json({ message: "Password was sent to user email address." })
    )
    .catch(() => res.status(404).json({ error: "Email addres not found." }));
};

exports.delete_account = (res, user_id) => {
  Result.deleteMany({ user_id })
    .then(() =>
      QA.deleteMany({ user_id })
        .then(() =>
          User.findByIdAndDelete(user_id)
            .then(() =>
              res.status(202).json({ message: "User account was deleted." })
            )
            .catch((err) => res.status(500).json({ error: err.code }))
        )
        .catch((err) => res.status(400).json({ error: err.code }))
    )
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.add_bookmark = (res, user_id, bookmark) => {
  User.findOne({
    _id: user_id,
    bookmarks: {
      $elemMatch: {
        topic_id: bookmark.topic_id,
        question_title: bookmark.question_title,
      },
    },
  })
    .then((result) => {
      if (result) {
        return User.findByIdAndUpdate(user_id, {
          $pull: {
            bookmarks: {
              topic_id: bookmark.topic_id,
              question_title: bookmark.question_title,
            },
          },
        })
          .then(() =>
            res.status(202).json({ message: "Bookmark was removed." })
          )
          .catch((err) => console.log(err));
      }
      User.findByIdAndUpdate(user_id, { $push: { bookmarks: bookmark } })
        .then((result) =>
          res.status(202).json({ message: "Bookmark was added." })
        )
        .catch((err) => res.status(500).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};
