import React, { Component } from "react";
import LinkTab from "./LinkTab";
import { AppBar, Grid, Button, Toolbar, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import "../styles/Banner.scss";
import GoogleLoginButton from "./GoogleLoginButton";
import * as actions from "../redux/action";
import { connect } from "react-redux";

class Banner extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: true,
    };
  }

  handleMenuClose = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    return (
      <Grid container>
        <AppBar className="Banner-appBar" component={Grid} position="sticky">
          <Toolbar>
            <Grid item xs={8} className="Banner-desktop">
              <div className="Banner-tabs--content">
                <LinkTab label="Scoreboard" href="/Scoreboard" />
                <LinkTab label="Events" href="/Events" />
                <LinkTab
                  label="Add Points"
                  href="/Admin/Points"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                />
                <LinkTab
                  label="History"
                  href="/Admin/AwardsTable"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                />
                <LinkTab
                  label="Users"
                  href="/Admin/UsersTable"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                />
                <LinkTab
                  label="School Years"
                  href="/Admin/Reset"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                />
              </div>
            </Grid>
            <div className="Banner-mobile">
              <Button
                onClick={() =>
                  this.setState({ menuOpen: !this.state.menuOpen })
                }
                aria-label="menu"
                aria-haspopup="true"
              >
                <MenuIcon className="Banner-menuToggle" />
              </Button>
              <Drawer
                open={this.state.menuOpen}
                anchor="left"
                onClose={this.handleMenuClose}
              >
                <Button
                  onClick={() => this.setState({ menuOpen: false })}
                  className="Banner-menu"
                >
                  <ChevronLeft />
                </Button>
                <LinkTab
                  label="Scoreboard"
                  href="/Scoreboard"
                  click={this.handleMenuClose}
                />
                <LinkTab
                  label="Events"
                  href="/Events"
                  click={this.handleMenuClose}
                />
                <LinkTab
                  label="Add Points"
                  href="/Admin/Points"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                  click={this.handleMenuClose}
                />
                <LinkTab
                  label="History"
                  href="/Admin/AwardsTable"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                  click={this.handleMenuClose}
                />
                <LinkTab
                  label="Users"
                  href="/Admin/UsersTable"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                  click={this.handleMenuClose}
                />
                <LinkTab
                  label="School Years"
                  href="/Admin/Reset"
                  className={
                    this.props.token ? "Banner-showTab" : "Banner-hideTab"
                  }
                  click={this.handleMenuClose}
                />
              </Drawer>
            </div>
            <Grid item sm={4} className="Banner-tabs--authentication">
              <GoogleLoginButton />
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    activeSchoolYear: state.active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateJWT: (token) => actions.validateJWT(dispatch, token),
    setToken: (token) => actions.setToken(dispatch, token),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
