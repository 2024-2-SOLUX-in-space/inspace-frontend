// src/context/SpaceContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchSpaces } from '../api/space'; // spaces 데이터를 가져오는 API 함수

export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);
  const [primarySpace, setPrimarySpace] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [activeSpace, setActiveSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 초기 로딩 시 spaces 데이터 가져오기
  useEffect(() => {
    const loadSpaces = async () => {
      try {
        const fetchedSpaces = await fetchSpaces(); // API 호출하여 spaces 데이터 가져오기
        setSpaces(fetchedSpaces);
        console.log('Fetched Spaces:', fetchedSpaces);

        // isPrimary: true인 공간 찾기
        const primary = fetchedSpaces.find(space => space.isPrimary);
        if (primary) {
          const primarySpaceData = {
            id: primary.id,
            title: primary.title,
            coverType: primary.coverType,
          };
          setPrimarySpace(primarySpaceData);
          setActiveSpace(primarySpaceData);
          setSelectedSpace(primarySpaceData); // primarySpace를 selectedSpace로 설정
        } else if (fetchedSpaces.length > 0) {
          // isPrimary가 true인 공간이 없으면 첫 번째 공간을 기본 선택
          const firstSpace = fetchedSpaces[0];
          const firstSpaceData = {
            id: firstSpace.id,
            title: firstSpace.title,
            coverType: firstSpace.coverType,
          };
          setPrimarySpace(firstSpaceData);
          setActiveSpace(firstSpaceData);
          setSelectedSpace(firstSpaceData);
        }
      } catch (err) {
        console.error('Error loading spaces:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadSpaces();
  }, []);

  // spaces가 변경될 때마다 primarySpace 업데이트
  useEffect(() => {
    if (spaces.length === 0) {
      setPrimarySpace(null);
      setActiveSpace(null);
      setSelectedSpace(null);
    } else {
      const primary = spaces.find(space => space.isPrimary);
      if (primary) {
        const primarySpaceData = {
          id: primary.id,
          title: primary.title,
          coverType: primary.coverType,
        };
        setPrimarySpace(primarySpaceData);
        setActiveSpace(primarySpaceData);
        setSelectedSpace(primarySpaceData);
      } else {
        // isPrimary가 true인 공간이 없으면 첫 번째 공간을 기본 선택
        const firstSpace = spaces[0];
        const firstSpaceData = {
          id: firstSpace.id,
          title: firstSpace.title,
          coverType: firstSpace.coverType,
        };
        setPrimarySpace(firstSpaceData);
        setActiveSpace(firstSpaceData);
        setSelectedSpace(firstSpaceData);
      }
    }
  }, [spaces]);

  // primarySpace로 activeSpace를 설정하는 함수 추가
  const resetToPrimarySpace = () => {
    if (primarySpace) {
      setActiveSpace(primarySpace);
      setSelectedSpace(primarySpace);
      console.log('Reset to primary space:', primarySpace);
    }
  };

  return (
    <SpaceContext.Provider
      value={{
        spaces,
        setSpaces,
        primarySpace,
        setPrimarySpace,
        selectedSpace,
        setSelectedSpace,
        activeSpace,
        setActiveSpace,
        resetToPrimarySpace, // 추가된 함수
        loading,
        error,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

SpaceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
