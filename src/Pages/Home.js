import React, { Component } from 'react';
import '../style/Home.css';
import {Link, useNavigate} from 'react-router-dom';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../components/Menu.js';

export default function Home(){
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
        <div className="Home">
         <Link to={"/"}>
            <img  src='logo.png' className='logo' alt='logo'/>
            </Link>
            <ul className='userIcon'>
            <li onClick={toggle}><FontAwesomeIcon className="icon" icon={faUser}/></li>    
            <Menu visibility = {style} />
            </ul>
            <div className='innerWrapper'>
            <div className='statusField'>
            <div className='revenue'>
                <p>US$1,000.00</p>
            </div>
            <div className='revenue'>
                <p>US$2,000.00</p>
            </div> 
            </div>

            <div className='homeButtons'>
            <Link to={"/Customers"}>
                <button className="homeButton">Customer</button>
                </Link>
                <Link to={"/Products"}>
                <button className="homeButton">Products</button>
                </Link>
                <Link to={"/Sale"}>
                <button className="homeButton">Sales</button>
                </Link>
                <Link to={"/Customer"}>
                <button className="homeButton">Preferences</button>
                </Link>
             

            </div>
            

            </div>
           

            

        </div>
    )
}