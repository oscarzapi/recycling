import React, { Component } from "react";
import { MainArea } from "./MainArea";

class LoaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 10000);
  }

  render() {
    let data;
    if (this.state.loading) {
      data = (
        <img
          src={require("../src/Images/Saal_Logo.gif")}
          style={{ zIndex: 1, width: "10%" }}
        />
      );
    } else {
      data = (
        <MainArea
          GeneralViewClicked={this.props.GeneralViewClicked}
          callbackLoading={(state) => {
            this.setState({ loading: state });
          }}
        ></MainArea>
      );
    }
    return <div>{data}</div>;
  }
}

export { LoaderComponent };
