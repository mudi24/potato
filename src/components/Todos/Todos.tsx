import React from "react";
import TodoInput from "./TodoInput";
import axios from "../../config/axios";
import "./Todos.scss";

class Todos extends React.Component {
  addTodo = async (params: any) => {
    try {
      const response = await axios.post("todos", params);
    } catch (e) {
      throw new Error(e);
    }
  };
  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)}></TodoInput>
      </div>
    );
  }
}

export default Todos;
