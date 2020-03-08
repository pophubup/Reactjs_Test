import React,{useState}from 'react'
import { useSelector,useDispatch} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Alert} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import allActions from '../redux/actions/AllActions'

const App = () =>{
    const data = useSelector(state => state.getProduct.getPRoducts);
    const [prevPurchase, setPrevPurchase] = useState({prevarr : []});
    const [isSent, setIsSent] = useState({toMyOrder : false});
    const dispatch = useDispatch();
    const options = {
        sizePerPageList: [ {
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
            text: 'All', value: data.length
          }], 
        sizePerPage: 5,  
        pageStartIndex: 1, 
        paginationSize: 10, 
        prePage: 'Prev', 
        nextPage: 'Next',
        firstPage: 'First', 
        lastPage: 'Last', 
      };
       function imageFormatter(cell, row){
         
        return "<img style='width:140px; height:120px;' src='"+cell+"'/>" ;
      }
      function categoryormatter(cell, row){
          switch(cell){
              case 1:
                  return "<p>Dairy</p>"
             case 2:
                    return "<p>Production</p>"
             case 3:
                 return "<p>Meat</p>"
                 default:
                 return "<p></p>"
          }
    
      }
      const handleCancelAction= (data) =>{
            dispatch(allActions.cancelProductAction.cancelProduct({data})) 
            dispatch(allActions.returnProductAction.returnProduct({data})) 
      }
      function DeleteFormatter(cell, row){
        return <Button variant="danger" onClick={()=> handleCancelAction(row) }  >Delete</Button>
      }
      function onAfterSaveCell(row, cellName, cellValue) {
        alert(`Save cell ${cellName} with value ${cellValue}`);
        
        let rowStr = '';
          rowStr += "Quantity: " + row["quantity"] + '\n';
          rowStr += "Product Price: " + row["productPrice"] + '\n';
          rowStr += "Total: " + row["productPrice"] * row["quantity"]
          alert('Thw whole row :\n' + rowStr);
      }
      function QtyValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        if (value % 1 !== 0) {
          response.isValid = false;
          response.notification.type = 'error';
          response.notification.msg = 'Qunantity must be number';
          response.notification.title = 'Requested Value';
        }
        return response;
      }
      const handleOrder = (data) =>{
        let now = new Date();
        let year = now.getFullYear().toString();
        let month = (now.getMonth().toString().length === 1 ?  "0" + (now.getMonth() + 1).toString() : now.getMonth()).toString()
        let date = now.getDate().toString();
        let hour = now.getHours().toString();
         let min = now.getMinutes().toString();
         let second = now.getSeconds().toString();
         let millionsecond = now.getMilliseconds().toString();
         let UniID = year +  month + date + hour + min + second + millionsecond;
        var _model = new model(UniID)
   
        data.map((item) =>{
          console.log(item)
          _model.orderDetails.ProductID.push(item.productID.toString())
           _model.orderDetails.Quantity.push(item.quantity.toString())
           _model.orderDetails.Total.push((item.productPrice * item.quantity).toString())
           setPrevPurchase({...prevPurchase, prevarr : prevPurchase.prevarr.concat(item) }) 
         })
           dispatch(allActions.ordersConfirmAction.storeOrder({_model}))
           dispatch(allActions.removeProductsAction.removeProducts({paylaod: [] }))      
          setIsSent({...isSent, toMyOrder : true }) 
        
      }
      const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: onAfterSaveCell 
      };
      function model(_orderid, _orderDetails){
            this.OrderID = _orderid
            this.orderDetails = _orderDetails ={ProductID :[],Quantity:[], Total:[] }
      }
        return (
          <div>
          {
            data.length === 0 ? (
              <Button variant="primary" style={{margin:"10px"}} disabled>Submit Orders</Button>
            ):(
              <div>
                   <Button variant="primary" style={{margin:"10px"}} onClick={() => handleOrder(data)}>Submit Orders</Button>
                   <p>Click the cell of quantity to change quantity</p>
              </div>
           
            )
          }   
          {
           
           isSent.toMyOrder === true ? (  
             prevPurchase.prevarr.map((item, index)=>(      
                  <Alert key={index} variant="primary">
                    {item.productName } purchase success
                     Total {item.quantity * item.productPrice} 
                  </Alert> 
                 ))
              
                )
             :(
              null
              )
          }   
          <BootstrapTable data={data} version='4' pagination={true} options={ options } key cellEdit={ cellEditProp }>
          <TableHeaderColumn isKey dataField='productID' editable={ false }>Product ID  </TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='productName'  editable={ false }>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='productPrice'  editable={ false }>Product Price</TableHeaderColumn>
          <TableHeaderColumn  dataField="categoryID" dataFormat={categoryormatter}  editable={ false }>Product Category</TableHeaderColumn>
          <TableHeaderColumn  dataField="productImagePath" dataFormat={imageFormatter}  editable={ false }>Product Image</TableHeaderColumn> 
          <TableHeaderColumn  dataField="quantity" editable={ { validator: QtyValidator } }>Quantity</TableHeaderColumn>
           <TableHeaderColumn dataFormat={DeleteFormatter} editable={ false }>Action</TableHeaderColumn> 
         </BootstrapTable>
       
        </div>
      )     
}

export default App;