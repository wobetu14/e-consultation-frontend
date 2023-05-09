import React, { createContext, useEffect, useState } from 'react'
import axios from '../axios/AxiosGlobal'

export const SectorsDataContext=createContext(null);

export const SectorsDataProvider = (props) => {
    const [sectors, setSectors]=useState([]);
    const [filteredSectors, setFilteredSectors]=useState([]);
    const [searchSector, setSearchSector]=useState("");
    const [sector, setSector]=useState(null);

    const [showSectorAddForm, setShowSectorAddForm]=useState(false);
    const [showSectorEditForm, setShowSectorEditForm]=useState(false);

    const [serverErrorMsg, setServerErrorMsg]=useState(null);
    const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

    useEffect(()=>{
       fetchSectors();
    }, [])

    const fetchSectors =async() =>{
        try{
          const res = await  axios.get('sectors')
          setSectors(res.data.data.data);
          setFilteredSectors(res.data.data.data);
        } catch(error){
            console.log(error);
         }
      }
     

      useEffect(()=>{
        const filteredResult=sectors.filter((sector)=>{
            return (
                    sector.name.toLowerCase().match(searchSector.toLowerCase()) || 
                    sector.description.toLowerCase().match(searchSector.toLowerCase()) 
                )
        });
        setFilteredSectors(filteredResult);
    },[searchSector, sectors])

  return (
    <SectorsDataContext.Provider value={{ 
        sectors:sectors,
        setSectors:setSectors,
        filteredSectors:filteredSectors,
        setFilteredSectors:setFilteredSectors,
        searchSector:searchSector,
        setSearchSector:setSearchSector,
        sector:sector,
        setSector:setSector,
        showSectorAddForm:showSectorAddForm,
        setShowSectorAddForm:setShowSectorAddForm,
        showSectorEditForm:showSectorEditForm,
        setShowSectorEditForm:setShowSectorEditForm,
        serverErrorMsg:serverErrorMsg,
        setServerErrorMsg:setServerErrorMsg,
        serverSuccessMsg:serverSuccessMsg,
        setServerSuccessMsg:setServerSuccessMsg
      }}>
        {props.children}
    </SectorsDataContext.Provider>
  )
}