import React from "react";
import { Checkbox, Icon } from "antd";

interface ITodoItem {
  id: number;
  editing: boolean;
  description: string;
  completed: boolean;
  update: (id: number, params: any) => void;
  toEditing: (id: number) => void;
}

class TodoItem extends React.Component<ITodoItem, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }
  update = (params: any) => {
    this.props.update(this.props.id, params);
  };
  toEditing = () => {
    this.props.toEditing(this.props.id);
  };
  onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      this.update({ description: this.state.editText });
    }
  };
  public render() {
    const editing = (
      <div className="editing">
        <input
          type="text"
          value={this.state.editText}
          onChange={e => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
        <Icon type="enter"></Icon>
        <Icon
          type="delete"
          theme="filled"
          onClick={e => this.update({ deleted: true })}
        ></Icon>
      </div>
    );
    const text = (
      <span onDoubleClick={this.toEditing}>{this.state.editText}</span>
    );
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox
          checked={this.props.completed}
          onChange={(e: any) => this.update({ completed: e.target.checked })}
        ></Checkbox>
        {this.props.editing ? editing : text}
      </div>
    );
  }
}

export default TodoItem;
