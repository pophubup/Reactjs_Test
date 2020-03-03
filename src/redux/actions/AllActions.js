import defaultAction from './productionActions'
import getProductAction from './getProductAction'
import checkPurchaseAction from './checkPurchaseAction'
import returnProductAction from './returnProductAction'
import cancelProductAction from './cancelProductAction'
import ordersConfirmAction from './ordersConfirmAction'
import removeProductsAction from './RemoveProductsAction'
import AllordersAction from './getOrdersAction'
import AllCategoryAction from './getCategoryAction'
import PostNewProducts from './PostNewProducts'
const allActions = {
    defaultAction,
    getProductAction,
    checkPurchaseAction,
    returnProductAction,
    cancelProductAction,
    ordersConfirmAction,
    removeProductsAction,
    AllordersAction,
    AllCategoryAction,
    PostNewProducts 
}

export default allActions