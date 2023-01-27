import React, { Component, img } from "react";
import { Grid, Button, Modal } from "@material-ui/core";
import "../styles/House.scss";
import PieChart from "./PieChart";
import Chart from "react-apexcharts";

export const House = (props) => {
  const options = {
    chart: {
      type: "pie",
    },
    labels: props.labels,
    legend: {
      show: false,
      horizontalAlign: "center",
      position: "bottom",
    },
  };
  const legend = { show: false };
  const series = props.scores.length > 0 ? props.scores : [];

  return (
    <Grid item xs={12} sm={6} md={3} className="House-item">
      <img src={props.logo} className="House-image" />
      <h1 className="House-name">{props.name}</h1>
      <h2>{props.score}</h2>
      <div className="House-pieChart">
        <Chart options={options} series={series} type="pie" width="300" />
      </div>
    </Grid>
  );
};
