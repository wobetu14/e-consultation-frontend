import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./components/guest/Home";
import About from "./components/guest/About";
import Login from "./components/guest/auth/Login";
import GuestSignup from "./components/guest/auth/GuestSignup";
import { UserContext } from "./contexts/UserContext";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/users/Users";
import { PageNotFound } from "./PageNotFound";
import Regions from "./components/admin/regions/Regions";
import Sectors from "./components/admin/sectors/Sectors";
import Drafts from "./components/admin/drafts/Drafts";
import CreateRegion from "./components/admin/regions/CreateRegion";
import CreateSector from "./components/admin/sectors/CreateSector";
import CreateDraft from "./components/admin/drafts/CreateDraft";
import Institutions from "./components/admin/institutions/Institutions";
import CreateInstitution from "./components/admin/institutions/CreateInstitution";
import CreateUser from "./components/admin/users/CreateUser";
import DocumentLayout from "./components/guest/DocumentLayout";
import DocumentDetailView from "./components/guest/DocumentDetailView";
import { AccessRestricted } from "./AccessRestricted";
import UserProfile from "./components/admin/users/UserProfile";
import DraftApprovalRequest from "./components/admin/drafts/DraftApprovalRequest";
import ExternalCommentRequests from "./components/admin/drafts/ExternalCommentRequests";
import ExternalRequestsPreview from "./components/admin/drafts/ExternalRequestsPreview";

import UsersTable from "./components/admin/DataTables/UsersTable";
import Reports from "./components/admin/Reports";
import DocumentDetails from "./components/admin/drafts/DocumentDetails";
import AccountActivation from "./components/guest/AccountActivation";
import CommenterLayout from "./layouts/CommenterLayout";
import CommenterDashboard from "./components/guest/CommenterDashboard";
import DraftAssignments from "./components/admin/drafts/DraftAssignments";
import CommentReflections from "./components/admin/drafts/CommentReflections";
import ExternalRequestDetails from "./components/admin/drafts/external_requests/ExternalRequestDetails";
import InvitedDrafts from "./components/admin/drafts/InvitedDrafts";
import RedirectCommentInvitation from "./components/admin/drafts/RedirectCommentInvitation";
import ResetPasswordProvideEmail from "./components/guest/auth/ResetPasswordProvideEmail";
import ResetPassword from "./components/guest/auth/ResetPassword";
import DraftInvitationCheckpoint from "./components/guest/auth/DraftInvitationCheckpoint";
import AssignedToComment from "./components/admin/drafts/AssignedToComment";
import HelpCenter from "./components/documentation/HelpCenter";
import ResourceCenter from "./components/documentation/admin_documentation/ResourceCenter";

