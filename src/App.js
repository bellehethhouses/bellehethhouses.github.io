import "./App.css";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Points from "./pages/Admin/Points";
import Reset from "./pages/Admin/Reset";
import Banner from "./components/Banner";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./redux/action";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AwardsTable from "./pages/Admin/AwardsTable";
import UsersTable from "./pages/Admin/UsersTable";
import { Scoreboard } from "./pages/Scoreboard";
import SchoolYearsTable from "./pages/Admin/SchoolYearsTable";

class App extends Component {
  componentDidMount = () => {
    this.props.getActive();
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Banner />
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/Scoreboard">
                <Scoreboard />
              </Route>
              <Route path="/Events">
                <Events />
              </Route>
              <Route path="/Admin/Points">
                <Points />
              </Route>
              <Route path="/Admin/AwardsTable">
                <AwardsTable />
              </Route>
              <Route path="/Admin/UsersTable">
                <UsersTable />
              </Route>
              <Route path="/Admin/Reset">
                <SchoolYearsTable />
              </Route>
              <Route exact path="/">
                <Scoreboard />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    active: state.active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActive: () => actions.getActiveSchoolyear(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
