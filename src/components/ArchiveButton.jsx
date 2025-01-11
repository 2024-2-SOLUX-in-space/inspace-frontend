import React from "react";
import { ArchiveList, ClickedArchive } from "../styles/ArchiveButtonStyle";

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {

  return (
    <>

        <ClickedArchive isActive = {isArchiveOpen} onClick = {toggleArchive} />

      {/* 조건부 렌더링 - ArchiveList */}
      {isArchiveOpen && (
        <ArchiveList>
          <h1>공간 목록</h1>
          <p>공간 내용</p>
        </ArchiveList>
      )}
    </>
  );
};

export default ArchiveButton;
