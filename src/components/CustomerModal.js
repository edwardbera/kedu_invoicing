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



export default function CustomerModal(props){
  const [checked, setChecked] = React.useState([]);
  const product = React.useRef(data);
  const [formData, setFormdata] = React.useState({});
 
  function addCustomer(){
      

       //console.log( product.current[checked[i]])
       console.log(formData.CustomerName)
      }
   

  function handleChange(event){

    const {name, value} = event.target

    setFormdata(prevData =>{
      return {...prevData, [name] : value}
  })


    
  }

  
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
          <form  className='sale-form'>

          <input onChange={handleChange} className='CustomerName' name='CustomerName' placeholder='Name' type='text'  contentEditable ></input>
          <input onChange={handleChange}  className='CustomerName' name='address' placeholder='Address' type='text'  contentEditable ></input>
          <input onChange={handleChange}  className='CustomerName' name='city' placeholder='City' type='text'  contentEditable ></input>
          <input onChange={handleChange}  className='CustomerName' name='country' placeholder='Country' type='text'  contentEditable ></input>
          <input onChange={handleChange}  className='CustomerName' name='contact' placeholder='Contact Number' type='text'  contentEditable ></input>
          <input onChange={handleChange}  className='CustomerName' name='email' placeholder='Email' type='text'  contentEditable ></input>
       
          </form>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
       
          
         
 </Typography>
 <Button onClick={addCustomer} variant="outlined">Add</Button>
 
        </Box>
      </Modal>

    )
}