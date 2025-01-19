import React, { useState, useEffect } from "react";
import { HeartList, ClickedHeart, ListBox, TitleContainer, 
  FollowIconContainer, LeftIconContainer, TabContainer, TabButton } from "../styles/HeartButtonStyle";
import { FiUser, FiUserCheck, FiUserMinus } from "react-icons/fi"; 
import HeartAlert from "./HeartAlert";

const HeartButton = ({ isHeartOpen, toggleHeart }) => {
  const [tab, setTab] = useState("followers"); // 현재 활성화된 탭
  const [alertInfo, setAlertInfo] = useState( {isOpen: false, message: "" });
  
  const [followers, setFollowers] = useState([
    { id: 1, name: "IN/SPACE", Following: false },
    { id: 2, name: "웹프핑", isFollowing: false },
    { id: 5, name: "해리포터", isFollowing: false },
    { id: 6, name: "헤르미온느", isFollowing: false },
    { id: 7, name: "말포이", isFollowing: false },
  ]);
  const [following, setFollowing] = useState([
    { id: 3, name: "NOONSONG", isFollowing: true },
    { id: 4, name: "solux", isFollowing: true },
  ]);

  const [isScrollable, setIsScrollable] = useState(false);
  useEffect(() => {
    if (tab === "followers") {
      setIsScrollable(followers.length > 4); 
    } else {
      setIsScrollable(following.length > 4); 
    }
  }, [tab, followers, following]);


  // 팔로워 탭 -> 팔로잉 리스트에 추가
  const handleFollow = (id) => {
    const addedUser = followers.find((user) => user.id === id);

    // 팔로잉 리스트에 중복 추가 방지
    if (!following.some((user) => user.id === id)) {
      setFollowing((prev) => [...prev, { ...addedUser, isFollowing: true }]);
    }

    setAlertInfo({ isOpen: true, message: `${addedUser.name}님을 팔로우합니다!` });
  };

  // 팔로잉 리스트에서 제거
  const handleUnfollow = (id) => {
    const updatedFollowing = following.filter((user) => user.id !== id);

    setFollowing(updatedFollowing);

    const removedUser = following.find((user) => user.id === id);
    setAlertInfo({ isOpen: true, message: `${removedUser.name}님을 언팔로우합니다!` });
  };

  return (
    <>
      <ClickedHeart isActive={isHeartOpen} onClick={toggleHeart} />

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

          {/* 팔로워/팔로잉 리스트 */}
          <div>
            {(tab === "followers" ? followers : following).map((user) => (
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
            ))}
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
