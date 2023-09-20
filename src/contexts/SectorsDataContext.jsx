import React, { createContext, useEffect, useState } from "react";
import axios from "../axios/AxiosGlobal";

export const SectorsDataContext = createContext(null);

export const SectorsDataProvider = (props) => {
  const [sectors, setSectors] = useState([]);
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [searchSector, setSearchSector] = useState("");
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestCompleted, setRequestCompleted]=useState(0);

  const [showSectorAddForm, setShowSectorAddForm] = useState(false);
  const [showSectorEditForm, setShowSectorEditForm] = useState(false);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage]=useState(null)

  useEffect(() => {
    fetchSectors();
  }, [sectors]);

  const fetchSectors = async () => {
    setNetworkErrorMessage(null)
    try {
      const res = await axios.get("sectors", 
      { timeout:"5000",
        headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setSectors(res.data.data.data);
      setFilteredSectors(res.data.data.data);
      setNetworkErrorMessage(null)
      setRequestCompleted(1);
    } catch (error) {
      setNetworkErrorMessage(error.name)
    }
  };

  const deleteSector = async (sectorID) => {
    return await axios
      .delete(`sectors/${sectorID}`, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setOpenDialog(false);
        fetchSectors();
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
      });
  };

  useEffect(() => {
    const filteredResult = sectors.filter((sector) => {
      return (
        sector.name.toLowerCase().match(searchSector.toLowerCase()) ||
        sector.description.toLowerCase().match(searchSector.toLowerCase())
      );
    });
    setFilteredSectors(filteredResult);
  }, [searchSector, sectors]);

  return (
    <SectorsDataContext.Provider
      value={{
        sectors: sectors,
        setSectors: setSectors,
        filteredSectors: filteredSectors,
        setFilteredSectors: setFilteredSectors,
        searchSector: searchSector,
        setSearchSector: setSearchSector,
        sector: sector,
        setSector: setSector,
        showSectorAddForm: showSectorAddForm,
        setShowSectorAddForm: setShowSectorAddForm,
        showSectorEditForm: showSectorEditForm,
        setShowSectorEditForm: setShowSectorEditForm,
        serverErrorMsg: serverErrorMsg,
        setServerErrorMsg: setServerErrorMsg,
        serverSuccessMsg: serverSuccessMsg,
        setServerSuccessMsg: setServerSuccessMsg,
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        deleteSector: deleteSector,
        fetchSectors: fetchSectors,
        loading: loading,
        setLoading: setLoading,
        requestCompleted:requestCompleted,
        setRequestCompleted:setRequestCompleted,
        networkErrorMessage:networkErrorMessage,
        setNetworkErrorMessage:setNetworkErrorMessage,
        fetchSectors:fetchSectors
      }}
    >
      {props.children}
    </SectorsDataContext.Provider>
  );
};
