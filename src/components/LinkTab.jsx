import React from "react";
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";

export default function LinkTab(props) {
  return (
    <Typography className={"Banner-linkWrapper"}>
      <Link onClick={props.click} className={"Banner-link " + props.className} to={props.href}>{props.label}</Link>
    </Typography>
  );
}
