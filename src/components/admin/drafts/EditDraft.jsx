import { Typography, Button, FormControlLabel, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme, FormHelperText, MenuItem, RadioGroup, Radio } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useState, useEffect, useContext } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';
import { UserContext } from '../../../contexts/UserContext';
import { DraftsDataContext } from '../../../contexts/DraftsDataContext';

const EditDraft = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    const [institutions, setInstitutions]=useState(null);
    const [lawCategories, setLawCategories]=useState(null);
    const [sectors, setSectors]=useState(null);

  // User context
  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  const {
    drafts,
    setDrafts,
    filteredDrafts,
    setFilteredDrafts,
    searchDraft,
    setSearchDraft,
    draft,
    setDraft,
    fetchDrafts,
    showDraftAddForm,
    setShowDraftAddForm,
    showDraftEditForm,
    setShowDraftEditForm,
    serverErrorMsg,
    setServerErrorMsg,
    serverSuccessMsg,
    setServerSuccessMsg
}=useContext(DraftsDataContext);

 const helperTextStyle={
  color:'red',
  fontWeight:'400',
  fontSize:'15px'
 }

 useEffect(()=>{
    fetchInstitutions();
 }, [institutions])

 useEffect(()=>{
  fetchLawCategories();
 }, [lawCategories])

 useEffect(()=>{
   fetchSectors();
 }, [sectors])

 useEffect(()=>{
    fetchDrafts();
 },[drafts])

 const fetchInstitutions =async() =>{
  return await  axios.get('institutions')
    .then(res=>res.data.data)
    .then(res=>{
      setInstitutions(res.data)
    }).catch(error=>{
      console.log(error.response.message);
    })
  }

  const fetchLawCategories = async()=>{
    return await  axios.get('law-categories')
    .then(res=>res.data.data)
    .then(res=>{
      setLawCategories(res.data)
    }).catch(error=>{
      console.log(error.response.message);
    })
  }

  const fetchSectors = async() =>{
    return await  axios.get('sectors')
    .then(res=>res.data.data)
    .then(res=>{
      setSectors(res.data)
    }).catch(error=>{
      console.log(error.response.message);
    })
  }

 const formik=useFormik({
    initialValues:{
        institutionID:draft ? (draft.institution.id):"",
        shortTitle:draft ? (draft.short_title):"",
        lawCategoryId:draft ? (draft.law_category_id):"",
        draftStatusId:draft ? (draft.draft_status_id):"",
        sectorId:draft ? (draft.sector_id):"",
        // file:draft ? (draft.file):null,
        // slug:"slug_here",
        active:draft ? (draft.active):"",
        parent_id:draft ? (draft.parent_id):"",
        // tags:"",
        // noteId:"1",
        baseLegalReference:draft ? (draft.base_legal_reference):"",
        definition:draft ? (draft.definition):"",
        scope:draft ? (draft.scope):"",
        mainProvision:draft ? (draft.main_provision):"",
        summary:draft ? (draft.summary):"",
        amendedLaws:draft ? (draft.amended_laws):"",
        repealedLaws:draft ? (draft.repealed_laws):"",
        transitoryProvision:draft ? (draft.transitory_provision):"",
        updatedBy:userInfo.user.updated_by
    },

  onSubmit:(values)=>{
    const draftsData={
      institution_id:values.institutionID,
      short_title:values.shortTitle,
      law_category_id:values.lawCategoryId,
      draft_status_id:values.draftStatusId,
      sector_id:values.sectorId,
      comment_opening_date:values.openingDate,
      comment_closing_date:values.closingDate,
    //   file:values.file,
      slug:values.slug,
      active:values.active,
      parent_id:values.parentId,
      tags:values.tags,
      note_id:values.noteId,
      base_legal_reference:values.baseLegalReference,
      definition:values.definition,
      scope:values.scope,
      main_provision:values.mainProvision,
      summary:values.summary,
      amended_laws:values.amendedLaws,
      repealed_laws:values.repealedLaws,
      transitory_provision:values.transitoryProvision,
      comment_request_description:values.summary,
      comment_summary:values.summary,
      updated_by:values.updatedBy
    };

    updateDraftDocument(draftsData);
  }
}); 
    
