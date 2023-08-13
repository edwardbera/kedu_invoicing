import React, { Component } from 'react';
import '../style/TopNav.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link, useNavigate} from 'react-router-dom';
import Menu from '../components/Menu.js';

export default function TopNav(){
    const [open, setOpen] = React.useState(false)
    const [style, setStyle] = React.useState({})



    function toggle(){
        if (open){
            setOpen(false)
            console.log("close")
            setStyle({
                visibility : "hidden"
            })
        }else{
            setOpen(true)
            setStyle({
                visibility : "visible"
            })
            console.log("open")
        }
    }

    


   

    return(
        <div className='top-nav'>
            <Link to={"/"}>
            <img  src='logo.png' className='logo' alt='logo'/>
            </Link>
            
            <ul className='nav-bar'>
                <li><Link style={{ textDecoration: 'none', color:' white' }} to={"/Customers"}>Customers</Link></li>
                <li><Link style={{ textDecoration: 'none', color:' white' }} to={"/Sale"}>Sale</Link></li>
                <li><Link style={{ textDecoration: 'none', color:' white' }} to={"/Products"}>Products</Link></li>
                <li onClick={toggle}><FontAwesomeIcon className="userIcon" icon={faUser}/></li>    
            </ul>
            <Menu visibility = {style} />
        </div>
    )
}