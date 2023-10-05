import React, { useState } from "react";
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { blueGrey } from "@mui/material/colors";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfileDialog = () => {
    setProfileDialogOpen(true);
    handleClose();
  };

  const handleCloseProfileDialog = () => {
    setProfileDialogOpen(false);
  };

  return (
    <div>
      <div id="profile-menu-button">
        <IconButton
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon fontSize="large" sx={{ color: blueGrey[500] }} />
        </IconButton>
      </div>
      <Popover
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <ListItem button onClick={handleOpenProfileDialog}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Popover>
      <Dialog open={isProfileDialogOpen} onClose={handleCloseProfileDialog}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Avatar>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" sx={{ ml: 2 }}>
              User Profile
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
            {/*Fetch data - UserName, Account No,email address*/}
            {/*Dummy data*/}
         <Typography variant="body1">User's Name : Achini Sanjula</Typography> 
         <Typography variant="body1">User's Account No. : 334578 </Typography>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileMenu;
