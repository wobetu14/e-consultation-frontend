import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import {Outlet, Route, Routes  } from 'react-router-dom';
import { ColorModeContext, useMode, tokens, LangaugeContext, useLanguage } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './partials/main-menu/Topbar'
import Home from './components/guest/Home';
import About from './components/guest/About';
import Contacts from './components/guest/Contacts';
import Login from './components/guest/auth/Login';
import GuestSignup from './components/guest/auth/GuestSignup';
import { UserProvider } from './contexts/UserContext';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Users from './components/admin/users/Users';
import Team from './components/admin/team/Team'
import HelpCenter from './components/guest/HelpCenter';
import { PageNotFound } from './PageNotFound';
import Regions from './components/admin/regions/Regions';
import Sectors from './components/admin/sectors/Sectors';
import Drafts from './components/admin/drafts/Drafts';
import CreateRegion from './components/admin/regions/CreateRegion';
import CreateSector from './components/admin/sectors/CreateSector';
import CreateDraft from './components/admin/drafts/CreateDraft';
import Institutions from './components/admin/institutions/Institutions';
import CreateInstitution from './components/admin/institutions/CreateInstitution';
import CreateUser from './components/admin/users/CreateUser';
import DocumentLayout from './components/guest/DocumentLayout';
import DocumentDetailView from './components/guest/DocumentDetailView';


function App() {
  const {t}=useTranslation()
  const [theme, colorMode]=useMode();

  // Setup dynamic font-size changer
  const [fontSize, setFontSize]=useState(20);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserProvider>
            <CssBaseline />
            <div className="App">
              <main className='content' display="flex">
                  <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="help" element={<HelpCenter />} />
                        <Route path="contacts" element={<Contacts />} />
                        <Route path="login" element={<Login />} />
                        <Route path="create-account" element={<GuestSignup />} />
                        <Route path="*" element={<PageNotFound />} />
                      {/* </Route> */}
                    </Route>
                    <Route path='/draft' element={<DocumentLayout />}>
                      <Route path=':id' element={<DocumentDetailView />} />
                    </Route>
                    <Route path='/admin' element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='users' element={<Users />} />
                        <Route path='create_user' element={<CreateUser />} />
                        <Route path="contacts" element={<Contacts />} />
                        <Route path="institutions" element={<Institutions />} />
                        <Route path="create_institution" element={<CreateInstitution />} />
                        <Route path="regions" element={<Regions />} />
                        <Route path="create_region" element={<CreateRegion />} />
                        <Route path="sectors" element={<Sectors />} />
                        <Route path="create_sector" element={<CreateSector />} />
                        <Route path="drafts" element={<Drafts />} />
                        <Route path="create_draft" element={<CreateDraft />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                  </Routes>
              </main> 
            </div>  
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



export default App;


