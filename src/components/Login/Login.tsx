import React from "react";
import { Input, Icon, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import "./Login.scss";

interface ILoginState {
  account: string;
  password: string;
}

function Login(props: any) {
  const [state, setState] = React.useState({
    account: "",
    password: ""
  });
  const onChange = (key: keyof ILoginState, value: string) => {
    setState({ ...state, [key]: value });
  };

  const submit = async () => {
    const { account, password } = state;

    try {
      await axios.post("sign_in/user", {
        account,
        password
      });
      props.history.push("/");
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <div className="Login" id="Login">
      <h1>番茄闹钟登录</h1>
      <Input
        placeholder="请输入你的用户名"
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        allowClear
        value={state.account}
        onChange={e => onChange("account", e.target.value)}
      />
      <Input.Password
        value={state.password}
        placeholder="请输入密码"
        onChange={e => onChange("password", e.target.value)}
      />
      <Button className="loginButton" type="primary" onClick={submit}>
        登录
      </Button>
      <p>
        如果你没有账号，请立即 <Link to="/signUp">注册</Link>
      </p>
    </div>
  );
}

export default Login;
