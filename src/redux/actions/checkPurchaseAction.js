const checkPurchase = (obj) =>{
   return{
    type: "CHECKPURCHASE",
    payload:obj
   }
}

export default {checkPurchase}