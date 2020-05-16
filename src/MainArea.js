import React, { Component } from "react";
import { LandingPage, LineChart } from "../src/LandingPage";
import { LoadAndProcessData } from "../src/LoadAndProcessData";
import { RecyclingMap } from "../src/Map";
import { RoseAndList } from "../src/RoseAndList";
import { BubbleChart } from "../src/BubbleChart";
import { Container, Col, Row } from "reactstrap";
import { CustomViewTable } from "../src/CustomView";
import "./App.css";

class MainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RecyclingData: [],
      FilteredData: [],
      TotalWaste: 0,
      GeneralWaste: 0,
      PaperRelated: 0,
      Plastic: 0,
      Glass: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const {
      RecyclingData,
      TotalWaste,
      TotalGeneralWaste,
      TotalPaperRelated,
      TotalPlastics,
      TotalGlass,
    } = await LoadAndProcessData();
    this.setState({
      RecyclingData,
      FilteredData: RecyclingData,
      TotalWaste: TotalWaste / 1000,
      GeneralWaste: TotalGeneralWaste / 1000,
      PaperRelated: TotalPaperRelated / 1000,
      Plastic: TotalPlastics / 1000,
      Glass: TotalGlass / 1000,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontFamily: "Comic Neue",
            fontSize: "40px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <Row>
            <Col>
              <p>{this.props.GeneralViewClicked}</p>
            </Col>
          </Row>
          {this.props.GeneralViewClicked === "Landing page" ? (
            <Row>
              <Col xs="4" md="4">
                <Row style={{ marginTop: "20px" }}>
                  <Col>
                    <RecyclingMap
                      RecyclingData={this.state.RecyclingData}
                      FilteredData={this.state.FilteredData}
                      CallbackFilteredData={(FilteredData) => {
                        this.setState({
                          FilteredData,
                        });
                      }}
                    ></RecyclingMap>
                  </Col>
                </Row>
                <BubbleChart
                  FilteredData={this.state.FilteredData}
                ></BubbleChart>
              </Col>
              <Col xs="8" md="8">
                <div>
                  <LandingPage
                    RecyclingData={this.state.RecyclingData}
                    FilteredData={this.state.FilteredData}
                  ></LandingPage>
                  <RoseAndList
                    FilteredData={this.state.FilteredData}
                  ></RoseAndList>
                  <LineChart FilteredData={this.state.FilteredData}></LineChart>
                </div>
              </Col>
            </Row>
          ) : (
            <CustomViewTable
              RecyclingData={this.state.RecyclingData}
            ></CustomViewTable>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export { MainArea };
