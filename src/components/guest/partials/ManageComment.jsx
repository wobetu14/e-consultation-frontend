import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteCommentDialog from "./Manage_Comments/DeleteCommentDialog";
import EditCommentDialog from "./Manage_Comments/EditCommentDialog";

const ManageComment = ({
  commentID,
  commentText,
  openEditDialog,
  setOpenEditDialog,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
        <MenuItem onClick={handleCommentEditDialog}>Edit {commentID}</MenuItem>
        <MenuItem onClick={handleCommentDeleteDialog}>
          Delete {commentID}{" "}
        </MenuItem>
      </Menu>

      {openDeleteDialog && (
        <DeleteCommentDialog
          title="Delete Comment"
          text="You are about to delete this comment. Are you sure?"
          commentID={commentID}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
      )}

      {openEditDialog && (
        <EditCommentDialog
          title="Edit Comment"
          text={null}
          commentID={commentID}
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
        />
      )}
    </div>
  );
};

export default ManageComment;