const updateDraftDocument=async (draftsData) => {
    //  console.log(companyData)
    return await axios.put(`drafts/${draft.id}`, draftsData)
    .then(res => {
      console.log(res.data)
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null);
      formik.resetForm();
      fetchDrafts();
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
       setServerSuccessMsg(null) 
    }) 
   }
   
  return (
    <Box width={'95%'}>
      <Header title="Edit Draft Document Information" subtitle="" />
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >

        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
              <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
                <InputLabel>Select Institution</InputLabel>
                <Select
                  labelId="institution_id"
                  id="institution_id"  
                  size="small"
                  color="info"          
                  name='institutionID'
                  value={formik.values.institutionID}
                  onChange={formik.handleChange}
                  helperText={formik.touched.institutionID && formik.errors.institutionID ? <span style={helperTextStyle}>{formik.errors.institutionID}</span>:null}
                >
                    {
                      institutions ? institutions.map((institution)=>(
                        <MenuItem value={institution.id} key={institution.id}>{institution.name}</MenuItem>
                      )): null
                    }
                </Select>
              <FormHelperText>{formik.touched.institutionID && formik.errors.institutionID ? <span style={helperTextStyle}>{formik.errors.institutionID}</span>:null}</FormHelperText>
            </FormControl>

                <TextField 
                  label="Short title" 
                  variant='outlined'
                  size='small' 
                  fullWidth
                  rows={4}
                  sx={{ paddingBottom:"30px" }}
                  color="info"
                  name='shortTitle'
                  value={formik.values.shortTitle}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={formik.touched.shortTitle && formik.errors.shortTitle ? <span style={helperTextStyle}>{formik.errors.shortTitle}</span>:null}
                />


          <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Law Category</Typography>
              <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
                <InputLabel>Select Law Category</InputLabel>
                <Select
                  labelId="law_category_Id"
                  id="law_category_Id"  
                  size='small'
                  placeholder='Select law category'
                  color="info"          
                  name='lawCategoryId'
                  value={formik.values.lawCategoryId}
                  onChange={formik.handleChange}
                  helperText={formik.touched.lawCategoryId && formik.errors.lawCategoryId ? <span style={helperTextStyle}>{formik.errors.lawCategoryId}</span>:null}
                >
                    {
                      lawCategories ? lawCategories.map((lawCategory)=>(
                        <MenuItem value={lawCategory.id} key={lawCategory.id}>{lawCategory.name}</MenuItem>
                      )): null
                    }
                </Select>
              <FormHelperText>{formik.touched.lawCategoryId && formik.errors.lawCategoryId ? <span style={helperTextStyle}>{formik.errors.lawCategoryId}</span>:null}</FormHelperText>
            </FormControl>

      <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Economic Sector</Typography>
              <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
                <InputLabel>Select Economic Sector</InputLabel>
                <Select
                  labelId="law_category_Id"
                  id="law_category_Id"  
                  size="small"
                  placeholder='Select law category'
                  color="info"          
                  name='sectorId'
                  value={formik.values.sectorId}
                  onChange={formik.handleChange}
                  helperText={formik.touched.sectorId && formik.errors.sectorId ? <span style={helperTextStyle}>{formik.errors.sectorId}</span>:null}
                >
                    {
                      sectors ? sectors.map((sector)=>(
                        <MenuItem value={sector.id} key={sector.id}>{sector.name}</MenuItem>
                      )): null
                    }
                </Select>
              <FormHelperText>{formik.touched.sectorId && formik.errors.sectorId ? <span style={helperTextStyle}>{formik.errors.sectorId}</span>:null}</FormHelperText>
            </FormControl>

          <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
            Opening Date
          </Typography>
                <TextField 
                  variant='outlined' 
                  fullWidth
                  size="small"
                  type="date"
                  sx={{ paddingBottom:"30px" }}
                  color="info"
                  name='openingDate'
                  value={formik.values.openingDate}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={formik.touched.openingDate && formik.errors.openingDate ? <span style={helperTextStyle}>{formik.errors.openingDate}</span>:null}
                />

          <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
            Closing Date
          </Typography>
                <TextField 
                  variant='outlined' 
                  size="small"
                  fullWidth
                  type="date"
                  sx={{ paddingBottom:"30px" }}
                  color="info"
                  name='closingDate'
                  value={formik.values.closingDate}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={formik.touched.closingDate && formik.errors.closingDate ? <span style={helperTextStyle}>{formik.errors.closingDate}</span>:null}
                />
          </Grid>
          <Grid item xs={4}>
              <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Active status</Typography>
                <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="active"
                        size="small"
                        value={formik.values.active}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel value='1' control={<Radio />} label="Yes"  />
                        <FormControlLabel value='2' control={<Radio />} label="No"  />
                  </RadioGroup>      

              <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
                <InputLabel>Previous Version</InputLabel>
                <Select
                  labelId="previous_verion"
                  id="previous_verion"  
                  size='small'
                  color="info"          
                  name='parentId'
                  value={formik.values.parentId}
                  onChange={formik.handleChange}
                  helperText={formik.touched.parentId && formik.errors.parentId ? <span style={helperTextStyle}>{formik.errors.parentId}</span>:null}
                >
                    {
                      drafts ? drafts.map((draft)=>(
                        <MenuItem value={draft.id} key={draft.id}>{draft.short_title}</MenuItem>
                      )): null
                    }
                </Select>
              <FormHelperText>{formik.touched.parentId && formik.errors.parentId ? <span style={helperTextStyle}>{formik.errors.parentId}</span>:null}</FormHelperText>
            </FormControl>

              <TextField 
                label="Tags" 
                variant='outlined' 
                multiline
                rows={4} 
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name='tags'
                value={formik.values.tags}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.tags && formik.errors.tags ? <span style={helperTextStyle}>{formik.errors.tags}</span>:null}
              />

              <TextField 
                label="Base Legal Reference" 
                variant='outlined'
                size="small"
                multiline
                rows={4} 
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name='baseLegalReference'
                value={formik.values.baseLegalReference}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.baseLegalReference && formik.errors.baseLegalReference ? <span style={helperTextStyle}>{formik.errors.baseLegalReference}</span>:null}
              />

              <TextField 
                label="Definition" 
                variant='outlined' 
                size="small"
                multiline
                rows={4} 
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name='definition'
                value={formik.values.definition}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.definition && formik.errors.definition ? <span style={helperTextStyle}>{formik.errors.definition}</span>:null}
              />

              <TextField 
                label="Scope" 
                variant='outlined' 
                size="small"
                multiline
                rows={4} 
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name='scope'
                value={formik.values.scope}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.scope && formik.errors.scope ? <span style={helperTextStyle}>{formik.errors.scope}</span>:null}
              />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              label="Main Provision" 
              variant='outlined' 
              size='small'
              multiline
              rows={4} 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='mainProvision'
              value={formik.values.mainProvision}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.mainProvision && formik.errors.mainProvision ? <span style={helperTextStyle}>{formik.errors.mainProvision}</span>:null}
            />
            <TextField 
              label="Summary" 
              variant='outlined' 
              size="small"
              multiline
              rows={4}
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='summary'
              value={formik.values.summary}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.summary && formik.errors.summary ? <span style={helperTextStyle}>{formik.errors.summary}</span>:null}
            />

            <TextField 
              label="Amended Laws"
              variant='outlined' 
              size="small"
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='amendedLaws'
              value={formik.values.amendedLaws}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.amendedLaws && formik.errors.amendedLaws ? <span style={helperTextStyle}>{formik.errors.amendedLaws}</span>:null}
            />

            <TextField 
              label="Repealed Laws"
              variant='outlined' 
              size='small'
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='repealedLaws'
              value={formik.values.repealedLaws}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.repealedLaws && formik.errors.repealedLaws ? <span style={helperTextStyle}>{formik.errors.repealedLaws}</span>:null}
            />

            <TextField 
              label="Transitory Provision"
              variant='outlined' 
              size="small"
              multiline
              rows={4}
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='transitoryProvision'
              value={formik.values.transitoryProvision}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.transitoryProvision && formik.errors.transitoryProvision ? <span style={helperTextStyle}>{formik.errors.transitoryProvision}</span>:null}
            />

  {/* <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
        <strong>Attachement:</strong> 
        Please attach the draft document file. (Only .doc or .docx files are allowed.)
        </Typography>
            <TextField 
                variant='outlined' 
                fullWidth 
                sx={{ paddingBottom:'20px' }}
                color="info"
                type='file'
                name='file'
                onBlur={formik.handleBlur}
                onChange={(e)=>{formik.setFieldValue("file",e.target.files[0])}}
                helperText={formik.touched.file && formik.errors.file ? <span style={helperTextStyle}>{formik.errors.file}</span>:null}
              /> */}

          <Grid 
                sx={{ paddingBottom:"20px" }}
                align='right'
              >
            
              <Button type='submit' variant='contained'
                size="small"
                sx={{ align:'right', textTransform:'none' }}
                color='secondary' elevation={10}
              >
                Save Changes </Button>
              </Grid>
          </Grid>
        </Grid>
    </form>
 </motion.span>
</Box> 
  )
}

export default EditDraft