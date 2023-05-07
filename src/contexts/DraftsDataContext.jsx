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
        showDraftAddForm:showDraftAddForm,
        setShowDraftAddForm:setShowDraftAddForm,
        showDraftEditForm:showDraftEditForm,
        setShowDraftEditForm:setShowDraftEditForm,
        serverErrorMsg:serverErrorMsg,
        setServerErrorMsg:setServerErrorMsg,
        serverSuccessMsg:serverSuccessMsg,
        setServerSuccessMsg:setServerSuccessMsg
      }}>
        {props.children}
    </DraftsDataContext.Provider>
  )
}