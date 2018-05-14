import React, { Component } from "react";
import { render } from "react-dom";
import "./index.css";
import { tasks } from "./task-svc.js";
import TodoList from "./TodoList";

render(<TodoList />, document.getElementById("root"));
