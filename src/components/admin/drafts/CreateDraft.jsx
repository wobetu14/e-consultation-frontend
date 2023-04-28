import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme, FormHelperText, MenuItem, RadioGroup, Radio } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useState, useEffect } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';

const CreateDraft = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    const [institutions, setInstitutions]=useState(null);
    const [lawCategories, setLawCategories]=useState(null);
    const [sectors, setSectors]=useState(null);
    const [drafts, setDrafts]=useState(null);

  const [serverErrorMsg, setServerErrorMsg]=useState(null);
  const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

  const errorStyle={
    color:'red',
    fontWeight:'400',
    fontSize:'18px'
  }

  const successStyle={
   color:'green',
   fontWeight:'400',
   fontSize:'18px'
 }

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
  

  const fetchDrafts = async()=>{
    return await  axios.get('drafts')
    .then(res=>res.data.data)
    .then(res=>{
      setDrafts(res.data)
    }).catch(error=>{
      console.log(error.response.message);
    })
  }


 const formik=useFormik({
    initialValues:{
        institutionID:"",
        shortTitle:"",
        lawCategoryId:"",
        draftStatusId:1,
        sectorId:"",
        openingDate:"",
        closingDate:"",
        expectedDate:"",
        effectiveDate:"",
        createdBy:1,
        file:null,
        slug:"slug_here",
        active:"",
        parent_id:"",
        tags:"",
        noteId:"1",
        baseLegalReference:"",
        definition:"",
        scope:"",
        mainProvision:"",
        summary:"",
        startPage:"",
        endPage:"",
        amendedLaws:"",
        repealedLaws:"",
        transitoryProvision:"",
    },

validationSchema:YUP.object({
    institutionID:YUP.number().required("This field is required. Please enter the institution name."),
    shortTitle:YUP.string().required("This field is required. Please provide a short description about the document."),
    lawCategoryId:YUP.number().required("This field is required. Please select law category this document belongs to."),
    draftStatusId:YUP.number().required("This field is required. Please select the draft status."),
    sectorId:YUP.number().required("This field is required. Please select sector."),
    openingDate:YUP.date().required("This field is required. Please provide opening date."),
    closingDate:YUP.date().required("This field is required. Please provide closing date."),
    expectedDate:YUP.string().required("This field is required. Please provide expeted date."),
    effectiveDate:YUP.string().required("This field is required. Please provide effective date."),
    // createdBy:YUP.number().required("This field is required. Please provide the user uploading this document."),
    file:YUP.mixed().required("This field is required. Please choose file to upload."),
    // slug:YUP.string().required("This field is required. Please provide document slug."),
    active:YUP.number().required("This field is required. Please provide the status of this document."),
    parentId:YUP.number().required("This field is required. Please provide parent reference of this document."),
    tags:YUP.string().required("This field is required. Please provide tag info for this document."),
    baseLegalReference:YUP.string().required("This field is required. Please provide base legal reference of this document."),
    definition:YUP.string().required("This field is required. Please provide definition for this document."),
    scope:YUP.string().required("This field is required. Please provide a scope for this document."),
    mainProvision:YUP.string().required("This field is required. Please provide main provision for this document."),
    summary:YUP.string().required("This field is required. Please provide summary."),
    startPage:YUP.number().required("This field is required. Please provide start page."),
    endPage:YUP.number().required("This field is required. Please provide end page."),
    amendedLaws:YUP.string().required("This field is required."),
    repealedLaws:YUP.string().required("This field is required."),
    transitoryProvision:YUP.string().required("This field is required."), 
  }),

  onSubmit:(values)=>{
    const draftsData={
      institution_id:values.institutionID,
      short_title:values.shortTitle,
      law_category_id:values.lawCategoryId,
      draft_status_id:values.draftStatusId,
      sector_id:values.sectorId,
      comment_opening_date:values.openingDate,
      comment_closing_date:values.closingDate,
      expected_date:values.expectedDate,
      effective_date:values.effectiveDate,
      created_by:values.createdBy,
      file:values.file,
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
      start_page:values.startPage,
      end_page:values.endPage,
      amended_laws:values.amendedLaws,
      repealed_laws:values.repealedLaws,
      transitory_provision:values.transitoryProvision,
      comment_request_description:values.summary,
      comment_summary:values.summary,
    };

    createDraftDocument(draftsData);
  }
}); 
    
