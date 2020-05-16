import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import briefcase from "../src/Images/briefcase.png";
import Person from "../src/Images/Person.png";
import "./App.css";
import { MainArea } from "../src/MainArea";
class OverviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GeneralViewClicked: "Landing page",
    };
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            backgroundColor: "#5C85FF",
          }}
        >
          <Row>
            <Col
              xs="1"
              md="1"
              style={{ backgroundColor: "#FFC346", maxWidth: "100px" }}
            >
              <Row>
                <Col>
                  <div
                    className="BriefcaseButton"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "6px",
                      backgroundColor:
                        this.state.GeneralViewClicked === "Landing page"
                          ? "#B3841E"
                          : "#FFC346",
                      marginLeft: "10px",
                      marginTop: "20px",
                    }}
                    onClick={() => {
                      this.setState({
                        GeneralViewClicked: "Landing page",
                      });
                    }}
                  >
                    <img
                      src={briefcase}
                      alt="IMG"
                      style={{
                        maxWidth: "18px",
                        marginLeft: "15px",
                        marginTop: "15px",
                      }}
                    ></img>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div
                    className="BriefcaseButton"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "6px",
                      backgroundColor:
                        this.state.GeneralViewClicked === "Landing page"
                          ? "#FFC346"
                          : "#B3841E",
                      marginLeft: "10px",
                      marginTop: "20px",
                    }}
                    onClick={() => {
                      this.setState({
                        GeneralViewClicked: "Custom page",
                      });
                    }}
                  >
                    <img
                      src={Person}
                      alt="IMG"
                      style={{
                        maxWidth: "18px",
                        marginLeft: "15px",
                        marginTop: "15px",
                      }}
                    ></img>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <MainArea
                GeneralViewClicked={this.state.GeneralViewClicked}
              ></MainArea>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export { OverviewPage };
