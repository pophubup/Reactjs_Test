import React,{useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Row, Col,Button, ProgressBar} from 'react-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import allActions from '../redux/actions/AllActions'
import axios from 'axios'
import { useState } from 'react';

const App = () => {
    const data = useSelector(state => state.product.products)
    const data2 = useSelector(state => state.getProduct.getPRoducts)
    const[products, setProduts] = useState({productarr : []})
    const dispatch = useDispatch();

    useEffect( () => {
         
       dispatch(allActions.defaultAction.setDefault( { type: "DEFAULTPRODUCTS"  })) 
                    
          
      
     },[dispatch]); 

    const handlesingalProduct = (obj) =>{      
        console.log(obj)
        dispatch(allActions.getProductAction.getProduct({type :"GETPRODUCT", product : obj}))
        dispatch(allActions.checkPurchaseAction.checkPurchase({obj}))
    }
    return(
            
             <Row style={{marginLeft:"5px"}} key ={0}>
                 {console.log(data.length)}
               {
                   
                data.length > 0 ? (
                 
                    data.map((item,index)=>{
                        return(
                          
                          <Col xs="auto" lg="auto" md="auto" style={{margin:"10px"}} key={index}>
                          
                           <Card style={{ width: '300px' }}>
                              <Card.Img variant="top" style={{height:"150px"}} src={item.productImagePath} />
                             <Card.Body>
                               <Card.Title>{item.productName}</Card.Title> 
                               <Row>  
                                   <Col sm="auto" lg="auto" md="auto"><Card.Text> Price : {item.productPrice}</Card.Text></Col>
                                   <Col sm="auto" lg="auto" md="auto"><Card.Text> Category : {item.categoryID}  </Card.Text></Col>
                                   <Col sm="auto" lg="auto" md="auto"><Card.Text> Description :  {item.productDescription}  </Card.Text></Col>
                               </Row> 
                              <Button variant="primary" id={item.productID} onClick={(e)=> handlesingalProduct(data.filter(x=>x.productID === e.target.id)) }  >Purchase</Button>
                            </Card.Body>
                             </Card>
                        </Col>
                         
                        )
                    })
                ):(

                    null
                )
               
            } 
            </Row>
    )
}

export default App;