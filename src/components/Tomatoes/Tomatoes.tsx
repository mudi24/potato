import React from "react";
import "./Tomatoes.scss";
import { connect } from "react-redux";
import TomatoAction from "./TomatoAction";

class Tomatoes extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction></TomatoAction>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);
