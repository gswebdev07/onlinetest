// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Models:
const Class = require("../models/Class");
const Subject = require("../models/Subject");

// Imported functions:
const { delete_chapters, update_chapters } = require("./chapter_functions");

exports.get_subjects = (res, class_name) => {
  if (class_name === "undefined") {
    return Subject.find()
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
  Subject.find({ class_name })
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.post_subject = (res, new_subject_0) => {
  const new_subject = new Subject({ ...new_subject_0 });
  // Checking for class existence
  Class.findOne({ class_name: new_subject.class_name })
    .then((result) => {
      if (!result)
        return res.status(404).json({ error: "Class does not exist." });
      // Checking for the subject's name
      Subject.findOne({
        class_name: new_subject.class_name,
        subject_name: new_subject.subject_name,
      })
        .then((result) => {
          if (result)
            return res.status(406).json({
              error: "The subject with the same name already exists.",
            });
          new_subject
            .save()
            .then((result) => res.status(201).json({ data: result }))
            .catch((err) => res.status(500).json({ error: err.code }));
        })
        .catch((err) => res.status(400).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.hide_subject = (res, subject_id, hidden) => {
  Subject.findByIdAndUpdate(subject_id, { hidden })
    .then((result) => res.status(202).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.delete_subjects = (res, class_name, subject_name) => {
  if (!subject_name) {
    Subject.deleteMany({ class_name })
      .then(() => delete_chapters(res, class_name))
      .catch((err) => res.status(400).json({ error: err.code }));
  } else {
    Subject.findOneAndDelete({ class_name, subject_name })
      .then(() => delete_chapters(res, class_name, subject_name))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
};

exports.update_subjects = (res, class_name, subject_name, updated_details) => {
  if (!subject_name) {
    Subject.updateMany({ class_name }, { ...updated_details })
      .then(() => update_chapters(res, class_name, null, null, updated_details))
      .catch((err) => res.status(500).json({ error: err.code }));
  } else {
    Subject.findOneAndUpdate(
      { class_name, subject_name },
      { ...updated_details }
    )
      .then(() =>
        update_chapters(res, class_name, subject_name, null, updated_details)
      )
      .catch((err) => res.status(500).json({ error: err.code }));
  }
};
