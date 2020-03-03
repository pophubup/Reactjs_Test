const initalState ={
    products: [],
    orders:[],
    category:[]
}
 const defaultproduct = (state = initalState, action) =>{
   
     switch(action.type){
         case "DEFAULTPRODUCTS":
             return {
                ...state,
                products :action.payload
            }  
        case "CHECKPURCHASE":
            return{
                ...state,
                products :state.products.filter(x=>x.productID !== action.payload.obj[0].productID)
            }
        case "RESTOREPRODUCTS" :
            return{
                ...state,
                products :state.products.concat(action.payload)  
            }
        case "DEFAULTORDERS":
            return{
                ...state,
                orders : action.payload
            }
            case "DEFAULTCATEGORY":
                return{
                    ...state,
                    category : action.payload
                }
         default :
         return state;
     }
 }
 
 export default defaultproduct;
