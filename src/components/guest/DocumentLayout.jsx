import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { BrowserRouter, Link, Outlet, Route, RouterProvider, Routes  } from 'react-router-dom';

// import { ColorModeContext, useMode, token } from '../theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';

// import Topbar from '../scenes/dashboard/global/Topbar';
// import Sidebar from '../scenes/dashboard/global/Sidebar';

// import Topbar from '../components/admin/partials/global/Topbar';
// import Sidebar from '../components/admin/partials/global/Sidebar';


const DocumentLayout = () => {
 
//   const [theme, colorMode]=useMode();
//   const colors = tokens(theme.palette.mode);

  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
  
        <div >  
          <main className='content'>   
            <Outlet />
          </main> 
        </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    
  );
}



export default DocumentLayout;


