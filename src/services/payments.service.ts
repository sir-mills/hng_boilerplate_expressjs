import axios from "axios";

export class PaystackService {
  private readonly secretKey: string;
  private readonly baseUrl: string = "https://api.paystack.co";

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      "Content-Type": "application/json",
    };
  }

  async initiateTransaction(data: {
    amount: number;
    email: string;
    reference: string;
    callback_url: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        data,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to initiate transaction");
    }
  }

  async verifyTransaction(reference: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to verify transaction");
    }
  }
}

export const paystackService = new PaystackService(
  process.env.PAYSTACK_SECRET_KEY!
);
