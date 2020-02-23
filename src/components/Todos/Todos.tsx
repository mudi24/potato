import React from "react";
import { connect } from "react-redux";
import { initTodos } from "../../redux/actions/todos";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import axios from "../../config/axios";
import "./Todos.scss";

class Todos extends React.Component<any> {
  // constructor(props: any) {
  //   super(props);
  // }
  get unDeletedTodos() {
    return this.props.todos.filter((t: any) => !t.deleted);
  }
  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t: any) => !t.completed);
  }
  get completedTodos() {
    return this.unDeletedTodos.filter((t: any) => t.completed);
  }
  getTodos = async () => {
    try {
      const response = await axios.get("todos");
      const todos = response.data.resources.map((t: any) =>
        Object.assign({}, t, { editing: false })
      );
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };
  componentDidMount() {
    this.getTodos();
  }
  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput></TodoInput>
        <div className="todoList">
          {this.unCompletedTodos.map((todo: any) => {
            return <TodoItem key={todo.id} {...todo}></TodoItem>;
          })}
          {this.completedTodos.map((todo: any) => {
            return <TodoItem key={todo.id} {...todo}></TodoItem>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});

const mapDispatchToProps = {
  initTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
