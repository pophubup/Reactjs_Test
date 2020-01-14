import product from './producerReducers'
import getProduct from './GetproductReducer'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    product,
    getProduct
})

export default rootReducer