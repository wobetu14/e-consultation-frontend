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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
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
      ? 'rgba(255, 255, 255, .05)'
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

export default function DraftPreparationGuide() {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
          <Typography variant="h5">
            A Guide to Prepare Draft Document
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        
            <Typography variant='h5' sx={{ paddingLeft:"15px", paddingTop:"5px" }}>
                To successfully upload and make the draft document available for the public to comment on it, 
                we need to follow some strict guidelines in preparing the document. 
            </Typography>

            <Typography variant='h5' sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                The following are the most important points to follow in preparing the draft document. 
            </Typography>

            <ul type='square'>
                <li>
                    <Typography sx={{ paddingLeft:"15px", paddingTop:"5px" }}>
                        We are allowed to upload only MS Word documents (<strong>.doc</strong> or <strong>.docx</strong> files - <strong>.docx</strong> is highly recommended).
                    </Typography>
                </li>
                <li>
                    <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                        We have to prepare the draft document in such a way that titles and subtitles should be 
                        formatted as <strong>“Heading 1”</strong>, <strong>“Heading 2”</strong>, <strong>“Heading 3”</strong> etc in <strong>Microsoft Word</strong>.
                    </Typography>
                </li>
            </ul>

            <Typography variant='h5' sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
                Note that the template to prepare the document is available as show in the above sectionn. 
            </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}