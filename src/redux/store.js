import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import spaceReducer from './reducers/spaceReducer';
import authReducer from './reducers/authReducer'; // ✅ authReducer 추가

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);

    // ✅ 현재 로그인한 계정의 primarySpace를 계정별로 저장
    if (state.space.activeSpace?.isPrimary && state.auth?.currentUser?.id) {
      localStorage.setItem(
        `primarySpace_${state.auth.currentUser.id}`,
        JSON.stringify(state.space.activeSpace),
      );
    }
  } catch (err) {
    console.error('❌ 상태 저장 중 오류 발생:', err);
  }
};

const loadPrimarySpace = (currentUserId) => {
  try {
    if (!currentUserId) return null;
    const savedPrimarySpace = localStorage.getItem(
      `primarySpace_${currentUserId}`,
    );
    return savedPrimarySpace ? JSON.parse(savedPrimarySpace) : null;
  } catch (err) {
    console.error('❌ primarySpace 로드 중 오류 발생:', err);
    return null;
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    const initialState = serializedState ? JSON.parse(serializedState) : {};

    const currentUserId = initialState.auth?.currentUser?.id || null;

    return {
      space: {
        ...initialState.space,
        activeSpace: loadPrimarySpace(currentUserId) || null,
      },
      auth: initialState.auth || {}, // ✅ 로그인 정보 유지
    };
  } catch (err) {
    console.error('❌ Redux 상태 로드 중 오류 발생:', err);
    return { space: { spaces: [], activeSpace: null }, auth: {} };
  }
};

const persistedState = loadState();

const rootReducer = combineReducers({
  space: spaceReducer,
  auth: authReducer, // ✅ authReducer 추가 (로그인 상태 관리)
});

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

// ✅ Redux 상태가 변경될 때마다 `primarySpace`와 `state` 저장
store.subscribe(() => {
  const currentState = store.getState();
  saveState(currentState); // ✅ 전체 Redux 상태 저장
});

export default store;
