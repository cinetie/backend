import dotenv from 'dotenv';
import billingServices from '../services/billingServices';
import userService from "../services/userServices";
import planServices from '../services/planServices';
import jwt from '../helpers/jwt';
import Util from '../helpers/utilities';

dotenv.config();
const util = new Util();
const updateSubscription = async (req, res, next) => {
    try {
        const { plan } = req.body;
        const { email } = jwt.jwtVerify(
            req.headers.authorization.slice(7),
            process.env.SECRET
        );
        const user = await userService.getUserByMail(email);
        const subscription = await billingServices.getSubscription(email);
        const planChosen = await planServices.getParticalPlan(plan);
        if (!planChosen) {
            return util.setErrorResponse(res, "Plan not found. please input a valid plan before continuing. ex: Premium or Standard", 404);
        }
        if (!subscription) {
            return util.setErrorResponse(res, "Subscription not found. Please make sure you already have subscription before changing the subscription", 404);
        }
        await userService.updateUser(user.email, { plan: planChosen.type, permissionLevel: -1 });
        await billingServices.updateSubscription(user.email, { plan: planChosen.type, endDate: null, state: 'pending' });
        return next();
    } catch (error) {
        console.log(error);
        return util.setErrorResponse(res, `Something went sideways totally sideways contact support ${error}`, 500);
    }

}

export default updateSubscription;