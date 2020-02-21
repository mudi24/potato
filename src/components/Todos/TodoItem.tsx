import React from "react";
import { connect } from "react-redux";
import { updateTodo, editTodo } from "../../redux/actions/todos";
import { Checkbox, Icon } from "antd";
import axios from "../../config/axios";
import "./TodoItem.scss";

interface ITodoItemProps {
  id: number;
  editing: boolean;
  description: string;
  completed: boolean;
  editTodo: (id: number) => void;
  updateTodo: (payload: any) => any;
}

interface ITodoItemState {
  editText: string;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }

  updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };
  editTodo = () => {
    this.props.editTodo(this.props.id);
  };
  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== "") {
      this.updateTodo({ description: this.state.editText });
    }
  };
  public render() {
    const Editing = (
      <div className="editing">
        <input
          type="text"
          value={this.state.editText}
          onChange={e => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
        <div className="icon-wrapper">
          <Icon type="enter"></Icon>
          <Icon
            type="delete"
            theme="filled"
            onClick={e => this.updateTodo({ deleted: true })}
          ></Icon>
        </div>
      </div>
    );
    const Text = (
      <span className="text" onDoubleClick={this.editTodo}>
        {this.props.description}
      </span>
    );
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox
          checked={this.props.completed}
          onChange={(e: any) =>
            this.updateTodo({ completed: e.target.checked })
          }
        ></Checkbox>
        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});

const mapDispatchToProps = {
  updateTodo,
  editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
