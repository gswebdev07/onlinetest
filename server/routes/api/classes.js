const express = require("express");
const router = express.Router();
const { adminPermission } = require("../../utils/auth");

// !!!WARNING!!!
// Please, if you gonna add a new route,
// do not forget to describe your route by
// ROUTE, DESC(Description).
// Keep the code writing style pretty and clean.
// (Author Dany)

// Controllers
const {
  get_classes,
  post_class,
  delete_class,
  update_class,
} = require("../../controllers/class_functions");

// ROUTE: GET api/classes
// DESC: Get all classes
router.get("/", (req, res) => get_classes(res));

// ROUTE: POST api/classes
// DESC: Post new class
router.post("/", adminPermission, (req, res) => {
  const class_name = req.body.class_name;
  return post_class(res, class_name);
});

// ROUTE: DELETE api/admin/
// DESC: Delete class with it's id
router.delete("/", adminPermission, (req, res) => {
  const class_name = req.body.class_name;
  return delete_class(res, class_name);
});

// ROUTE: UPDATE api/admin/
// DESC: Update class with it's class name
router.post("/update", adminPermission, (req, res) => {
  const class_name = req.body.class_name;
  const updated_details = { class_name: req.body.new_class_name };
  return update_class(res, class_name, updated_details);
});

module.exports = router;
