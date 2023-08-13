import React, { Component } from 'react';
import TopNav from '../components/TopNav';
import '../style/Sale.css';
import TransactionTable from '../components/TransactionTable';
import ProductModal from '../components/ProductModal';
import data from '../testdata/data.json';
import customers from '../testdata/customers.json';
import { Pinterest, Refresh } from '@mui/icons-material';
import PDFcreator from '../components/PDFcreator';
import SearchList from '../components/SearchList';
import { unmountComponentAtNode } from 'react-dom';


export default function Sale(){
    const [formData, setFormdata] = React.useState({});
    const [taxTotal, setTaxTotal] = React.useState(0);
    const [Total, setTotal] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [openPDF, setPDFOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handlePDFOpen = () => setPDFOpen(true);
    const handlePDFClose = () => setPDFOpen(false);
    const [products, setProducts] = React.useState([]);
    const Rate = 0.15;
    const [searchResult, setSearchResult] = React.useState([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState();
    

    

    const handleSelectedCustomer = (selected) =>{

    setSelectedCustomer(selected);

    //console.log(selected)
      setSearchResult([])
  

    }


    function handleChange(event){
        var temp = [];
        
        const {name, value} = event.target;
      
        setFormdata(prevData =>{
            return {...prevData, [name] : value}
        })

        for ( var i = 0; i < customers.length; i ++){
          if (customers[i].name.includes(formData.CustomerName)){
            
            temp.push(customers[i])
          }else{
          temp.push({"name" : "No result"})
          }
        }

        setSearchResult(temp);

      //console.log(temp)
        

      }

      function handleSubmit(event){
        event.preventDefault()
    
      }

      function getItems(){
        var st; 
        var arr = [];

        for (var i = 0 ; i < localStorage.length; i++){
          //console.log(localStorage.getItem(i));
          st = localStorage.getItem(i);
          st = JSON.parse(st)
          arr.push(st)
        }
  
            setProducts(arr)
           
      }

      function handleClear(){
        localStorage.clear();
        window.location.reload()
      }
      
      function calculateTotals(){

        var total = 0;
        var tax = 0;
        
        for (let i =0; i < products.length; i++){
           total += (products[i].price * products[i].quantity);
           
           if(products[i].taxable === 1){
          tax += products[i].price - (products[i].price / (1+Rate));
           }else{
            tax += 0;
           }
        }
        setTaxTotal(tax.toFixed(2))
        setTotal(total)
      }

      function handleProcess(){
        handlePDFOpen()
        calculateTotals()
       
      }
      React.useEffect(()=>{
        calculateTotals()
        getItems()
        
        
      },[products, taxTotal, Total])
     
      
    return(

        <div className='sale'>
            <TopNav/>
            <div className='wrapper'>
            <div className='sale-header'>
                <form onSubmit={handleSubmit} className='sale-form'>

                <input onChange={handleChange} className='CustomerName' name='CustomerName'  type='text'  contentEditable ></input>
                <SearchList listItem = {searchResult} handleSelected = {handleSelectedCustomer}/>
                <p className='companyDetails'  name='Address1' placeholder="Addresss" >
                  {(selectedCustomer ?  selectedCustomer.address
                    : " ")}
                </p>

                <p className='companyDetails'  name='Address2' placeholder="BPN" >
                  {(selectedCustomer ?   selectedCustomer.bpn 

                    : " ")}
                </p>
                <p className='companyDetails'  name='Address' placeholder="VAT" >
                  {(selectedCustomer ? selectedCustomer.vat

                    : " ")}
                </p>
                    
                </form>
                <div className='inner-header'>
                    <div className='invoice-number-display'>Invoice Number : 1</div>
                    <button className='add-product-btn' name="Add" type='submit' value="Add"onClick={handleOpen}>Add Product</button>
                    <ProductModal open={open} handleClose = {handleClose}/>
                </div>
              
                </div>
               {(selectedCustomer ? <PDFcreator open = {openPDF} handlePDFClose={handlePDFClose} tax = {taxTotal} total = {Total} products = {products}  customer = {selectedCustomer} /> : <></>)}
              <TransactionTable data = {products}/>
                <div className='Bottom-bar'>
                  <div className='buttons'>
                  <button name="Clear" className='ClearBtn' value="Clear" onClick={handleClear}>Clear</button>
                <button name="Process" className='ProcessBtn'  value="Process" onClick={handleProcess}>Process</button>
           
                  </div>
                        <div className='transaction-totals'>
                  <div className='info-box'><p>Subtotal</p> <span>{Total-taxTotal}</span></div>
                  <div className='info-box'><p>Tax</p> <span>{taxTotal}</span></div>
                  <div className='info-box'><p>Total</p> <span>{Total}</span></div>

                    </div>
                </div>

            </div>


        </div>




    )
}