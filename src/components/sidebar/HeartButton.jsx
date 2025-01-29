import React, { useState, useEffect } from "react";
import { HeartList, ListBox, TitleContainer, 
  FollowIconContainer, LeftIconContainer, TabContainer, TabButton } from "../../styles/sidebar/HeartButtonStyle";
import { FiUser, FiUserCheck, FiUserMinus } from "react-icons/fi"; 
import HeartAlert from "../alert/HeartAlert";
import axios from "axios";

axios.defaults.baseURL = "http://3.35.10.158:8080";

// Access Token 갱신 함수
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    alert("로그인이 필요합니다.");
    return null;
  }
  try {
    const response = await axios.post("/api/auth/refresh", { refreshToken });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken); // 갱신된 Access Token 저장
    return accessToken;
  } catch (error) {
    console.error("Access Token 갱신 실패:", error);
    alert("Access Token을 갱신하는 데 실패했습니다. 다시 로그인해주세요.");
    return null;
  }
};

const HeartButton = ({ isHeartOpen, toggleHeart }) => {
  const [tab, setTab] = useState("followers");
  const [alertInfo, setAlertInfo] = useState( {isOpen: false, message: "" });
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (tab === "followers") {
      setIsScrollable(followers.length > 4); 
    } else {
      setIsScrollable(following.length > 4); 
    }
  }, [tab, followers, following]);

  // 팔로워 데이터 불러오기 (GET /api/follow/followers)
  const fetchFollowers = async () => {
    const accessToken = localStorage.getItem("accessToken"); 
    if (!accessToken) {
      alert("로그인 상태를 확인하세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/follow/followers", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { followers } = response.data; 
      setFollowers(followers); 
    } catch (error) {
      console.error("팔로워 데이터 가져오기 실패:", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // 팔로잉 데이터 불러오기 (GET /api/follow/followings)
  const fetchFollowings = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인 상태를 확인하세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/follow/followings", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { followings } = response.data;
      setFollowing(followings);
    } catch (error) {
      console.error("팔로잉 데이터 가져오기 실패:", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        setError("인증되지 않은 회원입니다.");
      } else if (error.response.status === 404) {
        setError("사용자를 찾을 수 없습니다.");
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } else {
      setError("네트워크 오류가 발생했습니다.");
    }
  };

  // 탭 전환 시 데이터 호출
  useEffect(() => {
    if (tab === "followers") {
      fetchFollowers();
    } else if (tab === "following") {
      fetchFollowings();
    }
  }, [tab]);

  // 팔로우하기 (팔로워 탭 -> 팔로잉 리스트에 추가)
  const handleFollow = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인 상태를 확인하세요.");
      return;
    }

    try {
      const response = await axios.post(`/api/follow/new/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
        },
      });

      const { message } = response.data;
      alert(message);

      // 서버 데이터 동기화
      await fetchFollowings();

      // 로컬 상태 업데이트 
      const addedUser = followers.find((user) => user.id === id);
      if (addedUser && !following.some((user) => user.id === id)) {
      setFollowing((prev) => [...prev, { ...addedUser, isFollowing: true }]);
      }
      
      if (addedUser) {
        setAlertInfo({ isOpen: true, message: `${addedUser.name || addedUser.username}님을 팔로우합니다!` });
      }
    } catch (error) {
      console.error("팔로우 요청 실패:", error);
      if (error.response && error.response.status === 404) {
        alert("팔로우할 사용자를 찾을 수 없습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 언팔로우하기
  const handleUnfollow = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인 상태를 확인하세요.");
      return;
    }

    try {
      const response = await axios.delete(`/api/follow/undo/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control" : "no-cache",
        },
      });

      const { message } = response.data;
      alert(message);

      const removedUser = following.find((user) => user.id === id);
      await fetchFollowings();

      if (removedUser) {
        setAlertInfo({
          isOpen: true,
          message: `${removedUser.name || removedUser.username}님을 언팔로우합니다!`,
      }); }
    } catch (error) {
      console.error("언팔로우 요청 실패:", error);
      if (error.response && error.response.status === 404) {
        alert("언팔로우할 사용자를 찾을 수 없습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      {isHeartOpen && !alertInfo.isOpen && (
        <HeartList isScrollable = {isScrollable}>
          <TabContainer>
            <TabButton
              isActive={tab === "followers"}
              onClick={() => setTab("followers")}
            >
              팔로워
            </TabButton>
            <TabButton
              isActive={tab === "following"}
              onClick={() => setTab("following")}
            >
              팔로잉
            </TabButton>
          </TabContainer>

          <div>
            {error ? ( 
              <div> {error} </div>
            ) : (
              (tab === "followers" ? followers : following).map((user) => (
              <ListBox key={user.id}>
                <LeftIconContainer>
                  <FiUser />
                </LeftIconContainer>
                <TitleContainer>{user.name || user.username}</TitleContainer>
                <FollowIconContainer
                  onClick={() =>
                    tab === "followers"
                      ? handleFollow(user.id)
                      : handleUnfollow(user.id)
                  }
                >
                  {tab === "followers" ? <FiUserCheck /> : <FiUserMinus />}
                </FollowIconContainer>
              </ListBox>
            ))
          )}
          </div>
        </HeartList>
      )}

      <HeartAlert
        isOpen={alertInfo.isOpen}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ isOpen: false, message: "" })}
      />
    </>
  );
};

export default HeartButton;