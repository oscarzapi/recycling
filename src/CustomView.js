import React from "react";
import { Container, Row, Col } from "reactstrap";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CountUp from "react-countup";
import ContainerPic from "../src/Images/trash.png";

const tableNameCellStyles = (index) => {
  return {
    fontSize: "20px",
    fontFamily: "Comic Neue",
    borderColor: "white",
    color: "white",
    cursor: "pointer",
  };
};

const tableFeatureCellStyles = (index) => {
  return {
    fontSize: "18px",
    fontFamily: "Comic Neue",
    borderColor: "white",
    color: "white",
    cursor: "pointer",
  };
};

export const CustomViewTable = (props) => {
  const { RecyclingData } = props;

  var RecyclingDataAux = RecyclingData.sort(
    (a, b) => b.TotalWaste - a.TotalWaste
  ).slice(0, 1000);

  return (
    <React.Fragment>
      <Row>
        <Col xs="4" md="4">
          <div>
            <Row>
              <Col xs="3" md="3"></Col>
              <Col
                xs="2"
                md="2"
                style={{ marginRight: "5px", minWidth: "80px" }}
              >
                <p className="NumberCandidatesFound">
                  <CountUp
                    end={RecyclingDataAux.length}
                    duration={12}
                  ></CountUp>
                </p>
              </Col>
              <Col>
                <p className="TextCandidatesFound"> candidates found</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <TableContainer style={{ maxHeight: "750px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "",
                  "Container",
                  "Area",
                  "GeneralWaste (kg)",
                  "PaperRelated (kg)",
                  "Plastics (kg)",
                  "Glass (kg)",
                  "TotalWaste (kg)",
                ].map((title, index) => {
                  return (
                    <TableCell
                      align="center"
                      key={index}
                      style={{
                        fontSize: "20px",
                        fontFamily: "Comic Neue",
                        color: "black",
                        zIndex: 1,
                      }}
                    >
                      {title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {RecyclingDataAux && RecyclingDataAux.length > 0
                ? RecyclingDataAux.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableNameCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          <p
                            style={{
                              fontFamily: "Comic Neue",
                              fontSize: "20px",
                              color: "white",
                              height: "40px",
                              lineHeight: "40px",
                              marginTop: "15px",
                            }}
                          >
                            {index + 1}
                          </p>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableNameCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          <Row>
                            <Col xs="2" md="2">
                              <img
                                src={ContainerPic}
                                alt="IMG"
                                style={{ width: "50px" }}
                              ></img>
                            </Col>
                            <Col>
                              <p
                                style={{
                                  fontFamily: "Comic Neue",
                                  fontSize: "20px",
                                  color: "white",
                                  textAlign: "left",
                                  height: "40px",
                                  lineHeight: "40px",
                                  marginBottom: "0px",
                                  marginTop: "20px",
                                  marginLeft: "20px",
                                }}
                              >
                                {row.Container}
                              </p>
                            </Col>
                          </Row>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableFeatureCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          {row.Area}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableFeatureCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          {row.GeneralWaste}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableFeatureCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          {row.PaperRelated}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableFeatureCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          {row.Plastics}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableFeatureCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          {row.Glass}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          size="small"
                          style={tableFeatureCellStyles(index)}
                          // onClick={() => handleClick(row.MilitaryNo)}
                          //   onMouseOver={() => handleHover(row.MilitaryNo)}
                        >
                          {row.TotalWaste}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </Row>
    </React.Fragment>
  );
};
