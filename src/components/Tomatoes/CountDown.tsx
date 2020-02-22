import React from "react";

interface ICountDownProps {
  timer: number;
}
interface ICountDownState {
  countDown: number;
}

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }
  componentDidMount() {
    setInterval(() => {
      let time = this.state.countDown;
      this.setState({ countDown: time - 1000 });
      if (time < 0) {
      }
    }, 1000);
  }
  public render() {
    const min = Math.floor(this.props.timer / 1000 / 60);
    const second = Math.floor((this.props.timer / 1000) % 60);
    const time = `${min}:${second < 10 ? `0${second}` : second}`;
    return <div className="CountDown">{time}</div>;
  }
}

export default CountDown;
