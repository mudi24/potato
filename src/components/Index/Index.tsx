import * as React from "react";
import { Button } from "antd";
import axios from "../../config/axios";

interface IRouter {
  history: any;
}

interface IIndexState {
  user: any;
}

class Index extends React.Component<IRouter, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }
  login = () => {
    this.props.history.push("login");
  };

  getMe = async () => {
    try {
      const response = await axios.get("me");
      this.setState({ user: response.data });
    } catch (e) {
      if (e.response.status === 401) {
        this.props.history.push("/login");
      }
    }
  };
  async componentDidMount() {
    await this.getMe();
  }
  loginOut = () => {
    localStorage.setItem("x-token", "");
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="Index">
        <p>欢迎，{this.state.user && this.state.user.account}</p>
        <Button onClick={this.loginOut}>注销</Button>
      </div>
    );
  }
}

export default Index;
