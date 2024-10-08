import React, { createContext, useEffect, useState } from "react";
import axios from "../axios/AxiosGlobal";

export const InstitutionsDataContext = createContext(null);

export const InstitutionsDataProvider = (props) => {
  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [searchInstitution, setSearchInstitution] = useState("");
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(0);

  const [showInstitutionAddForm, setShowInstitutionAddForm] = useState(false);
  const [showInstitutionEditForm, setShowInstitutionEditForm] = useState(false);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [networkErrorMessage, setNetworkErrorMessage] = useState(null);

  const [networkError, setNetworkError] = useState(null);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    setNetworkErrorMessage(null);
    try {
      const res = await axios.get("public/institutions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      });
      setInstitutions(res.data.data.data);
      setFilteredInstitutions(res.data.data.data);
      setRequestCompleted(1);
      setNetworkErrorMessage(null);
    } catch (error) {
      setNetworkErrorMessage(error.name);
    }
  };

  const deleteInstitution = async (institutionID) => {
    return await axios
      .delete(`institutions/${institutionID}`, {
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
        fetchInstitutions();
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
      });
  };

  useEffect(() => {
    const filteredResult = institutions.filter((institution) => {
      return (
        institution.name.toLowerCase().match(searchInstitution.toLowerCase()) ||
        institution.email
          .toLowerCase()
          .match(searchInstitution.toLowerCase()) ||
        institution.address
          .toLowerCase()
          .match(searchInstitution.toLowerCase()) ||
        institution.telephone
          .toLowerCase()
          .match(searchInstitution.toLowerCase())
      );
    });
    setFilteredInstitutions(filteredResult);
  }, [searchInstitution, institutions]);

  return (
    <InstitutionsDataContext.Provider
      value={{
        institutions: institutions,
        setInstitutions: setInstitutions,
        filteredInstitutions: filteredInstitutions,
        setFilteredInstitutions: setFilteredInstitutions,
        searchInstitution: searchInstitution,
        setSearchInstitution: setSearchInstitution,
        institution: institution,
        setInstitution: setInstitution,
        showInstitutionAddForm: showInstitutionAddForm,
        setShowInstitutionAddForm: setShowInstitutionAddForm,
        showInstitutionEditForm: showInstitutionEditForm,
        setShowInstitutionEditForm: setShowInstitutionEditForm,
        serverErrorMsg: serverErrorMsg,
        setServerErrorMsg: setServerErrorMsg,
        serverSuccessMsg: serverSuccessMsg,
        setServerSuccessMsg: setServerSuccessMsg,
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        deleteInstitution: deleteInstitution,
        fetchInstitutions: fetchInstitutions,
        loading: loading,
        setLoading: setLoading,
        requestCompleted: requestCompleted,
        setRequestCompleted: setRequestCompleted,
        networkErrorMessage: networkErrorMessage,
        setNetworkErrorMessage: setNetworkErrorMessage,
        networkError: networkError,
        setNetworkError: setNetworkError,
      }}
    >
      {props.children}
    </InstitutionsDataContext.Provider>
  );
};
