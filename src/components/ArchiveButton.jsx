import React from "react";
import { ArchiveList } from "../styles/ArchiveButtonStyle";

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {

  return (
    <>

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
