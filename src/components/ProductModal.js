import React, { Component } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { TextField } from '@mui/material';
import { Margin } from '@mui/icons-material';
import data from '../testdata/products.json';
import Button from '@mui/material/Button';



export default function ProductModal(props){
  const [checked, setChecked] = React.useState([]);
  const product = React.useRef(data);
 
  function add(){
      var counter = localStorage.length ;
   
      for(var i = 0; i < checked.length; i++){
        
        if (product.current[checked[i]].quantity >= parseInt(document.getElementById('qty'+checked[i]).value)){  
          product.current[checked[i]].quantity = parseInt(document.getElementById('qty'+checked[i]).value)
          localStorage.setItem( counter++ , JSON.stringify(product.current[checked[i]]));
          //window.location.reload()

          
        }else if(!parseInt(document.getElementById('qty'+checked[i]).value)){
          product.current[checked[i]].quantity = "1"
          localStorage.setItem( counter++ , JSON.stringify(product.current[checked[i]]));
        
        }else{


          console.log('Insufficient Stock')
        }


        
      

       //console.log( product.current[checked[i]])
      }
   
     
    
  
     
   
  }

  function get(){

    var st;

    for (var i = 0 ; i < localStorage.length; i++){
      //console.log(localStorage.getItem(i));
      st = localStorage.getItem(i);
      st += ','+st
    }
        st ='[' + st +']'
        console.log(st)
 
    
   
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };




    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  
      const style2 ={
        width : 100,
  
        left :  '60%',
      }

    return(

        <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Products
          </Typography>
          <Typography id="modal-modal-row-title" variant="h6" component="h4">
            Products           Availability
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map((value, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          
          <ListItem 
            key={index}
            secondaryAction={
              <TextField    sx={style2} id={'qty'+index} label="Quantity" variant="standard"  />
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.description} | ${value.quantity}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
 </Typography>
 <Button onClick={add} variant="outlined">Add</Button>
 
        </Box>
      </Modal>

    )
}