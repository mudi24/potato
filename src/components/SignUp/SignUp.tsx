import React from "react";
import { Input, Icon, Button } from "antd";
import axios from "../../config/axios";

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
    <div className="Component">
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
      <Button onClick={submit}>注册</Button>
    </div>
  );
}

export default SignUp;
