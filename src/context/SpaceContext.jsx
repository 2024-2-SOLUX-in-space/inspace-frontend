
    import React, { createContext, useState } from 'react';

    export const SpaceContext = createContext();

    export const SpaceProvider = ({ children }) => {
        const [selectedSpace, setSelectedSpace] = useState({ spaceId: '', title: '', sthumb: '' });

        return (
            <SpaceContext.Provider value={{ selectedSpace, setSelectedSpace }}>
                {children}
            </SpaceContext.Provider>
        );
    };