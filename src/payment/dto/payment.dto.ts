
export class PaymentDto{
  email: string;
  amount: number;
  currency?: string;
  plan?: string;
  invoice_lint?: number
  channels?:string[];
  metadata?: Record<string, any>
  reference?: string;
  callback_url?: string;
}