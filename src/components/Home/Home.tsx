import * as React from "react";
import { Button, Dropdown, Icon, Menu } from "antd";
import axios from "../../config/axios";
import history from "../../config/history";
import "./Home.scss";
import Todos from "../Todos/Todos";
import Tomatoes from "../Tomatoes/Tomatoes";

interface IRouter {
  history: any;
}

interface IIndexState {
  user: any;
}

const loginOut = () => {
  localStorage.setItem("x-token", "");
  history.push("/login");
};
const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user"></Icon> 个人设置
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="logout" onClick={loginOut}></Icon> 注销
    </Menu.Item>
  </Menu>
);

class Home extends React.Component<IRouter, IIndexState> {
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
    const response = await axios.get("me");
    this.setState({ user: response.data });
  };
  async componentDidMount() {
    await this.getMe();
  }

  render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
            <Button>
              <span>{this.state.user && this.state.user.account}</span>
              <Icon type="down"></Icon>
            </Button>
          </Dropdown>
        </header>
        <main>
          <Tomatoes></Tomatoes>
          <Todos></Todos>
        </main>
      </div>
    );
  }
}

export default Home;
