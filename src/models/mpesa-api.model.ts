// import Mpesa from "mpesa-node";
import { Buffer } from "buffer";
import axios from "axios";
import { getCurrentTimeStamp } from "../utils";
import { IPaymentItem } from "../interface";
111
class MpesaApi {
  // mpesaApi: any;
  consumerKey = process.env.MPESA_CONSUMER_KEY ?? "";
  consumerSecret = process.env.MPESA_CONSUMER_SECRET ?? "";

  constructor() {
    // this.mpesaApi = new Mpesa({
    // 	consumerKey: this.consumerKey,
    // 	consumerSecret: this.consumerSecret,
    // })
  }

  async getOAuthToken() {
    let consumer_key = process.env.MPESA_CONSUMER_KEY;
    let consumer_secret = process.env.MPESA_CONSUMER_SECRET;

    let url = process.env.MPESA_OAUTH_TOKEN_URL ?? "";

    //form a buffer of the consumer key and secret
    let buffer = Buffer.from(consumer_key + ":" + consumer_secret);

    let auth = `Basic ${buffer.toString("base64")}`;

    try {
      let { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });

      const token = data["access_token"];
      return token;
    } catch (err) {
      throw err;
    }
  }

  async lipaNaMpesaOnline(token: string, data: IPaymentItem) {
    return new Promise(async (resolve, reject) => {
      //getting the timestamp
      let timestamp = getCurrentTimeStamp();

      const shortCode = process.env.MPESA_LIPA_NA_MPESA_SHORT_CODE ?? 0;
      // const passkey = this.consumerKey
      const passkey = process.env.MPESA_LIPA_NA_MPESA_PASS_KEY;

      let password = Buffer.from(
        `${data.shortCode}${passkey}${timestamp}`
      ).toString("base64");
      let callBackUrl =
        "https://b292-197-156-142-157.in.ngrok.io/api/v1/m-pesa/hook";

      try {
        const options = {
          BusinessShortCode: data.shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: data.amount,
          PartyA: data.sender,
          PartyB: data.shortCode,
          PhoneNumber: data.sender,
          CallBackURL: data.callbackUrl,
          AccountReference: data.reference,
          TransactionDesc: data.description,
        };

        let response = await axios.post(
          process.env.MPESA_LIPA_NA_MPESA_URL ?? "",
          options,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        resolve(response);
      } catch (err: any) {
        // const error = err['response']['statusText']
        reject(err);
      }
    });
  }
}

export default MpesaApi;
