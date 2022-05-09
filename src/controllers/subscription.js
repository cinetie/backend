import Util from "../helpers/utilities";
import userService from "../services/userServices";
import planServices from "../services/planServices";
import billingServices from "../services/billingServices";
import payment from "../helpers/payment";

const util = new Util();

class Subscription {
    static async subscribe(req, res) {
        const { paymentMethod, plan, isBilledAnnually } = req.body;
        const { fullUser } = req;
        try {
            const _plan = await planServices.getParticalPlan(plan);
            if(!_plan) {
                return util.setErrorResponse(
                    res,
                    "an invalid subscription plan was submitted. review the plan given and modified to accepted plans",
                    400
                );
            }
            const subscription = await billingServices.getSubscription(fullUser.email);
            const today = new Date();
            const endDate = new Date(subscription ? subscription.endDate : "");
            const subscriptionData = {
                paymentMethod,
                email: fullUser.email,
                plan: _plan.type,
                phoneNumber: fullUser.phoneNumber,
                isBilledAnnually: isBilledAnnually,
            };
            let subscriptionDetails;
            if (!subscription) {
                await userService.updateUser(fullUser.email, { isBilledAnnually, plan: _plan.type });
                subscriptionDetails = await payment.registerNewSubscription(
                    subscriptionData
                );
            } else if (
                subscription.state === "pending" ||
                endDate.getTime() <= today.getTime()
            ) {
                await userService.updateUser(fullUser.email, { isBilledAnnually, plan: _plan.type });
                subscriptionDetails = await payment.updatePendingSubscription(
                    subscriptionData
                );

            } else {
                return util.setErrorResponse(
                    res,
                    "user already subscribed and payed for the subscription",
                    400
                );
            }
            if (subscriptionDetails) {
                return util.setSuccessResponse(
                    res,
                    "Subscription created successfully",
                    201,
                    subscriptionDetails
                );
            } else {
                return util.setErrorResponse(
                    res,
                    "Something went sideways creating the subscription",
                    400
                );
            }


        } catch (error) {
            console.log(error);
            return util.setErrorResponse(
                res,
                `Something Went wrong, error: ${error}`,
                500
            );
        }
    }

}

export default Subscription;
