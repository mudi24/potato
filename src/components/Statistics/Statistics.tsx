import React from "react";
import { connect } from "react-redux";
import "./Statistics.scss";
// import Polygon from "./Polygon";
import TodoHistory from "./TodoHistory/TodoHistory";
import _ from "lodash";
import { format,differenceInDays } from "date-fns";

interface IStatisticsProps {
  todos: any[];
  tomatoes: any[];

}

class Statistics extends React.Component<IStatisticsProps> {
  get WeekTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter(
      t => t.description && t.ended_at && !t.aborted
    );
    
    return finishedTomatoes.filter(tomato => {
      return differenceInDays(new Date(),tomato.ended_at) <= 7
    });
  }
  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }
  get finishedTomatoes() {
    return this.props.tomatoes.filter(
      t => t.description && t.ended_at && !t.aborted
    );
  }
  get todayGoal() {
    const finishedTomatoes = this.props.tomatoes.filter(
      t => t.description && t.ended_at && !t.aborted
    );
    return finishedTomatoes.filter(tomato => {
      const finishedDate = format(tomato.ended_at,"YYYY-MM-D")
      const today = format(new Date(),"YYYY-MM-D")
      return finishedDate === today
    });
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
          <li>
            <span>统计</span>
            <span>一周累计</span>
            <span>{this.WeekTomatoes.length}</span> 
          </li>
          <li>
            <span>目标</span>
            <span>今日目标</span>
            <span>{this.todayGoal.length}/8</span> 
          </li>
          <li>
            <span>番茄历史</span>
            <span>累计完成番茄</span>
            <span>{this.finishedTomatoes.length}</span>
          </li>
          <li>
            <span>任务历史</span>
            <span>累计完成任务</span>
            <span>{this.finishedTodos.length}</span>
             
            {/* <Polygon
              data={this.dailyTodos}
              totalFinishedCount={this.finishedTodos.length}
            ></Polygon> */}
          </li>
        </ul>
        <TodoHistory></TodoHistory>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
