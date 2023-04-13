import { MenuRounded } from "@mui/icons-material";
import { Box, Button, Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { List } from "@mui/material";

import React, { useState } from 'react'
import { tokens } from "../../theme";

const DrawerComp = () => {
    const theme=useTheme()
    const colors=tokens(theme.palette.mode)
    const [open, setOpen]=useState(false);
  return (
    <>
        <Drawer anchor="left" open={open} onClose={()=>setOpen(false)} sx={{ width:"400px" }}>
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <ListItemText>Contacts</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>

            <List>
                <Button sx={{ marginLeft:"auto" }} variant="contained">Sign In</Button>
                <Button sx={{ marginLeft:1, backgroundColor:colors.brandColor[300], color:"white" }} variant="contained">Sign Up</Button>
            </List>
        </Drawer>
        <IconButton>
           <MenuRounded onClick={()=>setOpen(!open)}></MenuRounded>
        </IconButton>
    </>
  )
}

export default DrawerComp