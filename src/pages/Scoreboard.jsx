import React, { Component, Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/action";

import {
  Grid,
  Paper,
  Card,
  GridList,
  Box,
  Select,
  MenuItem,
  IconButton,
  FormControl,
} from "@material-ui/core";
import compassion from "./Compassion.png";
import grit from "./Grit.png";
import tenacious from "./Tenacious.png";
import visionary from "./Visionary.png";
import { House } from "../components/House";
import moment from "moment";
import Award from "../components/Award";
import Chart from "react-apexcharts";
import "../styles/Scoreboard.scss";
import Slider from "react-slick";
import Carousel from "react-material-ui-carousel";
import { SCOREBOARD_REFRESH_TIME } from "../appConstants";
import RefreshIcon from "@mui/icons-material/Refresh";

export const Scoreboard = (props) => {
  const [activeSchoolYear, setActiveSchoolYear] = useState(null);
  const [points, setPoints] = useState([]);
  const [activity, setActivity] = useState([]);
  const [schoolYearNames, setSchoolYearNames] = useState([]);
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState(null);
  const selectedSchoolYearIdRef = useRef(selectedSchoolYearId);
  selectedSchoolYearIdRef.current = selectedSchoolYearId;

  const logos = [compassion, grit, tenacious, visionary];
  const legendClasses = [
    "Scoreboard-first",
    "Scoreboard-second",
    "Scoreboard-third",
  ];

  useEffect(() => {
    loadActiveSchoolYear((id) => {
      loadPoints(id);
      loadActivity();
      loadSchoolYearNames();
    });
  }, []);

  useEffect(() => {
    if (activeSchoolYear) {
      const interval = setInterval(refresh, SCOREBOARD_REFRESH_TIME);

      return () => clearInterval(interval);
    }
  }, [activeSchoolYear]);

  const refresh = () => {
    if (activeSchoolYear.SK === selectedSchoolYearIdRef.current) {
      loadPoints(selectedSchoolYearIdRef.current);
      loadActivity();
    }
  };

  const loadSchoolYearNames = () => {
    actions.getSchoolYearNames().then((response) => {
      setSchoolYearNames(response.data);
    });
  };

  const loadPoints = (schoolYearId) => {
    actions.getPointsIntegersPromise(schoolYearId).then((response) => {
      setPoints(response.data);
    });
  };

  const loadActiveSchoolYear = (onSuccess) => {
    actions.getActiveSchoolyearPromise().then((response) => {
      setActiveSchoolYear(response.data);
      setSelectedSchoolYearId(response.data.SK);
      if (onSuccess) {
        onSuccess(response.data.SK);
      }
    });
  };

  const loadActivity = () => {
    actions.getRecentAwardsPromise().then((response) => {
      setActivity(response.data);
    });
  };

  const getScoreByHouse = (houseId) => {
    let total = 0;
    points?.forEach((point) => {
      if (point.houseId === houseId) {
        total += point.points;
      }
    });
    return total;
  };

  const getHouseName = (houseId) => {
    let name = "";
    activeSchoolYear?.houses?.forEach((house) => {
      if (house.id === houseId) {
        name = house.name;
      }
    });
    return name;
  };

  const getPointCategory = (categoryId) => {
    let name = "";
    activeSchoolYear?.pointCategories?.forEach((category) => {
      if (category.id === categoryId) {
        name = category.name;
      }
    });
    return name;
  };

  const getTimeSince = (timeStamp) => {
    let dateOfActivity = moment(new Date(Number(timeStamp * 1000)));
    let now = moment();
    let timeSince = dateOfActivity.from(now);
    return timeSince;
  };

  const getPointsBreakDown = (houseId) => {
    let pointsList = [0, 0, 0];
    let index = 0;
    points?.forEach((category, i) => {
      if (category.houseId === houseId) {
        pointsList[category.pointCategoryId - 6] = category.points;
        index = index + 1;
      }
    });
    return pointsList;
  };

  const handleSelectSchoolYear = (event) => {
    setSelectedSchoolYearId(event.target.value);
    loadPoints(event.target.value);
  };

  return (
    // <div>
    <Box pb="3rem">
      <Grid justifyContent="center">
        {/* <Box display="flex" justifyContent="center" alignItems="center"> */}
        <h1>Belle Heth Houses</h1>

        {/* <IconButton size="small" onClick={refresh}>
            <RefreshIcon />
          </IconButton>
        </Box> */}
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSchoolYearId}
            label="School Year"
            onChange={handleSelectSchoolYear}
          >
            {schoolYearNames.map((schoolYear) => (
              <MenuItem value={schoolYear.SK}>
                {schoolYear.schoolyear_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={0} justifyContent="center">
          {activeSchoolYear?.house_names?.map((house, i) => {
            return (
              <House
                name={house.name}
                logo={logos[i]}
                score={
                  points?.length > 0 ? points[i].reduce((a, b) => a + b, 0) : 0
                }
                scores={points?.length > 0 ? points[i] : [0, 0, 0]}
                showLegend={i > 2 ? true : false}
                labels={activeSchoolYear?.category_names}
              ></House>
            );
          })}
        </Grid>
        <Grid className="Scoreboard-legend" containerSpacing={2}>
          {activeSchoolYear?.category_names.map((name, i) => (
            <div key={i} className="Scoreboard-row1">
              <Box class={legendClasses[i]}></Box>
              <h3>{name}</h3>
            </div>
          ))}
        </Grid>
        {activeSchoolYear?.SK === selectedSchoolYearId && (
          <Fragment>
            <h2>Recent Activity</h2>
            <Carousel className="carousel">
              {activity?.map((reward, i) => {
                return (
                  <Award
                    name={reward.student_name}
                    points={reward.points}
                    category={reward.category_name}
                    house={reward.house_name}
                    timeStamp={getTimeSince(reward.created_time)}
                    logo={
                      logos[
                        activeSchoolYear?.house_names.indexOf(reward.house_name)
                      ]
                    }
                  ></Award>
                );
              })}
            </Carousel>
          </Fragment>
        )}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    points: state.points,
    active: state.active,
    activity: state.awards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPoints: () => actions.getPoints(dispatch),
    getActive: () => actions.getActiveSchoolyear(dispatch),
    getActivity: () => actions.getRecentAwards(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
