import { forwardRef, Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../redux/action";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import { RHFTextField } from "../../components/RHFTextField";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import CircleIcon from "@mui/icons-material/Circle";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Add from "@material-ui/icons/Add";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { useController, useForm } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { Alert } from "@mui/material";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function SchoolYearsTable(props) {
  const [alert, setAlert] = useState(null);
  const handleCloseAlert = () => {
    setAlert(null);
  };
  const handleSetAlert = (message, severity) => {
    setAlert({ severity, message });
  };
  const [schoolYears, setSchoolYears] = useState([]);
  const [open, setOpen] = useState(false);
  //   const [showAddDialog, setShowAddDialog] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { name: "" },
  });
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: "schoolyear_name",
    control,
    rules: { required: true },
    defaultValue: "",
  });

  const loadSchoolYears = (onSuccess) => {
    props.getAllSchoolYears().then((innerResponse) => {
      setSchoolYears(innerResponse.data);
      if (onSuccess) {
        onSuccess();
      }
    });
  };

  const onSubmit = (data) => {
    props
      .startNewSchoolYear(data)
      .then((response) => {
        loadSchoolYears(() => {
          props.getActive();
          reset();
          setOpen(false);
          handleSetAlert(
            `Successfully started new school year: ${data.schoolyear_name}`,
            "success"
          );
        });
      })
      .catch((error) =>
        handleSetAlert(
          "Could not start new school year. Please try again",
          "error"
        )
      );
  };

  useEffect(() => {
    loadSchoolYears();
  }, []);

  const columns = [
    { title: "SK", field: "SK", hidden: true },
    {
      title: "Name",
      field: "schoolyear_name",
      validate: (rowData) =>
        Boolean(rowData.schoolyear_name) || {
          isValid: false,
        }, // true
    },
    { title: "Active", field: "is_active", hidden: true },
  ].map((column) => {
    return { ...column, sorting: false };
  });

  return (
    <Box px="3rem" py="1rem">
      {props.token ? (
        <Fragment>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              padding="2rem"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField
                  control={control}
                  name="schoolyear_name"
                  label="New School Year Name"
                  rules={{
                    required: {
                      value: true,
                      message: "Required.",
                    },
                  }}
                />

                <Box display="flex" width="100%" pt="1rem">
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Start New School Year
                  </Button>
                </Box>
              </form>
            </Box>
          </Dialog>

          {/* <Box display="flex" justifyContent="center">
        <Box width="40vw"> */}
          <MaterialTable
            options={{ maxBodyHeight: "50vh", paging: false }}
            localization={{
              body: {
                editRow: {
                  deleteText: "Are you sure you want to remove this user?",
                },
              },
            }}
            actions={[
              {
                icon: () => <Add />,
                tooltip: "Start new school year",
                isFreeAction: true,
                onClick: () => setOpen(true),
              },
              (rowData) => ({
                icon: () => (
                  <CircleIcon
                    style={{
                      color: rowData.is_active === "true" ? "green" : "red",
                    }}
                  />
                ),
                tooltip: "Set Active",
                onClick: (event, rowData) => {
                  if (
                    window.confirm(
                      `Are you sure you want to set ${rowData.schoolyear_name} to be the active school year? This action will change the active school year for all users, and all points awarded now will be saved as part of the scores for ${rowData.schoolyear_name}.`
                    )
                  ) {
                    props
                      .setActive(rowData.SK)
                      .then((response) => {
                        handleSetAlert(
                          `Successfully changed school year ${rowData.schoolyear_name} to active`,
                          "success"
                        );
                      })
                      .catch((error) => {
                        handleSetAlert(
                          `Could not set school year ${rowData.schoolyear_name} to active`,
                          "error"
                        );
                      })
                      .finally(() =>
                        loadSchoolYears(() => {
                          props.getActive();
                        })
                      );
                  }
                },
                disabled: rowData.is_active === "true",
              }),
            ]}
            title="School Years"
            columns={columns}
            data={schoolYears}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  props
                    .updateSchoolYear(newData)
                    .then(() => {
                      handleSetAlert(
                        `Successfully renamed school year ${newData.schoolyear_name}`
                      );
                    })
                    .catch((error) => {
                      handleSetAlert(
                        `Could not rename school year ${oldData.schoolyear_name}. Please try again`
                      );
                    })
                    .finally((response) => loadSchoolYears(resolve));
                }),
              //   onRowDelete: (oldData) =>
              //     new Promise((resolve, reject) => {
              //       props
              //         .deleteUser(oldData.id)
              //         .then((response) => loadUsers(resolve));
              //     }),
            }}
          />
          {/* </Box>
      </Box> */}
          {/* <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}> */}

          {/* </Dialog> */}
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
        </Fragment>
      ) : (
        <p className="authError">Please sign in to access this page.</p>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return { token: state.token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSchoolYears: () => actions.getSchoolYearNames(dispatch),
    updateSchoolYear: (schoolYear) =>
      actions.updateSchoolYearName(dispatch, schoolYear),
    startNewSchoolYear: (schoolYear) => actions.reset(dispatch, schoolYear),
    deleteUser: (id) => actions.deleteUser(dispatch, id),
    createUser: (user) => actions.createUser(dispatch, user),
    getActive: () => actions.getActiveSchoolyear(dispatch),
    setActive: (id) => actions.setSchoolYearActive(dispatch, id),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolYearsTable);
