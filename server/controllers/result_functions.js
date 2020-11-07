// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Model:
const Result = require("../models/Result");

exports.get_all_results = (res) => {
  Result.find()
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.get_results = (res, user_id) => {
  Result.find({ user_id })
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.post_result = (res, new_test) => {
  Result.findOne({
    user_id: new_test.user_id,
    topic_name: new_test.topic_name,
    content:new_test.content
  })
    .then((result) => {
      if (result) {
        return Result.findOneAndUpdate(
          {
            user_id: new_test.user_id,
            topic_name: new_test.topic_name,
            content:new_test.content
          },
          { ...new_test }
        )
          .then(() => res.status(202).json({ message: "Result was updated." }))
          .catch((err) => res.status(500).json({ error: err.code }));
      }
      const new_result = new Result({ ...new_test });
      new_result
        .save()
        .then((result) => res.status(201).json({ data: result }))
        .catch((err) => res.status(500).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.delete_results = (res, user_id) => {
  Result.deleteMany({ user_id })
    .then((result) =>
      res.status(202).json({ message: `FAQ with ${id} id was deleted.` })
    )
    .catch((err) => res.status(500).json({ error: err.code }));
};
