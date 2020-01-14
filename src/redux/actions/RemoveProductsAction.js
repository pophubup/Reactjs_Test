const removeProducts =(obj) =>{
    return  {
        type: "REMOVEALLPRODUCTS",
        payload: obj
   }
}
export default {removeProducts};