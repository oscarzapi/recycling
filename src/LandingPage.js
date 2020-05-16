import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { LoadAndProcessData } from "../src/LoadAndProcessData";
import LiquidFillGauge from "react-liquid-gauge";
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import { nest, sum } from "d3";

class LandingPage extends Component {
  startColor = "#FF5D17";
  endColor = "#08B39C";
  constructor(props) {
    super(props);
  }

  LiquidGaugeData = (column) => {
    let totalDataAux = this.props.RecyclingData;
    let dataAux = this.props.FilteredData;
    let TotalValue = 0;
    let value = 0;

    let TotalNestedData = nest()
      .key((d) => d.date)
      .rollup(function (v) {
        return sum(v, function (d) {
          var value = parseFloat(d[column]) / 1000;
          //   console.log(value);
          return value;
        });
      })
      .entries(totalDataAux);

    TotalNestedData.forEach((row) => {
      TotalValue = TotalValue + row["value"];
    });

    let NestedData = nest()
      .key((d) => d.date)
      .rollup(function (v) {
        return sum(v, function (d) {
          var value = parseFloat(d[column]) / 1000;
          //   console.log(value);
          return value;
        });
      })
      .entries(dataAux);

    NestedData.forEach((row) => {
      value = value + row["value"];
    });
    return { TotalValue, value };
  };

  LiquidGaugeOptions = (text, values) => {
    const { TotalValue, value } = values;
    const valueAux = (value / TotalValue) * 100;
    const radius = 70;
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(valueAux / 100);
    const gradientStops = [
      {
        key: "0%",
        stopColor: color(fillColor).darker(0.5).toString(),
        stopOpacity: 1,
        offset: "0%",
      },
      {
        key: "50%",
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: "50%",
      },
      {
        key: "100%",
        stopColor: color(fillColor).brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: "100%",
      },
    ];
    return (
      <div>
        <Row>
          <Col style={{ fontSize: "30px", marginBottom: "10px" }}>{text}</Col>
        </Row>
        <Row>
          <Col>
            <LiquidFillGauge
              style={{ margin: "0 auto" }}
              width={radius * 2}
              height={radius * 2}
              TotalValue={TotalValue}
              value={valueAux}
              ton="t"
              percentage=" %"
              textSize={1}
              textOffsetX={0}
              textOffsetY={0}
              textRenderer={(props) => {
                const value = props.value.toFixed(2);
                const radius = Math.min(props.height / 2, props.width / 2);
                const textPixels = (props.textSize * radius) / 2.5;
                const valueStyle = {
                  fontSize: textPixels,
                  fontFamily: "Comic Neue",
                };
                const percentStyle = {
                  fontSize: textPixels * 0.6,
                  fontFamily: "Comic Neue",
                };
                return (
                  <tspan>
                    <tspan className="value" style={valueStyle}>
                      {value.toString()}
                    </tspan>
                    <tspan style={percentStyle}>
                      {props.percentage.toString()}
                    </tspan>
                    <tspan style={percentStyle} dy="1.3em" x="1">
                      {((value / 100) * TotalValue).toFixed(2) + " t"}
                    </tspan>
                  </tspan>
                );
              }}
              riseAnimation={true}
              waveAnimation
              waveFrequency={2}
              waveAmplitude={1}
              gradient
              gradientStops={gradientStops}
              circleStyle={{
                fill: fillColor,
              }}
              waveStyle={{
                fill: fillColor,
              }}
              textStyle={{
                fill: color("#444").toString(),
                fontFamily: "Arial",
              }}
              waveTextStyle={{
                fill: color("#fff").toString(),
                fontFamily: "Arial",
              }}
              // onClick={() => {
              //   this.setState({ value: Math.random() * 100 });
              // }}
            />
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Row>
              <Col>
                {this.LiquidGaugeOptions(
                  "General Waste",
                  this.LiquidGaugeData("GeneralWaste")
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                {this.LiquidGaugeOptions(
                  "Plastics",
                  this.LiquidGaugeData("Plastics")
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                {this.LiquidGaugeOptions(
                  "Paper Related",
                  this.LiquidGaugeData("PaperRelated")
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                {this.LiquidGaugeOptions(
                  "Glass",
                  this.LiquidGaugeData("Glass")
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  LineChartOptions = (
    GeneralWasteData,
    PlasticsData,
    PaperRelatedData,
    GlassData
  ) => {
    return {
      title: {
        text: undefined,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxHeight: 300,
            },
          },
        ],
      },
      chart: {
        zoomType: "x",
        backgroundColor: "rgba(0,0,0,0)",
      },
      xAxis: {
        type: "category",
        tickAmount: 5,
        tickInterval: 2,
        labels: {
          style: {
            color: "rgb(68, 68, 68)",
            fontSize: 9,
          },
        },
        lineColor: "rgba(0,0,0, 0)",
      },
      yAxis: {
        title: {
          text: "t",
        },
        gridLineColor: "rgba(255,255,255,0.1)",
        labels: {
          // formatter: function () {
          //   // var maxValue = Math.max(this.value);
          //   var value = this.value;
          //   return value < 0.09 ? value * 1000 : value;
          // },
          style: {
            color: "rgb(68, 68, 68)",
          },
        },
        plotLines: [
          {
            color: "rgba(153,153,153,0.2)",
          },
        ],
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        valueDecimals: 3,
        valueSuffix: " t",
      },

      series: [
        {
          name: "General Waste",
          data: GeneralWasteData,
        },
        {
          name: "Plastics",
          data: PlasticsData,
        },
        {
          name: "Paper Related",
          data: PaperRelatedData,
        },
        {
          name: "Glass",
          data: GlassData,
        },
      ],
    };
  };

  LineChartData = (column) => {
    let dataAux = this.props.FilteredData;
    let dataContainer = [];

    let NestedData = nest()
      .key((d) => d.date)
      .rollup(function (v) {
        return sum(v, function (d) {
          var value = parseFloat(d[column]) / 1000;
          //   console.log(value);
          return value;
        });
      })
      .entries(dataAux);

    NestedData.forEach((row) => {
      dataContainer.push([row.key, row["value"]]);
    });

    return dataContainer;
  };

  render() {
    return (
      <React.Fragment>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              options={this.LineChartOptions(
                this.LineChartData("GeneralWaste"),
                this.LineChartData("Plastics"),
                this.LineChartData("PaperRelated"),
                this.LineChartData("Glass")
              )}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export { LandingPage, LineChart };
