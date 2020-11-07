const express = require("express");
const router = express.Router();
const { protectedRoute, adminPermission } = require("../../utils/auth");

// !!!WARNING!!!
// Please, if you gonna add a new route,
// do not forget to describe your route by
// ROUTE, DESC(Description).
// Keep the code writing style pretty and clean.
// (Author Dany)

// Controllers
const {
  get_all_results,
  get_results,
  post_result,
  delete_results,
} = require("../../controllers/result_functions");

// ROUTE: GET api/results
// DESC: Get results
router.get("/all", adminPermission, (req, res) => {
  return get_all_results(res);
});

// ROUTE: GET api/results
// DESC: Get results
router.get("/", protectedRoute, (req, res) => {
  const user_id = req.id;
  return get_results(res, user_id);
});

// ROUTE: POST api/results
// DESC: Post new test
router.post("/", protectedRoute, (req, res) => {
  let corrects = 0;
  const results = req.body.results;
  results.map((result) =>
    result.correct_option === result.picked_option ? corrects++ : null
  );
  const result = {
    content: req.body.content,
    user_id: req.body.user_id,
    user_email: req.body.user_email,
    topic_id: req.body.topic_id,
    topic_name: req.body.topic_name,
    results,
    amount_of_corrects: corrects,
    amount_of_questions: req.body.amount_of_questions,
    chapter_name: req.body.chapter_name,
    subject_name: req.body.subject_name,
    date: req.body.date,
  };
  return post_result(res, result);
});

// ROUTE: DELETE api/results
// DESC: Delete a faq via it's unique id
router.delete("/", protectedRoute, (req, res) => {
  const user_id = req.id;
  return delete_results(res, user_id);
});

module.exports = router;
