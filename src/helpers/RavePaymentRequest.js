import Fetch from "./fetch";
import Util from "./utilities";
import payment from "./payment";
import userService from "../services/userServices";
const util = new Util();

export default async (
  req,
  res,
  requestData,
  token,
  paymentType,
  email,
  currentSubscription,
  user
) => {
  const data = await Fetch(
    requestData,
    {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    `${process.env.PAY_HOST}/charge/all?type=${paymentType}`,
    "POST"
  );

  if (data.status === 200) {
    const updates = await userService.updateUser(email, {
      isOnTrial: false,
    });
    if (updates[1] > 0) {
      await payment.recordTransaction(
        user,
        currentSubscription,
        requestData.txRef,
        "pending"
      );
      util.setSuccessResponse(
        res,
        paymentType === 'mpesa' ? 'Pending subscription  activation with mpesa' : "Pending subscription  activation with MoMo",
        201,
        data
      );
    } else {
      util.setErrorResponse(
        res,
        "Something went sideways creating a subscription",
        400
      );
    }
  } else {
    util.setErrorResponse(res, "Sorry payment failed", 500);
  }
};
