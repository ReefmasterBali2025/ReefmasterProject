import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Import library
import 'react-circular-progressbar/dist/styles.css';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate, updateBoxesLength, setCitesCultureQuantity, setCitesWildQuantity, setWeightOfItems, totalAmountAll, landedCost, totalLandedCost } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);
    const [efficiency, setEfficiency] = useState(90);
    const [boxes, setBoxes] = useState([]);
    const [weightItem, setWeightItem] = useState(0);
    const [totalWeightItem, setTotalWeightItem] = useState(0);
    const [landedCostForItem, setLandedCostForItem] = useState([]); // Array untuk menyimpan landed cost per item

    useEffect(() => {
        const tempData = [];
        let totalCultureQuantity = 0;
        let totalWildQuantity = 0;
        let totalVolume = 0;
        let totalWeight = 0;
        const boxVolume = (47 * 32 * 29) * 0.85;

        const tempLandedCosts = {};
        const itemCounts = {};

        // **Step 1: Loop pertama - Hitung total volume, berat, dan kumpulkan data**
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    const product = products.find((p) => p._id === items);
                    const sizeData = product.sizes.find((s) => s.size === item);

                    totalVolume += sizeData.volume * cartItems[items][item];
                    totalWeight += (sizeData.weight * cartItems[items][item]) / 1000; // dalam kg

                    // **Kumpulkan jumlah per jenis dan size**
                    if (!tempLandedCosts[items]) {
                        tempLandedCosts[items] = { totalQuantity: 0, sizes: {} };
                    }
                    tempLandedCosts[items].totalQuantity += cartItems[items][item];

                    if (!tempLandedCosts[items].sizes[item]) {
                        tempLandedCosts[items].sizes[item] = { quantity: 0, weight: 0 };
                    }
                    tempLandedCosts[items].sizes[item].quantity += cartItems[items][item];
                    tempLandedCosts[items].sizes[item].weight += sizeData.weight / 1000;

                    // **Kumpulkan jumlah jenis dalam cart**
                    itemCounts[items] = true;

                    tempData.push({
                        _id: items,
                        name: product.name,
                        size: item,
                        quantity: cartItems[items][item],
                        volume: sizeData.volume * cartItems[items][item],
                        weight: sizeData.weight * cartItems[items][item],
                        category: product.category
                    });

                    if (product.category === "Culture") {
                        totalCultureQuantity += cartItems[items][item];
                    }
                    if (product.category === "Wild") {
                        totalWildQuantity += cartItems[items][item];
                    }

                    setWeightItem(sizeData.weight / 1000);
                }
            }
        }

        // **Step 2: Hitung Landed Cost per jenis**
        const totalProductTypes = Object.keys(itemCounts).length; // Total jenis produk dalam cart
        const landedCostPerType = totalProductTypes > 0 ? totalLandedCost / totalProductTypes : 0;

        const landedCostForItems = [];

        for (const productId in tempLandedCosts) {
            const productData = tempLandedCosts[productId];
            const product = products.find((p) => p._id === productId);

            for (const size in productData.sizes) {
                const sizeInfo = productData.sizes[size];

                // 🔹 Menghitung landed cost berdasarkan berat (berat per jenis / total berat)
                const landedCostPerSize = (sizeInfo.weight / totalWeight) * totalLandedCost * sizeInfo.quantity;

                const COGS = landedCostPerSize + (product.price * sizeInfo.quantity)

                landedCostForItems.push({
                    _id: productId,
                    name: product.name,
                    size: size,
                    quantity: sizeInfo.quantity,
                    weight: sizeInfo.weight,
                    landedCost: landedCostPerSize.toFixed(2),
                    COGS: ((product.price * sizeInfo.quantity) + landedCostPerSize).toFixed(2)
                });
            }
        }


        console.log("Total weight = " + totalWeight);
        console.log("Total Landed Cost = " + totalLandedCost);
        console.log("Landed Cost Per Item:", landedCostForItems);

        setLandedCostForItem(landedCostForItems);
        setCartData(tempData);

        // **Step 3: Menghitung jumlah box yang dibutuhkan**
        const boxUtilization = Math.ceil(totalVolume / boxVolume);
        let remainingVolume = totalVolume;
        const tempBoxes = [];

        for (let i = 0; i < boxUtilization; i++) {
            const currentBoxVolume = Math.min(boxVolume, remainingVolume);
            const efficiency = Math.round((currentBoxVolume / boxVolume) * 100);

            let boxVolumeLeft = currentBoxVolume;
            const itemAllocations = tempData.map(item => {
                const itemVolume = (item.volume / totalVolume) * currentBoxVolume;
                const allocatedVolume = Math.min(itemVolume, boxVolumeLeft);
                boxVolumeLeft -= allocatedVolume;
                return {
                    ...item,
                    allocatedVolume
                };
            });

            tempBoxes.push({
                efficiency,
                itemAllocations
            });

            remainingVolume -= currentBoxVolume;
            if (remainingVolume <= 0) break;
        }

        setBoxes(tempBoxes);
        updateBoxesLength(tempBoxes.length);

        setCitesCultureQuantity(totalCultureQuantity);
        setCitesWildQuantity(totalWildQuantity);
        setWeightOfItems(totalWeight.toFixed(2));

        console.log("Total Quantity Culture in Cart:", totalCultureQuantity);
        console.log("Total Quantity Wild in Cart:", totalWildQuantity);
        console.log("Total Weight of Items in Cart:", totalWeight.toFixed(2), "kg");
        setTotalWeightItem(totalWeight);

    }, [cartItems, products, setCitesCultureQuantity, setCitesWildQuantity, setWeightOfItems]);

    useEffect(() => {
        console.log("Updated Landed Cost:", JSON.stringify(landedCostForItem, null, 2));
    }, [landedCostForItem]);




    return (
        <div className='border-t my-14 px-16'>
            <h2 className='text-2xl mb-3 pt-10'>
                <Title text1={'YOUR'} text2={'CART'} />
            </h2>

            {/* Header Section */}
            {/* <div className='grid grid-cols-5 gap-4 font-semibold text-lg border-b pb-3'>
                <p className='text-center'>Product</p>
                <p className='text-center'>Landed Cost</p>
                <p className='text-center'>Cost of Good Sold</p>
                <p className='text-center'>Quantity</p>
                <p className='text-center'>Delete</p>
            </div> */}

            {/* Header Section */}
            {/* <div className='grid grid-cols-5 gap-4 font-semibold text-lg border-b pb-3'>
                <p className='text-center'>Product</p>
                <p className='text-center'>Landed Cost</p>
                <p className='text-center'>Cost of Good Sold</p>
                <p className='text-center'>Quantity</p>
                <p className='text-center'>Delete</p>
            </div> */}

            <div>
                <div className="bg-white shadow-md rounded-lg overflow-x-scroll text-sm">
                    <div className="overflow-x-auto">
                        <table className="table-auto min-w-full text-left border-collapse">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-4 py-2 whitespace-nowrap">Product</th>
                                    <th className="px-4 py-2 whitespace-nowrap text-center">Quantity</th>
                                    <th className="px-4 py-2 whitespace-nowrap text-center">Landed Cost</th>
                                    <th className="px-4 py-2 whitespace-nowrap text-center">Cost of Good Sold</th>
                                    <th className="px-4 py-2 whitespace-nowrap text-center">Delete</th>
                                </tr>

                            </thead>

                            <tbody>
                                {cartData.map((item, index) => {
                                    const productData = products.find((product) => product._id === item._id);

                                    // Hitung Landed Cost per item


                                    console.log(`Total Weight = ${totalWeightItem.toFixed(2)}`)
                                    console.log(`Weight ${productData.name} ${weightItem.toFixed(2)} Kg`)
                                    console.log(totalAmountAll)
                                    console.log(`Landed cost ${productData.name} = ${landedCostForItem.find(lc => lc._id === item._id && lc.size === item.size)?.landedCost}`)


                                    return (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 text-center">
                                                <div className='flex items-center gap-6 flex-wrap'>
                                                    <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
                                                    <div>
                                                        <p className='text-xs sm:text-sm font-medium'>{productData.name}</p>
                                                        <div className='flex items-center gap-5 mt-2'>
                                                            <p>{currency}{productData.price}</p>
                                                            <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                                <input
                                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                                    type='number'
                                                    min={1}
                                                    defaultValue={item.quantity}
                                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-red-50'
                                                />
                                            </td>

                                            <td className="px-4 py-2 text-center">
                                                {currency}
                                                {landedCostForItem.find(lc => lc._id === item._id && lc.size === item.size)?.landedCost || '0.00'}

                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {currency}
                                                {landedCostForItem.find(lc => lc._id === item._id && lc.size === item.size)?.COGS || '0.00'}
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                                <img
                                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                                    className='w-4  sm:w-5 cursor-pointer mx-auto'
                                                    src={assets.bin_icon}
                                                    alt='delete icon'
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            {/* <tfoot>
                                <tr className="bg-gray-100 font-bold">
                                    <td className="px-4 py-2" colSpan={3}>Total Landed Cost</td>
                                    <td className="px-4 py-2">tes</td>
                                </tr>
                            </tfoot> */}
                        </table>

                    </div>
                </div>
            </div>
            <div className='flex w-full flex-col-reverse md:flex-row justify-around gap-10'>
                {/* Diagram lingkaran untuk menampilkan efisiensi */}
                <div className="my-10 flex items-center justify-center gap-20 flex-wrap">
                    {boxes.map((box, index) => (
                        <div key={index} style={{ width: 150, height: 150 }}>
                            <CircularProgressbar
                                value={box.efficiency}
                                text={`${box.efficiency}%`}
                                styles={buildStyles({
                                    textColor: box.efficiency < 85 ? 'red' : 'green',
                                    pathColor: box.efficiency < 85 ? 'red' : 'green',
                                    trailColor: '#d6d6d6',
                                })}
                            />
                            <p className="text-center mt-2">Box {index + 1}</p>
                            <div className="mt-2">
                                {box.itemAllocations.map((allocation, idx) => (
                                    <div key={idx} className="text-xs">
                                        <span>{allocation._id} ({allocation.size})</span>: {allocation.allocatedVolume.toFixed(2)} cm³
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total dan tombol checkout */}
                <div className='flex justify-start md:justify-end my-8'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal />
                        <div className='w-full text-end'>
                            <button
                                onClick={() => navigate('/place-order')}
                                className='bg-black text-white text-sm my-8 px-8 py-5'
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cart;
