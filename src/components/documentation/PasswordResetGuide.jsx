import {Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';

import PasswordReset1 from './docImages/PasswordReset1.png';
import PasswordResetCodePic from './docImages/PasswordResetCodePic.png';

/**
 * Tools to build Stepper functionality
 */
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { tokens } from '../../theme';

const PasswordResetGuide = () => {

    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

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
        <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
         If you forget your account password, you can go through the password reset process via <strong>“forgot password”</strong> link.
        </Typography>

        <Typography variant='h5' sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
            Steps to Reset Password
        </Typography>

        <ol>
            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    Below the sign-in screen, click on <strong>“Forgot password?”</strong> link. 
                    You will be redirected to a screen which asks you to enter the email address you are using to access on the e-consultation portal. 
                    The email address should be the one you have used at the time of account sign-up. 
                </Typography>

                <Box m="0 30px">
                    <img src={PasswordReset1} alt="Password Reset Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    A password reset code will be sent to your email. 
                    Use the code and you can reset your password. 
                </Typography>

                <Box m="0 30px">
                    <img src={PasswordResetCodePic} alt="Password Reset Code Input Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>
        </ol>
    </>
  )
}

export default PasswordResetGuide