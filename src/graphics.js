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

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";

import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// am4core.use;

class Graphics extends Component {
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    let title = chart.titles.create();
    title.text = "[bold font-size: 20]Universities with Most Donations[/]";
    title.textAlign = "middle";

    let mapData = [
      {
        id: "CA",
        name: "Stanford",
        value: 32358260,
        color: chart.colors.getIndex(0),
      },
      {
        id: "NY",
        name: "New York University",
        value: 3215988,
        color: chart.colors.getIndex(1),
      },
      // {
      //   id: "DZ",
      //   name: "Algeria",
      //   value: 35980193,
      //   color: chart.colors.getIndex(2),
      // },
      {
        id: "NY",
        name: "NYU",
        value: 3215988,
        color: chart.colors.getIndex(1),
      },
      {
        id: "AZ",
        name: "Arizona State University",
        value: 35980193,
        color: chart.colors.getIndex(2),
      },
      {
        id: "NV",
        name: "University of Nevada",
        value: 19618432,
        color: chart.colors.getIndex(2),
      },
      {
        id: "AR",
        name: "University of Arkansas",
        value: 40764561,
        color: chart.colors.getIndex(3),
      },
      {
        id: "FL",
        name: "Florida",
        value: 3100236,
        color: chart.colors.getIndex(1),
      },
      { id: "TX", name: "Texas", value: 22605732, color: "#8aabb0" },
      {
        id: "VT",
        name: "Vermont",
        value: 8413429,
        color: chart.colors.getIndex(1),
      },
      {
        id: "OR",
        name: "Oregon",
        value: 9306023,
        color: chart.colors.getIndex(1),
      },
      {
        id: "WA",
        name: "Washington",
        value: 1323535,
        color: chart.colors.getIndex(0),
      },
    ];

    // Set map definition
    chart.geodata = am4geodata_usaHigh;

    // Set projection
    chart.projection = new am4maps.projections.AlbersUsa();

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = "value";

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = "color";
    circle.tooltipText = "{name}: [bold]${value}[/]";

    imageSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 4,
      max: 30,
      dataField: "value",
    });
    imageTemplate.adapter.add("latitude", function (latitude, target) {
      let polygon = polygonSeries.getPolygonById(
        "US-" + target.dataItem.dataContext.id
      );
      if (polygon) {
        return polygon.visualLatitude;
      }
      return latitude;
    });

    imageTemplate.adapter.add("longitude", function (longitude, target) {
      let polygon = polygonSeries.getPolygonById(
        "US-" + target.dataItem.dataContext.id
      );
      if (polygon) {
        return polygon.visualLongitude;
      }
      return longitude;
    });

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    return (
      <div>
        <div id="chartdiv" style={{ width: "160vh", height: "100vh" }}></div>
      </div>
    );
  }
}

export default Graphics;
