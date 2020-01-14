import React,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Row, Col,Button} from 'react-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import allActions from '../redux/actions/AllActions'
import CardGroup from 'react-bootstrap/CardGroup'
const App = () => {
    const data = useSelector(state => state.product.products)
    const data2 = useSelector(state => state.getProduct.getPRoducts)
    const dispatch = useDispatch();
    useEffect(() => {
        if(data2.length !== 0){
            data2.map((item)=>{      
                data.filter(x=>x.productID !== item.productID)
              })                 
        }else{
            dispatch(allActions.defaultAction.setDefault("DEFAULTPRODUCTS"))
        }            
    },[dispatch]); 

    const handlesingalProduct = (obj) =>{      
       
        dispatch(allActions.getProductAction.getProduct({type :"GETPRODUCT", product : obj}))
        dispatch(allActions.checkPurchaseAction.checkPurchase({obj}))
    }
    return(
            
               <CardGroup>
                   <Row style={{width:"1200px"}} >
               {
                data.length > 0 ? (
                    data.map((item,index)=>{
                        return(
                          
                          <Col style={{margin:"10px"}}key={item.productID}>
                          
                           <Card style={{ width: '300px' }} >
                              <Card.Img variant="top" style={{height:"150px"}} src={require("../content/" + item.productImagePath.split('/')[2].toString())} />
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
        </CardGroup>
    )
}

export default App;