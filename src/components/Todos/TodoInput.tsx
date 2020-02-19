import React from "react";
import { Input, Icon } from "antd";

interface ITodoInput {
  description: string;
}

interface ITodoInputProps {
  addTodo: (params: any) => void;
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInput> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ""
    };
  }
  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== "") {
      this.addTodo();
    }
  };
  addTodo = () => {
    this.props.addTodo({ description: this.state.description });
    this.setState({ description: "" });
  };
  public render() {
    const { description } = this.state;
    const suffix = description ? <Icon type="enter"></Icon> : <span></span>;
    return (
      <div className="TodoInput" id="TodoInput">
        <Input
          placeholder="添加新任务"
          allowClear
          value={description}
          suffix={suffix}
          onChange={e => this.setState({ description: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
      </div>
    );
  }
}

export default TodoInput;