const createDraftDocument=async (draftsData) => {
    //  console.log(companyData)
    return await axios.post('drafts', draftsData)
    .then(res => {
      console.log(res.data)
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null)
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null) 
    }) 
   }
   
  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="Upload new draft document" subtitle="Manage draft documents" />
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
      <Stack
        sx={{  width:"50%"  }}
      >
        <form onSubmit={formik.handleSubmit}>

        <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Select Institution</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select Institution</InputLabel>
            <Select
              labelId="institution_id"
              id="institution_id"  
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

            {/* <TextField 
              label="Institution ID" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='institutionID'
              value={formik.values.institutionID}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.institutionID && formik.errors.institutionID ? <span style={helperTextStyle}>{formik.errors.institutionID}</span>:null}
            /> */}

            <TextField 
              label="Short title" 
              variant='outlined' 
              fullWidth
              multiline
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

           {/*  <TextField 
              label="Law category ID" 
              variant='outlined' 
              fullWidth
              type="number"
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='lawCategoryId'
              value={formik.values.lawCategoryId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.lawCategoryId && formik.errors.lawCategoryId ? <span style={helperTextStyle}>{formik.errors.lawCategoryId}</span>:null}
            /> */}

          {/*   <TextField 
              label="Draft Status ID" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='draftStatusId'
              value={formik.values.draftStatusId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.draftStatusId && formik.errors.draftStatusId ? <span style={helperTextStyle}>{formik.errors.draftStatusId}</span>:null}
            /> */}

  <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Economic Sector</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select Economic Sector</InputLabel>
            <Select
              labelId="law_category_Id"
              id="law_category_Id"  
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
{/* 
            <TextField 
              label="Sector ID" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='sectorId'
              value={formik.values.sectorId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.sectorId && formik.errors.sectorId ? <span style={helperTextStyle}>{formik.errors.sectorId}</span>:null}
            /> */}

      <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
        Opening Date
      </Typography>
            <TextField 
              variant='outlined' 
              fullWidth
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

      <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
        Expected Date
      </Typography>
            <TextField 
              variant='outlined' 
              fullWidth
              type="date"
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='expectedDate'
              value={formik.values.expectedDate}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.expectedDate && formik.errors.expectedDate ? <span style={helperTextStyle}>{formik.errors.expectedDate}</span>:null}
            />

      <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
        Effective Date
      </Typography>
            <TextField 
              variant='outlined' 
              fullWidth
              type="date"
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='effectiveDate'
              value={formik.values.effectiveDate}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.effectiveDate && formik.errors.effectiveDate ? <span style={helperTextStyle}>{formik.errors.effectiveDate}</span>:null}
            />
{/* 
          <TextField 
            label="Note ID"
            variant='outlined' 
            fullWidth
            sx={{ paddingBottom:"30px" }}
            color="info"
            name='noteId'
            value={formik.values.noteId}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.noteId && formik.errors.noteId ? <span style={helperTextStyle}>{formik.errors.noteId}</span>:null}
          /> */}

   {/*    <TextField 
            label="Slug" 
            variant='outlined' 
            fullWidth
            sx={{ paddingBottom:"30px" }}
            color="info"
            name='slug'
            value={formik.values.slug}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.slug && formik.errors.slug ? <span style={helperTextStyle}>{formik.errors.slug}</span>:null}
          /> */}

        <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Active status</Typography>
             <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="active"
                    value={formik.values.active}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value='1' control={<Radio />} label="Yes"  />
                    <FormControlLabel value='2' control={<Radio />} label="No"  />
              </RadioGroup>      

          {/* <TextField 
            label="Active ?" 
            variant='outlined' 
            fullWidth
            sx={{ paddingBottom:"30px" }}
            color="info"
            name='active'
            value={formik.values.active}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.active && formik.errors.active ? <span style={helperTextStyle}>{formik.errors.active}</span>:null}
          /> */}

    <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Previous Version</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select Previous Version</InputLabel>
            <Select
              labelId="previous_verion"
              id="previous_verion"  
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

          {/* <TextField 
            label="Parent ID" 
            variant='outlined' 
            fullWidth
            sx={{ paddingBottom:"30px" }}
            color="info"
            name='parentId'
            value={formik.values.parentId}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.parentId && formik.errors.parentId ? <span style={helperTextStyle}>{formik.errors.parentId}</span>:null}
          /> */}

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
          <TextField 
            label="Main Provision" 
            variant='outlined' 
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

      <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
        Start Page
      </Typography>
           <TextField 
            variant='outlined' 
            type="number"
            fullWidth
            sx={{ paddingBottom:"30px" }}
            color="info"
            name='startPage'
            value={formik.values.startPage}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.startPage && formik.errors.startPage ? <span style={helperTextStyle}>{formik.errors.startPage}</span>:null}
          />

      <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
        End Page
      </Typography>
          <TextField 
            variant='outlined' 
            type="number"
            fullWidth
            sx={{ paddingBottom:"30px" }}
            color="info"
            name='endPage'
            value={formik.values.endPage}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.endPage && formik.errors.endPage ? <span style={helperTextStyle}>{formik.errors.endPage}</span>:null}
          />
          <TextField 
            label="Amended Laws"
            variant='outlined' 
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

<Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
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
            />

      <Grid align='center' sx={{ paddingBottom:"15px", paddingTop:'15px' }}>
        <motion.span
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.3 }}
          > 
            <Typography variant='h1'>
              {serverSuccessMsg ? <Alert severity='success' style={successStyle}>{serverSuccessMsg}</Alert>:null}
            </Typography>
            
            <Typography variant='h1'>
            {serverErrorMsg ? <Alert severity='error' style={errorStyle}>{serverErrorMsg}</Alert>:null}
            </Typography> 

            </motion.span>
        </Grid>

        <Grid 
              sx={{ paddingBottom:"20px" }}
              align='right'
            >
          
            <Button type='submit' variant='contained'
              sx={{ align:'right',backgroundColor:colors.primary[400], textTransform:'none' }}
              color='primary' size='large' elevation={10}
            >
              Save </Button>
            </Grid>
        </form>
      </Stack>
 </motion.span>
</Box> 
  )
}

export default CreateDraft