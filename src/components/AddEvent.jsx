import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class AddEvent extends Component {

    render() {
        return (
                <a className="primary-cta" href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
                    <Button variant="contained" color="primary" size="large">Add Event</Button>
                </a>
        )
    }
}

export default AddEvent;