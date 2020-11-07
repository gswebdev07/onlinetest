// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Models:
const Class = require("../models/Class");
const Subject = require("../models/Subject");
const Chapter = require("../models/Chapter");

// Imported functions:
const { delete_topics, update_topics } = require("./topic_functions");

exports.get_chapters = (res, class_name, subject_name) => {
  if (!subject_name) {
    return Chapter.find()
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
  Chapter.find({ class_name, subject_name })
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.post_chapter = (res, new_chapter_0) => {
  const new_chapter = new Chapter({ ...new_chapter_0 });
  // Checking for class existence
  Class.findOne({ class_name: new_chapter.class_name })
    .then((result) => {
      if (!result)
        return res.status(404).json({ error: "Class does not exist." });
      // Checking for subject existence
      Subject.findOne({
        class_name: new_chapter.class_name,
        subject_name: new_chapter.subject_name,
      })
        .then((result) => {
          if (!result)
            return res.status(404).json({ error: "Subject does not exist." });
          // Checking for chapter's name
          Chapter.findOne({
            class_name: new_chapter.class_name,
            subject_name: new_chapter.subject_name,
            chapter_name: new_chapter.chapter_name,
          })
            .then((result) => {
              if (result)
                return res.status(406).json({
                  error: "Chapter with the same name already exists.",
                });
              new_chapter
                .save()
                .then((result) => res.status(201).json({ data: result }))
                .catch((err) => res.status(500).json({ error: err.code }));
            })
            .catch((err) => res.status(400).json({ error: err.code }));
        })
        .catch((err) => res.status(400).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.hide_chatper = (res, chapter_id, hidden) => {
  Chapter.findByIdAndUpdate(chapter_id, { hidden })
    .then((result) => res.status(202).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.delete_chapters = (res, class_name, subject_name, chapter_name) => {
  if (!subject_name) {
    Chapter.deleteMany({ class_name })
      .then(() => delete_topics(res, class_name))
      .catch((err) => res.status(400).json({ error: err.code }));
  } else if (!chapter_name) {
    Chapter.deleteMany({ class_name, subject_name })
      .then(() => delete_topics(res, class_name, subject_name))
      .catch((err) => res.status(400).json({ error: err.code }));
  } else {
    Chapter.findOneAndDelete({ class_name, subject_name, chapter_name })
      .then(() => delete_topics(res, class_name, subject_name, chapter_name))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
};

exports.update_chapters = (
  res,
  class_name,
  subject_name,
  chapter_name,
  updated_details
) => {
  if (!subject_name) {
    Chapter.updateMany({ class_name }, { ...updated_details })
      .then(() =>
        update_topics(res, class_name, null, null, null, updated_details)
      )
      .catch((err) => res.status(500).json({ error: err.code }));
  } else if (!chapter_name) {
    Chapter.updateMany({ class_name, subject_name }, { ...updated_details })
      .then(() =>
        update_topics(
          res,
          class_name,
          subject_name,
          null,
          null,
          updated_details
        )
      )
      .catch((err) => res.status(500).json({ error: err.code }));
  } else {
    Chapter.findOneAndUpdate(
      { class_name, subject_name, chapter_name },
      { ...updated_details }
    )
      .then(() =>
        update_topics(
          res,
          class_name,
          subject_name,
          chapter_name,
          null,
          updated_details
        )
      )
      .catch((err) => res.status(500).json({ error: err.code }));
  }
};
