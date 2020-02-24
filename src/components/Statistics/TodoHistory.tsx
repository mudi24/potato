import * as React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import _ from "lodash";
import { format } from "date-fns";
import "./TodoHistory.scss";

interface ITodoHistoryProps {
  todos: any[];
}

const { TabPane } = Tabs;

const TodoItem = (props: any) => {
  return (
    <div className="todoItem">
      <span className="time">{format(props.updated_at, "HH:mm")}</span>
      <span className="description">{props.description}</span>
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
  get dailyDeletedTodos() {
    return _.groupBy(this.deletedTodos, todo => {
      return format(todo.updated_at, "YYYY-MM-D");
    });
  }
  get finishedDates() {
    return Object.keys(this.dailyFinishedTodos).sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    );
  }
  get deletedDates() {
    return Object.keys(this.dailyDeletedTodos).sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    );
  }
  public render() {
    const finishedTodoList = this.finishedDates.map(date => {
      return (
        <div key={date} className="dailyTodos">
          <div className="summary">
            <div className="date">
              <span>{date}</span>
              <span>周五</span>
              <p className="finishedCount">
                完成了{this.dailyFinishedTodos[date].length}个任务
              </p>
            </div>
          </div>
          <div className="todoList">
            {this.dailyFinishedTodos[date].map(todo => (
              <TodoItem key={todo.id} {...todo}></TodoItem>
            ))}
          </div>
        </div>
      );
    });
    const deletedTodoList = this.deletedDates.map(date => {
      return (
        <div key={date} className="dailyTodos">
          <div className="summary">
            <p className="date">
              <span>{date}</span>
              <span>周五</span>
            </p>
            <p className="finishedCount">
              删除了{this.dailyDeletedTodos[date].length}个任务
            </p>
          </div>
          <div className="todoList">
            {this.dailyDeletedTodos[date].map(todo => (
              <TodoItem key={todo.id} {...todo}></TodoItem>
            ))}
          </div>
        </div>
      );
    });

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的任务" key="1">
          <div className="TodoHistory" id="TodoHistory">
            {finishedTodoList}
          </div>
        </TabPane>
        <TabPane tab="已删除的任务" key="2">
          <div className="TodoHistory" id="TodoHistory">
            {deletedTodoList}
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistory);
