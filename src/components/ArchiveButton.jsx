import React from "react";
import { ArchiveContainer } from "../styles/ArchiveButtonStyle";

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {

  return (
    <>
      {/* 조건부 렌더링 */}
      {isArchiveOpen && (
        <ArchiveContainer>
          <h1>공간 목록</h1>
          <p>공간 내용</p>
        </ArchiveContainer>
      )}
    </>
  );
};

export default ArchiveButton;
