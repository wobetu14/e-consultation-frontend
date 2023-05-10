import React, { createContext, useEffect, useState } from 'react'
import axios from "../axios/AxiosGlobal"

export const RegionsDataContext=createContext(null);

export const RegionsDataProvider = (props) => {
    const [regions, setRegions]=useState([]);
    const [filteredRegions, setFilteredRegions]=useState([]);
    const [searchRegion, setSearchRegion]=useState("");
    const [region, setRegion]=useState(null);

    const [showRegionAddForm, setShowRegionAddForm]=useState(false);
    const [showRegionEditForm, setShowRegionEditForm]=useState(false);

    const [serverErrorMsg, setServerErrorMsg]=useState(null);
    const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

    const [openDialog, setOpenDialog]=useState(false);

    useEffect(()=>{
       fetchRegions();
    }, [])

    const fetchRegions =async() =>{
        try{
          const res = await  axios.get('regions')
            setRegions(res.data.data.data);
            setFilteredRegions(res.data.data.data);
        } catch(error){
            console.log(error);
         }
      }

      const deleteRegion=async (regionID) => {
        return await axios.delete(`regions/${regionID}`)
        .then(res => {
          setServerSuccessMsg(res.data.message);
          setServerErrorMsg(null);
          setOpenDialog(false);
          fetchRegions();
        })
        .catch(errors =>{
          setServerErrorMsg(errors.response.data.message);
          setServerSuccessMsg(null) 
        }) 
       }
     

      useEffect(()=>{
        const filteredResult=regions.filter((region)=>{
            return (
                    region.name.toLowerCase().match(searchRegion.toLowerCase())
                )
        });
        setFilteredRegions(filteredResult);
    },[searchRegion, regions])

  return (
    <RegionsDataContext.Provider value={{ 
        regions:regions,
        setRegions:setRegions,
        filteredRegions:filteredRegions,
        setFilteredRegions:setFilteredRegions,
        searchRegion:searchRegion,
        setSearchRegion:setSearchRegion,
        region:region,
        setRegion:setRegion,
        showRegionAddForm:showRegionAddForm,
        setShowRegionAddForm:setShowRegionAddForm,
        showRegionEditForm:showRegionEditForm,
        setShowRegionEditForm:setShowRegionEditForm,
        serverErrorMsg:serverErrorMsg,
        setServerErrorMsg:setServerErrorMsg,
        serverSuccessMsg:serverSuccessMsg,
        setServerSuccessMsg:setServerSuccessMsg,
        openDialog:openDialog,
        setOpenDialog:setOpenDialog,
        deleteRegion:deleteRegion,
      }}>
        {props.children}
    </RegionsDataContext.Provider>
  )
}