import React from 'react'
import { useStateValue } from "../context/StateProvider";
import StripeCheckout from 'react-stripe-checkout';
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';

const CheckOut = (props) => {
  // eslint-disable-next-line
  const [{ cartItems }, dispatch] = useStateValue();
  const [paid, setPaid] = useState(false);
  const onToken = (token) => {
    console.log(token.id)
    if (token.id !== '') {
      setPaid(true)
    } else {
      setPaid(false)
    }
  }
  const location = useLocation()
  const { totalPrice } = location.state

  return (
    <React.Fragment>
      {
        paid ?
          <div className='py-40 text-center'>
            <div className='flex justify-center'>
              <BsBagCheckFill className='text-8xl text-green-600' />
            </div>
            <p className='text-xl py-6'>Order Placed Successfully.</p>
            <Link to='/' className="bg-gradient-to-br from-orange-400 to-orange-500 w-50 md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out">Go to home</Link>
          </div>
          :
          <div className='xl:flex xl:flex-wrap xl:justify-center xl:ml-auto xl:mr-auto xl:w-[40%] pb-40'>
            {
              cartItems.map(items => (
                <div className="md:w-full rounded-lg bg-cartItem flex items-center gap-2" key={items.id}>
                  <img src={items.imageURL} className="w-20 h-20 max-w-[60px] rounded-full object-contain" alt="" />
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-black">{items.title}</p>
                    <p className="text-sm block text-gray-600 font-semibold">
                      ₹{parseFloat(items.price) * items.qty}
                    </p>
                  </div>

                  <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                    <p className="w-5 h-5 rounded-sm bg-cartBg text-gray flex items-center justify-center">
                      {items.qty}
                    </p>
                  </div>
                </div>
              ))
            }

            <div className='mt-12'>
              <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51LpVt8SHizyxRZZc3FtJnRx30iCJROUZKgDjvf7tEHrAcaf2FV4EgUZd1SbE0QmmC5Q2IGDtM5FYrboPz7M2WAZg00SC8GGhwe"
                amount={totalPrice * 100}
                currency="inr"
                description="Don't refresh your page."
                billingAddress={true}
              />
            </div>
          </div>
      }
    </React.Fragment>
  )
}

export default CheckOut