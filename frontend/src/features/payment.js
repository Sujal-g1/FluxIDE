import { api } from "../utils/axios"


export const createPayment = async (plan) => {
    try {
      const { data } = await api.post("/api/payment/create", { plan });
      return data;
    } catch (error) {
      console.error(
        "Payment creation failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

export const verifyPayment = async({ razorpay_order_id, razorpay_payment_id, razorpay_signature })=>{
 try {
    const {data} = await api.post("/api/payment/verify",{ razorpay_order_id, razorpay_payment_id, razorpay_signature })
    return data
 } catch (error) {
   console.error("payment verification failed", error);
   return null;
 }
}  