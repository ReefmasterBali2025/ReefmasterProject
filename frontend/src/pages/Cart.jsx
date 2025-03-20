import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Import library
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { backendUrl } from '../App';

const Cart = () => {

    const { products, currency, cartItems, updateQuantity, navigate, updateBoxesLength, setCitesCultureQuantity, setCitesWildQuantity, setWeightOfItems, totalAmountAll, landedCost, totalLandedCost } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const [efficiency, setEfficiency] = useState(90);
    const [boxes, setBoxes] = useState([]);
    const [weightItem, setWeightItem] = useState(0);
    const [totalWeightItem, setTotalWeightItem] = useState(0);
    const [landedCostForItem, setLandedCostForItem] = useState([]);
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/product/listCombine`);
                console.log("✅ Data dari API:", response.data); // Debugging

                if (response.data.success) {
                    setProductsData(response.data.combineProduct);
                } else {
                    console.error("❌ API response error:", response.data);
                }
            } catch (error) {
                console.error("❌ Error fetching products:", error);

                if (error.response) {
                    console.error("Server responded with:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response received from server");
                } else {
                    console.error("Error setting up request:", error.message);
                }
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (productsData.length === 0) return; // Cegah eksekusi jika data kosong

        const tempData = [];
        let totalCultureQuantity = 0;
        let totalWildQuantity = 0;
        let totalVolume = 0;
        let totalWeight = 0;
        const boxVolume = (47 * 32 * 29) * 0.85;

        const tempLandedCosts = {};
        const itemCounts = {};

        console.log("📌 Debugging cartItems:", JSON.stringify(cartItems, null, 2)); // Cek data cartItems

        for (const itemId in cartItems) {
            console.log("🛒 Checking item ID:", itemId);

            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    const product = productsData.find((p) => String(p._id) === String(itemId));

                    if (!product) {
                        console.error(`❌ Product with ID ${itemId} not found in productsData`);
                        continue;
                    }

                    console.log("✅ Found product:", product);

                    if (!Array.isArray(product.size)) {
                        console.error(`Size data is not an array for product ${product.commonName}`);
                        continue;
                    }

                    const sizeData = product.size.find((s) => s.size === size);

                    if (!sizeData) {
                        console.error(`❌ Size ${size} not found for product ${product.commonName}`);
                        continue;
                    }

                    totalVolume += sizeData.volume * cartItems[itemId][size];
                    totalWeight += (sizeData.weight * cartItems[itemId][size]) / 1000;

                    if (!tempLandedCosts[itemId]) {
                        tempLandedCosts[itemId] = { totalQuantity: 0, size: {} };
                    }
                    tempLandedCosts[itemId].totalQuantity += cartItems[itemId][size];

                    if (!tempLandedCosts[itemId].size[size]) {
                        tempLandedCosts[itemId].size[size] = { quantity: 0, weight: 0 };
                    }
                    tempLandedCosts[itemId].size[size].quantity += cartItems[itemId][size];
                    tempLandedCosts[itemId].size[size].weight += sizeData.weight / 1000;

                    itemCounts[itemId] = true;

                    tempData.push({
                        _id: itemId,
                        name: product.commonName,
                        size: size,
                        quantity: cartItems[itemId][size],
                        volume: sizeData.volume * cartItems[itemId][size],
                        weight: sizeData.weight * cartItems[itemId][size],
                        category: product.category
                    });

                    if (product.category === "Culture") {
                        totalCultureQuantity += cartItems[itemId][size];
                    }
                    if (product.category === "Wild") {
                        totalWildQuantity += cartItems[itemId][size];
                    }

                    setWeightItem(sizeData.weight / 1000);
                }
            }
        }

        const totalProductTypes = Object.keys(itemCounts).length;
        const landedCostPerType = totalProductTypes > 0 ? totalLandedCost / totalProductTypes : 0;

        const landedCostForItems = [];

        for (const productId in tempLandedCosts) {
            const productData = tempLandedCosts[productId];
            const product = productsData.find((p) => p._id === productId);

            if (!product) continue;

            for (const size in productData.size) {
                const sizeInfo = productData.size[size];

                const landedCostPerSize = (sizeInfo.weight / totalWeight) * totalLandedCost * sizeInfo.quantity;

                landedCostForItems.push({
                    _id: productId,
                    name: product.commonName,
                    size: size,
                    quantity: sizeInfo.quantity,
                    weight: sizeInfo.weight,
                    landedCost: landedCostPerSize.toFixed(2),
                    COGS: ((product.price * sizeInfo.quantity) + landedCostPerSize).toFixed(2)
                });
            }
        }

        console.log("🚀 Final Cart Data:", JSON.stringify(tempData, null, 2));

        setLandedCostForItem(landedCostForItems);
        setCartData(tempData);

        const boxUtilization = Math.ceil(totalVolume / boxVolume);
        setBoxes(new Array(boxUtilization).fill({ efficiency: 90 }));
        updateBoxesLength(boxUtilization);

        setCitesCultureQuantity(totalCultureQuantity);
        setCitesWildQuantity(totalWildQuantity);
        setWeightOfItems(totalWeight.toFixed(2));
        setTotalWeightItem(totalWeight);

    }, [cartItems, productsData]);


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
                                {Object.keys(cartItems).length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                            Your cart is empty
                                        </td>
                                    </tr>
                                ) : (
                                    Object.entries(cartItems).map(([productId, sizes]) =>
                                        Object.entries(sizes).map(([size, item], index) => {
                                            return (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="px-4 py-2 text-center">
                                                        <div className='flex items-center gap-6 flex-wrap'>
                                                            <p className='text-xs sm:text-sm font-medium'>{item.commonName}</p>
                                                            <div className='flex items-center gap-5 mt-2'>
                                                                <p>{item.appsheetCode}</p>
                                                                <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{size}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <input
                                                            onChange={(e) => updateQuantity(productId, size, Number(e.target.value))}
                                                            type='number'
                                                            min={1}
                                                            value={item.quantity}
                                                            className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-red-50'
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        {item.coralLocation}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        {item.code}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <img
                                                            onClick={() => updateQuantity(productId, size, 0)}
                                                            className='w-4 sm:w-5 cursor-pointer mx-auto'
                                                            src={assets.bin_icon}
                                                            alt='delete icon'
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )
                                )}
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
