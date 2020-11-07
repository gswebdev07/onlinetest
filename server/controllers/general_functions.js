// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Model
const General = require("../models/General");

exports.get_generals = (res) => {
  General.find()
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.update_general = (res, details) => {
  if (!details._id) {
    const general_info = new General({ ...details });
    general_info
      .save()
      .then((result) => res.status(201).json({ data: result }))
      .catch((err) => res.status(500).json({ error: err.code }));
  } else {
    General.findByIdAndUpdate(details._id, { $set: { ...details } })
      .then((result) => res.status(202).json({ data: result }))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
};
