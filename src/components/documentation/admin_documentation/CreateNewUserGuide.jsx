import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";

/**
 *
 * Image Resources
 */
import AdminDashboardScreen from "../docImages/AdminDashboardScreen.png";
import SidebarScreen from "../docImages/SidebarScreen.png";
import UsersListScreen from "../docImages/UsersListScreen.png";
import CreateUserScreen from "../docImages/CreateUserScreen.png";
import UserSaveButtonScreen from "../docImages/UserSaveButtonScreen.png";

const CreateNewUserGuide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        User accounts can be created in two ways. The first way is creating a
        personal account via the <strong>sign-up</strong> process. In this
        process, a user can create his own account to be able to provide a
        comment on a document as well as to see comments provided by others. The
        second way is to create an account for different roles of the system.
        This way, we create user accounts of specific roles for specific
        administrative purposes. For example, a <strong>Super Admin</strong> can
        create user accounts of <strong>Federal Admin</strong> and{" "}
        <strong>Regional Admin</strong> users.
        <strong>Federal Admin</strong> and <strong>Regional Admin</strong> users
        can create <strong>Institutional Admin</strong> users (
        <strong>Federal Institutional Admin</strong> and{" "}
        <strong>Regional Institutional Admin</strong>). The{" "}
        <strong>Institutional Admins</strong> can create{" "}
        <strong>Uploaders</strong>, <strong>Approvers</strong> and{" "}
        <strong>Institutional Commenters</strong>. To create a new user account,
        we should login as one of these user accounts. As a startup
        configuration, it is highly recommended to login as{" "}
        <strong>Super Admin</strong> and then create{" "}
        <strong>Regional or Federal Admin</strong> and then create{" "}
        <strong>Institutional Admin</strong> and then create{" "}
        <strong>Uploader</strong>, <strong>Approver</strong> and{" "}
        <strong>Commenter (Institutional Commenter)</strong>.
      </Typography>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        In this guide, we will see the process to login as Super Admin and
        create accounts for Federal Admin or Regional Admin.
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Steps
      </Typography>

      <ol type="A" style={{ marginLeft: "30px" }}>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Go to login screen
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Login as <strong>Super Admin</strong> account. You will be
            redirected to the system’s admin dashboard.
          </Typography>

          <Box m="0 30px">
            <img
              src={AdminDashboardScreen}
              alt="Admin Dashboard Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Go to <strong>“Users”</strong> item on the main menu located on the
            left pane.
          </Typography>

          <Box m="0 30px">
            <img
              src={SidebarScreen}
              alt="Admin Dashboard Screen"
              style={{
                maxWidth: "30%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            The users’ management screen will appear. Here you can
            <strong>create new user, edit the user’s profile</strong> and{" "}
            <strong>delete account</strong> if necessary.
          </Typography>

          <Box m="0 30px">
            <img
              src={UsersListScreen}
              alt="Drafts List Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Click on <strong>“+ Add New User”</strong> to create new user
            account. A user account creation form will appear above the list of
            users table.
          </Typography>

          <Box m="0 30px">
            <img
              src={CreateUserScreen}
              alt="Create New User Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Fill appropriate data on the provided fields and click{" "}
            <strong>“Save”</strong>
          </Typography>

          <Box m="0 30px">
            <img
              src={UserSaveButtonScreen}
              alt="Save User Infomation Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>
        </li>

        <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
          (<strong>Note:</strong> You can hide and show by clicking the{" "}
          <strong>“Hide Form”</strong> button to hide and show the user creation
          form)
        </Typography>
      </ol>
    </>
  );
};

export default CreateNewUserGuide;
