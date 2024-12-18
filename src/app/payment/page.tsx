'use client';

import { useState } from 'react';

export default function PaymentPage() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        const response = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId: '12345',
                amount: 10.0,
                currency: 'USD',
                description: 'Payment for Order #12345',
            }),
        });

        const { paymentUrl } = await response.json();

        if (paymentUrl) {
            window.location.href = paymentUrl; // Redirect to Payeer
        } else {
            alert('Failed to generate payment link');
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Make a Payment</h1>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Redirecting...' : 'Pay Now'}
            </button>
        </div>
    );
}
