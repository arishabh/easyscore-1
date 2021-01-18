// import { getData } from "../utils/api/getData";
import axios from "axios";

// Data-related exports
export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const SET_COURSES_ON_PAGE = "SET_COURSES_ON_PAGE";
export const SET_NAV_STYLE = "SET_NAV_STYLE";
export const FETCH_COURSE_PAGE_SUCCESS = "FETCH_COURSE_PAGE_SUCCESS";
export const SET_INSTRUCTORS_ON_PAGE = "SET_INSTRUCTORS_ON_PAGE";

// Filter-related exports
export const SET_KEYWORD_FILTER_VALUE = "SET_KEYWORD_FILTER_VALUE";
export const SET_LEVEL_FILTER_VALUE = "SET_LEVEL_FILTER_VALUE";
export const SET_REQUIREMENTS_FILTER_VALUE = "SET_REQUIREMENTS_FILTER_VALUE";
export const SET_CREDITS_FILTER_VALUE = "SET_CREDITS_FILTER_VALUE";
export const SET_TIME_FILTER_VALUE = "SET_TIME_FILTER_VALUE";
export const RESET_FILTER_VALUES = "RESET_FILTER_VALUES";

// Data-related actions ****************

export const fetchResults = (url) => (dispatch) => {
  dispatch({ type: FETCH_DATA_START });

  axios
    .get(`https://theeasyscore.com/results&jsonquery=${url}`)
    .then((res) => {
      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data.courses });
      dispatch({ type: SET_COURSES_ON_PAGE, payload: res.data.courses });
    })
    .catch((err) => {
      dispatch({ type: FETCH_DATA_FAILURE, payload: err.message });
    });
};

export const fetchCoursePage = (full_code) => (dispatch) => {
  dispatch({ type: FETCH_DATA_START });

  axios
    .get(`https://theeasyscore.com/results&jsonquery/course=${full_code}`)
    .then((res) => {
      dispatch({ type: FETCH_COURSE_PAGE_SUCCESS, payload: res.data.course });
      dispatch({
        type: SET_INSTRUCTORS_ON_PAGE,
        payload: res.data.course.instructors,
      });
    })
    .catch((err) => {
      dispatch({ type: FETCH_DATA_FAILURE });
    });
};

export const setCourses = (courses) => {
  return { type: SET_COURSES_ON_PAGE, payload: courses };
};

export const setNavStyle = (style) => {
  return { type: SET_NAV_STYLE, payload: style };
};

// Filters-related actions ****************

export const setKeywordFilterValue = (value) => {
  return { type: SET_KEYWORD_FILTER_VALUE, payload: value };
};

export const setLevelFilterValue = (value) => {
  if (value !== "") {
    return { type: SET_LEVEL_FILTER_VALUE, payload: parseInt(value) };
  } else {
    return { type: SET_LEVEL_FILTER_VALUE, payload: value };
  }
};

export const setRequirementsFilterValue = (value) => {
  if (value !== "") {
    return { type: SET_REQUIREMENTS_FILTER_VALUE, payload: parseInt(value) };
  } else {
    return { type: SET_REQUIREMENTS_FILTER_VALUE, payload: value };
  }
};

export const setCreditsFilterValue = (value) => {
  if (value !== "") {
    return { type: SET_CREDITS_FILTER_VALUE, payload: parseInt(value) };
  } else {
    return { type: SET_CREDITS_FILTER_VALUE, payload: value };
  }
};

export const setTimeFilterValue = (value) => {
  if (value !== "") {
    return { type: SET_TIME_FILTER_VALUE, payload: parseInt(value) };
  } else {
    return { type: SET_TIME_FILTER_VALUE, payload: value };
  }
};

export const resetFilterValues = () => {
  return { type: RESET_FILTER_VALUES, payload: "" };
};
