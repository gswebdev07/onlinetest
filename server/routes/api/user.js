const express = require("express")
const router = express.Router()
const { adminPermission, protectedRoute } = require("../../utils/auth")

// !!!WARNING!!!
// Please, if you gonna add a new route,
// do not forget to describe your route by
// ROUTE, DESC(Description).
// Keep the code writing style pretty and clean.
// (Author Dany)

// Controllers
const {
  get_users,
  delete_user,
  sign_up,
  sign_in,
  get_user,
  forgot_password,
  update_credentials,
  delete_account,
  add_bookmark,
} = require("../../controllers/user_functions")

// ROUTE: GET /api/user
// DESC: Get list of all registered users
router.get("/", adminPermission, (req, res) => {
  return get_users(res)
})

// ROUTE: DELETE /api/user
// DESC: Delete user via it's _id
router.delete("/:user_id", (req, res) => {
  const id = req.params.user_id
  return delete_user(res, id)
})

// ROUTE: POST /api/user
// DESC: Register a new user
router.post("/sign_up", (req, res) => {
  const user_credentials = req.body.user_credentials
  const verify_email_codes = req.body.verify_email_codes
  // const user_credentials = {
  //   full_name: req.body.full_name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   mobile_number: req.body.mobile_number,
  //   class: req.body.class,
  //   state: req.body.state,
  //   city: req.body.city,
  //   gender: req.body.gender,
  //   age: req.body.age,
  // };
  return sign_up(res, user_credentials, verify_email_codes)
})

// ROUTE: POST /api/user
// DESC: Login
router.post("/sign_in", (req, res) => {
  const user_credentials = {
    email: req.body.email,
    password: req.body.password,
  }
  return sign_in(res, user_credentials)
})

// ROUTE: GET /api/user
// DESC: Get user credentials
router.get("/get_user", protectedRoute, (req, res) => {
  return get_user(req, res)
})

// ROUTE: POST /api/user/forgot_password
// DESC: Send user password to it's email address
router.post("/forgot_password", (req, res) => {
  const email = req.body.email
  return forgot_password(res, email)
})

// ROUTE: POST /api/user/update
// DESC: Update user credentials
router.post("/update", protectedRoute, (req, res) => {
  const user_credentials = req.body.user_credentials
  return update_credentials(res, user_credentials)
})

// ROUTE: DELETE /api/user
// DESC: Delete a user account
router.post("/delete_account", protectedRoute, (req, res) => {
  return delete_account(res, req.id)
})

// ROUTE: POST /api/user/bookmarks
// DESC: Add a new bookmark
router.post("/bookmarks", protectedRoute, (req, res) => {
  const bookmark = req.body.bookmark
  return add_bookmark(res, req.id, bookmark)
})

module.exports = router
