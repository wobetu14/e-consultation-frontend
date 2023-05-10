import React, { createContext, useEffect, useState } from 'react'
import axios from '../axios/AxiosGlobal'

export const DraftsDataContext=createContext(null);

export const DraftsDataProvider = (props) => {
    const [drafts, setDrafts]=useState([]);
    const [filteredDrafts, setFilteredDrafts]=useState([]);
    const [searchDraft, setSearchDraft]=useState("");
    const [draft, setDraft]=useState(null);

    const [showDraftAddForm, setShowDraftAddForm]=useState(false);
    const [showDraftEditForm, setShowDraftEditForm]=useState(false);

    const [serverErrorMsg, setServerErrorMsg]=useState(null);
    const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

    const [openDialog, setOpenDialog]=useState(false);

    useEffect(()=>{
        fetchDrafts();
    }, [])

    const fetchDrafts =async() =>{
        try{
          const res = await  axios.get('mydrafts')
            console.log(res.data.data.data);
            setDrafts(res.data.data.data);
            setFilteredDrafts(res.data.data.data);
        } catch(error){
            console.log(error);
         }
      }


      const deleteDraft=async (draftID) => {
        return await axios.delete(`drafts/${draftID}`)
        .then(res => {
          setServerSuccessMsg(res.data.message);
          setServerErrorMsg(null);
          setOpenDialog(false);
          fetchDrafts();
        })
        .catch(errors =>{
          setServerErrorMsg(errors.response.data.message);
          setServerSuccessMsg(null) 
        }) 
       }

       const getDraftInfo = async(draftRow) =>{
        try{
          const res = await axios.get(`drafts/${draftRow}`)
            setDraft(res.data.data.data);
            setOpenDialog(true);
        } catch(error){
            console.log(error);
         }
      }

      useEffect(()=>{
        const filteredResult=drafts.filter((draft)=>{
            return (
              draft.short_title.toLowerCase().match(searchDraft.toLowerCase())
                )
        });
        setFilteredDrafts(filteredResult);
    },[searchDraft, drafts])

  return (
    <DraftsDataContext.Provider value={{ 
        drafts:drafts,
        setDrafts:setDrafts,
        filteredDrafts:filteredDrafts,
        setFilteredDrafts:setFilteredDrafts,
        searchDraft:searchDraft,
        setSearchDraft:setSearchDraft,
        draft:draft,
        setDraft:setDraft,
        fetchDrafts:fetchDrafts,
        showDraftAddForm:showDraftAddForm,
        setShowDraftAddForm:setShowDraftAddForm,
        showDraftEditForm:showDraftEditForm,
        setShowDraftEditForm:setShowDraftEditForm,
        serverErrorMsg:serverErrorMsg,
        setServerErrorMsg:setServerErrorMsg,
        serverSuccessMsg:serverSuccessMsg,
        setServerSuccessMsg:setServerSuccessMsg,
        openDialog:openDialog,
        setOpenDialog:setOpenDialog,
        getDraftInfo:getDraftInfo,
        deleteDraft:deleteDraft,
      }}>
        {props.children}
    </DraftsDataContext.Provider>
  )
}