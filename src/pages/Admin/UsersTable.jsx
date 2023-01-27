import { forwardRef, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../redux/action";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import Add from "@material-ui/icons/Add";
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
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Box, Button, Dialog, Snackbar, TextField } from "@material-ui/core";
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

function UsersTable(props) {
  const auth = props.token ? true : false;

  const [users, setUsers] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [alert, setAlert] = useState(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: "" },
  });
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: "email",
    control,
    rules: { required: true, pattern: /^\S+@\S+$/i },
    defaultValue: "",
  });

  const loadUsers = (onSuccess) => {
    props.getAllUsers().then((innerResponse) => {
      setUsers(innerResponse.data);
      if (onSuccess) {
        onSuccess();
      }
    });
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const handleSetAlert = (message, severity) => {
    setAlert({ severity, message });
  };

  const onSubmit = (data) => {
    props
      .createUser(data)
      .then((response) => {
        handleSetAlert(`Successfully added ${data.email}`, "success");
        loadUsers(() => {
          // setShowAddDialog(false);
          reset();
        });
      })
      .catch((error) => {
        handleSetAlert(`${data.email} already exists.`, "error");
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    { title: "SK", field: "SK", hidden: true },
    {
      title: "Email",
      field: "email",
      validate: (rowData) =>
        (Boolean(rowData.email) && EmailValidator.validate(rowData.email)) || {
          isValid: false,
        }, // true
      sorting: false,
    },
  ];
  // .map((column) => {
  //   return { ...column, sorting: false };
  // });

  return (
    <Box px="3rem" py="1rem">
      {auth && (
        <MaterialTable
          options={{ maxBodyHeight: "70vh", paging: false }}
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
              tooltip: "Add User",
              isFreeAction: true,
              onClick: () => setShowAddDialog(true),
            },
          ]}
          title="Users"
          columns={columns}
          data={users}
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                console.log("put", newData);
                props
                  .updateUser(newData)
                  .then((response) => {
                    handleSetAlert(
                      `Successfully updated ${newData.email}`,
                      "success"
                    );
                  })
                  .catch((error) => {
                    handleSetAlert(`${newData.email} already exists.`, "error");
                  })
                  .finally(() => loadUsers(resolve));
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                props
                  .deleteUser(oldData.SK)
                  .then((response) =>
                    handleSetAlert(
                      `Successfully deleted ${oldData.email}`,
                      "success"
                    )
                  )
                  .catch((error) => {
                    handleSetAlert(
                      `Could not delete ${oldData.email}. Please try again`,
                      "error"
                    );
                  })
                  .finally(() => loadUsers(resolve));
              }),
          }}
        />
      )}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding="2rem"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={invalid}
              helperText={
                error
                  ? error.type === "pattern"
                    ? "Invalid email"
                    : "Required"
                  : ""
              }
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              value={value} // input value
              name={name} // send down the input name
              inputRef={ref} // send input ref, so we can focus on input when
              defaultValue={""}
              label="Email"
              variant="outlined"
            />
            <Box display="flex" width="100%" pt="1rem">
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="large"
                type="submit"
              >
                Add User
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>

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
      {!auth && (
        <p className="authError">Please sign in to access this page.</p>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => actions.getAllUsers(dispatch),
    updateUser: (user) => actions.updateUser(dispatch, user),
    deleteUser: (id) => actions.deleteUser(dispatch, id),
    createUser: (user) => actions.createUser(dispatch, user),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
