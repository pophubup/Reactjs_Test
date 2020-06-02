import axios from 'axios'
const setDefault = () => {
  return function (dispatch) {
    return  axios.get("http://localhost:54142/api/Default/GetProducts").then(comments => {
      console.log(comments)
          dispatch( {
            type: "DEFAULTPRODUCTS",
            payload: comments.data
          })
          
    })
}
      
       
    
}
export default {setDefault};
