const initalState ={
    getPRoducts :[]
}
 const getProduct = (state = initalState, action) =>{
     switch(action.type){
         case "GETPRODUCT":
             return {
                ...state,
                getPRoducts : state.getPRoducts.concat(action.payload.product)
            }  
          case "CANCELPRODUCT":
              return{
                  ...state,
                  getPRoducts : state.getPRoducts.filter(x=>x.productID !== action.payload.data.productID)
              }
          case "REMOVEALLPRODUCTS":
              return{
                  ...state,
                  getProduct :state.getPRoducts.splice(0, state.getPRoducts.length)
              }
         default :
         return state;
     }
 }

 export default getProduct;
