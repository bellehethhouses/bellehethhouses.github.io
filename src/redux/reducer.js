import * as appConstants from "../appConstants";

const initialState = {
  active: {},
  points: {},
  events: [],
  awards: [],
  token: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.GET_ACTIVE_SCHOOLYEAR:
      return { ...state, active: action.payload };
    case appConstants.GET_POINTS:
      return { ...state, points: action.payload };
    case appConstants.UPDATE_POINTS:
      return { ...state, points: state.points.concat(action.payload) };
    case appConstants.GET_EVENTS:
      return {
        ...state,
        events: action.success ? action.payload : { ...state.events },
      };
    case appConstants.GET_RECENT_AWARDS:
      return { ...state, awards: action.payload };
    case appConstants.UPDATE_AWARDS:
      let awards = state.awards.map((award) => {
        return award.id === action.payload.id ? action.payload : award;
      });
      return { ...state, awards: awards };
    case appConstants.UPDATE_AWARDS_DELETED:
      let newAwards = state.awards.filter((award) => {
        return award.id !== action.payload;
      });
      return { ...state, awards: newAwards };
    case appConstants.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default reducer;
