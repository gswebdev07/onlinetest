const express = require("express");
const router = express.Router();
const { adminPermission, protectedRoute } = require("../../utils/auth");

// !!!WARNING!!!
// Please, if you gonna add a new route,
// do not forget to describe your route by
// ROUTE, DESC(Description).
// Keep the code writing style pretty and clean.
// (Author Dany)

// Controllers
const {
  get_questions,
  ask_question,
  answer_question,
  delete_question,
} = require("../../controllers/qa_functions");

// ROUTE: GET api/q&s/user_id
// DESC: Get Q&As
router.post("/", (req, res) => {
  const user_id = req.body.user_id;
  return get_questions(res, user_id);
});

// ROUTE: POST api/a&a
// DESC: Ask question
router.post("/ask", protectedRoute, (req, res) => {
  const question = {
    user_id: req.id,
    user_email: req.body.email,
    question: req.body.question,
  };
  return ask_question(res, question);
});

// ROUTE: POST api/q&a
// DESC: Answer to question
router.post("/answer", adminPermission, (req, res) => {
  const question_id = req.body.question_id;
  const answer = req.body.answer;
  // return console.log({ question_id, answer });
  return answer_question(res, question_id, answer);
});

// ROUTE: DELETE api/q&a/question_id
// DESC: Delete a question via it's id
router.delete("/:qa_id", adminPermission, (req, res) => {
  const question_id = req.params.qa_id;
  return delete_question(res, question_id);
});

module.exports = router;
