import axios from 'axios'
const storeOrder = (obj) => {
    return function (dispatch) {

         return  axios.post("https://productapimyshoppingcart.azurewebsites.net/Default/CreateOrders/",
             {
                OrderID: obj._model.OrderID,
                orderDetails :obj._model.orderDetails
             },
             {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
             }
        ).then((response) => {
             dispatch( {
                type: "RESTOREPRODUCTS",
                payload: response.data
             })
       }).catch((error) =>{
            console.log(error)
        })
             
    }
}
export default {storeOrder};