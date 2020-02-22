import React from "react";
import { Button, Input } from "antd";
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
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== "") {
      this.addDescription();
    }
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
  public render() {
    let html = <div />;

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
      const timer = duration - timeNow + startedAt;

      if (timeNow - startedAt > duration) {
        html = (
          <Input
            value={this.state.description}
            placeholder="请输入你刚刚完成的任务"
            onChange={e => this.setState({ description: e.target.value })}
            onKeyUp={e => this.onKeyUp(e)}
          ></Input>
        );
      } else if (timeNow - startedAt < duration) {
        html = <CountDown timer={timer} />; //倒计时
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
