import React, { Component } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { nest, sum, mean } from "d3";
import { Row, Col } from "reactstrap";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
  }

  ProcessBubbleData = () => {
    let FilteredDataAux = this.props.FilteredData;
    var GeneralWasteData = [];
    var PlasticData = [];
    var PaperRelatedData = [];
    var GlassData = [];

    var GeneralWasteDataNested = nest()
      .key((d) => d["Area"])
      .rollup(function (v) {
        return {
          total: sum(v, function (d) {
            return d["GeneralWaste"];
          }),
          avg: mean(v, function (d) {
            return d["TimeToGoNextContainer"];
          }),
        };
      })
      .entries(FilteredDataAux);

    GeneralWasteDataNested.forEach((row) =>
      GeneralWasteData.push({
        x: row.value.avg,
        y: row.value.total,
        name: row.key,
      })
    );
    var PlasticsDataNested = nest()
      .key((d) => d["Area"])
      .rollup(function (v) {
        return {
          total: sum(v, function (d) {
            return d["Plastics"];
          }),
          avg: mean(v, function (d) {
            return d["TimeToGoNextContainer"];
          }),
        };
      })
      .entries(FilteredDataAux);

    PlasticsDataNested.forEach((row) =>
      PlasticData.push({
        x: row.value.avg,
        y: row.value.total,
        name: row.key,
      })
    );
    var PaperRelatedDataNested = nest()
      .key((d) => d["Area"])
      .rollup(function (v) {
        return {
          total: sum(v, function (d) {
            return d["PaperRelated"];
          }),
          avg: mean(v, function (d) {
            return d["TimeToGoNextContainer"];
          }),
        };
      })
      .entries(FilteredDataAux);

    PaperRelatedDataNested.forEach((row) =>
      PaperRelatedData.push({
        x: row.value.avg,
        y: row.value.total,
        name: row.key,
      })
    );
    var GlassDataNested = nest()
      .key((d) => d["Area"])
      .rollup(function (v) {
        return {
          total: sum(v, function (d) {
            return d["Glass"];
          }),
          avg: mean(v, function (d) {
            return d["TimeToGoNextContainer"];
          }),
        };
      })
      .entries(FilteredDataAux);

    GlassDataNested.forEach((row) =>
      GlassData.push({
        x: row.value.avg,
        y: row.value.total,
        name: row.key,
      })
    );

    return { GeneralWasteData, PlasticData, PaperRelatedData, GlassData };
  };

  BubbleChartOptions = (data) => {
    const { GeneralWasteData, PlasticData, PaperRelatedData, GlassData } = data;
    console.log(GeneralWasteData);
    return {
      chart: {
        type: "bubble",
        plotBorderWidth: 1,
        zoomType: "xy",
        backgroundColor: "rgba(0,0,0,0)",
      },

      title: {
        text: "Time and Tonnes of Waste per Area",
        style: {
          color: "white",
          fontFamily: "Comic Neue",
        },
      },

      accessibility: {
        point: {
          valueDescriptionFormat:
            "{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g.",
        },
      },
      minSize: 2,

      xAxis: {
        gridLineWidth: 1,
        title: {
          text: "Avg Time (s)",
        },
        gridLineColor: "rgba(255,255,255,0.1)",
        plotLines: [
          {
            color: "white",
            dashStyle: "dot",
            width: 2,
            value: 100,
            label: {
              rotation: 0,
              y: 15,
              style: {
                fontStyle: "italic",
              },
              text: "Safe time (s)",
            },
            zIndex: 3,
          },
        ],
        accessibility: {
          //   rangeDescription: "Range: 60 to 100 grams.",
        },
      },

      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
          text: "Waste in tonnes",
        },
        gridLineColor: "rgba(255,255,255,0.1)",
        maxPadding: 0.2,
        plotLines: [
          {
            color: "white",
            dashStyle: "dot",
            width: 2,
            value: 80,
            label: {
              align: "right",
              style: {
                fontStyle: "italic",
              },
              text: "Acceptable t",
              x: -10,
            },
            zIndex: 3,
          },
        ],
        accessibility: {
          //   rangeDescription: "Range: 0 to 160 grams.",
        },
      },

      tooltip: {
        useHTML: true,
        headerFormat: "<table>",
        pointFormat:
          '<tr><th colspan="2"><h6>{point.name}</h6></th></tr>' +
          "<tr><th>Waste:</th><td>{point.y} t</td></tr>" +
          "<tr><th>Time:</th><td>{point.x} s</td></tr>",
        footerFormat: "</table>",
        followPointer: true,
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.name}",
          },
        },
      },

      series: [
        {
          name: "General Waste",
          data: GeneralWasteData,
        },
        {
          name: "Plastics",
          data: PlasticData,
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

  render() {
    return (
      <React.Fragment>
        <div>
          <Row>
            <Col>
              <HighchartsReact
                highcharts={Highcharts}
                // constructorType={"chart"}
                options={this.BubbleChartOptions(this.ProcessBubbleData())}
              />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export { BubbleChart };
