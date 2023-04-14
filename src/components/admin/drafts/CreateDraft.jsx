import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';

const CreateDraft = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

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

 
 const formik=useFormik({
    initialValues:{
        institutionID:"",
        shortTitle:"",
        lawCategoryId:"",
        draftStatusId:"",
        sectorId:"",
        openingDate:"",
        closingDate:"",
        expectedDate:"",
        effectiveDate:"",
        createdBy:1,
        file:null,
        slug:"",
        active:"",
        parent_id:"",
        tags:"",
        noteId:"",
        baseLegalReference:"",
        definition:"",
        scope:"",
        mainProvision:"",
        summary:"",
        startPage:"",
        endPage:"",
        amendedLaws:1,
        repealedLaws:1,
        transitoryProvision:1,
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
    slug:YUP.string().required("This field is required. Please provide document slug."),
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
   /*  amendedLaws:YUP.string().required("This field is required."),
    repealedLaws:YUP.string().required("This field is required."),
    transitoryProvision:YUP.string().required("This field is required."), */
  }),

  onSubmit:(values)=>{
    const draftsData={
      institution_id:values.institutionID,
      short_title:values.shortTitle,
      law_category_id:values.lawCategoryId,
      draft_status_id:values.draftStatusId,
      sector_id:values.sectorId,
      opening_date:values.openingDate,
      closing_date:values.closingDate,
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
      transitory_provision:values.transitoryProvision
    };

    createDraftDocument(draftsData);
  }
}); 
    
const createDraftDocument=async (draftsData) => {
    //  console.log(companyData)
    return await axios.post('drafts', draftsData)
    .then(res => {
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
            <TextField 
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
            />

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

            <TextField 
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
            />

            <TextField 
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
            />

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
            />

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

          <TextField 
            label="Created By"
            variant='outlined' 
            fullWidth
            sx={{ paddingBottom:"30px" }}
            color="info"
            name='createdBy'
            value={formik.values.createdBy}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.createdBy && formik.errors.createdBy ? <span style={helperTextStyle}>{formik.errors.createdBy}</span>:null}
          />
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

      <TextField 
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
          />

          <TextField 
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
          />

          <TextField 
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
          />
          <TextField 
            label="Tags" 
            variant='outlined' 
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
            rows={6}
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