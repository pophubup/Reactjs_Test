import React,{useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import allActions from '../redux/actions/AllActions'
const App =() =>{
    const data = useSelector(state => state.product.orders)
    const dispatch = useDispatch();
    useEffect(() => { 
       dispatch(allActions.AllordersAction.setOrdersDefault("DEFAULTORDERS"))           
    },[dispatch]); 
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
      function totalFormatter(cell, row){
        return "<p>$ "+ cell + "</p>" ;
      }
      function DateFormatter(cell, row){
        console.log(cell)
        var date = new Date(cell.slice(0, 4), cell.slice(4, 6) - 1, cell.slice(6, 8),
            cell.slice(8, 10), cell.slice(10, 12), cell.slice(12, 14));
          return "<p>"+ date.toLocaleDateString() +" " + date.toLocaleTimeString() +"</p>"
      }
    return(

        <div>
          <BootstrapTable data={data} version='4' pagination={true} options={ options } key>
          <TableHeaderColumn isKey dataField='productID' editable={ false } hidden >Product ID  </TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='productName'  editable={ false }>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='quantity'  editable={ false }>Quantity</TableHeaderColumn>
          <TableHeaderColumn  dataField="total" dataFormat={totalFormatter}  editable={ false }>Total</TableHeaderColumn>  
          <TableHeaderColumn  dataField="date" dataFormat={DateFormatter}  editable={ false }>Total</TableHeaderColumn>    
         </BootstrapTable>
        </div>
    )
}
export default App;