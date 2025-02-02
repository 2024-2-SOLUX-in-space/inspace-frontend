const login = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/api/auth/login', userData);

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('authToken', token); // ✅ 로그인 후 토큰 저장
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });

      console.log('✅ 로그인 성공, 공간 목록 불러오기 시작...');
      dispatch(fetchSpaces()); // ✅ 로그인 후 공간 목록 불러오기
    }
  } catch (error) {
    console.error('❌ 로그인 실패:', error.response?.data || error.message);
  }
};

export default login;
