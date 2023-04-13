import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { color, palette } from "@mui/system";
import { colors } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';

// create color design tokens

export const tokens = (mode) => ({
    ...(mode === "dark"
      ? {
          grey: {
            100:"#03243c",
            200:"#03243c",
            300:"#e0e0e0",
            400:"#eaeaea",
            500:"#f4f4f4",
            600:"#F1F6F9",
            700:"#ffffff",     
          },
          hoverColor:{
            100:"#ffffff",
            200:"#F1F6F9",
            300:"#f4f4f4",
            400:"#eaeaea",
          },
          primary: {
            100: "#03243c",
            200: "#042f4f",
            300: "#053a61",
            400: "#064674",
            500: "#075187",
          },
          secondary:{
            100: "#a71d4d",
            200: "#bd2157",
            300: "#d32561",
            400: "#dc356f",
            500: "#e04b7e",
          },

          yellowColor:{
            100:"#ffb512",
            200:"#ffbd2b",
            300:"#ffc545",
            400:"#ffcd5e",
            500:"#ffd578",
          },

          greenColor:{
            100: "#16764a",
            200: "#198754",
            300: "#1c985e",
            400: "#1fa869",
            500: "#22b973",
          },


          greenAccent: {
            100: "#dbf5ee",
            200: "#b7ebde",
            300: "#94e2cd",
            400: "#70d8bd",
            500: "#4cceac",
            600: "#3da58a",
            700: "#2e7c67",
            800: "#1e5245",
            900: "#0f2922",
          },
          redAccent: {
            100: "#f8dcdb",
            200: "#f1b9b7",
            300: "#e99592",
            400: "#e2726e",
            500: "#db4f4a",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f",
          },
          blueAccent: {
            100: "#e1e2fe",
            200: "#c3c6fd",
            300: "#a4a9fc",
            400: "#868dfb",
            500: "#6870fa",
            600: "#535ac8",
            700: "#3e4396",
            800: "#2a2d64",
            900: "#151632",
          },
          brandColor:{
            100: "#212121",
            200: "#424242",
            300: "#616161",
            400: "#757575",
            500: "#03a9f4", 
            600: "#039be5",
            700: "#0288d1",
            800: "#0277bd",
            9000: "#01579b",
          },

          headerText:{
            100:"#F1F6F9",
            200:"#f4f4f4",
            300:"#eaeaea",
          },

          successColor:{
            100: "#16764a",
            200: "#198754",
            300: "#1c985e",
            400: "#1fa869",
            500: "#22b973",
          },

          warningColor:{
            100:"#ffb512",
            200:"#ffbd2b",
            300:"#ffc545",
            400:"#ffcd5e",
            500:"#ffd578",
          },
          dangerColor:{
            100:"#a71d4d",
            200:"#bd2157",
            300:"#d32561",
            400:"#dc356f",
            500:"#e04b7e",
          }
        }
      : {
          grey: {
            100:"#ffffff",
            200:"#F1F6F9",
            300:"#f4f4f4",
            400:"#eaeaea",
            500:"#e0e0e0",
            600:"#9999a1",
            700:"#66666e",
          },
          hoverColor:{
            100:"#eaeaea",
            200:"#f4f4f4",
            300:"#F1F6F9",
            400:"#ffffff", 
          },
          primary: {
            100:"#052d67",
            200:"#06357a",
            300:"#073d8d",
            400:"#08459f",
            500:"#094db2",
          },
          secondary:{
            100:"#a71d4d",
            200:"#bd2157",
            300:"#d32561",
            400:"#dc356f",
            500:"#e04b7e",
          },
          yellowColor:{
            100:"#ffb512",
            200:"#ffbd2b",
            300:"#ffc545",
            400:"#ffcd5e",
            500:"#ffd578",
          },
          greenAccent: {
            100: "#0f2922",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#3da58a",
            500: "#4cceac",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
          },
          redAccent: {
            100: "#2c100f",
            200: "#58201e",
            300: "#832f2c",
            400: "#af3f3b",
            500: "#db4f4a",
            600: "#e2726e",
            700: "#e99592",
            800: "#f1b9b7",
            900: "#f8dcdb",
          },
          blueAccent: {
            100: "#151632",
            200: "#2a2d64",
            300: "#3e4396",
            400: "#535ac8",
            500: "#6870fa",
            600: "#868dfb",
            700: "#a4a9fc",
            800: "#c3c6fd",
            900: "#e1e2fe",
          },
          brandColor:{
            100: "#01579b",
            200: "#0277bd",
            300: "#0288d1",
            400: "#039be5", 
            500: "#03a9f4",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
          },
          headerText:{
            100:"#052d67",
            200:"#06357a",
            300:"#073d8d",
          },
          successColor:{
            100: "#16764a",
            200: "#198754",
            300: "#1c985e",
            400: "#1fa869",
            500: "#22b973",
          },

          warningColor:{
            100:"#ffb512",
            200:"#ffbd2b",
            300:"#ffc545",
            400:"#ffcd5e",
            500:"#ffd578",
          },
          dangerColor:{
            100:"#a71d4d",
            200:"#bd2157",
            300:"#d32561",
            400:"#dc356f",
            500:"#e04b7e",
          }
      }
)});

