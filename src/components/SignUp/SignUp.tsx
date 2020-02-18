import React from "react";
import { Input, Icon, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import "./SignUp.scss";

interface ISignUpState {
  account: string;
  password: string;
  passwordConformation: string;
}

function SignUp(props: any) {
  const [state, setState] = React.useState({
    account: "",
    password: "",
    passwordConformation: ""
  });
  const onChange = (key: keyof ISignUpState, value: string) => {
    setState({ ...state, [key]: value });
  };
  const submit = async () => {
    const { account, password, passwordConformation } = state;

    try {
      await axios.post("sign_up/user", {
        account,
        password,
        password_confirmation: passwordConformation
      });
      props.history.push("/");
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <div className="Component" id="SignUp">
      <h1>番茄闹钟注册</h1>
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
      <Input.Password
        placeholder="请确认密码"
        value={state.passwordConformation}
        onChange={e => onChange("passwordConformation", e.target.value)}
      />
      <Button className="loginButton" type="primary" onClick={submit}>
        注册
      </Button>
      <p>
        如果你有账号，请立即 <Link to="/login">登录</Link>
      </p>
    </div>
  );
}

export default SignUp;
