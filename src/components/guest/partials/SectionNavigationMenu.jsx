import * as React from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const SectionNavigationMenu = ({ section, paddingValue }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const changeSelectedColor = (elementID) => {
    document.getElementById(elementID).style.backgroundColor = colors.grey[500];
  };

  return (
    <div>
      <List
        sx={{ maxWidth: 360, height:"50px" }}
        component="nav"
      >
        <ListItemButton sx={{ pl: paddingValue }}>
          <ListItemIcon>
            <LocalLibraryIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  style={{ textDecoration: "none", color: colors.primary[300] }}
                  onClick={() => changeSelectedColor(section.id)}
                >
                  <Typography variant="subtitle1">
                    {section.section_title}
                  </Typography>
                </a>
              </>
            }
          />
        </ListItemButton>
      </List>
    </div>
  );
};

export default SectionNavigationMenu;