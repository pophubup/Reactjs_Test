const getProduct =(obj) =>{
    return  {
        type: "GETPRODUCT",
        payload: obj
   }
}
export default {getProduct};