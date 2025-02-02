import {
  SET_SPACES,
  ADD_SPACE,
  UPDATE_SPACE,
  SET_SELECTED_SPACE,
  SET_ACTIVE_SPACE,
  RESET_SPACES,
  SET_PRIMARY_SPACE,
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
    case SET_PRIMARY_SPACE:
      return {
        ...state,
        spaces: state.spaces.map((space) =>
          space.id === action.payload
            ? { ...space, isPrimary: true }
            : { ...space, isPrimary: false },
        ),
      };
    case ADD_SPACE:
      return {
        ...state,
        spaces: [...state.spaces, action.payload],
      };
    case UPDATE_SPACE:
      console.log('Redux state before update:', state.spaces);
      console.log('Action payload:', action.payload);
      return {
        ...state,
        spaces: state.spaces.map((space) =>
          space.id === action.payload.id
            ? { ...space, ...action.payload }
            : space,
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
