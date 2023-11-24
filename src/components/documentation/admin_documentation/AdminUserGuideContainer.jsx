import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import GettingStarted from '../GettingStarted';
import UserManagement from '../UserManagement';
import HowToSignup from '../HowToSignup';
import HowToSignIn from '../HowToSignIn';
import PasswordResetGuide from '../PasswordResetGuide';
import CommentingOnDraft from '../CommentingOnDraftGuide';
import GettingCommentInsightsGuide from '../GettingCommentInsightsGuide';
import CreateNewUserGuide from './CreateNewUserGuide';
import CreateNewSectorGuide from './CreateNewSectorGuide';
import CreateNewInstitutionGuide from './CreateNewInstitutionGuide';
import UploadNewDraftGuide from '../UploadNewDraftGuide';
import SendingOpeningRequestGuide from '../SendingOpeningRequestguide';
import AcceptOpeningRequestGuide from '../AcceptOpeningRequestGuide';
import { Paper } from '@mui/material';
import ExternalRequestsGuide from '../ExternalRequestsGuide';
import SetupLanguageGuide from './SetupLanguageGuide';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1.5px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .03)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AdminUserGuideContainer() {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <div style={{ marginBottom:"100px" }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
          <Typography variant="h5">
            Getting Started
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GettingStarted />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="h5">
            User Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserManagement />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant="h5">
           Sign Up
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HowToSignup />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography variant="h5">
            Sign In
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HowToSignIn />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography variant="h5">
            Password Reset
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PasswordResetGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography variant="h5">
            Creating New User
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CreateNewUserGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography variant="h5">
            Creating New Sector
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CreateNewSectorGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography variant="h5">
            Creating New Institution
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CreateNewInstitutionGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography variant="h5">
            Upload New Draft Document
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UploadNewDraftGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <Typography variant="h5">
            Sending Draft Opening Request
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SendingOpeningRequestGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
          <Typography variant="h5">
            Accepting or Rejecting Draft Opening Request
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AcceptOpeningRequestGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
        <AccordionSummary aria-controls="panel12d-content" id="panel12d-header">
          <Typography variant="h5">
            External Requests / Invitations
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ExternalRequestsGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel13'} onChange={handleChange('panel13')}>
        <AccordionSummary aria-controls="panel13d-content" id="panel13d-header">
          <Typography variant="h5">
            Commenting on a Draft Document
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommentingOnDraft />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel14'} onChange={handleChange('panel14')}>
        <AccordionSummary aria-controls="panel14d-content" id="panel14d-header">
          <Typography variant="h5">
            Getting Comment Insights
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GettingCommentInsightsGuide />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel15'} onChange={handleChange('panel15')}>
        <AccordionSummary aria-controls="panel15d-content" id="panel15d-header">
          <Typography variant="h5">
            Add New Language
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SetupLanguageGuide />
        </AccordionDetails>
      </Accordion>

    </div>
  );
}