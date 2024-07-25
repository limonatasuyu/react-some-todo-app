import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import Layout from "./Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router basename="/react-some-todo-app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:categoryName" element={<CategoryPage />} />
      </Route>
    </Routes>
  </Router>
);

