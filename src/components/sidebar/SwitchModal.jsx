import React from "react";
import { FiBook, FiBookOpen } from "react-icons/fi";
import { SwitchButton } from "../../styles/sidebar/SwitchModalStyle";

const SwitchModal = ({ spaceId, isPublic, onSwitchToggle }) => {
  const handleClick = () => {
    onSwitchToggle(spaceId);
    // **추후 연동 필요**  
  };

  return (
    <SwitchButton onClick={handleClick}>
      {isPublic ? <FiBookOpen /> : <FiBook />}
    </SwitchButton>
  );
};

export default SwitchModal;
