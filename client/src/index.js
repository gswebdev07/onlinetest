import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App/index"
import "./static/styles/index.css"
import { Provider } from "react-redux"
import store from "./store/store"

import axios from "axios"
axios.defaults.baseURL = "http://localhost:5000"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
