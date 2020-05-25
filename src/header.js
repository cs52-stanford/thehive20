import React, { Component } from "react";

// This is one way to write CSS
// Read more about it here:
//https://emotion.sh/docs/introduction
// For this assignment we recommend using emotion.
// The header div below has been styled using the canonical emotion syntax
// Feel free to copy and reuse in all your components.
import { css } from "emotion";

//Here is all the image files that you need
import unLogo from "./images/unhcrLogo.svg";
import title_img from "./images/SaveRef1.png";
import astronaut from "./images/astronaut-sign.svg";
import spaceship from "./images/spaceship.svg";
import underline from "./images/counter-underline-light.svg";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";

// am4core.use;

class Header extends Component {
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    let map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_usaHigh;
    map.projection = new am4maps.projections.AlbersUsa();
    //series
    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);
    // ... chart code goes here ...
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#FF3600");

    this.map = map;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }
  render() {
    return (
      <div>
        <a href="https://www.unrefugees.org" class="logo">
          <img src={unLogo} alt="UN_LOGO" height="50vh" width="100%" />
        </a>
        <div id="chartdiv" style={{ width: "160vh", height: "100vh" }}></div>
      </div>
    );
  }
}

export default Header;
