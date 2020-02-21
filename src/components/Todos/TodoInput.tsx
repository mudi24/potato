import React from "react";
import { connect } from "react-redux";
import { Input, Icon } from "antd";
import axios from "../../config/axios";
import { addTodo } from "../../redux/actions";

interface ITodoInput {
  description: string;
}

interface ITodoInputProps {
  addTodo: (payload: any) => any;
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInput> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ""
    };
    console.log(this.props);
  }
  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== "") {
      this.postTodo();
    }
  };
  postTodo = async () => {
    try {
      const response = await axios.post("todos", {
        description: this.state.description
      });
      this.props.addTodo(response.data.resource);
    } catch (error) {
      throw new Error(error);
    }
    this.setState({ description: "" });
  };
  public render() {
    const { description } = this.state;
    const suffix = description ? (
      <Icon type="enter" onClick={this.postTodo}></Icon>
    ) : (
      <span></span>
    );
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

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  addTodo
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
