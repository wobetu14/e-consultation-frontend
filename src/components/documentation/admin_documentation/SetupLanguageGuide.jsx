import {Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import LanguageToolUI from './LanguageSetup/LanguageToolUI.png';
import SampleLanguageTemplate from './LanguageSetup/SampleLanguageTemplate.png';
import ConvertedJSONResult from './LanguageSetup/ConvertedJSONResult.png';
import TranslationFilePath from './LanguageSetup/TranslationFilePath.png';
import JSONResultSourceCode from './LanguageSetup/JSONResultSourceCode.png';
import IndexSourceFile from './LanguageSetup/IndexSourceFile.png';
import LanguageSwitcherMenu from './LanguageSetup/LanguageSwitcherMenu.png';
import NewLanguageSwitchResult from './LanguageSetup/NewLanguageSwitchResult.png';


/**
 * Tools to build Stepper functionality
 */
import Box from '@mui/material/Box';
// import { tokens } from '../../../theme';
import { tokens } from '../../../theme';

// import { tokens } from '../../theme';

const SetupLanguageGuide = () => {

    const theme=useTheme();
    const colors=tokens(theme.palette.mode)

  return (
    <>
        <Typography variant="h4" sx={{ paddingLeft:"15px", paddingTop:"15px", fontWeight:"600" }}>
          <strong><span style={{ paddingBottom:"2px", borderBottom:"3px solid #064892" }}>Note:</span></strong> This documentation is inteded for developers
        </Typography>

        <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
          The configuration of the system allows for flexibility in adding languages at any time. In the project's source code, 
          the language library is located in the path <code><strong>"./public/assets/locales"</strong></code>. 
          Inside the <code><strong>"./locales"</strong></code> folder, it is possible to generate new folders and JSON files to create language dictionaries. 
          For instance, the language dictionaries for English and Amharic can be found at the paths <code><strong>"./public/assets/locales/en/translation.json"</strong></code>
          and <code><strong>"./public/assets/locales/am/translation.json,"</strong></code> respectively. Information on the initial configuration and instructions for changing 
          the language can be found in the files <code><strong>index.js</strong></code> and <code><strong>LanguageButton.jsx</strong></code>, respectively. 
          Now, let's proceed step by step to add a new language and integrate it into the platform.
        </Typography>

        <Typography variant='h5' sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
          Step 1: Prepare the Language Dictionary 
        </Typography>

        <ol>
            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Log in as a Super Admin user. As the dictionary template is exclusively accessible to Super Users, 
                  logging in with a "Super User" account is necessary to access the template.
                </Typography>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Go to <strong>“Resource Center”</strong>
                </Typography>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Proceed to the <strong>"Language Tool"</strong> section and click on <strong>"Next"</strong>. A window will appear, 
                  presenting options to obtain a template and a form for converting the dictionary to JSON format, 
                  as illustrated below.
                </Typography>

                <Box m="0 30px">
                    <img src={LanguageToolUI} alt="Language Tool Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Download the template and modify the translations. Please refrain from modifying the keywords 
                  listed in the first column under the heading <strong>"Word"</strong>. Only update the corresponding phrases 
                  specified in the second column under the heading <strong>"Translation"</strong>. The translation template is 
                  provided in both <strong>English</strong> and <strong>Amharic</strong>, allowing you to choose the one that suits your preference. 
                  Let's proceed to download the template and create a Somali language translation for sample keywords.
                </Typography>

                <Box m="0 30px">
                    <img src={SampleLanguageTemplate} alt="Sample Language Template Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Following the preparation of the dictionary, the next step is to transform it into JSON format. 
                  Upload the file using the provided form below to convert this Excel file into JSON format. 
                  The outcome will resemble:
                </Typography>

                <Box m="0 30px">
                    <img src={ConvertedJSONResult} alt="Converted JSON Result Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                   Copy the provided text and create a file in the same location as the previously established files,
                   like <code><strong>'./en/translation.json'</strong></code>. Given that we are developing a dictionary for the <strong>Somali</strong> anguage, 
                   let's hypothetically designate its short identifier as <strong>"sm"</strong>. Accordingly, create a <strong>"./sm"</strong> folder and 
                   a <code><strong>"translation.json"</strong></code> file within the <code><strong>"./public/assets/locales/"</strong></code> directory. Consequently, 
                   the complete path will be <code><strong>"./public/assets/locales/sm/translation.json."</strong></code>
                </Typography>

                <Box m="0 30px">
                    <img src={TranslationFilePath} alt="Translation File Path Screen" 
                        style={{ 
                            maxWidth:"80%", height:"300px", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Then, remove the final semicolon <code><strong>(,)</strong></code> as JSON does not allow a comma at the end of the last object value.
                  The final result will resemble the following.
                </Typography>

                <Box m="0 30px">
                    <img src={JSONResultSourceCode} alt="Password Reset Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>
        </ol>

        <Typography variant='h5' sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
          Step 2: Configuring the Language Usage 
        </Typography>

        <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
          Now that we have prepared the new language dictionary, let’s configure it to be one of the lists used by end users.
        </Typography>

        <ol>
            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  In the source code of the project, navigate to the <code><strong>"index.js"</strong></code> 
                  file and append the value <code><strong>"sm"</strong></code> to the end of the array list of supported languages, as depicted below.
                </Typography>

                <Box m="0 30px">
                    <img src={IndexSourceFile} alt="Index source file Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Go to the <code><strong>"LanguageButtons.js"</strong></code> component and include a new menu item. 
                  To achieve this, simply append a new array object as the last value of the <code><strong>"appLanguages=[]"</strong></code> 
                  array, as illustrated below.
                </Typography>

                <Box m="0 30px">
                    <img src={LanguageSwitcherMenu} alt="Language Switcher Menu Screen" 
                        style={{ 
                            maxWidth:"80%", height:"200px", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Now, a new menu item will be added, and the result will appear as shown below when you 
                  click the language switcher menu on the home page.
                </Typography>

                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                  Now, let's switch to the new language and observe the results. 
                  Please note that, at this point, we have only translated a few 
                  phrases to demonstrate the functionality, and the effect appears as follows.
                </Typography>

                <Box m="0 30px">
                    <img src={NewLanguageSwitchResult} alt="New Language Switch Result Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>
        </ol>
    </>
  )
}

export default SetupLanguageGuide