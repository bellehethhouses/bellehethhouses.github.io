import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/action";
import { Button } from "@material-ui/core";
import "../../styles/Reset.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Reset(props) {
  const auth = props.token ? true : false;

  const onSubmit = (data) => {
    actions.reset().then((response) => {
      props.getActive();
    });
    setOpen(false);
    handleOpenAlert();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [alert, showAlert] = React.useState(false);

  const handleOpenAlert = () => {
    showAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    showAlert(false);
  };

  return (
    <div className="Reset">
      <h1> Reset </h1>
      {auth && (
        <Button
          onClick={() => {
            handleClickOpen();
          }}
          variant="contained"
          color="primary"
          size="large"
        >
          Start New School Year
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {"This action CANNOT be undone. Are you sure you want to reset?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to start a new school year click 'Reset'. This will
            clear all of the data displayed on the Scoreboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={onSubmit}
            autoFocus
            style={{ color: "#B00020", fontWeight: "bold" }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          The school year was successfully reset!
        </Alert>
      </Snackbar>

      {!auth && <p>Please sign in to access this page.</p>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    active: state.active,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => actions.reset(dispatch),
    getActive: () => actions.getActiveSchoolyear(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
