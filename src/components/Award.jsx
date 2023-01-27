import React, { Component } from "react";
import { Card, Grid } from "@material-ui/core";
import "../styles/Award.scss";

class Award extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: this.props.house,
      points: this.props.points,
      category: this.props.category,
      time: this.props.timeStamp,
      name: this.props.name,
      logo: this.props.logo,
    };
  }

  render() {
    return (
      <div className="Award">
        {/* <Col className = "Award"> */}
        <Card className="Award-wrapper">
          <Grid
            container
            spacing={0}
            className="Award-column"
            style={{ gap: 2 }}
            justifyContent="center"
          >
            <Grid item xs={3} className="Award-houseImg">
              <img src={this.state.logo} className="Award-housePic" />
            </Grid>
            <Grid item xs={8} className="Award-text">
              <div className="Award-type">
                <h2>
                  {this.state.name} earned {this.state.points}{" "}
                  {this.state.category} points{" "}
                </h2>
              </div>
              <div className="Award-time">{this.state.time}</div>
            </Grid>
          </Grid>
        </Card>
        {/* </Col> */}
      </div>
    );
  }
}

export default Award;
