import { useTheme } from '@emotion/react';
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import axios from '../../axios/AxiosGlobal'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme';
import { useTranslation } from 'react-i18next';

const DocumentsFilters = (
  { 
    drafts, 
    setDrafts, 
    unfilteredDrafts, 
    setUnfilteredDrafts,
    totalDrafts,
    setTotalDrafts,
    pageCount,
    setPageCount
  }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {t}=useTranslation();

    const [lawCategoryID, setLawCategoryID]=useState(0);
    const [lawCategories, setLawCategories]=useState(null);

    const [regionID, setRegionID] = useState(0);
    const [regions, setRegions]=useState(null);

    const [institutionID, setInstitutionID]=useState(0);
    const [institutions, setInstitutions]=useState(null);
    const [draftStatusName, setDraftStatusName]=useState("");

    const [sectors, setSectors]=useState([]);
    const [selectedSectors, setSelectedSectors]=useState([]);

    // useEffect to calculate dynamic page size for pagination
    useEffect(()=>{
      setPageCount(Math.ceil(parseInt(totalDrafts) / 10))
    }, [drafts])

    useEffect(()=>{
      fetchLawCategories();
    },[lawCategories])

    const fetchLawCategories = async() => {
      return await axios.get('public/law-categories')
        .then(res=>{
          setLawCategories(res.data.data.data)
        })
        .catch(error=>{
          console.log(error.response.message)
        })
    }

    useEffect(()=>{
      fetchRegions();
    },[regions])

    const fetchRegions = async() => {
      return await axios.get('public/regions')
        .then(res=>{
          setRegions(res.data.data.data)
        })
        .catch(error=>{
          console.log(error.response.message)
        })
    }

    useEffect(()=>{
      fetchInstitutions();
    },[institutions])

    const fetchInstitutions = async() => {
      return await axios.get('public/institutions')
        .then(res=>{
          setInstitutions(res.data.data.data)
        })
        .catch(error=>{
          console.log(error.response.message)
        })
    }

    useEffect(()=>{
      fetchSectors()
    }, [])
    
    const fetchSectors = async() =>{
      return await  axios.get('sectors')
      .then(res=>res.data.data)
      .then(res=>{
        setSectors(res.data)
      }).catch(error=>{
        console.log(error.response.message);
      })
    }

    const handleRegionChange = async (e) => {      
      setRegionID(e.target.value);
          
      return await  axios.get(`drafts?region=${e.target.value}`)
          .then(res=>res.data.data)
          .then(res=>{
            setDrafts(res.data)
          }).catch(error=>{
            console.log(error.response.message);
          })
      

    };

    const handleInstitutionChange = async (event) => {
      event.preventDefault();
      setInstitutionID(event.target.value);

      return await  axios.get(`drafts?institution=${event.target.value}`)
      .then(res=>res.data.data)
      .then(res=>{
        setDrafts(res.data)
      }).catch(error=>{
        console.log(error.response.message);
      })
    };

    const handleCategoryChange= async(e)=>{
      e.preventDefault();
      setLawCategoryID(e.target.value);

      return await  axios.get(`drafts?law_category=${e.target.value}`)
      .then(res=>res.data.data)
      .then(res=>{
        setDrafts(res.data)
      }).catch(error=>{
        console.log(error.response.message);
      })
    }
    
    const handleDraftStatusChange= async(e)=>{
      e.preventDefault();
      setDraftStatusName(e.target.value);
      
      return await  axios.get(`drafts?draft_status=${e.target.value}`)
      .then(res=>res.data.data)
      .then(res=>{
        setDrafts(res.data)
      }).catch(error=>{
        console.log(error.response.message);
      })
    }


  return (
    <Paper elevation={1} sx={{ backgroundColor:colors.grey[200], padding:"15px" }}>
        {/* <form> */}
            <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    {t('category')}
                </Typography>

                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="lawCategoryID"
                    value={lawCategoryID}
                    onChange={handleCategoryChange}
                  >
                    {
                      lawCategories ? lawCategories.map((lawCategory)=>(
                        <FormControlLabel key={lawCategory.id} value={lawCategory.id} control={<Radio />} label={lawCategory.name}  />
                      )):null
                    }
 
              </RadioGroup>       
            </Box>

            <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    {t('region_name')}
                </Typography>

                <div>
                  <form>
                  <FormControl sx={{ m: 1, minWidth: "80%" }}>
                    <Select
                      name="regionID"
                      value={regionID}
                      onChange={handleRegionChange}
                      displayEmpty
                      autoWidth='false'
                      size='small'
                    >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {
                      regions ? regions.map((region)=>(
                        <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                      )):null
                    }

                  </Select>
                </FormControl>
                  </form>
              </div>
              </Box> 
              

              <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    {t('institution_name')}
                </Typography>

              <div>
                  <FormControl sx={{ m: 1, minWidth: "80%" }}>
                    <Select
                      name="institutionID"
                      value={institutionID}
                      onChange={handleInstitutionChange}
                      displayEmpty
                      autoWidth='false'
                      size='small'
                    >
                    {
                      institutions ? institutions.map((institution)=>(
                        <MenuItem key={institution.id} value={institution.id}>{institution.name}</MenuItem> 
                      )):null
                    }               
                  </Select>
                </FormControl>
              </div>   
            </Box>

            <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    {t('document_status')}
                </Typography>

                <RadioGroup
                    aria-labelledby="draft-status-id"
                    name="draftStatusName"
                    value={draftStatusName}
                    onChange={handleDraftStatusChange}
                  >
                    <FormControlLabel value={1} control={<Radio />} label="Open"  />
                    <FormControlLabel value={0} control={<Radio />} label="Closed"  />
              </RadioGroup>            
            </Box>

            {/* <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    Publishing Date
                </Typography>

                <div>
                  <FormControl sx={{ m: 1, minWidth: "80%" }}>
                    <TextField 
                     name="publishingeDate"
                     type='date'
                     size='small'
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: "80%" }}>
                  <TextField 
                     name="publishingeDate"
                     type='date'
                     size='small'
                    />
                  </FormControl>
                </div>                  
            </Box> */}

            <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    {t('economic_sector')}
                </Typography>

                <Autocomplete
                      multiple
                      id="tags-standard"
                      autoSelect
                      color="info"
                      size="small"
                      sx={{ paddingBottom:"10px" }}
                      options={sectors}
                      getOptionLabel={(option) => option.name}
                      onChange={(e,value)=>setSelectedSectors(value)}
                      renderInput={(params) => (
                      <TextField
                          {...params}
                          // variant="standard"
                          label="Select sectors"
                          placeholder="Sectors "
                          value={(option)=>option.name}
                      />
                      )}
                  />          
            </Box>
        {/* </form> */}
    </Paper>
  )
}

export default DocumentsFilters