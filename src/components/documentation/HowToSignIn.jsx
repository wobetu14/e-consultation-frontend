import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import loginScreen from "./docImages/loginScreen.png";

/**
 * Tools to build Stepper functionality
 */
import Box from "@mui/material/Box";
import { tokens } from "../../theme";

const HowToSignIn = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Steps to Sign In / Login
      </Typography>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        On the home page, click on the <strong>“Sign In”</strong> button. A
        login screen will display as shown below.
      </Typography>

      <Box m="0 30px">
        <img
          src={loginScreen}
          alt="Login Screen"
          style={{
            maxWidth: "50%",
            maxHeight: "50%",
            marginTop: "15px",
            border: `1.5px solid ${colors.brandColor[200]}`,
          }}
        />
      </Box>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Enter the <strong>email address</strong> and <strong>password</strong>{" "}
        you have provided while you have signed up. Then click{" "}
        <strong>“SIGN IN”</strong>. If correct, you will be redirected to the
        authenticated part of the home page.
      </Typography>
    </>
  );
};

export default HowToSignIn;
