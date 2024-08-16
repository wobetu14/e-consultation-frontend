import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Typography } from '@mui/material';

export default function ChangeAccess() {

  const navigate=useNavigate();
  const { 
        userInfo, userRole, setUserRole
  } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (roleName) => {
    localStorage.setItem("userRole", roleName);
    setUserRole(roleName)
    navigate('/admin')
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
          aria-label="Change System Access"
          aria-haspopup="menu"
          onClick={handleToggle}
          variant="contained"
          color="secondary"
          sx={{ textTransform:"none"}}
        >
          <PeopleOutlineIcon />&nbsp;
          <Typography>
            {userRole}
          </Typography> 
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
                  {
                   userInfo.user.roles.map(({id, name})=>(
                      <MenuItem
                       key={id}
                       onClick={()=>handleMenuItemClick(name)}
                       disabled={name===userRole}
                       selected={name===userRole}
                      >
                       {name}
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}