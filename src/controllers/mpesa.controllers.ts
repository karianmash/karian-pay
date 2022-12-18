import { RequestHandler } from "express";
import { IPaymentItem } from "../interface";
import { MpesaApi } from "../models";
1
// To be tested
export const getOAuthToken: RequestHandler = async (req, res) => {
  const mpesaApi = new MpesaApi();

  try {
    const token = await mpesaApi.getOAuthToken();
    res.json({ token });
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
};

export const lipaNaMpesaOnline: RequestHandler = async (req, res) => {
  const mpesaApi = new MpesaApi();

  try {
    const token = await mpesaApi.getOAuthToken();

    const options: IPaymentItem = {
      sender: "254700207054",
      amount: 1,
      reference: "lipa-mboga",
      description: "Payment for groceries",
      shortCode: "174379",
      callbackUrl:
        "https://b292-197-156-142-157.in.ngrok.io/api/v1/m-pesa/hook",
    };

    const data: any = await mpesaApi.lipaNaMpesaOnline(token, options);

    console.log(data.data);

    res.send({ data: data?.data ? data?.data : data });
  } catch (error: any) {
    res.status(400).send(error);
  }
};

export const lipaNaMpesaHook: RequestHandler = async (req, res) => {
  console.log("-----------Received M-Pesa webhook-----------");

  console.log(req.body);

  let message = {
    ResponseCode: "00000000",
    ResponseDesc: "success",
  };

  // respond to safaricom servers with a success message
  res.json(message);
};
