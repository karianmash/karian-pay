// 
export interface IPaymentItem {
  shortCode: string;
  reference: string;
  description: string;
  amount: number;
  callbackUrl: string;
  sender: string;
}