function App() {
  /**
   * Theme and colorMode variables are used to define app theme and color and their definitions
   * is available at theme.js file
   */
  const [theme, colorMode] = useMode();

  /**
   * Access user's role from users context which has been defined on UserContext.jsx file
   */
  const { userRole } = useContext(UserContext);

  /**
   * Define access to components visible to all public users whether they are registered or not.
   * Everyone can access components defined as children of <PublicElement /> component
   */
  const PublicElement = ({ children }) => {
    return <>{children}</>;
  };

  /**
   * Define components accessible only for admin level users. The type of users defined as 
   * 'Super Admin, Federal Admin, Federal Institutions Admin, Regional Admin,
   * Regional Institutions Admin, Approver and Uploader' can access the components defined as
   * as children of <AdminElement /> component. Other user such as unregistered users and commenters 
   * can not have access to this elememnt
   */

  const AdminElement = ({ children }) => {
    if (
      userRole === "Super Admin" ||
      userRole === "Federal Admin" ||
      userRole === "Federal Institutions Admin" ||
      userRole === "Regional Admin" ||
      userRole === "Regional Institutions Admin" ||
      userRole === "Approver" ||
      userRole === "Uploader"
    ) {
      return <>{children}</>;
    } else {
      return (
        <>
          <AccessRestricted />
        </>
      );
    }
  };

  /**
   * Define components accessible only for 'Uploader' user roles
   */

  const Uploaders = ({ children }) => {
    if (userRole === "Uploaders") {
      return <>{children}</>;
    } else {
      return (
        <>
          <AccessRestricted />
        </>
      );
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}> {/* Accessing context data for color definitions */}
      <ThemeProvider theme={theme}> {/* Accessing app theme context data definitions */}
        <CssBaseline />
        <div className="App">
          <main className="content" display="flex">
            <Routes>
              <Route
                path="/"
                element={
                  /**
                   * Render publicly accessible elements / components
                   */
                  <PublicElement>
                    <RootLayout /> {/* A layout component to render base and public app components */}
                  </PublicElement>
                }
              >
                {/* Routing definitions for elements under <PublicElement /> parent component */}
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                {/* <Route path="help" element={<HelpCenter />} /> */}
                <Route path="help" element={<HelpCenter />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="reset_password/email_address"
                  element={<ResetPasswordProvideEmail />}
                />
                <Route path="reset_password" element={<ResetPassword />} />
                <Route path="create-account" element={<GuestSignup />} />
                <Route path="user_profile" element={<UserProfile />} />
                <Route
                  path="activation/:token"
                  element={<AccountActivation />}
                />
                <Route
                  path="draft/comment-invitation/:id"
                  element={<RedirectCommentInvitation />}
                />
                <Route path="*" element={<PageNotFound />} />
                {/* </Route> */}
              </Route>

              <Route
                path="/draft"
                element={
                  <PublicElement>
                    <DocumentLayout />
                  </PublicElement>
                }
              >
                <Route path=":id" element={<DocumentDetailView />} />
                <Route
                  path="reflection-on-comments/:id"
                  element={<CommentReflections />}
                />
              </Route>

                <Route path="/commenter" element={<CommenterLayout />}>
                <Route index element={<CommenterDashboard />} />
                <Route path="assigned_drafts" element={<DraftAssignments />} />
                <Route path="invited_drafts" element={<InvitedDrafts />} />
                
                <Route
                  path="draft_invitation_checkpoint"
                  element={<DraftInvitationCheckpoint />}
                />
                <Route
                  path="assigned_to_comment"
                  element={<AssignedToComment />}
                />
                <Route
                  path="comment_reflections"
                  element={<DraftAssignments />}
                />
                <Route path="user_profile" element={<UserProfile />} />
              </Route>

             {/* 
               Route definitions for components under <AdminElement /> 
             */}
              <Route
                path="/admin"
                element={
                  <AdminElement>
                    <AdminLayout />
                  </AdminElement>
                }
              >
                {/* 
                  Route definitions for components under <AdminElement /> components
                  i.e. Route definitions for childrens of <AdminElement /> component
                 */}
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="create_user" element={<CreateUser />} />
                <Route path="user_profile" element={<UserProfile />} />
                <Route path="institutions" element={<Institutions />} />
                <Route
                  path="create_institution"
                  element={<CreateInstitution />}
                />
                <Route path="regions" element={<Regions />} />
                <Route path="create_region" element={<CreateRegion />} />
                <Route path="sectors" element={<Sectors />} />
                <Route path="create_sector" element={<CreateSector />} />
                <Route path="drafts" element={<Drafts />} />
                <Route path="data_table" element={<UsersTable />} />
                <Route path="reports" element={<Reports />} />
                <Route
                  path="create_draft"
                  element={
                    <Uploaders>
                      <CreateDraft />
                    </Uploaders>
                  }
                />
                <Route
                  path="draft_approval_request"
                  element={<DraftApprovalRequest />}
                />
                <Route
                  path="document_details/:id"
                  element={<DocumentDetails />}
                />
                <Route
                  path="external_request_details/:id"
                  element={<ExternalRequestDetails />}
                />
                <Route
                  path="external_comment_requests"
                  element={<ExternalCommentRequests />}
                />
                <Route
                  path="external_requests_preview/:id"
                  element={<ExternalRequestsPreview />}
                />
                <Route
                  path="resource_center" 
                  element={<ResourceCenter />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
