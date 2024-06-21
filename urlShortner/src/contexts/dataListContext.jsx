import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dataList, setDataList] = useState([]);
    
    const load=()=>{
        
    };
    console.log(load)

    const addDataToList = () => {
        console.log('from context')
    };

    return (
        <DataContext.Provider value={{ dataList, addDataToList,load }}>
            {children}
        </DataContext.Provider>
    );
};
