import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../partials/main-menu/Topbar'

// Transaltion
import { useTranslation } from 'react-i18next';
import Home from '../components/guest/Home';


function RootLayout() {
    const {t}=useTranslation()
    // Dynamic top menu items
  const menuItemsText=[
    {id:1, linkText:`${t('home')}`, to:"/"},
    {id:2,linkText:`${t('about')}`, to:"/about"},
    {id:3,linkText:`${t('help_center')}`, to:"/help"},
    // {id:4,linkText:`${t('admin')}`, to:"/admin"},
  ];
  return (
    <main>
        <Topbar menuItems={menuItemsText} />
        <Outlet />
    </main>
  )
}

export default RootLayout