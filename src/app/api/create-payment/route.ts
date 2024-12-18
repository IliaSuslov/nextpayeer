import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
    const { orderId, amount, currency, description } = await req.json();

    const params = {
        m_shop: process.env.PAYEER_MERCHANT_ID,
        m_orderid: orderId,
        m_amount: amount.toFixed(2),
        m_curr: currency,
        m_desc: Buffer.from(description).toString('base64'),
    };

    // Generate a signature
    const paramString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    const signature = crypto
        .createHash('sha256')
        .update(paramString + process.env.PAYEER_API_SECRET)
        .digest('hex')
        .toUpperCase();

    // Generate the payment URL
    const paymentUrl = `https://payeer.com/merchant/?${paramString}&m_sign=${signature}`;

    return NextResponse.json({ paymentUrl });
}
