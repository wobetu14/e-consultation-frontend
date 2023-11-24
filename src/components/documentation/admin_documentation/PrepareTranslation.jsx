import { Box, Button, Card, CardContent, Container, Paper, Typography } from '@mui/material'
import React, { useState } from 'react';
import Header from '../../admin/AdminHeader';
import * as xlsx from 'xlsx';
import TranslationTemplate from '../downloadable_files/translation__en.xlsx';
import AmharicTranslationTemplate from '../downloadable_files/translation__am.xlsx';
import {useTranslation} from 'react-i18next';
import PrepareLangHowtoDialog from './PrepareLangHowtoDialog';

const PrepareTranslation = () => {
    const [jsonFile, setjsonFile] = useState(null);
    const [showHowtoDialog, setShowHowtoDialog]=useState(false);

    const {t}=useTranslation();

    const showLanguagePrepInfoDialog=(e)=>{
        setShowHowtoDialog(true);
    }

  const readUploadFile = (e) => {
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            console.log(json);
            setjsonFile(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}
  return (
    <Box m="20px" sx={{ width:{
        xs:300, sm:500, md:700, lg:900, xl:1200
      } }} 
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title={t('language_tool')} subtitle={t('prepare_language_and_convert_to_JSON')} />
        </Box>
            <Typography mb="5px">
                <Button
                    href={TranslationTemplate}
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{ textTransform:"none", marginRight:'5px' }}
                >
                    {t('download_translation_template_en')}
                </Button>
                <Button
                    href={AmharicTranslationTemplate}
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{ textTransform:"none", marginRight:'5px' }}
                >
                    {t('download_translation_template_am')}
                </Button>

                <Button
                    // href={TranslationTemplate}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ textTransform:"none" }}
                    onClick={(e)=>showLanguagePrepInfoDialog(e)}
                >
                    {t('how_it_works')}
                </Button>
            </Typography>

            {
                showHowtoDialog && (
                    <PrepareLangHowtoDialog 
                    showHowtoDialog={showHowtoDialog} setShowHowtoDialog={setShowHowtoDialog}  />
                )
            }
 
        <Card sx={{ minWidth: 275 }} variant="outlined">
            <CardContent>
                <form>
                    <Typography variant="body1">
                        {t('upload_file')}
                    </Typography>
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        onChange={readUploadFile}
                    />
                    {/* <Button variant='contained' type='submit' onClick={(e)=>readUploadFile(e)} >Upload</Button> */}
                </form>
            </CardContent>
        </Card>
            {
                jsonFile && (
                    <>
                        <Typography sx={{ marginTop:'30px' }} variant="h4">
                            {t('result')}
                        </Typography>
                        <Card sx={{ minWidth: 275, backgroundColor:'#17202A', marginTop:"15px" }} variant="outlined">
                            <CardContent>
                                <code style={{ color:'white' }}>&#123;</code><br />
                                {
                                    jsonFile.map((jsonData)=>
                                    (
                                    <code
                                    key={jsonData}
                                    style={{ marginLeft:"20px" }}
                                    >
                                    <span style={{ color:'#7D3C98' }}>&quot;{jsonData.Word}&quot;</span>
                                    <span style={{ color:'white' }}>:</span>
                                    <span style={{ color:'#239B56' }}>&quot;{jsonData.Translation}&quot;</span>
                                    <span style={{ color:'white' }}>,</span>
                                    <br/>
                                    </code>
                                    ))
                                }
                                <code style={{ color:'white' }}>&#125;</code>
                            </CardContent>
                        </Card>
                    </>
                )
            }

    </Box>
  )
}

export default PrepareTranslation