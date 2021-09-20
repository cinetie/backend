import client from "@mailchimp/mailchimp_marketing";
import Fetch from "../helpers/fetch";

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

class MailingServices {
  static async addToMailingList(email) {
    const response = await client.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    return response;
  }
}

export default MailingServices;
