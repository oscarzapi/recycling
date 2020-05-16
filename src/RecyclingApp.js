import React from "react";
import { Component } from "react";
import { OverviewPage } from "./OverviewPage";

class RecyclingApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <OverviewPage></OverviewPage>
      </React.Fragment>
    );
  }
}

export { RecyclingApp };
