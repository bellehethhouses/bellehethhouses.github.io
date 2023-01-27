import React, { Component } from "react";
import "../styles/Calendar.scss";

class Calendar extends Component {
  render() {
    return (
      <div className="Calendar">
        <div className="Calendar-desktop Calendar-responsive">
          <iframe
            title="Calendar"
            src="https://calendar.google.com/calendar/embed?src=bhm7gs9g9604s5o5io52p4n7f0%40group.calendar.google.com&ctz=America%2FNew_York"
            style={{ border: "solid 1px #777" }}
            width="100%"
            height="650"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div className="Calendar-mobile Calendar-responsive">
          <iframe
            title="Calendar"
            src="https://calendar.google.com/calendar/embed?mode=AGENDA&amp;wkst=1&amp;src=bhm7gs9g9604s5o5io52p4n7f0%40group.calendar.google.com&ctz=America%2FNew_York"
            style={{ border: "solid 1px #777" }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    );
  }
}

export default Calendar;
