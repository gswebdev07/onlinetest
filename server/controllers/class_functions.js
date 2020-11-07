// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Model:
const Class = require("../models/Class");

// Imported functions:
const { delete_subjects, update_subjects } = require("./subject_functions");

exports.get_classes = (res) => {
  Class.find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.post_class = (res, class_name) => {
  const new_class = new Class({ class_name });
  // Checking for the class' name
  Class.findOne({ class_name: new_class.class_name })
    .then((result) => {
      if (result)
        return res
          .status(406)
          .json({ error: "The class with the same name already exists." });
      new_class
        .save()
        .then((result) => res.status(201).json({ data: result }))
        .catch((err) => res.status(500).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.delete_class = (res, class_name) => {
  Class.findOneAndDelete({ class_name })
    .then(() => delete_subjects(res, class_name))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.update_class = (res, class_name, updated_details) => {
  Class.findOneAndUpdate({ class_name }, { ...updated_details })
    .then(() => update_subjects(res, class_name, null, updated_details))
    .catch((err) => res.status(304).json({ error: err.code }));
};
