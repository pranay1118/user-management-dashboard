import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './UserTabs.css';
import { green } from '@mui/material/colors';



export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display:'flex',flexDirection:'row',gap:'10px'}}>
        <img src="https://media.licdn.com/dms/image/D4D0BAQHOAJsWLn8X0A/company-logo_200_200/0/1683033542523/greenieone_logo?e=1707955200&v=beta&t=MVwl_uvnIYPoOeuGMPsZn68yGwNGh_8uclbHqlOcsJU" alt="Greenie Logo" width="50" height="50" textAlign= "center"></img>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Management Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
