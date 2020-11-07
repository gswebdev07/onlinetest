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
  get_chapters,
  post_chapter,
  hide_chatper,
  delete_chapters,
  update_chapters,
} = require("../../controllers/chapter_functions");

// ROUTE: GET api/chapters
// DESC: Get all chapters of subject
router.get("/", (req, res) => {
  const class_name = req.body.class_name;
  const subject_name = req.body.subject_name;
  return get_chapters(res, class_name, subject_name);
});

// ROUTE: POST api/chapters/
// DESC: Post a new subject chapter
router.post("/", (req, res) => {
  const new_chapter = {
    class_name: req.body.class_name,
    subject_name: req.body.subject_name,
    chapter_name: req.body.chapter_name,
  };
  return post_chapter(res, new_chapter);
});

// ROUTE: POST api/chapters/hide
// DESC: Hide chapter
router.post("/hide", adminPermission, (req, res) => {
  const chapter_id = req.body.chapter_id;
  const hidden = req.body.hidden;
  return hide_chatper(res, chapter_id, hidden);
});

// ROUTE: DELETE api/chapters/
// DESC: Delete chapter via it's class/subject/chapter name
router.delete("/", (req, res) => {
  const class_name = req.body.class_name;
  const subject_name = req.body.subject_name;
  const chapter_name = req.body.chapter_name;
  return delete_chapters(res, class_name, subject_name, chapter_name);
});

// ROUTE: UPDATE api/chapters/
// DESC: Update chapter via it's class/subject/chapter name
router.post("/update", upload.single("image_url"), (req, res) => {
  const class_name = req.body.class_name;
  const subject_name = req.body.subject_name;
  const chapter_name = req.body.chapter_name;
  const updated_details = {
    chapter_name: req.body.new_chapter_name,
    image_url: req.file && req.file.path,
  };
  // Checking for file existance
  const dir = path.join(__dirname, "../../uploads/");
  const files = fs.readdirSync(dir);
  files.map((file) => {
    if (file === updated_details.image_url) {
      fs.unlink(dir + file, (err) => {
        if (err) throw err;
        return update_chapters(
          res,
          class_name,
          subject_name,
          chapter_name,
          updated_details
        );
      });
    }
  });
  return update_chapters(
    res,
    class_name,
    subject_name,
    chapter_name,
    updated_details
  );
});

module.exports = router;
