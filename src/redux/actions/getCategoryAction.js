import axios from 'axios'

    const setCategory = () => {
        return function (dispatch) {
            return  axios.get("https://productapimyshoppingcart.azurewebsites.net/Default/GetAllCategory").then(comments => {
                  dispatch( {
                    type: "DEFAULTCATEGORY",
                    payload: comments.data
                  })
                  
            })
        }
    }

export default {setCategory};