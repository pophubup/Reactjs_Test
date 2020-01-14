const cancelProduct = (obj) =>{
    return{
     type: "CANCELPRODUCT",
     payload:obj
    }
 }
 
 export default {cancelProduct}