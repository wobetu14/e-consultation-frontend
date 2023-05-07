import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/admin/AdminHeader";
import StatBox from "../../components/admin/StatBox";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CommentIcon from '@mui/icons-material/Comment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Drafts from "./drafts/Drafts";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.grey[200],
              // color: colors.headerText[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.grey[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px" }}
        >
          <StatBox
            title="361"
            subtitle="Total Documents"
            icon={
              <LibraryBooksIcon
                sx={{ color: colors.primary[300], fontSize: "35px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.yellowColor[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px" }}
        >
          <StatBox
            title="25"
            subtitle="Open for Comment"
            icon={
              <MenuBookIcon
                sx={{ color: colors.brandColor[300], fontSize: "35px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.secondary[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px" }}
        >
          <StatBox
            title="32,441"
            subtitle="Total Users"
            icon={
              <PersonAddIcon
                sx={{ color: colors.brandColor[300], fontSize: "35px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px" }}
        >
          <StatBox
            title="25,134"
            subtitle="Total Comments"
            icon={
              <CommentIcon
                sx={{ color: colors.yellowColor[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      
      <Box sx={{ marginTop:"100px", marginBottom:"50px" }}>
          {/* <Drafts /> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
