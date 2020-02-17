import React from "react";
import { Button } from "antd";

function Index(props: any) {
  const login = () => {
    props.history.push("login");
  };
  return (
    <div className="Component">
      Index
      <Button onClick={login}>登录</Button>
    </div>
  );
}

export default Index;
