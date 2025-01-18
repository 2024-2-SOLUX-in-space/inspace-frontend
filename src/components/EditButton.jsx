import React, { useState, useEffect } from "react";
import { EditList, ClickedEdit, ListBox, TitleContainer, PublicIconContainer } from "../styles/EditButtonStyle";
import { FiBook, FiBookOpen } from "react-icons/fi";

const EditButton = ( {isEditOpen, toggleEdit} ) => {
    const [spaces, setSpaces] = useState ([
        { id: 1, title: "해리포터와 마법사의 돌", isPublic: false },
        { id: 2, title: "더 퍼스트 슬램덩크", isPublic: true }, 
        { id: 3, title: "지킬앤하이드", isPublic: true }, 
        { id: 4, title: "해리포터", isPublic: false}, 
        { id: 5, title: "헤르미온느", isPublic: false }, 
        { id: 6, title: "우와앙아아아아아아아아아아ㅏ아앙", isPublic: true },
    ]);

    const [isScrollable, setIsScrollable] = useState(false);
    useEffect( () => {
        setIsScrollable(spaces.length > 5);
    }, [spaces]); 

    const [ selectedBox, setSelectedBox ] = useState(null);

    const handleListBoxClick = (id) => {
        setSelectedBox(id);
        // 추후 연동 필요 - 개별 공간 목록 클릭 시 공간 이동 
    }

    return (
        <>
            <ClickedEdit isActive = {isEditOpen} onClick = {toggleEdit} />

            {isEditOpen && (
                <EditList isScrollable = {isScrollable}>
                    {spaces.map( (space) => (
                        <ListBox
                            key = {space.id}
                            isSelected = {selectedBox === space.id}
                            onClick = { () => handleListBoxClick (space.id) }
                        >
                            <PublicIconContainer>
                                { space.isPublic ? <FiBookOpen /> : <FiBook /> }
                            </PublicIconContainer>
                            <TitleContainer> {space.title} </TitleContainer>
                        </ListBox>
                    ))}
                </EditList>
            )}
        </>
    )
};

export default EditButton;