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
  get_faqs,
  post_faq,
  delete_faq,
} = require("../../controllers/faq_functions");

// ROUTE: GET api/faqs
// DESC: Get faqs
router.get("/", (req, res) => {
  return get_faqs(res);
});

// ROUTE: POST api/faqs
// DESC: Post new faq
router.post("/", adminPermission, (req, res) => {
  const faq = {
    question: req.body.question,
    answer: req.body.answer,
  };
  return post_faq(res, faq);
});

// ROUTE: DELETE api/faqs
// DESC: Delete a faq via it's unique id
router.delete("/:faq_id", adminPermission, (req, res) => {
  const id = req.params.faq_id;
  return delete_faq(res, id);
});

module.exports = router;
