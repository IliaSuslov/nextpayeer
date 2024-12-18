import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
    const body = await req.json();
    //m_operation_id,
    const { m_sign, ...params } = body;

    const paramString = Object.values(params).join(':') + process.env.PAYEER_API_SECRET;

    const signature = crypto
        .createHash('sha256')
        .update(paramString)
        .digest('hex')
        .toUpperCase();

    if (signature === m_sign) {
        // Payment is valid
        console.log('Payment Verified:', params);
        return NextResponse.json({ status: 'success' });
    } else {
        // Invalid payment
        console.error('Invalid signature');
        return NextResponse.json({ status: 'error' }, { status: 400 });
    }
}