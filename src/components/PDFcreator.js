import React, { Component } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Modal from '@mui/material/Modal';





export default function PDFcreator(props){




    
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            
            alignContent : 'center',
            padding : '5%',
            fontSize : '8',
        },
        wrapper :{
            position : 'absolute',
            alignSelf : 'center',
            width : '90%',
            height : '95%',
       
            
            
        },

        button : {
            width : '5%',
            height : '33px',
           
            backgroundColor : 'white',
            border : 'none',
        },

        section : {
            display : 'flex',
            flexDirection : 'row',

            justifyContent : 'space-between'
        },

        innerSection : {
            
            width :"45%",
            border : '1px solid  black',
            bottom : '2px',
            padding : '5px'
        },
        section1 : {
          
            border : '1px solid black',
            flexDirection : 'row',
            justifyContent : 'space-between',
            padding : '2px'
        },
        section2 : {
          
            flexDirection : 'column',
            justifyContent : 'space-between'
        },

        section3 : {
          
            border : '1px solid black',
            flexDirection : 'row',
            position : 'absolute',
            bottom : '50px',
            right : '10px',
            width : '200px',
            justifyContent : 'space-between',
           
            padding : '5px'
            
        },

        heading : {
            textAlign : 'center',  
            width : '100%',
            bottom : '5px',
            padding : '5px'
          
        },

        rows : {

            flexDirection : 'row',
            justifyContent : 'space-between'

        }
    });
    
    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.heading}>
                    <Text>Fiscal Tax Invoice</Text>
                    <Text>EDWARD SOLUTIONS PVT LTD</Text>
                    <Text>14 Arundel Road</Text>
                    <Text>Alexander Park</Text>
                    <Text>Harare</Text>
                    <Text>Vat # 10015668</Text>
                    <Text>BP # 200027482</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.innerSection}>
                <Text>Bill to :</Text>
                    <Text>{props.customer.name}</Text>
                    <Text>{props.customer.address}</Text>
                    <Text>{props.customer.vat}</Text>
                    <Text>{props.customer.bpn}</Text>
                    </View>
                    <View style={styles.innerSection}>
                    <Text>Invoice Number :</Text>
                    </View>


                </View>

                <View style={styles.section1}>
                    <Text>Description</Text>
                    <Text>Qty</Text>
                    <Text>Price</Text>
                    <Text>Tax</Text>
                    <Text>Amount</Text>
                </View>

                <View style={styles.section2}>
                    
                    {props.products.map((row, index)=>{
                        return(
                            < View style={styles.rows} >
                            <Text>{row.description}</Text>
                            <Text>{row.quantity}</Text>
                            <Text>{row.price}</Text>
                            <Text>{row.taxable}</Text>
                            <Text>{row.price * row.quantity}</Text>
                            </View>
                        )
                                

                    })
                }
                
                </View>

                <View style={styles.section3}>
                    <View>
                    <Text>Subtotal</Text>
                    <Text>Tax</Text>
                    <Text>Invoice Total</Text>
                    </View>
                    <View>
                    <Text>{props.total - props.tax}</Text>
                    <Text>{props.tax}</Text>
                    <Text>{props.total}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return(
        <Modal
      
        open={props.open}
        onClose={props.handleDFClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <div>

        <button style ={styles.button} onClick={props.handlePDFClose}>Close</button>
        <PDFViewer   style={styles.wrapper} >
        
            {MyDocument}
        </PDFViewer>
        </div>
      
        </Modal>
    )
}