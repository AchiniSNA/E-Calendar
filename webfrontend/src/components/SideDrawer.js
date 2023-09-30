import React, { useState } from "react";
import { Drawer, Box, Typography, Button,IconButton, Dialog,DialogActions,DialogContent,DialogTitle,TextField,Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { blueGrey } from "@mui/material/colors";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AddIcon from "@mui/icons-material/Add"; // Import the plus icon

function SideDrawer({ isOpen, onClose }) {

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const handleCreateClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
    };


  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Box p={2} width="250px" role="presentation">
        <Typography variant="h6" component="div">
          Accounts
        </Typography>
      </Box>

      <Box p={2} width="250px" role="presentation">
        <Stack direction="row" alignItems="center">
        <Typography variant="h6" component="div">
          Other Calendars
        </Typography>
        <IconButton onClick={handleCreateClick}>
          <AddIcon />
        </IconButton>
        </Stack>
      </Box>

      <Box style={{ position: "absolute", bottom: "0", padding: "0px 10px" }}>
        <Button>
          <HelpOutlineIcon fontSize="medium" sx={{ color: blueGrey[500], padding: "0px 1px" }} />
          <Link to="/dayView">Help and Feedback </Link>
        </Button>
      </Box>

        {/* Create New Calendar Dialog */}
      <Dialog open={isCreateDialogOpen} onClose={handleCreateDialogClose}>
        <DialogTitle>Create New Calendar</DialogTitle>
        <DialogContent>
          <TextField label="Calendar Name" fullWidth />
          {/* Add more input fields for calendar details as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateDialogClose}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

    </Drawer>
  );
}

export default SideDrawer;
