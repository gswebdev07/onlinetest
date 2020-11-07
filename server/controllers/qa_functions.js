// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Model:
const QA = require("../models/QA");

exports.get_questions = (res, user_id) => {
  if (user_id) {
    QA.find({ user_id })
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(400).json({ error: err.code }));
  } else {
    QA.find()
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
};

exports.ask_question = (res, question) => {
  const new_question = new QA({ ...question });
  new_question
    .save()
    .then((result) => res.status(201).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.answer_question = (res, question_id, answer) => {
  QA.findByIdAndUpdate(question_id, { $set: { answer } })
    .then((result) => res.status(202).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.delete_question = (res, question_id) => {
  QA.findByIdAndDelete(question_id)
    .then(() =>
      res
        .status(202)
        .json({ message: `Question with ${question_id} id was deleted.` })
    )
    .catch((err) => res.status(500).json({ error: err.code }));
};
