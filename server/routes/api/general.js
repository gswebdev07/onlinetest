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
  get_generals,
  update_general,
} = require("../../controllers/general_functions");

// ROUTE: GET api/general
// DESC: Get general information
router.get("/", (req, res) => {
  return get_generals(res);
});

// ROUTE: POST api/general
// DESC: Update details of general information
router.post("/", adminPermission, (req, res) => {
  const details = req.body.details;
  return update_general(res, details);
});

module.exports = router;
