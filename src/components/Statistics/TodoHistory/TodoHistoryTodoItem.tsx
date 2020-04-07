import * as React from "react";
import { connect } from "react-redux";
import { updateTodo } from "../../../redux/actions/todos";
import { format } from "date-fns";
import "./TodoHistoryTodoItem.scss";
import axios from "../../../config/axios";

interface ITodoHistoryTodoItemProps {
  todo: any;
  itemType: string;
  updated_at: any;
  description: any;
  updateTodo: (payload: any) => void;
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryTodoItemProps> {
  updateTodo = async (params: any) => {
    try {
      console.log(params);
      
      const response = await axios.put(`todos/${this.props.todo.id}`, params);
      this.props.updateTodo(response.data.resource);
      console.log(response.data.resource);
      
    } catch (e) {
      throw new Error(e);
    }
  };
  public render() {
    let formatText;
    let action;
    let time;
    if (this.props.itemType === "finished") {
      formatText = "HH:mm";
      time = this.props.todo.updated_at;
      action = (
        <div className="action">
          <span onClick={() => this.updateTodo({ completed: false })}>恢复</span>
          <span onClick={() => this.updateTodo({ deleted: true })}>删除</span>
        </div>
      );
    } else if (this.props.itemType === "deleted") {
      formatText = "YYYY-MM-DD";
      time = this.props.todo.updated_at;
      action = (
        <div className="action">
          <span onClick={() => this.updateTodo({ deleted: false })}>恢复</span>
        </div>
      );
    }
    return (
      <div className="TodoHistoryTodoItem" id="TodoHistoryTodoItem">
        <div className="text">
          <span className="time">{format(time, formatText)}</span>
          <span className="description">{this.props.todo.description}</span>
        </div>
        <div className="action">{action}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  updateTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoHistoryTodoItem);
