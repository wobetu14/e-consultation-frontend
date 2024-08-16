import React, {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteCommentDialog from "./Manage_Comments/DeleteCommentDialog";
import EditCommentDialog from "./Manage_Comments/EditCommentDialog";

const ManageComment = ({
  commentID,
  commentText,
  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

      const [serverErrorMsg, setServerErrorMsg] = useState(null);
      const [serverSuccessMsg, setServerSuccessMsg] = useState(null);
      const [networkError, setNetworkError] = useState(null);
      const [loading, setLoading] = useState(false);
      const [networkErrorMessage, setNetworkErrorMessage] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCommentEditDialog = () => {
    setOpenEditDialog(true);
  };

  return (
    <div>
      <MoreHorizIcon
        fontSize="small"
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleCommentEditDialog}>Edit</MenuItem>
        <MenuItem onClick={handleCommentDeleteDialog}>Delete</MenuItem>
      </Menu>

      {openDeleteDialog && (
        <DeleteCommentDialog
          title="Delete Comment"
          text="You are about to delete this comment. Are you sure?"
          commentText={commentText}
          commentID={commentID}
          fetchDocumentDetails={fetchDocumentDetails}
          fetchDocumentSections={fetchDocumentSections}
          fetchDocumentComments={fetchDocumentComments}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          serverErrorMsg={serverErrorMsg}
          serverSuccessMsg={serverSuccessMsg}
          networkError={networkError}
          loading={loading}
          networkErrorMessage={networkErrorMessage}
          setServerErrorMsg={setServerErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setNetworkError={setNetworkError}
          setLoading={setLoading}
          setNetworkErrorMessage={setNetworkErrorMessage}
          setAnchorEl={setAnchorEl}
        />
      )}

      {openEditDialog && (
        <EditCommentDialog
          title="Edit Comment"
          text={null}
          commentText={commentText}
          commentID={commentID}
          fetchDocumentDetails={fetchDocumentDetails}
          fetchDocumentSections={fetchDocumentSections}
          fetchDocumentComments={fetchDocumentComments}
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          serverErrorMsg={serverErrorMsg}
          serverSuccessMsg={serverSuccessMsg}
          networkError={networkError}
          loading={loading}
          networkErrorMessage={networkErrorMessage}
          setServerErrorMsg={setServerErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setNetworkError={setNetworkError}
          setLoading={setLoading}
          setNetworkErrorMessage={setNetworkErrorMessage}
        />
      )}
    </div>
  );
};

export default ManageComment;