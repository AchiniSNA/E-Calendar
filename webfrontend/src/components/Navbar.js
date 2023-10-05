import React from 'react';
import {useState} from "react";
import { Link } from "react-router-dom";
import {AppBar, Toolbar, IconButton, Typography,Stack,Button} from "@mui/material";
import "../style/Navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import { blueGrey } from '@mui/material/colors';
import NotesIcon from '@mui/icons-material/Notes';
import ProfileMenu from "./ProfileMenu"; // Import the ProfileMenu component
import SideDrawer from "./SideDrawer"; // Import the SideDrawer component



function Navbar() {
 const [isDrawerOpen, setIsDrawerOpen] = useState(false)
// const [selectedTimeZone, setSelectedTimeZone] = useState('GMT')
  
  return (

    
    <AppBar position ='static' sx={{ bgcolor: "white" }} >
      <Toolbar>

        <IconButton size='large' edge='start' colour='inherit' aria-label='logo' onClick={()=> setIsDrawerOpen(true)}>
          <NotesIcon/>
        </IconButton>
        
        {/* Render the SideDrawer component */}
        <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

        
        <img className="img1" alt="" src="./BOC.jpeg"  />
        <Typography variant='h4' component='div' sx={{flexGrow:1}} color={'black'} letterSpacing={2}> CALENDAR</Typography>
        
        
       <Stack direction={'row'}  alignItems="center" spacing={5}>
        {/*  <SearchIcon fontSize="large" sx={{ color: blueGrey[500] }} /> */}
        <SearchIcon fontSize="large" sx={{ color: blueGrey[500] }} />
         
         {/* <AccountCircleIcon fontSize="large" sx={{ color: blueGrey[500] }} />  */}
        {/* Render the ProfileMenu component */}
           <ProfileMenu />  
         

       </Stack>
    

      </Toolbar>
      
    </AppBar>
    
  
  )
}

export default Navbar;


  



  