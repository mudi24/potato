import React from "react";
import { Button, Input, Icon, Modal } from "antd";
import axios from "../../config/axios";
import CountDown from "./CountDown";
import "./TomatoAction.scss";

interface ITomatoActionProps {
  startTomato: () => void;
  updateTomato: (payload: any) => void;
  unfinishedTomato: any;
}

interface ITomatoActionState {
  description: string;
}
const { confirm } = Modal;
class TomatoAction extends React.Component<
  ITomatoActionProps,
  ITomatoActionState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ""
    };
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== "") {
      this.updateTomato({
        description: this.state.description,
        ended_at: new Date()
      });
      this.setState({ description: "" });
    }
  };

  onFinish = () => {
    this.forceUpdate();
  };

  abortTomato = () => {
    this.updateTomato({ aborted: true });
    document.title = `番茄APP`;
  };
  showConfirm = () => {
    confirm({
      title: "您目前正在一个番茄工作时间中，要放弃这个番茄吗？",
      onOk: () => {
        this.abortTomato();
      },
      onCancel: () => {
        console.log("取消");
      },
      okText: "确定",
      cancelText: "取消"
    });
  };

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(
        `tomatoes/${this.props.unfinishedTomato.id}`,
        params
      );
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };
  public render() {
    let html = <div />;
    console.log(this.props.unfinishedTomato);
    if (this.props.unfinishedTomato === undefined) {
      html = (
        <Button
          className="startTomatoButton"
          onClick={e => this.props.startTomato()}
        >
          开始番茄
        </Button>
      );
    } else {
      const startedAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startedAt > duration) {
        html = (
          <div className="inputWrapper">
            <Input
              value={this.state.description}
              placeholder="请输入你刚刚完成的任务"
              onChange={e => this.setState({ description: e.target.value })}
              onKeyUp={e => this.onKeyUp(e)}
            ></Input>
            <Icon
              type="close-circle"
              className="abort"
              onClick={this.showConfirm}
            />
          </div>
        );
      } else if (timeNow - startedAt < duration) {
        const timer = duration - timeNow + startedAt;
        html = (
          <div className="countDownWrapper">
            <CountDown
              timer={timer}
              onFinish={this.onFinish}
              duration={duration}
            />
            <Icon
              type="close-circle"
              className="abort"
              onClick={this.showConfirm}
            ></Icon>
          </div>
        );
      }
    }
    return (
      <div className="TomatoAction" id="TomatoAction">
        {html}
      </div>
    );
  }
}

export default TomatoAction;
