import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { links } from '../data/routesData';
import FormDialog from './FormDialog';


const Header = () => {
  const location = useLocation();
  const [openForm, setOpenForm] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("Dashboard");
  const [Form, setForm] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() =>{
    for(let link of links){
      if(location.pathname == '/'+link.name){
        setCurrentPage(link.title);
        if(link.form){
          setForm(()=>link.form);
        }else{
          setForm(null);
        }
        break;
      }
    }
  })

  const toggleDialog = () =>{
    setOpenForm(!openForm);
  }

  const handleCloseDialog = () => {
    setOpenForm(false);
    setForm(null); // Reset dialog component
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentPage}
          </Typography>
          {Form && (<Button variant="contained" onClick={toggleDialog}>Add {currentPage}</Button>)}
        </Toolbar>
      </AppBar>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      {Form && (<FormDialog open={openForm} onClose={handleCloseDialog} Form={Form} />)}
    </Box>
  );
}


export default Header 