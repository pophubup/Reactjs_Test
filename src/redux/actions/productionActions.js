import axios from 'axios'
const setDefault = () => {
    return function (dispatch) {
        return  axios.get("https://productapimyshoppingcart.azurewebsites.net/Default/GetAllProducts").then(comments => {
              dispatch( {
                type: "DEFAULTPRODUCTS",
                payload: comments.data
              })
              
        })
    }
}
export default {setDefault};
