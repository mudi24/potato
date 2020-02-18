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

function SignUp() {
  const [state, setState] = React.useState({
    account: "",
    password: "",
    passwordConformation: ""
  });
  const onChangeAccount = (e: any) => {
    setState({ ...state, account: e.target.value });
  };
  const onChangePasswordConfirmation = (e: any) => {
    setState({ ...state, passwordConformation: e.target.value });
  };
  const onChangePassword = (e: any) => {
    setState({ ...state, password: e.target.value });
  };
  const submit = async () => {
    const { account, password, passwordConformation } = state;

    try {
      await axios.post("sign_up/user", {
        account,
        password,
        password_confirmation: passwordConformation
      });
      console.log("成功");
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <div className="Component" id="SignUp">
      <h1>番茄闹钟</h1>
      <Input
        placeholder="请输入你的用户名"
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        allowClear
        value={state.account}
        onChange={onChangeAccount}
      />
      <Input.Password
        value={state.password}
        placeholder="请输入密码"
        onChange={onChangePassword}
      />
      <Input.Password
        placeholder="请确认密码"
        value={state.passwordConformation}
        onChange={onChangePasswordConfirmation}
      />
      <Button className="loginButton" type="primary" onClick={submit}>
        注册
      </Button>
      <p>
        如果你有账号，请 <Link to="/login">登录</Link>
      </p>
    </div>
  );
}

export default SignUp;
