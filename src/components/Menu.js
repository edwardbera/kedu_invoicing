import React, { Component } from 'react';
import { faPowerOff} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Menu(props){

    return(
        <ul className='Menu' style={props.visibility}>
            <li className='Menu-item'>
                Profile
            </li>
            <li className='Menu-item'>
                Preferences
            </li>
            <li className='Menu-item'>
            <FontAwesomeIcon className="menu-icon" icon={faPowerOff}/> Logout 
            </li>
        </ul>
    )
}