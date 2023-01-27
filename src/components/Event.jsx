import React, { Component } from "react";
import { Card } from "@material-ui/core";
import moment from "moment";
import "../styles/Event.scss";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.data.summary,
      start: {
        raw: props.data.start.dateTime,
        day: moment(
          props.data.start.dateTime
            ? props.data.start.dateTime
            : props.data.start.date
        ).format("MMMM Do"),
        time: moment(props.data.start.dateTime).format("h:mm a"),
      },
      end: {
        raw: props.data.end.dateTime,
        day: moment(
          props.data.end.dateTime
            ? props.data.end.dateTime
            : props.data.end.date
        ).format("MMMM Do"),
        time: moment(props.data.end.dateTime).format("h:mm a"),
      },
      description: props.data.description,
      location: props.data.location,
      htmlLink: props.data.htmlLink,
      multiday: false,
      allday: props.data.start.date ? true : false,
    };
  }

  componentDidMount = () => {
    this.setState({
      multiday:
        this.state.start.day == this.state.end.day || this.state.allday
          ? false
          : true,
    });
  };

  render() {
    return (
      <div className="Event">
        <Card className="Event-wrapper" variant="outlined">
          <div className="Event-title">
            <h3>
              {this.state.multiday
                ? this.state.start.day + "  to " + this.state.end.day
                : this.state.start.day}
              : {this.state.title}
            </h3>
          </div>
          <div className="Event-time">
            {this.state.allday
              ? "All-day event"
              : this.state.start.time +
                " " +
                (this.state.multiday ? " on " + this.state.start.day : "") +
                " to " +
                this.state.end.time +
                " " +
                (this.state.multiday ? " on " + this.state.end.day : "")}
          </div>
          <div className="Event-location">{this.state.location}</div>
          <div
            className="Event-description"
            dangerouslySetInnerHTML={{ __html: this.state.description }}
          ></div>
          <a className="Event-moreInfo" href={this.state.htmlLink}>
            More info
          </a>
        </Card>
      </div>
    );
  }
}

export default Event;
