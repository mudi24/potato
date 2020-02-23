import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { format } from "date-fns";

interface ITodoHistoryProps {
  todos: any[];
}

const TodoItem = (props: any) => {
  return (
    <div>
      <span>{props.updated_at}</span>
      <span>{props.description}</span>
    </div>
  );
};

class TodoHistory extends React.Component<ITodoHistoryProps> {
  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }
  get deletedTodos() {
    return this.props.todos.filter(t => t.deleted);
  }
  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, todo => {
      return format(todo.updated_at, "YYYY-MM-D");
    });
  }
  get dates() {
    return Object.keys(this.dailyFinishedTodos).sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    );
  }
  public render() {
    const TodoList = this.dates.map(date => {
      return (
        <div key={date}>
          <div>
            {date}
            完成了{this.dailyFinishedTodos[date].length}个任务
          </div>
          <div>
            {this.dailyFinishedTodos[date].map(todo => (
              <TodoItem key={todo.id} {...todo}></TodoItem>
            ))}
          </div>
        </div>
      );
    });

    return (
      <div className="TodoHistory" id="TodoHistory">
        {TodoList}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistory);
