import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

function PaymentProcess() {

    const onToken = (token) => {
        console.log(token)
    }
    return (
        <StripeCheckout
            token={onToken}
            stripeKey="pk_test_51LpVt8SHizyxRZZc3FtJnRx30iCJROUZKgDjvf7tEHrAcaf2FV4EgUZd1SbE0QmmC5Q2IGDtM5FYrboPz7M2WAZg00SC8GGhwe"
        />
    )
}

export default PaymentProcess

