import billingService from '../services/billingServices';
import planService from '../services/planServices';
import Util from '../helpers/utilities';
import date from '../helpers/date';
import axios from '../helpers/axios';
import uuid from '../helpers/uuid';
//opay@123
const util = new Util();
class billing {
    static async fetchCurrentSubscription(req, res) {
        try {

            const details = await billingService.getCurrentSubscription(req.body.email);
            return details;
        } catch (error) {
            util.setErrorResponse(res, error, 500);
        }
    }
    static async payment(req, res, next) {
        try {
            const details = await billing.fetchCurrentSubscription(req, res);
            if (details != null && details.phoneNumber != null) {
                const date = new Date();
                if (details.endDate == date.toDateString()) {
                    const data = {
                        "telephoneNumber": details.phoneNumber,
                        "amount": details.price,
                        "organizationId": "8a7482c36d8679f4016daa3a81050000",
                        "description": "Payment for Cinetie",
                        "callbackUrl": "http://localhost:8000/trans/new",
                        "transactionId": uuid.generator()
                    }
                   
                    const url = "https://opay-api.oltranz.com/opay/paymentrequest";
                    
                    axios.post(url, data);
                    
                    next();
                }else{
                    next();
                }
            } else {

                util.setErrorResponse(res,"Something went wrong ",500);
            }
        } catch (error) {
            util.setErrorResponse(res, error.message, 500);
        }
    }
    static async registerSubscription(req, res, next) {
        try {

            let data = {};
            const plan = await planService.getParticalPlan(req.body.plan);
            (req.body.isBilledAnnually) ? data.price = plan.yearlyPrice: data.price = plan.monthlyPrice;
            data.email = req.body.email;
            data.plan = req.body.plan;
            data.state = "current";
            data.phoneNumber = req.body.phoneNumber;
            data.endDate = date.addMoreDays(30).toDateString();
            const bill = await billingService.registerSubscription(data);
            (!bill) ?  util.setErrorResponse(res, "Subscription unsuccessfull", 500): next();
        } catch (error) {
            util.setErrorResponse(res, error.message, 500);
        }
    }
}

export default billing;