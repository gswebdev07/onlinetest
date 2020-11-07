import axios from "axios";
import {
  DATA_LOADING,
  SET_CLASSES,
  SET_SUBJECTS,
  SET_CHAPTERS,
  SET_TOPICS,
  SET_DIRECTORY,
  SET_USERS,
  SET_FAQS,
  SET_RESULTS,
  SET_GENERAL,
  SET_QUESTIONS,
} from "../types";

// Class actions
export const get_classes_only = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/classes/")
    .then((res) => dispatch({ type: SET_CLASSES, payload: res.data.data }))
    .catch((err) => console.log(err));
};
export const get_classes = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/classes/")
    .then((res) => dispatch({ type: SET_CLASSES, payload: res.data.data }))
    .then(() => dispatch(get_subjects()))
    .catch((err) => console.log(err));
};
export const add_class = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/classes", details)
    .then(() => dispatch(get_classes()))
    .catch((err) => console.log(err));
};
export const delete_class = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete("/api/classes", { data: details })
    .then(() => dispatch(get_classes()))
    .catch((err) => console.log(err));
};
export const edit_class = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/classes/update", details)
    .then(() => dispatch(get_classes()))
    .catch((err) => console.log(err));
};

// Subject actions
export const get_subjects = (class_name) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get(`/api/subjects/${class_name}`)
    .then((res) => dispatch({ type: SET_SUBJECTS, payload: res.data.data }))
    .then(() => dispatch(get_chapters()))
    .catch((err) => console.log(err));
};
export const add_subject = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/subjects", details)
    .then(() => dispatch(get_subjects()))
    .catch((err) => console.log(err));
};
export const hide_subject = (order) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/subjects/hide", order)
    .then(() => dispatch(get_subjects()))
    .catch((err) => console.log(err));
};
export const delete_subject = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete("/api/subjects", { data: details })
    .then(() => dispatch(get_subjects()))
    .catch((err) => console.log(err));
};
export const edit_subject = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/subjects/update", details)
    .then(() => dispatch(get_subjects()))
    .catch((err) => console.log(err));
};

// Chapter actions
export const get_chapters = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/chapters")
    .then((res) => dispatch({ type: SET_CHAPTERS, payload: res.data.data }))
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const add_chapter = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/chapters", details)
    .then(() => dispatch(get_chapters()))
    .catch((err) => console.log(err));
};
export const hide_chapter = (order) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/chapters/hide", order)
    .then(() => dispatch(get_chapters()))
    .catch((err) => console.log(err));
};
export const delete_chapter = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete("/api/chapters", { data: details })
    .then(() => dispatch(get_chapters()))
    .catch((err) => console.log(err));
};
export const edit_chapter = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/chapters/update", details)
    .then(() => dispatch(get_chapters()))
    .catch((err) => console.log(err));
};

// Topic actions
export const get_topics = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/topics")
    .then((res) => dispatch({ type: SET_TOPICS, payload: res.data.data }))
    .catch((err) => console.log(err));
};
export const add_topic = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics", details)
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const hide_topic = (order) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics/hide", order)
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const delete_topic = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete("/api/topics", { data: details })
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const edit_topic = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics/update", details)
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const move_topic = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics/move", details)
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};

// Question actions
export const add_question = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics/add_question", details)
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const delete_question = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete("/api/topics/delete_question", { data: details })
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const update_question = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics/update_question", details)
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const update_question_file = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics/update_question/file", details)
    .then(() => dispatch(get_topics()))
    .catch((err) => console.log(err));
};
export const move_question = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/topics/move_question", details)
    .then(() => dispatch(get_subjects()))
    .catch((err) => console.log(err));
};

// FAQ actions
export const get_faqs = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/faqs")
    .then((res) => dispatch({ type: SET_FAQS, payload: res.data.data }))
    .catch((err) => console.log(err));
};
export const post_faq = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/faqs", details)
    .then(() => dispatch(get_faqs()))
    .catch((err) => console.log(err));
};
export const delete_faq = (id) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete(`api/faqs/${id}`)
    .then(() => dispatch(get_faqs()))
    .catch((err) => console.log(err));
};

// Q&A actions
export const get_questions = (user_id) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/q&a", { user_id })
    .then((res) => dispatch({ type: SET_QUESTIONS, payload: res.data.data }))
    .catch((err) => console.log(err));
};
export const ask_question = (question, user_id) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/q&a/ask", question)
    .then((res) => dispatch(get_questions(user_id)))
    .catch((err) => console.log(err));
};
export const answer_question = (answer) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/q&a/answer", answer)
    .then(() => dispatch(get_questions()))
    .catch((err) => console.log(err));
};
export const delete_qa = (question_id) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete(`/api/q&a/${question_id}`)
    .then(() => dispatch(get_questions()))
    .catch((err) => console.log(err));
};

// Results actions
export const get_results = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/results")
    .then((res) => dispatch({ type: SET_RESULTS, payload: res.data.data }))
    .catch((err) => console.log(err));
};
export const get_all_results = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/results/all")
    .then((res) => dispatch({ type: SET_RESULTS, payload: res.data.data }))
    .catch((err) => console.log(err));
};

// User actions
export const get_users = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .get("/api/user")
    .then((res) => dispatch({ type: SET_USERS, payload: res.data.data }))
    .catch((err) => console.log(err));
};
export const delete_user = (user_id) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .delete(`/api/user/${user_id}`)
    .then(() => dispatch(get_users()))
    .catch((err) => console.log(err));
};

// General actions
export const get_generals = () => async (dispatch) => {
  await axios
    .get("/api/general")
    .then((res) => {
      dispatch({ type: SET_GENERAL, payload: res.data.data });
    })
    .catch((err) => console.log(err));
};
export const update_general = (details) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/general", details)
    .then((res) => dispatch(get_generals()))
    .catch((err) => console.log(err));
};

export const set_directory = (directories) => (dispatch) => {
  dispatch({ type: SET_DIRECTORY, payload: directories });
};
