import React from "react";
import { Button, Input, Icon } from "antd";
import axios from "../../config/axios";
import CountDown from "./CountDown";

interface ITomatoActionProps {
  startTomato: () => void;
  updateTomato: (payload: any) => void;
  unfinishedTomato: any;
}

interface ITomatoActionState {
  description: string;
}

class TomatoAction extends React.Component<
  ITomatoActionProps,
  ITomatoActionState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ""
    };
    console.log(this.props.unfinishedTomato);
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== "") {
      this.addDescription();
    }
  };

  onFinish = () => {
    this.render();
  };
  addDescription = async () => {
    try {
      const response = await axios.put(
        `tomatoes/${this.props.unfinishedTomato.id}`,
        { description: this.state.description, ended_at: new Date() }
      );
      this.props.updateTomato(response.data.resource);
      this.setState({ description: "" });
      console.log(response);
    } catch (e) {
      throw new Error(e);
    }
  };
  createHtml = () => {
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
          <div>
            <Input
              value={this.state.description}
              placeholder="请输入你刚刚完成的任务"
              onChange={e => this.setState({ description: e.target.value })}
              onKeyUp={e => this.onKeyUp(e)}
            ></Input>
            <Icon type="close-circle" />
          </div>
        );
      } else if (timeNow - startedAt < duration) {
        const timer = duration - timeNow + startedAt;
        html = <CountDown timer={timer} onFinish={this.onFinish} />; //倒计时
      }
    }
    return html;
  };
  public render() {
    return (
      <div className="TomatoAction" id="TomatoAction">
        {this.createHtml()}
      </div>
    );
  }
}

export default TomatoAction;
