import React, { Component } from "react";

// This is one way to write CSS
// Read more about it here:
//https://emotion.sh/docs/introduction
// For this assignment we recommend using emotion.
// The header div below has been styled using the canonical emotion syntax
// Feel free to copy and reuse in all your components.
import { css } from "emotion";

//Here is all the image files that you need

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";

import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";

function displayMap (props) {
  //theme
  //am4core.useTheme(am4themes_animated);

  // Create map instance
  let chart = am4core.create("chartdiv", am4maps.MapChart);

  let title = chart.titles.create();
  title.text = "[bold font-size: 20]Universities with Most Donations[/]";
  title.textAlign = "middle";

  // Set map definition
  chart.geodata = am4geodata_usaHigh;

  // Set projection
  chart.projection = new am4maps.projections.AlbersUsa();

  // Create map polygon series
  let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;

  // polygonSeries.nonScalingStroke = true;
  // polygonSeries.strokeWidth = 0.5;
  // polygonSeries.calculateVisualCenter = true;
  // Configure series
  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#FF3600").lighten(0.2);

  let colorSet = new am4core.ColorSet();
  let imageSeries = chart.series.push(new am4maps.MapImageSeries());
  imageSeries.mapImages.template.propertyFields.longitude = "longitude";
  imageSeries.mapImages.template.propertyFields.latitude = "latitude";
  imageSeries.mapImages.template.propertyFields.value = "value";
  imageSeries.mapImages.template.tooltipText = "{label}: [bold]${value}";

  // let imageSeries = chart.series.push(new am4maps.MapImageSeries());
  imageSeries.data = props.mapData.map((item) => {
    return {
      ...item,
      color: colorSet.next()
    }
  });

  console.log(imageSeries.data);

  // imageSeries.data = mapData;
  // imageSeries.dataFields.value = "value";
  // let imageTemplate = imageSeries.mapImages.template;
  // imageTemplate.propertyFields.value = "value";
  // imageTemplate.propertyFields.longitude = "longitude";
  // imageTemplate.propertyFields.latitude = "latitude";
  // imageTemplate.tooltipText = "{title}: [bold]{value}[/]";
  // imageTemplate.nonScaling = true;

  let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
  circle.propertyFields.fill = "color";

  let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
  // circle2.radius = 7;
  circle2.propertyFields.fill = "color";

  imageSeries.heatRules.push({
    target: circle2,
    property: "radius",
    min: 8,
    max: 31,
    propertyField: "value",
  });

  imageSeries.heatRules.push({
    target: circle,
    property: "radius",
    min: 7,
    max: 30,
    propertyField: "value",
  });

  circle2.events.on("inited", function (event) {
    animateBullet(event.target);
  });

  function animateBullet(circle) {
    let animation = circle.animate(
      [
        { property: "scale", from: 1, to: 3 },
        { property: "opacity", from: 1, to: 0 },
      ],
      1000,
      am4core.ease.circleOut
    );
    animation.events.on("animationended", function (event) {
      animateBullet(event.target.object);
    });
  }

  return chart;
}


class Graphics extends Component {
  componentDidMount() {
    this.chart = displayMap(this.props);
  }

  componentDidUpdate() {
    this.chart = displayMap(this.props);
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
