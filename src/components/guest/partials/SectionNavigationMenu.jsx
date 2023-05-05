import * as React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Collapse, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { useTranslation } from 'react-i18next';

const SectionNavigationMenu = ({section}) => {
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {t}=useTranslation();

  const changeSelectedColor=(elementID)=>{
    document.getElementById(elementID).style.backgroundColor=colors.grey[500]
  }

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <div>
        

        
                <List
                sx={{ width: '90%', maxWidth: 360, height:"35px"}}
                component="nav"   
                >
                <ListItemButton sx={{ height:"35px" }}>
                    <ListItemIcon>
                     <LocalLibraryIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <>
                            <a 
                            key={section.id} 
                            href={`#${section.id}`} 
                            style={{ textDecoration:"none", color:colors.primary[300] }}
                            onClick={()=>changeSelectedColor(section.id)}
                            >
                                <Typography variant="subtitle1">{section.section_title}</Typography>
                                </a>
                        </>
                    } />
                </ListItemButton> 
                </List>
    </div>
  );
}

export default SectionNavigationMenu;