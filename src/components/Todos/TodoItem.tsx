import React from "react";
import { Checkbox } from "antd";

interface ITodoItem {
  id: number;
  description: string;
  completed: boolean;
  update: (id: number, params: any) => void;
}

class TodoItem extends React.Component<ITodoItem, any> {
  constructor(props: any) {
    super(props);
  }
  update = (params: any) => {
    this.props.update(this.props.id, params);
  };
  render() {
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox
          checked={this.props.completed}
          onChange={(e: any) => this.update({ completed: e.target.checked })}
        >
          Checkbox
        </Checkbox>
        <span>{this.props.description}</span>
      </div>
    );
  }
}

export default TodoItem;
