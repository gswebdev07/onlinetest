const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { upload } = require("../../utils/storage");

// !!!WARNING!!!
// Please, if you gonna add a new route,
// do not forget to describe your route by
// ROUTE, DESC(Description).
// Keep the code writing style pretty and clean.
// (Author Dany)

// Controllers
const {
  add_question,
  delete_question,
  update_question,
  update_question_file,
  move_question,
} = require("../../controllers/topic_functions");

// ROUTE: ADD api/admin
// DESC: Add a new question to the topic
router.post("/add_question", (req, res) => {
  const topic_id = req.body.topic_id;
  const question = {
    // Question:
    question_title: req.body.question_title,

    // Options (3-4 are optional):
    correct_option: req.body.correct_option,
    option_1: req.body.option_1,
    option_2: req.body.option_2,
    option_3: req.body.option_3,

    // Question's files (Optional):
    image_url: req.body.image_url || "",
    sound_url: req.body.sound_url || "",
    video_url: req.body.video_url || "",

    // User's action
    picked_option: "",

    // Factory details:
    created_at: Date.now(),
  };
  return add_question(res, topic_id, question);
});

// ROUTE: DELETE api/admin
// DESC: Delete a question from topic conent
router.delete("/delete_question", (req, res) => {
  const topic_id = req.body.topic_id;
  const question = req.body.question;
  return delete_question(res, topic_id, question);
});

// ROUTE: UPDATE api/admin
// DESC: Update a question in the topic
router.post("/update_question", (req, res) => {
  const topic_id = req.body.topic_id;
  const question = req.body.question;
  const updated_question = {
    // Question:
    question_title: req.body.question_title,

    // Options (3-4 are optional):
    correct_option: req.body.correct_option,
    option_1: req.body.option_1,
    option_2: req.body.option_2,
    option_3: req.body.option_3,

    // Factory details:
    created_at: Date.now(),
  };
  return update_question(res, topic_id, question, updated_question);
});
// ROUTE: UPDATE api/admin
// DESC: Update a question's file
router.post("/update_question/file", upload.single("file_url"), (req, res) => {
  const topic_id = req.body.topic_id;
  const question = req.body.question;
  const updated_question = {
    // Question:
    question_title: req.body.question_title,

    // Options (3-4 are optional):
    correct_option: req.body.correct_option,
    option_1: req.body.option_1,
    option_2: req.body.option_2,
    option_3: req.body.option_3,

    // Question's files (Optional):
    file_url: req.file.path,

    // Factory details:
    created_at: Date.now(),
  };
  const dir = path.join(__dirname, "../../uploads/");
  const files = fs.readdirSync(dir);
  files.map((file) => {
    if (file === updated_question.file_url) {
      fs.unlink(dir + file, (err) => {
        if (err) throw err;
        return update_question_file(res, topic_id, question, updated_question);
      });
    }
  });
  return update_question_file(res, topic_id, question, updated_question);
});

// ROUTE: MOVE api/admin
// DESC: Move a question to another topic
router.post("/move_question", (req, res) => {
  const topic_id = req.body.topic_id;
  const question = req.body.question;
  const new_location = req.body.new_topic_id;
  return move_question(res, topic_id, question, new_location);
});

module.exports = router;
