import {
  SET_SPACES,
  ADD_SPACE,
  UPDATE_SPACE,
  SET_SELECTED_SPACE,
  SET_ACTIVE_SPACE,
  RESET_SPACES,
} from '../actions/spaceActions';

const initialState = {
  spaces: [],
  selectedSpace: null,
  activeSpace: null,
};

const spaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPACES:
      return {
        ...state,
        spaces: action.payload,
      };
    case ADD_SPACE:
      return {
        ...state,
        spaces: [...state.spaces, action.payload],
      };
    case UPDATE_SPACE:
      return {
        ...state,
        spaces: state.spaces.map((space) =>
          space.id === action.payload.id ? action.payload : space,
        ),
      };
    case SET_SELECTED_SPACE:
      return {
        ...state,
        selectedSpace: action.payload,
      };
    case SET_ACTIVE_SPACE:
      return {
        ...state,
        activeSpace: action.payload,
      };
    case RESET_SPACES:
      return initialState;
    default:
      return state;
  }
};

export default spaceReducer;
