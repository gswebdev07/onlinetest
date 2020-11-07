const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { adminPermission } = require("../../utils/auth");
const { upload } = require("../../utils/storage");

// !!!WARNING!!!
// Please, if you gonna add a new route,
// do not forget to describe your route by
// ROUTE, DESC(Description).
// Keep the code writing style pretty and clean.
// (Author Dany)

// Controllers
const {
  get_topics,
  post_topic,
  hide_topic,
  delete_topics,
  update_topics,
  move_topic,
} = require("../../controllers/topic_functions");

// ROUTE: GET api/subjects
// DESC: Get all subjects of parent class
router.get("/", (req, res) => {
  const class_name = req.body.class_name;
  const subject_name = req.body.subject_name;
  const chapter_name = req.body.chapter_name;
  return get_topics(res, class_name, subject_name, chapter_name);
});

// ROUTE: POST api/topics/
// DESC: Post a new chapter topic
router.post("/", (req, res) => {
  const new_topic = {
    class_name: req.body.class_name,
    subject_name: req.body.subject_name,
    chapter_name: req.body.chapter_name,
    topic_name: req.body.topic_name,
  };
  return post_topic(res, new_topic);
});

// ROUTE: POST api/topics/hide
// DESC: Hide topic
router.post("/hide", adminPermission, (req, res) => {
  const topic_id = req.body.topic_id;
  const hidden = req.body.hidden;
  return hide_topic(res, topic_id, hidden);
});

// ROUTE: DELETE api/topics/
// DESC: Delete topic via it's class/subject/chapter/topic name
router.delete("/", (req, res) => {
  const class_name = req.body.class_name;
  const subject_name = req.body.subject_name;
  const chapter_name = req.body.chapter_name;
  const topic_name = req.body.topic_name;
  return delete_topics(res, class_name, subject_name, chapter_name, topic_name);
});

// ROUTE: UPDATE api/topics/
// DESC: Update topic via it's class/subject/chapter name
router.post("/update", upload.single("image_url"), (req, res) => {
  const class_name = req.body.class_name;
  const subject_name = req.body.subject_name;
  const chapter_name = req.body.chapter_name;
  const topic_name = req.body.topic_name;
  const updated_details = {
    topic_name: req.body.new_topic_name,
    image_url: req.file && req.file.path,
  };
  // Checking for file existance
  const dir = path.join(__dirname, "../../uploads/");
  const files = fs.readdirSync(dir);
  files.map((file) => {
    if (file === updated_details.image_url) {
      fs.unlink(dir + file, (err) => {
        if (err) throw err;
        return update_topics(
          res,
          class_name,
          subject_name,
          chapter_name,
          topic_name,
          updated_details
        );
      });
    }
  });
  return update_topics(
    res,
    class_name,
    subject_name,
    chapter_name,
    topic_name,
    updated_details
  );
});

// ROUTE: MOVE api/topics
// DESC: Move topic to another class/subject/chapter
router.post("/move", (req, res) => {
  const topic_id = req.body.topic_id;
  const topic_name = req.body.topic_name;
  const new_location = {
    class_name: req.body.new_class_name,
    subject_name: req.body.new_subject_name,
    chapter_name: req.body.new_chapter_name,
  };
  return move_topic(res, topic_id, topic_name, new_location);
});

module.exports = router;
