//GLOBAL - components from npm
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//STYLES
import './loading.scss'

//COMPONENTS


//SERVICES - api, conectors...


//GLOBAL STATE - redux, env...


//ASSETS - icons, images...


export default function Loading({open}) {
    //GENERAL
    
    //STATES
    
    
    //REDUX - Selectors
    
    
    //FUNCTIONS
    
    
    //USE EFFECTS
    
    
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
}
