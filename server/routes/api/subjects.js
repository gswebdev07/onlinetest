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
  get_subjects,
  post_subject,
  hide_subject,
  delete_subjects,
  update_subjects,
} = require("../../controllers/subject_functions");

// ROUTE: GET api/subjects
// DESC: Get all subjects of parent class
router.get("/:class_name", (req, res) => {
  const class_name = req.params.class_name;
  return get_subjects(res, class_name);
});

// ROUTE: POST api/subjects/
// DESC: Post a new class subject
router.post("/", adminPermission, (req, res) => {
  const new_subject = {
    class_name: req.body.class_name,
    subject_name: req.body.subject_name,
  };
  return post_subject(res, new_subject);
});

// ROUTE: POST api/subjects/hide
// DESC: Hide subject
router.post("/hide", adminPermission, (req, res) => {
  const subject_id = req.body.subject_id;
  const hidden = req.body.hidden;
  return hide_subject(res, subject_id, hidden);
});

// ROUTE: DELETE api/subjects/
// DESC: Delete subject via it's class/subject name
router.delete("/", adminPermission, (req, res) => {
  const class_name = req.body.class_name;
  const subject_name = req.body.subject_name;
  return delete_subjects(res, class_name, subject_name);
});

// ROUTE: UPDATE api/subjects/
// DESC: Update subject via it's class/subject name
router.post(
  "/update",
  adminPermission,
  upload.single("image_url"),
  (req, res) => {
    const class_name = req.body.class_name;
    const subject_name = req.body.subject_name;
    const updated_details = {
      subject_name: req.body.new_subject_name,
      image_url: req.file && req.file.path,
    };

    // Checking for file existance
    const dir = path.join(__dirname, "../../uploads/");
    const files = fs.readdirSync(dir);
    files.map((file) => {
      if (file === updated_details.image_url) {
        fs.unlink(dir + file, (err) => {
          if (err) throw err;
          return update_subjects(
            res,
            class_name,
            subject_name,
            updated_details
          );
        });
      }
    });
    return update_subjects(res, class_name, subject_name, updated_details);
  }
);

module.exports = router;
