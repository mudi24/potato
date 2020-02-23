import React from "react";
import { connect } from "react-redux";
import "./Statistics.scss";
import Polygon from "./Polygon";
import _ from "lodash";
import { format } from "date-fns";

interface IStatisticsProps {
  todos: any[];
}

class Statistics extends React.Component<IStatisticsProps> {
  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }
  get dailyTodos() {
    const obj = _.groupBy(this.finishedTodos, todo => {
      return format(todo.updated_at, "YYYY-MM-D");
    });
    return obj;
  }
  public render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史 累计完成{this.finishedTodos.length}个任务
            <Polygon
              data={this.dailyTodos}
              totalFinishedCount={this.finishedTodos.length}
            ></Polygon>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
