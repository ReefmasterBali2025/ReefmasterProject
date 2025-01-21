import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount, totalAmountAll } = useContext(ShopContext);
    const totalAmount = totalAmountAll

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency}{totalAmountAll}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total Shipping Fee</b>
                    <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + parseFloat(totalAmountAll)}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal