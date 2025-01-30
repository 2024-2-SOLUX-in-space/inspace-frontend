import React, { useState, useEffect } from "react";
import { HeartList, ListBox, TitleContainer, 
  FollowIconContainer, LeftIconContainer, TabContainer, TabButton } from "../../styles/sidebar/HeartButtonStyle";
import { FiUser, FiUserCheck, FiUserMinus } from "react-icons/fi"; 
import HeartAlert from "../alert/HeartAlert";
import api from '../../api/api.js';

const HeartButton = ({ isHeartOpen }) => {
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
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/follow/followers");

      setFollowers(
        (response.data || []).map((follower) => ({
          id: follower.followingId, 
          name: follower.name, 
        }))
      );
    } catch (error) {
      
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };  
  
  // 팔로잉 데이터 불러오기 (GET /api/follow/followings)
  const fetchFollowings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/follow/followings");

      setFollowing(
        (response.data || []).map((following) => ({
          id: following.followingId, 
          name: following.name,
        }))
      );
    } catch (error) {
      
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
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
    try {
      const isAlreadyFollowing = following.some((user) => user.id === id);
      if (isAlreadyFollowing) {
        const existingUser = following.find((user) => user.id === id);
  
        // 이미 팔로우 중인 경우
        setAlertInfo({
          isOpen: true,
          message: `${existingUser.name}님은 이미 팔로우 중입니다.`,
        });
        return; 
      }

      const response = await api.post(`/api/follow/new/${id}`, {}); 
      const { message } = response.data;
      
      if (message) {
        alert(message); 
      } else {
        console.log("서버 응답 메시지가 없습니다.");
      }
      await fetchFollowings();

      const addedUser = followers.find((user) => user.id === id); 
      if (addedUser) {
        setAlertInfo({
          isOpen: true,
          message: `${addedUser.name}님을 팔로우합니다!`, 
      });
    }
  } catch (error) {
    alert("팔로우 요청 중 오류가 발생했습니다.");
  }
};

  // 언팔로우하기
  const handleUnfollow = async (id) => {
    try {
      const response = await api.delete(`/api/follow/undo/${id}`); 
      const { message } = response.data;
      
      if (message) {
        alert(message);
      } else {
        console.log("서버 응답 메시지가 없습니다.");
      }
      await fetchFollowings();
  
      const removedUser = following.find((user) => user.id === id); 
      if (removedUser) {
        setAlertInfo({
          isOpen: true,
          message: `${removedUser.name}님을 언팔로우합니다!`, 
        });
      }
    } catch (error) {
      alert("언팔로우 요청 중 오류가 발생했습니다.");
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
            ) : (tab === "followers" ? followers : following).length === 0 ? (
              <div style={{textAlign: "center"}}>목록이 비어 있습니다.</div> 
            ) : (
              (tab === "followers" ? followers : following).map((user) => (
              <ListBox key={user.id}>
                <LeftIconContainer>
                  <FiUser />
                </LeftIconContainer>
                <TitleContainer>{user.name}</TitleContainer>
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