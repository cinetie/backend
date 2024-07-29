import Forge from "node-forge";
import Fetch from "./fetch";
import uuid from "./uuid";

export default class Rave {
  static encrypt(card, key) {
    const cardDetails = JSON.stringify(card);

    const cipher = Forge.cipher.createCipher(
      "3DES-ECB",
      Forge.util.createBuffer(key)
    );
    cipher.start({ iv: "" });
    cipher.update(Forge.util.createBuffer(cardDetails, "utf-8"));
    cipher.finish();

    const encrypted = cipher.output;
    return Forge.util.encode64(encrypted.getBytes());
  }

  static async chargeMomo(raw) {
    try {
      const responseMomo = await Fetch(
        {
          ...raw,
          tx_ref: uuid.generator(),
        },
        {
          "Content-Type": "application/json",
          Authorization: process.env.RAVE_SECRET,
        },
        `${process.env.RAVE_CHARGE_URL}/v3/charges?type=mobile_money_rwanda`,
        "POST"
      );
      return responseMomo;
    } catch (error) {
      throw error;
    }
  }

  static async chargeCard(raw) {
    try {
      const payload = {
        ...raw,
        redirect_url: "https://cinetie.com/home",
        tx_ref: uuid.generator(),
        flw_ref: uuid.generator(),
      };
      const client = Rave.encrypt(payload, process.env.RAVE_ENC_KEY);
      const responseCard = await Fetch(
        { client },
        {
          "Content-Type": "application/json",
          Authorization: process.env.RAVE_SECRET,
        },
        `${process.env.RAVE_CHARGE_URL}/v3/charges?type=card`,
        "POST"
      );
      return responseCard;
    } catch (error) {
      throw error;
    }
  }

  static async verifyTransaction(id) {
    try {
      const responseVerification = await Fetch(
        "",
        {
          "Content-Type": "application/json",
          Authorization: process.env.RAVE_SECRET,
        },
        `${process.env.RAVE_CHARGE_URL}/v3/transactions/${id}/verify`,
        "GET"
      );
      return responseVerification;
    } catch (error) {
      throw error;
    }
  }

  static async validateACharge(raw) {
    try {
      const responseChargeValidation = await Fetch(
        raw,
        {
          "Content-Type": "application/json",
          Authorization: process.env.RAVE_SECRET,
        },
        `${process.env.RAVE_CHARGE_URL}/v3/validate-charge`,
        "POST"
      );
      return responseChargeValidation;
    } catch (error) {
      throw error;
    }
  }

  static async chargeTokenised(raw) {
    try {
      const responseTokenised = await Fetch(
        {
          ...raw,
          tx_ref: uuid.generator(),
          currency: "RWF",
          country: "RW",
        },
        {
          "Content-Type": "application/json",
          Authorization: process.env.RAVE_SECRET,
        },
        `${process.env.RAVE_CHARGE_URL}/v3/tokenized-charges`,
        "POST"
      );
      return responseTokenised;
    } catch (error) {
      throw error;
    }
  }
}
