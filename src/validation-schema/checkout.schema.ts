import { z } from 'zod';

// Define the enum PaymentMethod
export enum PaymentMethod {
    cash = 'Cash',
    kpay = 'KBZ pay',
    ayapay = 'AYA pay',
    wavepay = 'Wave Pay',
}

// Create a Zod schema for PaymentMethod and commissionFees
export const CheckoutSchema = z.object({
    paymentMethod: z.string().min(1, "choose payment method"),
    commissionFees: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "commission fees must be non-negative number")),
    notes: z.string(),
    tips: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "tips must be non-negative number")),
});

