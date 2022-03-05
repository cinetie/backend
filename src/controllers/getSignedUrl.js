import { getSignedUrl, getObject } from "../helpers/aws";
import { config } from "dotenv";
import Util from "../helpers/utilities";

config();

const util = new Util();

class signedUrls {
  static async getSignedUrl(req, res) {
    try {
      const { key, bucket } = req.body;
      const signed = await getObject(bucket, key, 6000);

      if (signed) {
        util.setSuccessResponse(res, "Signed url created", 200, signed);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }
}

export default signedUrls;
