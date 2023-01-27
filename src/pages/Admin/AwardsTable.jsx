import { forwardRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/action";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
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
import { Box, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import moment from "moment";
import "moment-timezone";

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

function AwardsTable(props) {
  const [alert, setAlert] = useState(null);
  const handleCloseAlert = () => {
    setAlert(null);
  };
  const handleSetAlert = (message, severity) => {
    setAlert({ severity, message });
  };

  const auth = props.token ? true : false;

  const houseLookup = props.activeSchoolYear.house_names?.reduce(
    (houseMap, house) => ((houseMap[house] = house), houseMap),
    {}
  );

  const pointCategoryLookup = props.activeSchoolYear.category_names?.reduce(
    (pointCategoryMap, pointCategory) => (
      (pointCategoryMap[pointCategory] = pointCategory), pointCategoryMap
    ),
    {}
  );

  const createdDateToString = (createdDateString) => {
    const utcDate = new Date(Number(createdDateString) * 1000);
    const localDate = moment(utcDate)
      .tz("America/New_York")
      .format("MM/DD/YYYY h:mm:ss A");
    return localDate;
  };

  const columns = [
    { title: "SK", field: "SK", hidden: true },
    {
      title: "Student Name",
      field: "student_name",
      validate: (rowData) =>
        Boolean(rowData.student_name) || { isValid: false },
    },
    {
      title: "Point Amount",
      field: "points",
      validate: (rowData) =>
        (Boolean(rowData.points) &&
          Number(rowData.points) &&
          Number(rowData.points) > 0) || { isValid: false },
    },

    {
      title: "Point Category",
      field: "category_name",
      lookup: pointCategoryLookup,
      validate: (rowData) =>
        Boolean(rowData.category_name) || { isValid: false },
    },

    {
      title: "House",
      field: "house_name",
      lookup: houseLookup,
      validation: (rowData) =>
        Boolean(rowData.house_name) || { isValid: false },
    },

    {
      title: "Time",
      field: "created_time",
      editable: "never",
      render: (rowData) => createdDateToString(rowData.created_time),
    },
  ].map((column) => {
    return { ...column, sorting: false };
  });

  return (
    <Box px="3rem" py="1rem">
      {auth && (
        <MaterialTable
          options={{
            maxBodyHeight: "68vh",
            search: false,
            pageSize: 10,
            emptyRowsWhenPaging: false,
          }}
          localization={{
            body: {
              editRow: {
                deleteText: "Are you sure you want to remove these points?",
              },
            },
          }}
          title="Points Awarded"
          columns={columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              props
                .getAllAwards(query.page, query.pageSize)
                .then((response) => {
                  resolve({
                    data: response.data.content,
                    page: response.data.page,
                    totalCount: response.data.totalCount,
                  });
                });
            })
          }
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                props
                  .updateAward(newData)
                  .then((response) =>
                    handleSetAlert("Successfully updated", "success")
                  )
                  .catch((error) => {
                    handleSetAlert(
                      "Could not update. Please try again",
                      "error"
                    );
                  })
                  .finally(() => resolve());
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                props
                  .deleteAward(oldData.SK)
                  .then((response) => handleSetAlert("Successfully deleted"))
                  .catch((error) =>
                    handleSetAlert(
                      "Could not delete. Please try again",
                      "error"
                    )
                  )
                  .finally(() => resolve());
              }),
          }}
        />
      )}
      {!auth && <p>Please sign in to access this page.</p>}
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
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    awards: state.awards,
    activeSchoolYear: state.active,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAwards: (page, size) => actions.getAllAwards(dispatch, page, size),
    updateAward: (award) => actions.updateAward(dispatch, award),
    deleteAward: (awardId) => actions.deleteAward(dispatch, awardId),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AwardsTable);
