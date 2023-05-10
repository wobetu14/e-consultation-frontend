import { useTheme } from '@emotion/react';
import { Box, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import axios from '../../axios/AxiosGlobal'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme';

const DocumentsFilters = (
  {drafts, 
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

    const [lawCategoryID, setLawCategoryID]=useState(null);
    const [lawCategories, setLawCategories]=useState(null);

    const [regionID, setRegionID] = useState(null);
    const [regions, setRegions]=useState(null);

    const [institutionID, setInstitutionID]=useState(null);
    const [institutions, setInstitutions]=useState(null);
    const [draftStatusName, setDraftStatusName]=useState("Open");

    // useEffect to calculate dynamic page size for pagination
    useEffect(()=>{
      setPageCount(Math.ceil(parseInt(totalDrafts) / 10))
    }, [drafts])

    useEffect(()=>{
      fetchLawCategories();
    },[lawCategories])

    const fetchLawCategories = async() => {
      return await axios.get('law-categories')
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
      return await axios.get('regions')
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
      return await axios.get('institutions')
        .then(res=>{
          setInstitutions(res.data.data.data)
        })
        .catch(error=>{
          console.log(error.response.message)
        })
    }

    const handleRegionChange = (event) => {
      event.preventDefault()
      setRegionID(event.target.value);
      
      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return parseInt(draft.institution.region_id)===parseInt(regionID)
      });
      setDrafts(filteredDrafts)
      setTotalDrafts(filteredDrafts.length);
      // setUnfilteredDrafts(filteredDrafts)
    };

    const handleInstitutionChange = (event) => {
      event.preventDefault();
      setInstitutionID(event.target.value);
      setTotalDrafts(filteredDrafts.length);
      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return parseInt(draft.institution_id)===parseInt(institutionID)
      });
      setDrafts(filteredDrafts)
      setTotalDrafts(filteredDrafts.length);
      // setUnfilteredDrafts(filteredDrafts)
    };

    const handleClick = () => {
      console.info('You clicked the Chip.');
    };

    const handleCategoryChange= (e)=>{
      e.preventDefault();
      setLawCategoryID(e.target.value);
      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return parseInt(draft.law_category_id)===parseInt(lawCategoryID)
      });
      setDrafts(filteredDrafts);
      setTotalDrafts(filteredDrafts.length);
      // setUnfilteredDrafts(filteredDrafts)
    }
    
    const handleDraftStatusChange=(e)=>{
      e.preventDefault();
      setDraftStatusName(e.target.value);
      
      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return (draft.draft_status.name===draftStatusName)
      });
      setDrafts(filteredDrafts);
      setTotalDrafts(filteredDrafts.length);
      // setUnfilteredDrafts(filteredDrafts)
    }


  return (
    <Paper elevation={1} sx={{ backgroundColor:colors.grey[200], padding:"15px" }}>
        {/* <form> */}
            <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    Category
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
                    Region
                </Typography>

                <div>
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
              </div>
              </Box> 
              

              <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    Institution
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
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
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
                    Status
                </Typography>

                <RadioGroup
                    aria-labelledby="draft-status-id"
                    name="draftStatusName"
                    value={draftStatusName}
                    onChange={handleDraftStatusChange}
                  >
                    <FormControlLabel value="Open" control={<Radio />} label="Open"  />
                    <FormControlLabel value="Closed" control={<Radio />} label="Closed"  />
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
                    Economic Sector
                </Typography>

                <div>
                  <Stack direction="row" spacing={1} padding="5px">
                    <Chip 
                    label="Technology and Innovation" 
                    variant="outlined"
                    onClick={handleClick} 
                    />
                    <Chip 
                    label="Fintech and E-Commerce" 
                    variant="outlined"
                    onClick={handleClick} />
                  </Stack>

                  <Stack direction="row" spacing={1} padding="5px">
                    <Chip 
                    label="Agriculture" 
                    variant="outlined"
                    onClick={handleClick} 
                    />
                    <Chip 
                    label="Transport and Logistics" 
                    variant="outlined"
                    onClick={handleClick} />
                  </Stack>

                  <Stack direction="row" spacing={1} padding="5px">
                    <Chip 
                    label="Education" 
                    variant="outlined"
                    onClick={handleClick} 
                    />
                    <Chip 
                    label="Tourism" 
                    variant="outlined"
                    onClick={handleClick} />
                  </Stack>
                </div>           
            </Box>
        {/* </form> */}
    </Paper>
  )
}

export default DocumentsFilters