import React, { createContext, useEffect, useState } from "react";
import axios from "../axios/AxiosGlobal";

/**
 * The DraftsDataContext is a context component to manage the drafts data centrally
 * so we can pass data from one component to another component without using props.
 * This drafts context data is desgned to centerally manage drafts primarily
 * used in the basic CRUD operation of drafts data. To create new draft, view details, update draft
 * and delete draft.
 */

/**
 * create context object called DraftsDataContext
 */
export const DraftsDataContext = createContext(null);

/**
 * Create provider object for the context we have created above
 * and create variables to be provided as values by this context
 */
export const DraftsDataProvider = (props) => {
  /**
   * This all variables are provided as values and will be available to all child components of the drafts context
   */
  const [drafts, setDrafts] = useState([]);
  const [filteredDrafts, setFilteredDrafts] = useState([]);
  const [searchDraft, setSearchDraft] = useState("");
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(0);

  const [showDraftAddForm, setShowDraftAddForm] = useState(false);
  const [showDraftEditForm, setShowDraftEditForm] = useState(false);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [networkErrorMessage, setNetworkErrorMessage] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  /**
   * Fetch drafts data with the useEffect hook and use it context data available to child components
   */
  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setNetworkErrorMessage(null);
    try {
      const res = await axios.get("mydrafts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      });
      setDrafts(res.data.data);
      setFilteredDrafts(res.data.data);
      setRequestCompleted(1);
      setNetworkErrorMessage(null);
    } catch (error) {
      setNetworkErrorMessage(error.name);
    }
  };

  /**
   * Implement delete drafts functionality. This functionality will be available to any child component,
   * so that the child component can execute this function to delete the selected draft info
   */
  const deleteDraft = async (draftID) => {
    return await axios
      .delete(`drafts/${draftID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setOpenDialog(false);
        fetchDrafts();
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
      });
  };

  /**
   * Implement get single drafts info functionality. This functionality will be available to any child component,
   * so that the child component can execute this function to get full draft details for the selected draft
   */
  const getDraftInfo = async (draftRow) => {
    try {
      const res = await axios.get(`drafts/${draftRow}`);
      setDraft(res.data.data.data);
      setOpenDialog(true);
    } catch (error) {}
  };

  /**
   * Filter drafts data based containing words input from user via a search box and store it
   * into a variable called filteredResult. This variable will be passed as provider value so that
   * the child component can access it and allow to input search items and render list of drafts
   * based on the filter criteria.
   */
  useEffect(() => {
    const filteredResult = drafts.filter((draft) => {
      return draft.short_title.toLowerCase().match(searchDraft.toLowerCase());
    });
    setFilteredDrafts(filteredResult);
  }, [searchDraft, drafts]);

  return (
    /**
     * Create a provider to the above context and pass all variables and methods so that they can be accessible for child components
     * Note that, the same pattern is used to create and manage data context for other major CRUD operarion of this application;
     * such as regions, institutions, sectors and users. So, the documentation we have made on this file will apply to other
     * contexts with the same pattern
     */
    <DraftsDataContext.Provider
      value={{
        drafts: drafts,
        setDrafts: setDrafts,
        filteredDrafts: filteredDrafts,
        setFilteredDrafts: setFilteredDrafts,
        searchDraft: searchDraft,
        setSearchDraft: setSearchDraft,
        draft: draft,
        setDraft: setDraft,
        fetchDrafts: fetchDrafts,
        showDraftAddForm: showDraftAddForm,
        setShowDraftAddForm: setShowDraftAddForm,
        showDraftEditForm: showDraftEditForm,
        setShowDraftEditForm: setShowDraftEditForm,
        serverErrorMsg: serverErrorMsg,
        setServerErrorMsg: setServerErrorMsg,
        serverSuccessMsg: serverSuccessMsg,
        setServerSuccessMsg: setServerSuccessMsg,
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        getDraftInfo: getDraftInfo,
        deleteDraft: deleteDraft,
        loading: loading,
        setLoading: setLoading,
        requestCompleted: requestCompleted,
        setRequestCompleted: setRequestCompleted,
        networkErrorMessage: networkErrorMessage,
        networkError: networkError,
        setNetworkError: setNetworkError,
      }}
    >
      {props.children}
    </DraftsDataContext.Provider>
  );
};