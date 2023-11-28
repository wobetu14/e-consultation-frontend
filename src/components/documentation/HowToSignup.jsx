import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import SignupScreen from "./docImages/signupscreen.png";
import CreateAccountScreen from "./docImages/createaccountscreen.png";
import activationCodeEmail from "./docImages/activationCodeEmail.png";

/**
 * Tools to build Stepper functionality
 */
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { tokens } from "../../theme";

const HowToSignup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        The <strong>“Sign up”</strong> function is used to enable the public
        commenters / anyone / citizens to create their own accounts.
        <strong>&nbsp;Note</strong> that any user can explore and access
        documents to read but only registered users can comment on a document.
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Steps to Sign Up
      </Typography>

      <Box sx={{ marginLeft: "30px" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography variant="body1">
                Click on the <strong>Sign Up </strong> button
              </Typography>
            </StepLabel>

            <StepContent>
              <Typography variant="body1">
                On the home page, click on the <strong>Sign Up</strong> button.
              </Typography>
              <img
                src={SignupScreen}
                alt="Signup Screen"
                style={{ maxWidth: "50%", maxHeight: "50%", marginTop: "15px" }}
              />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    size="small"
                    color="primary"
                    sx={{ mt: 2, mr: 2, textTransform: "none" }}
                  >
                    Next
                  </Button>

                  <Button
                    onClick={handleBack}
                    size="small"
                    color="primary"
                    sx={{ mt: 2, mr: 2, textTransform: "none" }}
                  >
                    Previous
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="body1">
                <strong>Create account </strong> screen
              </Typography>
            </StepLabel>

            <StepContent>
              <Typography variant="body1">
                A <strong>“Create account”</strong> screen will display as shown
                below. Fill the form shown on the screen and click the{" "}
                <strong>“CREATE ACCOUNT”</strong> button.
              </Typography>
              <img
                src={CreateAccountScreen}
                alt="Create Account Screen"
                style={{ maxWidth: "100%", height: "auto", marginTop: "15px" }}
              />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    size="small"
                    color="primary"
                    sx={{ mt: 2, mr: 2, textTransform: "none" }}
                  >
                    Next
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    size="small"
                    color="primary"
                    sx={{ mt: 2, mr: 2, textTransform: "none" }}
                  >
                    Previous
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="body1">
                <strong>Activation Code </strong>
              </Typography>
            </StepLabel>

            <StepContent>
              <Typography variant="body1">
                An account <strong>activation code</strong> will be sent to the
                email you provided on the form. Click on the link sent to your
                inbox. You will be redirected and automatically signed into the
                e-consultation portal.
              </Typography>
              <img
                src={activationCodeEmail}
                alt="Activation Code Email Email"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginTop: "15px",
                  border: `1.5px solid ${colors.brandColor[200]}`,
                }}
              />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    size="small"
                    color="primary"
                    sx={{ mt: 2, mr: 2, textTransform: "none" }}
                  >
                    Next
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    size="small"
                    color="primary"
                    sx={{ mt: 2, mr: 2, textTransform: "none" }}
                  >
                    Previous
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>

        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button
            onClick={handleReset}
            sx={{ mt: 1, mr: 1, textTransform: "none" }}
          >
            Reset
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default HowToSignup;
