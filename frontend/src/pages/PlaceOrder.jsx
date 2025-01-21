import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');

    const { navigate, boxesLength, citesCultureQuantity, citesWildQuantity, weightOfItems, setTotalAmount } = useContext(ShopContext);

    const [tempBoxes, setTempBoxes] = useState([]); // Contoh nilai awal, ubah sesuai kebutuhan

    const [landedCost, setLandedCost] = useState([
        { description: 'Packing Charge HD Boxes', value: `${boxesLength} BOX${boxesLength > 1 ? 'ES' : ''}`, price: 15.00, amount: 15.00 },
        { description: 'CITES Charge Culture Coral', value: `${citesCultureQuantity} Pcs`, price: 2.75, amount: 33.00 },
        { description: 'CITES Charge Wild Coral', value: `${citesWildQuantity} Pcs`, price: 3.75, amount: 33.00 },
        { description: 'CITES Processing Fee', value: '', price: 100.00, amount: 100.00 },
        { description: 'Document Handling Fee', value: '', price: 100.00, amount: 100.00 },
        { description: 'Fish Permit', value: '', price: 100.00, amount: 100.00 },
        { description: 'Freight Charge ALL IN', value: `${weightOfItems}`, price: 5.74, amount: 132.08 },
        { description: 'AWB + CCC Fee', value: '', price: 10.58, amount: 10.58 },
        { description: 'VAT Fee', value: '1.1 %', price: '', amount: 1.57 },
        { description: 'Pickup', value: '', price: 107.00, amount: 107.00 },
        { description: 'Import Duties', value: '', price: 1000.00, amount: 1000.00 },
    ]);

    // Update 'amount' dynamically based on price and boxesLength
    useEffect(() => {
        setLandedCost((prevLandedCost) => {
            return prevLandedCost.map((item) => {
                if (item.description === 'Packing Charge HD Boxes') {
                    return {
                        ...item,
                        value: `${boxesLength} BOX${boxesLength > 1 ? 'ES' : ''}`,
                        amount: item.price * boxesLength, // Calculate the amount dynamically
                    };
                }
                if (item.description === 'CITES Charge Culture Coral') {
                    return {
                        ...item,
                        value: `${citesCultureQuantity} Pcs`,
                        amount: item.price * citesCultureQuantity, // Calculate the amount dynamically
                    };
                }
                if (item.description === 'CITES Charge Wild Coral') {
                    return {
                        ...item,
                        value: `${citesWildQuantity} Pcs`,
                        amount: item.price * citesWildQuantity, // Calculate the amount dynamically
                    };
                }
                if (item.description === 'Freight Charge ALL IN') {
                    return {
                        ...item,
                        value: `${weightOfItems} Kg`,
                        amount: item.price * weightOfItems, // Calculate the amount dynamically
                    };
                }
                return item;
            });
        });
    }, [boxesLength]); // Recalculate when boxesLength changes

    const totalLandedCost = landedCost.reduce((total, item) => total + item.amount, 0).toFixed(2);
    setTotalAmount(totalLandedCost);

    return (
        <div className='flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ----------------- Left Side ------------------- */}
            <div className="w-full mt-12">
                <Title text1={'LANDED'} text2={'COST'} />
                <div className="bg-white shadow-md rounded-lg overflow-hidden text-sm">
                    <div className="overflow-x-auto">
                        <table className="table-auto min-w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border whitespace-nowrap">Description</th>
                                    <th className="px-4 py-2 border whitespace-nowrap">Value</th>
                                    <th className="px-4 py-2 border whitespace-nowrap">Price</th>
                                    <th className="px-4 py-2 border whitespace-nowrap">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {landedCost.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">{item.description}</td>
                                        <td className="px-4 py-2 border">{item.value || '-'}</td>
                                        <td className="px-4 py-2 border">
                                            {item.price ? `$${item.price.toFixed(2)}` : '-'}
                                        </td>
                                        <td className="px-4 py-2 border">{`$${item.amount.toFixed(2)}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100 font-bold">
                                    <td className="px-4 py-2 border" colSpan={3}>
                                        Total Landed Cost
                                    </td>
                                    <td className="px-4 py-2 border">{`$${totalLandedCost}`}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            {/* ----------- Right Side ------------- */}
            <div className='mt-8'>
                <div className='mt-8 min-w-60'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* ---------- Payment Method ----------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        {/* --- Stripe logo --- */}
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.stripe_logo} className='h-5 mx-4' />
                        </div>
                        {/* --- Razor Pay --- */}
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.razorpay_logo} className='h-5 mx-4' />
                        </div>
                        {/* --- CASH ON DELIVERY --- */}
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 font-medium text-sm'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>

                </div>
            </div>


        </div>

    )
}

export default PlaceOrder