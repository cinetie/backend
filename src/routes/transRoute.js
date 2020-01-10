import { Router } from 'express'
import controller from '../controllers/transationsController'

const route = new Router()
route.post('/new',controller.createNewTrans)
route.get('/paypal/success',controller.paypalSubscriptionSuccess)
route.get('/paypal/failOrCancel',controller.paypalCancelOrFail)
route.get('/paypal/cancel/agreement',controller.paypalCancelSubscription)
export default route