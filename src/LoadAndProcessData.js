import { csv, timeFormat } from "d3";
import coordinates from "../src/coordinates.csv";

const FormatTime = timeFormat("%B %d, %Y");

const getCoordinates = () => {
  return csv(coordinates).then((data) => {
    return data;
  });
};

export const LoadAndProcessData = async () => {
  let RecyclingData = [];
  let TotalGeneralWaste = 0;
  let TotalPaperRelated = 0;
  let TotalPlastics = 0;
  let TotalGlass = 0;
  let TotalWaste = 0;
  let coordiantesCSV = await getCoordinates();

  var getDaysArray = function (start, end) {
    for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 3)) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  var daylist = getDaysArray(new Date("2018-05-01"), new Date("2018-09-01"));
  daylist.map((v) => v.toISOString().slice(0, 10)).join("");

  for (var i = 0; i < 371; i++) {
    for (var j = 0; j < daylist.length; j++) {
      let Container = "Container_" + Math.floor(Math.random() * 2000);
      let Area = "Area_" + Math.floor(Math.random() * 30);
      let Neighbourhood = "Neighbourhood_" + Math.floor(Math.random() * 200);
      let TimeToGoNextContainer = Math.floor(Math.random() * 200);
      let date = daylist[j];
      let FamilySize = Math.floor(Math.random() * 4) + 1;
      let GeneralWaste = Math.floor(Math.random() * 4) + 1;
      let PaperRelated = Math.floor(Math.random() * 2) + 1;
      let Plastics = Math.floor(Math.random() * 4) + 1;
      let Glass = Math.floor(Math.random() * 2) + 1;
      let Waste = GeneralWaste + PaperRelated + Plastics + Glass;
      let latitude = coordiantesCSV[i].latitude;
      let longitude = coordiantesCSV[i].longitude;
      RecyclingData.push({
        Container: Container,
        Area: Area,
        Neighbourhood: Neighbourhood,
        TimeToGoNextContainer: TimeToGoNextContainer,
        date: FormatTime(date),
        FamilySize: FamilySize,
        latitude: latitude,
        longitude: longitude,
        GeneralWaste: GeneralWaste,
        PaperRelated: PaperRelated,
        Plastics: Plastics,
        Glass: Glass,
        TotalWaste: Waste,
      });

      TotalGeneralWaste = TotalGeneralWaste + GeneralWaste;
      TotalPaperRelated = TotalPaperRelated + PaperRelated;
      TotalPlastics = TotalPlastics + Plastics;
      TotalGlass = TotalGlass + Glass;
      TotalWaste =
        TotalGeneralWaste + TotalPaperRelated + TotalPlastics + TotalGlass;
    }
  }

  return {
    RecyclingData,
    TotalWaste,
    TotalGeneralWaste,
    TotalPaperRelated,
    TotalPlastics,
    TotalGlass,
  };
};
