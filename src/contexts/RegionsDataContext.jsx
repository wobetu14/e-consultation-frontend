import React, { createContext, useEffect, useState } from "react";
import axios from "../axios/AxiosGlobal";

export const RegionsDataContext = createContext(null);

export const RegionsDataProvider = (props) => {
  const [regions, setRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [searchRegion, setSearchRegion] = useState("");
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestCompleted, setRequestCompleted]=useState(0);

  const [showRegionAddForm, setShowRegionAddForm] = useState(false);
  const [showRegionEditForm, setShowRegionEditForm] = useState(false);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage]=useState(null);
  const [networkError, setNetworkError]=useState(null);

  useEffect(() => {
    fetchRegions()
  }, [regions]);

  const fetchRegions = async () => {
    setFilteredRegions(null)
    try {
      const res = await axios.get("regions", 
      { 
        headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setRegions(res.data.data.data);
      setFilteredRegions(res.data.data.data);
      setRequestCompleted(1);
      setNetworkErrorMessage(null)
    } catch (error) {
      setNetworkErrorMessage(error.name)
    }
  };

  const deleteRegion = async (regionID) => {
    return await axios
      .delete(`regions/${regionID}`, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setOpenDialog(false);
        fetchRegions();
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
      });
  };

  useEffect(() => {
    const filteredResult = regions.filter((region) => {
      return region.name.toLowerCase().match(searchRegion.toLowerCase());
    });
    setFilteredRegions(filteredResult);
  }, [searchRegion, regions]);

  return (
    <RegionsDataContext.Provider
      value={{
        regions: regions,
        setRegions: setRegions,
        filteredRegions: filteredRegions,
        setFilteredRegions: setFilteredRegions,
        searchRegion: searchRegion,
        setSearchRegion: setSearchRegion,
        region: region,
        setRegion: setRegion,
        showRegionAddForm: showRegionAddForm,
        setShowRegionAddForm: setShowRegionAddForm,
        showRegionEditForm: showRegionEditForm,
        setShowRegionEditForm: setShowRegionEditForm,
        serverErrorMsg: serverErrorMsg,
        setServerErrorMsg: setServerErrorMsg,
        serverSuccessMsg: serverSuccessMsg,
        setServerSuccessMsg: setServerSuccessMsg,
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        deleteRegion: deleteRegion,
        loading: loading,
        setLoading: setLoading,
        requestCompleted:requestCompleted,
        setRequestCompleted:setRequestCompleted,
        networkErrorMessage:networkErrorMessage,
        setNetworkErrorMessage:setNetworkErrorMessage,
        fetchRegions:fetchRegions,
        networkError:networkError,
        setNetworkError:setNetworkError
      }}
    >
      {props.children}
    </RegionsDataContext.Provider>
  );
};
