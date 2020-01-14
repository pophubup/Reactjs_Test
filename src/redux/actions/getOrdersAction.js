import axios from 'axios'
const setOrdersDefault = () => {
    return function (dispatch) {
        return  axios.get("http://productapimyshoppingcart.azurewebsites.net/Default/GetOrders").then(comments => {
              dispatch( {
                type: "DEFAULTORDERS",
                payload: comments.data
              })
              
        })
    }
}
export default {setOrdersDefault};