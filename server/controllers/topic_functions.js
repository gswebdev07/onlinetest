// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Models:
const Class = require("../models/Class");
const Subject = require("../models/Subject");
const Chapter = require("../models/Chapter");
const Topic = require("../models/Topic");

// Imported functions:
exports.get_topics = (res, class_name, subject_name, chapter_name) => {
  if (!chapter_name) {
    return Topic.find()
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
  Topic.find({ class_name, subject_name, chapter_name })
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.post_topic = (res, new_topic_0) => {
  const new_topic = new Topic({ ...new_topic_0 });
  // Checking for class existence
  Class.findOne({ class_name: new_topic.class_name })
    .then((result) => {
      if (!result)
        return res.status(404).json({ error: "Class does not exist." });
      // Checking for subject existence
      Subject.findOne({
        class_name: new_topic.class_name,
        subject_name: new_topic.subject_name,
      })
        .then((result) => {
          if (!result)
            return res.status(404).json({ error: "Subject does not exist." });
          // Checking for chapter existence
          Chapter.findOne({
            class_name: new_topic.class_name,
            subject_name: new_topic.subject_name,
            chapter_name: new_topic.chapter_name,
          })
            .then((result) => {
              if (!result)
                return res
                  .status(404)
                  .json({ error: "Chapter does not exist." });
              // Checking for topic's name
              Topic.findOne({
                class_name: new_topic.class_name,
                subject_name: new_topic.subject_name,
                chapter_name: new_topic.chapter_name,
                topic_name: new_topic.topic_name,
              })
                .then((result) => {
                  if (result)
                    return res.status(406).json({
                      error: "Topic with the same name alreadt exists.",
                    });
                  new_topic
                    .save()
                    .then((result) => res.status(201).json({ data: result }))
                    .catch((err) => res.status(500).json({ error: err.code }));
                })
                .catch((err) => res.status(400).json({ error: err.code }));
            })
            .catch((err) => res.status(400).json({ error: err.code }));
        })
        .catch((err) => res.status(400).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.hide_topic = (res, chapter_id, hidden) => {
  Topic.findByIdAndUpdate(chapter_id, { hidden })
    .then((result) => res.status(202).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.delete_topics = (
  res,
  class_name,
  subject_name,
  chapter_name,
  topic_name
) => {
  if (!subject_name) {
    Topic.deleteMany({ class_name })
      .then(() =>
        res.status(200).json({ message: "The class tree was deleted." })
      )
      .catch((err) => res.status(400).json({ error: err.code }));
  } else if (!chapter_name) {
    Topic.deleteMany({ class_name, subject_name })
      .then(() =>
        res.status(200).json({ message: "The subject tree was deleted." })
      )
      .catch((err) => res.status(400).json({ error: err.code }));
  } else if (!topic_name) {
    Topic.deleteMany({ class_name, subject_name, chapter_name })
      .then(() =>
        res.status(200).json({ message: "The chapter tree was deleted." })
      )
      .catch((err) => res.status(400).json({ error: err.code }));
  } else {
    Topic.findOneAndDelete({
      class_name,
      subject_name,
      chapter_name,
      topic_name,
    })
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(400).json({ error: err.code }));
  }
};

exports.update_topics = (
  res,
  class_name,
  subject_name,
  chapter_name,
  topic_name,
  updated_details
) => {
  if (!subject_name) {
    Topic.updateMany({ class_name }, { ...updated_details })
      .then(() =>
        res.status(202).json({ message: "The class tree was updated." })
      )
      .catch((err) => res.status(500).json({ error: err.code }));
  } else if (!chapter_name) {
    Topic.updateMany({ class_name, subject_name }, { ...updated_details })
      .then(() =>
        res.status(202).json({ message: "The subject tree was updated." })
      )
      .catch((err) => res.status(500).json({ error: err.code }));
  } else if (!topic_name) {
    Topic.updateMany(
      {
        class_name,
        subject_name,
        chapter_name,
      },
      { ...updated_details }
    )
      .then(() =>
        res.status(202).json({ message: "The chapter tree was updated." })
      )
      .catch((err) => res.status(500).json({ error: err.code }));
  } else {
    Topic.findOneAndUpdate(
      { class_name, subject_name, chapter_name, topic_name },
      { ...updated_details }
    )
      .then((result) => res.status(202).json({ data: result }))
      .catch((err) => res.status(500).json({ error: err.code }));
  }
};

exports.move_topic = (res, topic_id, topic_name, new_location) => {
  // Checking for topic's name in the new location
  Topic.findOne({ ...new_location, topic_name })
    .then((result) => {
      if (result)
        return res.status(406).json({
          error: "Topic with the same name already exists in the new location.",
        });
      Topic.findByIdAndUpdate(topic_id, { ...new_location })
        .then((result) => res.status(202).json({ data: result }))
        .catch((err) => res.status(500).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};

// Question functions are written here beacuse they are items in topics' content array
exports.add_question = (res, topic_id, question) => {
  Topic.findByIdAndUpdate(topic_id, { $push: { content: question } })
    .then((result) => res.status(201).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.delete_question = (res, topic_id, question) => {
  Topic.findByIdAndUpdate(topic_id, { $pull: { content: question } })
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.update_question = (res, topic_id, question, updated_question) => {
  Topic.findByIdAndUpdate(topic_id, { $pull: { content: question } })
    .then(() =>
      Topic.findByIdAndUpdate(topic_id, {
        $push: { content: updated_question },
      })
    )
    .then((result) => res.status(202).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};
exports.update_question_file = (res, topic_id, question, updated_question) => {
  // return console.log({ topic_id, question, updated_question });
  Topic.findByIdAndUpdate(topic_id, {
    $pull: { content: { question_title: question } },
  })
    .then(() =>
      Topic.findByIdAndUpdate(topic_id, {
        $push: { content: updated_question },
      })
    )
    .then((result) => res.status(202).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.move_question = (res, topic_id, question, new_location) => {
  Topic.findByIdAndUpdate(topic_id, { $pull: { content: question } })
    .then(() => {
      Topic.findByIdAndUpdate(new_location, { $push: { content: question } })
        .then((result) => res.status(202).json({ data: result }))
        .catch((err) => res.status(500).json({ error: err.code }));
    })
    .catch((err) => res.status(400).json({ error: err.code }));
};
