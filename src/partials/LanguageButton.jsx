import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { LanguageOutlined } from '@mui/icons-material';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTheme } from '@emotion/react';
import {tokens} from '../theme'


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

  {
    code:'sm',
    name:'Somali',
    country_code:'Ethiopia'
  }
]

export default function LanguageButton() {
  const theme=useTheme()
  const colors=tokens(theme.palette.mode)

  const currentLanguageCode=cookies.get('i18next') || 'en'
  const currentLanguage=appLanguages.find(l=>l.code===currentLanguageCode)
  

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (code) => {
    i18next.changeLanguage(code)
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
     <ButtonGroup 
      variant="text" 
      ref={anchorRef} 
      aria-label="split button"
      >
        <Button elevation={10}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select language"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ color:colors.grey[400]}}
        >
          <LanguageOutlined />&nbsp;
          {currentLanguage.name} 
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper elevation={20}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {appLanguages.map(({code, name}) => (
                    <MenuItem
                    //  sx={{ color:colors.grey[100], backgroundColor:colors.grey[600] }}
                      key={code}
                      disabled={code === currentLanguageCode}
                      selected={code === currentLanguageCode}
                      onClick={()=>handleMenuItemClick(code)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}