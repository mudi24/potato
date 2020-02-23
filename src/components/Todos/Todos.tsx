import React from "react";
import { connect } from "react-redux";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
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

  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput></TodoInput>
        <div className="todoList">
          {this.unCompletedTodos.map((todo: any) => {
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

export default connect(mapStateToProps)(Todos);
