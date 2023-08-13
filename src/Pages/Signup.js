import React, { Component } from 'react';
import '../style/Login.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
const url = "http://localhost:8000/CreateUser";


export default function Login(){
    const [formData, setFormData] = React.useState({})

    async function login(data){
       await axios.post(url,{
        data : data
       }).then((response)=>{
        console.log("Yes")
       }).catch(error =>{
            console.log(error);
        })
        
    }
    function handleSubmit(event){
        event.preventDefault()
        login(formData)

    }

    function handleChange(event){
        const {name, value} = event.target;

        setFormData(prevData =>{return{...prevData, [name]: value}})
    }


    return(

        <div className='Login'>

            <form onSubmit={handleSubmit} className='login-form'>
            <input onChange={handleChange} type ="text" name="firstname" placeholder='Email' />
            <input  onChange={handleChange} type ="text" name="lastname" placeholder='Email' />
            <input  onChange={handleChange} type ="email" name="email" placeholder='Email' />
            <input onChange={handleChange} type ="password" name="password" placeholder='Password' />
            <button onSubmit={handleSubmit} name='login-button' >Login</button>

           


            </form>
        </div>
    )
}