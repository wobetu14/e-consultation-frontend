import React, { useState } from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { TitleOutlined } from '@mui/icons-material';

import cookies from 'js-cookie';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const languages=[
  {
    code:'en',
    name:'English',
    country_code:'English'
  },

  {
    code:'am',
    name:'አማርኛ',
    country_code:'Ethiopia'
  },
  {
    code:'oro',
    name:'Afan Oromo',
    country_code:'Ethiopia'
  },

  {
    code:'tg',
    name:'ትግርኛ',
    country_code:'Ethiopia'
  },
]

const Header = ({title, subtitle}) => {

  const currentLanguageCode=cookies.get('i18next') || 'en'
  const currentLanguage=languages.find(l=>l.code===currentLanguageCode)
  const { t } = useTranslation()

  // Setup dynamic font-size changer
  const [fontSize, setFontSize]=useState(20);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="20px">
        <Typography
         variant="h5"
         color={colors.headerText[100]}
         sx={{ mb:"5px", fontWeight:600 }}
        >
            {t(title)}
        </Typography>
        <Typography variant="h5" color={colors.headerText[100]}>
            {t(subtitle)}
        </Typography>
    </Box>
  )
}

export default Header