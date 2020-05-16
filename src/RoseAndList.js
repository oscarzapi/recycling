import React, { Component } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { nest, sum } from "d3";
import HighchartsSunburst from "highcharts/modules/sunburst";
import HcMore from "highcharts/highcharts-more";
import { Row, Col } from "reactstrap";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";

HighchartsSunburst(Highcharts);
HcMore(Highcharts);

const tableCellStyles = (option, index) => {
  return {
    fontFamily: "Lato",
    fontSize: "15px",
    color: "#000000",
    fontWeight: "bold",
    height: "25px",
    lineHeight: "25px",
    marginBottom: "0px",
    width: "100%",
    borderBottom: "solid",
    borderWidth: "1px",
    borderColor: "#c2ccd8",
    textAlign: "left",
    backgroundColor: index % 2 !== 0 ? "#F9F6F6" : "white",
  };
};

class RoseAndList extends Component {
  constructor(props) {
    super(props);
  }

  ProcessWindRoseData = (column) => {
    let FilteredDataAux = this.props.FilteredData;

    var ChartData = nest()
      .key((d) => d["Area"])
      .rollup(function (v) {
        return sum(v, function (d) {
          var value = parseFloat(d[column]) / 1000;
          return value;
        });
      })
      .entries(this.props.FilteredData)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    return ChartData;
  };

  //   ChartDataToListFunction = categoryClicked => {
  //     var ChartDataAux = this.props.ListData.filter(
  //       column => column["MilitaryNo"] === this.props.StudentClicked
  //     );

  //     var ChartDataOrganizedKeyValue = [];

  //     Object.keys(ChartDataAux[0]).forEach(key => {
  //       ChartDataOrganizedKeyValue.push({
  //         name: key,
  //         value: ChartDataAux[0][key]
  //       });
  //     });
  //     var ChartDataToListAux = [];

  //     var ChartDataToList = [];

  //     ChartDataToListAux.forEach(category => {
  //       if (category.name !== "") {
  //         ChartDataToList.push({
  //           name: category.name,
  //           value: category.value
  //         });
  //       }
  //     });

  //     this.setState({
  //       ChartDataToList
  //     });
  //   };

  WindRoseChartOptions = (ChartData) => {
    return {
      series: [
        {
          data: ChartData.map((option) => parseFloat(option.value.toFixed(2))),
          colorByPoint: true,
          cursor: "pointer",
        },
      ],
      legend: {
        enabled: false,
      },
      title: {
        text: undefined,
      },

      chart: {
        polar: true,
        type: "column",
        backgroundColor: "rgba(0,0,0,0)",
        marginTop: 0,
        spacingTop: 0,
      },

      pane: {
        size: "70%",
      },

      xAxis: {
        type: "category",
        categories: ChartData.map((option) => option.key),
        labels: {
          style: {
            color: "white", //"#444",
          },
        },
      },

      yAxis: {
        min: 0,
        // max: 100,
        endOnTick: false,
        // showLastLabel: true,
        reversedStacks: false,
        labels: {
          style: {
            color: "none",
          },
        },
      },

      tooltip: {
        formatter: function () {
          return "<b>" + this.x + "</b> : <b>" + this.y + "</b>" + " t";
        },
      },

      plotOptions: {
        series: {
          stacking: "normal",
          shadow: false,
          groupPadding: 0,
          pointPlacement: "on",
          point: {
            // events: {
            //   click: e => {
            //     this.ChartDataToListFunction(e.point.category);
            //   }
            // }
          },
        },
      },
    };
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              // constructorType={"chart"}
              options={this.WindRoseChartOptions(
                this.ProcessWindRoseData("GeneralWaste")
              )}
            />
          </Col>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              // constructorType={"chart"}
              options={this.WindRoseChartOptions(
                this.ProcessWindRoseData("Plastics")
              )}
            />
          </Col>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              // constructorType={"chart"}
              options={this.WindRoseChartOptions(
                this.ProcessWindRoseData("PaperRelated")
              )}
            />
          </Col>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              // constructorType={"chart"}
              options={this.WindRoseChartOptions(
                this.ProcessWindRoseData("Glass")
              )}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export { RoseAndList };
