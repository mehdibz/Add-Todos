import React, { Component } from "react";
import { tasks, getTasks, addTask, toggleTask, rando } from "./task-svc.js";

class Loading extends Component {
  render() {
    return (
      <tr>
        <td colspan="2">Loading Tasks...</td>
      </tr>
    );
  }
}

class TodoListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.task.taskName}</td>
        <td>
          <input type="checkbox" checked={this.props.task.finished} />
        </td>
      </tr>
    );
  }
}

class NewTaskForm extends Component {
  render() {
    const onSubmit = evt => {
      evt.preventDefault();
      const taskNameInput = evt.target.elements.task;
      this.props.addTaskName(taskNameInput.value);
      taskNameInput.value = "";
    };
    return (
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Write Task Name" name="task"/>
        <button type="submit">Add</button>
      </form>
    );
  }
}
export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = { tasks };
    this.addTaskName = this.addTaskName.bind(this);
  }
  addTaskName(name) {
    const newTask = { taskName: name, finished: false, id: rando() };
    const oldTaskNames = this.state.tasks;
    const newTaskNames = [...oldTaskNames, newTask];
    this.setState({ tasks: newTaskNames });
  }

  render() {
    const taskItems = this.state.tasks.map(task => (
      <TodoListItem key={task.id} task={task} />
    ));
    return (
      <div className="container">
        <h1>
          Get It Done! <br />
          <small>For the truly industrious</small>
        </h1>

        <table>
          <thead>
            <tr>
              <td>Task</td>
              <td>Done?</td>
            </tr>
          </thead>
          <tbody>{taskItems}</tbody>
        </table>

        <hr/>
        <NewTaskForm addTaskName={this.addTaskName}/>
      </div>
    );
  }
}
