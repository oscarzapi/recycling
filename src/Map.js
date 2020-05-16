import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import _ from "lodash";
import "leaflet/dist/leaflet.css";

const MapIcon = L.icon({
  iconUrl: require("../src/Images/trash.png"),
  iconSize: [32, 32],
});

class RecyclingMap extends Component {
  constructor(props) {
    super(props);
  }

  onMoved = () => {
    const leafletMap = this.leafletMap.leafletElement;
    const LatSW = leafletMap.getBounds()._southWest.lat,
      LngSW = leafletMap.getBounds()._southWest.lng,
      LatNE = leafletMap.getBounds()._northEast.lat,
      LngNE = leafletMap.getBounds()._northEast.lng;

    let FilteredDataAux = this.props.RecyclingData.filter(
      (row) =>
        row.latitude >= LatSW &&
        row.latitude <= LatNE &&
        row.longitude >= LngSW &&
        row.longitude <= LngNE
    );
    const Callback = this.props.CallbackFilteredData;
    Callback(FilteredDataAux);
  };

  render() {
    const createClusterCustomIcon = function (cluster) {
      return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: "marker-cluster-custom",
        iconSize: L.point(40, 40, true),
      });
    };

    // let GeneralWaste = this.state.RecyclingData.filter(row => )

    const items = this.props.RecyclingData.map((plot, index) => {
      // console.log(plot);

      return (
        <Marker
          key={index}
          position={[parseFloat(plot.latitude), parseFloat(plot.longitude)]}
          icon={MapIcon}
        >
          <Popup key={index} position={[plot.latitude, plot.longitude]}>
            <p>{"Can: " + plot.Container}</p>
            <p>{"General Waste: " + plot.GeneralWaste + " kg"}</p>
            <p>{"Paper: " + plot.PaperRelated + " kg"}</p>
            <p>{"Plastics: " + plot.Plastics + " kg"}</p>
            <p>{"Total Waste: " + plot.TotalWaste + " kg"}</p>
          </Popup>
        </Marker>
      );
    });
    return (
      <React.Fragment>
        <Map
          center={[24.4514, 54.484679]}
          zoom={12}
          maxZoom={18}
          style={{ width: "100%", maxHeight: "90%" }}
          ref={(m) => {
            this.leafletMap = m;
          }}
          //   onZoomend={this.onMoved}
          onMove={this.onMoved}
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            showCoverageOnHover={false}
            spiderfyDistanceMultiplier={2}
            iconCreateFunction={createClusterCustomIcon}
          >
            {items}
          </MarkerClusterGroup>
        </Map>
      </React.Fragment>
    );
  }
}

export { RecyclingMap };
