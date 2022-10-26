import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./Redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <Provider store={store}>
      <Router>
        <Routes>
         <Route path="*" element = {<App/>} />
        </Routes>
      </Router>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
