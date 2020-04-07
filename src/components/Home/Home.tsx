import * as React from "react";
import { connect } from "react-redux";
import { initTodos } from "../../redux/actions/todos";
import { initTomatoes } from "../../redux/actions/tomatoes";
import { Button, Dropdown, Icon, Menu } from "antd";
import axios from "../../config/axios";
import history from "../../config/history";
import "./Home.scss";
import Todos from "../Todos/Todos";
import Tomatoes from "../Tomatoes/Tomatoes";
import Statistics from "../Statistics/Statistics";

interface IIndexProps {
  initTodos: any;
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
      {/* <Icon type="user"></Icon> 个人设置 */}
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="logout" onClick={loginOut}></Icon> 注销
    </Menu.Item>
  </Menu>
);

class Home extends React.Component<any, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  getTodos = async () => {
    try {
      const response = await axios.get("todos");
      const todos = response.data.resources.map((t: any) =>
        Object.assign({}, t, { editing: false })
      );
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };
  getTomatoes = async () => {
    try {
      const response = await axios.get("tomatoes");
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };
  getMe = async () => {
    const response = await axios.get("me");
    this.setState({ user: response.data });
  };
  async componentDidMount() {
    await this.getMe();
    await this.getTodos();
    await this.getTomatoes();
  }


  render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">
            <img src="/images/tomato.svg" alt=""/>
            <h1>番茄Todo</h1>
          </span>
          <Dropdown overlay={menu}>
            <Button>
              <span>你好，{this.state.user && this.state.user.account}</span>
              <Icon type="down"></Icon>
            </Button>
          </Dropdown>
        </header>
        <main>
          <Tomatoes></Tomatoes>
          <Todos></Todos>
        </main>
        <Statistics></Statistics>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  initTodos,
  initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