// mui theme settings
export const themeSettings=(mode)=>{
    const colors=tokens(mode)

    return {
        palette:{
            mode:mode,
            ... (mode === 'dark' // colors for dark mode
             ? {
                primary:{
                    main:colors.primary[500],
                },

                secondary:{
                    main:colors.brandColor[200],
                },

                neutral:{
                    dark:colors.grey[700],
                    main:colors.grey[500],
                    light:colors.grey[100]
                },
                background:{
                    default:"#03243c",
                }

             }
             
             :
             
             {
                primary:{
                    main:colors.primary[100],
                },

                secondary:{
                    main:colors.brandColor[200],
                },

                neutral:{
                    dark:colors.grey[700],
                    main:colors.grey[500],
                    light:colors.grey[100],
                },
                background:{
                    default:"#F1F6F9",
                }
             }
            ),
        },

        typography:{
            fontFamily:["helivetical","arial","roboto", "sans-serif"].join(","),
            fontSize:14,
            textTransform:"none",
            h1:{
                fontFamily:["helvetica","arial", "sans-serif"].join(","),
                fontSize:40,
            },

            h2:{
                fontFamily:["helvetica","arial","sans-serif"].join(","),
                fontSize:32,
            },

            h3:{
                fontFamily:["helvetica","arial", "sans-serif"].join(","),
                fontSize:24,
                fontWeight:700
            },

            h4:{
                fontFamily:["helvetica","arial", "sans-serif"].join(","),
                fontSize:20,
            },

            h5:{
                fontFamily:["helvetica","arial", "sans-serif"].join(","),
                fontSize:16,
            },

            h6:{
                fontFamily:["helvetica","arial", "sans-serif"].join(","),
                fontSize:14,
            },
        }
    };
};

// App Langauges


// create react Context for color mode
export const ColorModeContext=createContext({
    toggleColorMode:()=>{

    }
});


export const useMode=()=>{
    const [mode, setMode]=useState("light");

    const colorMode=useMemo(
        ()=>({
            toggleColorMode:()=>
                setMode((prev)=>(prev==="light"?"dark":"light")),
        }),
        []);

        const theme=useMemo(()=>createTheme(themeSettings(mode)), [mode]);
        return [theme, colorMode];
}

export const LangaugeContext=createContext(null);
export const useLanguage=()=>{
  const appLanguages=[
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

  const currentLanguageCode=cookies.get('i18next') || 'en'
  const [selectedLanguage, setSelectedLanguage]=useState(currentLanguageCode)
  const currentLanguage=appLanguages.find(l=>l.code===currentLanguageCode)
  const {t}=useTranslation()

  const changeLocale=useMemo((langCode)=>{
      setSelectedLanguage(i18next.changeLanguage(langCode))
  },[])

  return [selectedLanguage, changeLocale,t, currentLanguage, appLanguages]
}