import { Fragment, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import * as actions from "../redux/action";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/GoogleLoginButton.scss";

const CLIENT_ID =
  "568111533320-f5ngt3lk1hvvsv5jvjsm0lse5419btvc.apps.googleusercontent.com";

const GoogleLoginButton = (props) => {
  const [email, setEmail] = useState("");
  const [showUserNotFoundError, setShowUserNotFoundError] = useState(false);

  const handleCloseUserNotFoundError = () => {
    setShowUserNotFoundError(false);
  };

  const handleLoginSuccess = (response) => {
    setEmail(response.profileObj.email);
    console.log("response", response);
    props
      .validateJWT({ email: response.profileObj.email })
      .then((innerResponse) => {
        if (innerResponse.data) {
          props.setToken(response.tokenId);
        } else {
          // User not in our system
          setShowUserNotFoundError(true);
        }
      })
      .catch((error) => {});
  };

  const handleLoginFailure = (response) => {};

  const handleLogout = (response) => {
    props.setToken("");
  };

  return (
    <Fragment>
      {props.token ? (
        <Box display="flex" alignItems="center">
          <div className="Google-userInfo">
            <AccountCircle fontSize="large" />
            <Box pl="0.35rem" pr="1rem">
              <Typography>{email}</Typography>
            </Box>
          </div>
          <GoogleLogout
            clientId={CLIENT_ID}
            onLogoutSuccess={handleLogout}
            render={(renderProps) => (
              <GoogleButton label="Sign out" onClick={renderProps.onClick} />
            )}
          />
        </Box>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          render={(renderProps) => (
            <GoogleButton
              label="Sign in with Google"
              onClick={renderProps.onClick}
            />
          )}
        />
      )}
      {showUserNotFoundError && (
        <Dialog
          open={showUserNotFoundError}
          onClose={handleCloseUserNotFoundError}
        >
          <DialogTitle>Sign In Failed</DialogTitle>
          <DialogContent>
            <DialogContentText>{`${email} is not registered. If you are a teacher, please ask a registered teacher to register you.`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseUserNotFoundError}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
};

const GoogleButton = (props) => (
  <Button
    style={{
      color: "white",
      textTransform: "none",
      borderColor: "white",
    }}
    size="large"
    startIcon={<GoogleIcon fontSize="large" />}
    variant="outlined"
    onClick={props.onClick}
  >
    {props.label}
  </Button>
);

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateJWT: (token) => actions.validateJWT(dispatch, token),
    setToken: (token) => actions.setToken(dispatch, token),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginButton);
