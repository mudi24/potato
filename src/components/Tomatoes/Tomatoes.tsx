import React from "react";
import "./Tomatoes.scss";
import { connect } from "react-redux";
import TomatoAction from "./TomatoAction";
import {
  addTomato,
  initTomatoes,
  updateTomato
} from "../../redux/actions/tomatoes";
import axios from "../../config/axios";

interface ITomatoesProps {}

class Tomatoes extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.getTomatoes();
  }
  get unfinishedTomato() {
    return this.props.tomatoes.filter(
      (t: any) => !t.description && !t.ender_at
    )[0];
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get("tomatoes");
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post("tomatoes", {
        duration: 1500000
      });
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };
  public render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction
          startTomato={this.startTomato}
          unfinishedTomato={this.unfinishedTomato}
          updateTomato={this.props.updateTomato}
        ></TomatoAction>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
  addTomato,
  initTomatoes,
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);