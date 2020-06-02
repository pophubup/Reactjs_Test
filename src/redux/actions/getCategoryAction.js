import axios from 'axios'

    const setCategory = () => {
        return function (dispatch) {
            return  axios.get("http://localhost:54142/api/Default/GetAllCategory").then(comments => {
                  dispatch( {
                    type: "DEFAULTCATEGORY",
                    payload: comments.data
                  })
                  
            })
        }
    }

export default {setCategory};