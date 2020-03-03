import axios from 'axios'
const AddNewPRoducts = (obj) =>{
    console.log(obj)
    return function (dispatch) {

        return axios.post("http://localhost:54142//Default/PostNewProducts/",
            {
               obj
            },
            {
               headers: {
                   'Content-Type': 'application/json; charset=UTF-8'
               }
            }
       ).then((response) => {
           console.log( response.data)
             dispatch( {
               type: "POSTNEWPRODUCTS",
                payload: response.data
             })
      }).catch((error) =>{
           console.log(error)
       })
            
   }
 }
 
 export default {AddNewPRoducts}