import React, { Component } from 'react';
import '../style/Login.css';
import {Link, useNavigate} from 'react-router-dom';

export default function Login(){

    return(

        <div className='Login'>

            <form className='login-form'>

            <input  type ="email" name="email" placeholder='Email' />
            <input  type ="password" name="password" placeholder='Password' />
            <button name='login-button' >Login</button>

            <Link to={'./Signup'}>Create User Account</Link>


            </form>
        </div>
    )
}