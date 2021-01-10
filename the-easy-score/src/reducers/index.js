import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CHANGE_URL,
  SET_COURSES_ON_PAGE,
  SET_LEVEL_FILTER_VALUE,
  SET_REQUIREMENTS_FILTER_VALUE,
  SET_CREDITS_FILTER_VALUE,
  SET_TIME_FILTER_VALUE,
} from "../actions";

const initialState = {
  searchUrl: "",
  isLoading: false,
  courses: [],
  displayedCourses: [],
  errorText: "",
  filters: {
    courseLevel: {
      isActive: false,
      value: "",
    },
    requirements: {
      isActive: false,
      value: "",
    },
    creditHours: {
      isActive: false,
      value: "",
    },
    timeofDay: {
      isActive: false,
      value: "",
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_URL:
      return { ...state, searchUrl: action.payload };
    case FETCH_DATA_START:
      return { ...state, isLoading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, isLoading: false, courses: action.payload };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorText: action.payload,
        courses: [],
      };
    case SET_COURSES_ON_PAGE:
      return { ...state, displayedCourses: action.payload };
    case SET_LEVEL_FILTER_VALUE:
      return {
        ...state,
        filters: {
          ...state.filters,
          courseLevel: { ...state.filters.courseLevel, value: action.payload },
        },
      };
    case SET_REQUIREMENTS_FILTER_VALUE:
      return {
        ...state,
        filters: {
          ...state.filters,
          requirements: {
            ...state.filters.requirements,
            value: action.payload,
          },
        },
      };
    case SET_CREDITS_FILTER_VALUE:
      return {
        ...state,
        filters: {
          ...state.filters,
          creditHours: { ...state.filters.creditHours, value: action.payload },
        },
      };
    case SET_TIME_FILTER_VALUE:
      return {
        ...state,
        filters: {
          ...state.filters,
          timeofDay: { ...state.filters.timeofDay, value: action.payload },
        },
      };
    default:
      return state;
  }
};

export default reducer;
