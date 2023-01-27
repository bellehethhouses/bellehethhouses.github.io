import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/action";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import "../../styles/Points.scss";
import Snackbar from "@mui/material/Snackbar";
import FormHelperText from "@mui/material/FormHelperText";
import { Alert } from "@mui/material";
import { RHFTextField } from "../../components/RHFTextField";
import { RHFSelect } from "../../components/RHFSelect";

function Points(props) {
  const auth = props.token ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      student: "",
      category: "",
      points: "",
      house: "",
    },
  });

  const onSubmit = (data) => {
    let points = {
      student: data.student,
      house: data.house,
      category: data.category,
      points: parseInt(data.points),
    };
    props
      .awardPoints(points)
      .then((response) => {
        handleSetAlert(
          `You succesfully added points! Check the scoreboard for updated totals!`,
          "success"
        );
        reset();
      })
      .catch((error) => {
        handleSetAlert("Could not add points. Please try again", "error");
      });
  };

  const [alert, setAlert] = useState(null);

  const handleSetAlert = (message, severity) => {
    setAlert({ severity, message });
  };

  const handleCloseAlert = (event, reason) => {
    setAlert(null);
  };

  return (
    <div className="Points">
      <h1>Add Points</h1>
      {auth && props.active && (
        <form onSubmit={handleSubmit(onSubmit)} className="Points-content">
          <RHFTextField
            className="Points-formItem"
            control={control}
            name="student"
            label="Student Name"
            rules={{
              required: { value: true, message: "Student name is required." },
            }}
          />

          <RHFTextField
            className="Points-formItem"
            control={control}
            name="points"
            label="Point Amount"
            rules={{
              required: { value: true, message: "Point amount is required." },
              min: { value: 1, message: "Point amount must be positive." },
              pattern: {
                value: /^[0-9]+$/i,
                message: "Point amount must be a number.",
              },
            }}
          />

          <RHFSelect
            className="Points-formItem"
            control={control}
            name="category"
            label="Point Category"
            rules={{
              required: { value: true, message: "Point Category is required." },
            }}
            options={props.active.category_names}
          />

          <RHFSelect
            className="Points-formItem"
            control={control}
            name="house"
            label="House"
            rules={{
              required: { value: true, message: "House is required." },
            }}
            options={props.active.house_names}
          />

          <Button
            type="submit"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
            variant="contained"
            // key={errors.name }
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </form>
      )}

      {!auth && (
        <p style={{ color: "black" }}>Please sign in to access this page.</p>
      )}

      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert?.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {alert?.message}
        </Alert>
      </Snackbar>
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
    awardPoints: (points) => actions.awardPoints(dispatch, points),
    getPoints: () => actions.getPoints(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Points);
