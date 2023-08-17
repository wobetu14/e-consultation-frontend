import { Typography } from '@mui/material'
import React from 'react'
import ImageUsersHeirarchy from './docImages/user roles heirarchy.png'

/**
 * 
 * @returns Table resources to build a table for users and roles definition
 */
 import Table from '@mui/material/Table';
 import TableBody from '@mui/material/TableBody';
 import TableCell from '@mui/material/TableCell';
 import TableContainer from '@mui/material/TableContainer';
 import TableHead from '@mui/material/TableHead';
 import TableRow from '@mui/material/TableRow';
 import Paper from '@mui/material/Paper';

const UserManagement = () => {

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
  return (
    <>
        <Typography sx={{ paddingLeft:"20px", paddingTop:"20px" }}>
            The application allows users to sign-up as a citizen and login to provide comments and see comment 
            reports as well. The application also manages various user roles to administer the system and its functions. 
            The picture below depicts the various user roles / permissions the system can handle. 

            <img src={ImageUsersHeirarchy} alt="User Roles Heirarchy" />
        </Typography>

        <Typography variant="h5" sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
            Users Roles and Responsibilities 
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop:"15px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 200 }}>
                <Typography variant="h5" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    User Role
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h5" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Responsibility
                </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Super Admin
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body1'>
                This user is responsible for managing the overall technical issues of the system and handles 
                the creation and management of other users such as (Federal Admin, Regional Admin) and economic sectors. 
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Federal Admin
                </Typography>
              </TableCell>
              <TableCell>
                  <Typography variant="body1">
                    This user is responsible for creating and managing federal institutions and their institutional admin users. 
                  </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Regional Admin
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                    This user is responsible for creating and managing regional institutions and their institutional admin users.
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Institutional Admin
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                    This user is responsible for creating and managing institutional users. 
                    Important institutional users include Uploader, Approver and Commenter or Institutional Commenter.
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Uploader
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                    This is a specific user in an institution.
                    He / she is mainly responsible for creating / uploading a new draft document, 
                    managing it and sending opening requests for a draft document into the “Approver” account.
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Approver
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                    This is a specific user in an institution.
                    He / she is mainly responsible for approving a draft document to open for comment, assign repliers, 
                    assign individual commenters and send a request to other institutions to comment on a draft document.
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Commenters / Institutional Commenters
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                    Responsible for providing expert comments on a draft document that they are assigned to provide a comment, 
                    provide a reply to public comments on a specific document that they are assigned to provide a reply.
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight:"600", paddingTop:"15px" }}>
                    Commenters / Individual Commenters / Public Commenters
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                    This user represents the general public or citizens who will visit the portal 
                    and provide comments on a specific draft document.
                </Typography>
              </TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default UserManagement