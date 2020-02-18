import React from "react";
import TodoInput from "./TodoInput";
import axios from "../../config/axios";
import "./Todos.scss";

interface ITodosState {
  todos: any[];
}

class Todos extends React.Component<any, ITodosState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    };
  }
  getTodos = async () => {
    try {
      const response = await axios.get("todos");
      console.log(response.data);
      this.setState({ todos: response.data.resources });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getTodos();
  }
  addTodo = async (params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.post("todos", params);
      this.setState({ todos: [...todos, response.data.resource] });
    } catch (e) {
      throw new Error(e);
    }
  };
  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)}></TodoInput>
        <main>
          {this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.description}</div>;
          })}
        </main>
      </div>
    );
  }
}

export default Todos;
