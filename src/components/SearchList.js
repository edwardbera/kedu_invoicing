import React, { useState } from 'react';
import '../style/SearchList.css';



export default function SeachList(props){

    const [listItem, setListItem] = React.useState([])

    function handleClick(event){
     
       props.handleSelected(JSON.parse(event.target.attributes.data.textContent))

       
    }

    function createList(){

        const listItem = props.listItem.map((item)=>{
            return <ul className='SearchList-item' onClick={handleClick} data = {JSON.stringify(item)}>{item.name}</ul>
        });
        
        setListItem(listItem);
           
        
    }

    React.useEffect(()=>{
        createList()
    });

    return(
        <li className='SearchList'>
            
        {listItem}
        </li>

    )
}