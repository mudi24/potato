import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
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
  updateTodo = async (id: number, params: any) => {
    try {
      const { todos } = this.state;
      const response = await axios.put(`todos/${id}`, params);
      const newTodos = todos.map(t => {
        if (id === t.id) {
          return response.data.resource;
        } else {
          return t;
        }
      });
      this.setState({ todos: newTodos });
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
            return (
              <TodoItem
                key={todo.id}
                {...todo}
                update={this.updateTodo}
              ></TodoItem>
            );
          })}
        </main>
      </div>
    );
  }
}

export default Todos;
