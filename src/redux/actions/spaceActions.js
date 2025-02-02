import api from '../../api/api';

export const SET_SPACES = 'SET_SPACES';
export const ADD_SPACE = 'ADD_SPACE';
export const UPDATE_SPACE = 'UPDATE_SPACE';
export const SET_SELECTED_SPACE = 'SET_SELECTED_SPACE';
export const SET_ACTIVE_SPACE = 'SET_ACTIVE_SPACE';
export const RESET_SPACES = 'RESET_SPACES';

export const setSpaces = (spaces) => ({
  type: SET_SPACES,
  payload: spaces,
});

export const addSpace = (space) => ({
  type: ADD_SPACE,
  payload: space,
});

export const updateSpace = (space) => ({
  type: UPDATE_SPACE,
  payload: space,
});

export const setSelectedSpace = (space) => ({
  type: SET_SELECTED_SPACE,
  payload: space,
});

export const setActiveSpace = (space) => ({
  type: SET_ACTIVE_SPACE,
  payload: space,
});

export const resetSpaces = () => ({
  type: RESET_SPACES,
});

// 공간 목록 불러오기 액션
export const fetchSpaces = () => async (dispatch) => {
  try {
    const response = await api.get('/api/spaces');
    const spaces = response.data.map((space) => ({
      id: space.spaceId,
      title: space.sname,
      coverType: space.sthumb,
      isPrimary: space.isPrimary,
      isPublic: space.isPublic,
    }));
    dispatch(setSpaces(spaces));
  } catch (error) {
    console.error('Error fetching spaces:', error);
  }
};

// 공간 수정 액션
export const modifySpace = (spaceId, updatedData) => async (dispatch) => {
  try {
    const response = await api.patch(`/api/spaces/${spaceId}`, updatedData);
    const updatedSpace = {
      id: response.data.spaceId,
      title: response.data.sname,
      coverType: response.data.sthumb,
      isPrimary: response.data.isPrimary,
      isPublic: response.data.isPublic,
    };
    dispatch(updateSpace(updatedSpace));
  } catch (error) {
    console.error('Error updating space:', error);
  }
};
