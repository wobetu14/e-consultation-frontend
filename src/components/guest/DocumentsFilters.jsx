import { useTheme } from '@emotion/react';
import { Box, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import axios from '../../axios/AxiosGlobal'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme';

const DocumentsFilters = ({drafts, setDrafts, unfilteredDrafts, setUnfilteredDrafts}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [lawCategoryID, setLawCategoryID]=useState(1);
    const [regionID, setRegionID] = useState(1);
    const [institutionID, setInstitutionID]=useState(1);
    const [draftStatusID, setDraftStatusID]=useState(1);

    const [filterValues, setFilterValues]=useState([]);

    const handleRegionChange = (event) => {
      event.preventDefault()
      setRegionID(event.target.value);
      
      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return draft.institution.region_id===regionID
      });
      setDrafts(filteredDrafts)
      // setUnfilteredDrafts(filteredDrafts)
    };

    const handleInstitutionChange = (event) => {
      event.preventDefault();
      setInstitutionID(event.target.value);

      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return draft.institution_id===institutionID
      });
      setDrafts(filteredDrafts)
      // setUnfilteredDrafts(filteredDrafts)
    };

    const handleClick = () => {
      console.info('You clicked the Chip.');
    };

    const handleCategoryChange=(e)=>{
      e.preventDefault();
      setLawCategoryID(e.target.value);
      console.log(lawCategoryID);
      
      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return parseInt(draft.law_category_id)===parseInt(lawCategoryID)
      });
      console.log(filteredDrafts);
      setDrafts(filteredDrafts)
      // setUnfilteredDrafts(filteredDrafts)
    }
    
    const handleDraftStatusChange=(e)=>{
      e.preventDefault();
      setDraftStatusID(e.target.value);
      
      const filteredDrafts=unfilteredDrafts.filter((draft)=>{
        return parseInt(draft.draft_status_id)!==parseInt(draftStatusID)
      });
      setDrafts(filteredDrafts)
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
                    <FormControlLabel value='1' control={<Radio />} label="Proclamations"  />
                    <FormControlLabel value='2' control={<Radio />} label="Directives"  />
                    <FormControlLabel value='3' control={<Radio />} label="Regulations"  />
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
                      <MenuItem value="1">Tigray</MenuItem>
                      <MenuItem value="2">Afar</MenuItem>
                      <MenuItem value="3">Amhara</MenuItem>
                      <MenuItem value="4">Oromia</MenuItem>
                      <MenuItem value="5">Somali</MenuItem>
                      <MenuItem value="6">Gambella</MenuItem>
                      <MenuItem value="7">Harari</MenuItem>
                      <MenuItem value="8">Benishangul-Gumuz</MenuItem>
                      <MenuItem value="9">Southern Nations, Nationalities and Peoples</MenuItem>
                      <MenuItem value="10">Sidama</MenuItem>
                      <MenuItem value="11">South-west Ethiopia Peoples</MenuItem>
                      <MenuItem value="12">Addis Ababa City Administration</MenuItem>                  
                      <MenuItem value="13">Diredawa City Administration</MenuItem>                  
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
                      <MenuItem value="1">Ministry of Justice</MenuItem>               
                      <MenuItem value="2">Ministry of Tourism</MenuItem>               
                      <MenuItem value="3">Ministry of Finance</MenuItem>               
                      <MenuItem value="4">Ministry of Innovation and technology</MenuItem>               
                      <MenuItem value="5">Ministry of Education</MenuItem>               
                      <MenuItem value="6">Ministry of Agriculture</MenuItem>               
                      <MenuItem value="7">Ministry of Labour and Skills</MenuItem>               
                      <MenuItem value="8">Amhara Regional State Bureau of Education</MenuItem>               
                      <MenuItem value="9">Oromia Regional State Bureau of Science, Technology and Innovation</MenuItem>               
                  </Select>
                </FormControl>
              </div>   
            </Box>

            <Box marginBottom="15px">
                <Typography variant="h6" fontWeight={600}>
                    Status
                </Typography>

                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="draftStatusID"
                    value={draftStatusID}
                    onClick={handleDraftStatusChange}
                  >
                    <FormControlLabel value={1} control={<Radio />} label="Open"  />
                    <FormControlLabel value={2} control={<Radio />} label="Closed"  />
              </RadioGroup>            
            </Box>

            <Box marginBottom="15px">
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
            </Box>

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