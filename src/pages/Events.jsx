import React, { Component } from "react";
import Calendar from "../components/Calendar";
import Event from "../components/Event";
import "../styles/Events.scss";
import { connect } from "react-redux";
import * as actions from "../redux/action";
import AddEvent from "../components/AddEvent";

class Events extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.getEvents();
  };

  render() {
    return (
      <div className="Events">
        <div className="Events-header">
          <div class={this.props.token ? "Events-add" : "Events-hide"}>
            <AddEvent />
          </div>
          <h1>Upcoming Events</h1>
        </div>
        <div className="Events-content">
          <div class="Events-calendar">
            <Calendar />
          </div>
          {this.props.events.length > 0 ? (
            <div className="Events-upcoming">
              {this.props.events.map((event, i) => {
                return i < 3 ? (
                  <Event key={i} data={event}></Event>
                ) : (
                  <div></div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => actions.getEvents(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
