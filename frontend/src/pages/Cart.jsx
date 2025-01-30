import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Import library
import 'react-circular-progressbar/dist/styles.css';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate, updateBoxesLength, setCitesCultureQuantity, setCitesWildQuantity, setWeightOfItems, totalAmountAll } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);
    const [efficiency, setEfficiency] = useState(100); // State untuk menyimpan nilai efisiensi
    const [boxes, setBoxes] = useState([]); // State untuk menyimpan data semua box
    const [weightItem, setWeightItem] = useState(0)
    const [totallWeightItem, setTotalWeightItem] = useState(0)

    useEffect(() => {
        const tempData = [];
        let totalCultureQuantity = 0;  // Variable to store total quantity for Culture category
        let totalWildQuantity = 0;
        let totalVolume = 0; // Total volume plastik
        let totalWeight = 0 //Total Weight
        const boxVolume = (47 * 32 * 29) * 0.85; // Volume box dengan efisiensi 85%

        // Menghitung total volume barang di keranjang
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    const product = products.find((p) => p._id === items);
                    const sizeData = product.sizes.find((s) => s.size === item);
                    const volumePerItem = (22 / 7) * sizeData.r * sizeData.r * sizeData.plasticHeight;

                    const weightPerItem = 0.75 * volumePerItem * 1.025

                    totalVolume += volumePerItem * cartItems[items][item];
                    totalWeight += (weightPerItem * cartItems[items][item]) / 1000;


                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item],
                        volume: volumePerItem * cartItems[items][item],
                        weight: weightPerItem * cartItems[items][item],
                        category: product.category // Tambahkan kategori produk
                    });

                    // Jika kategori adalah Culture, tambah jumlah quantity
                    if (product.category === "Culture") {
                        totalCultureQuantity += cartItems[items][item];
                    }
                    if (product.category === "Wild") {
                        totalWildQuantity += cartItems[items][item];
                    }
                    setWeightItem(weightPerItem.toFixed(2));
                }
            }
        }

        setCartData(tempData);

        // Menghitung jumlah box yang dibutuhkan
        const boxUtilization = Math.ceil(totalVolume / boxVolume);
        let remainingVolume = totalVolume; // Sisa volume yang belum teralokasi ke box
        const tempBoxes = [];

        // Alokasikan volume box berdasarkan persentase setiap barang
        for (let i = 0; i < boxUtilization; i++) {
            const currentBoxVolume = Math.min(boxVolume, remainingVolume);
            const efficiency = Math.round((currentBoxVolume / boxVolume) * 100);

            // Membagi volume ke barang-barang yang ada di keranjang
            let boxVolumeLeft = currentBoxVolume;
            const itemAllocations = tempData.map(item => {
                // Hitung volume yang dapat dialokasikan per barang
                const itemVolume = (item.volume / totalVolume) * currentBoxVolume; // Volume per barang di box
                const allocatedVolume = Math.min(itemVolume, boxVolumeLeft); // Alokasikan volume yang bisa masuk
                boxVolumeLeft -= allocatedVolume; // Kurangi volume yang masih tersisa
                return {
                    ...item,
                    allocatedVolume
                };
            });

            // Push hasil alokasi box
            tempBoxes.push({
                efficiency,
                itemAllocations
            });

            // Kurangi volume yang tersisa setelah mengalokasikan box
            remainingVolume -= currentBoxVolume;

            // Jika volume sudah habis, stop looping
            if (remainingVolume <= 0) break;
        }

        setBoxes(tempBoxes);
        // Menyimpan tempBoxes.length ke context
        updateBoxesLength(tempBoxes.length);

        // Set quantity produk Culture di context untuk digunakan di PlaceOrder.jsx
        setCitesCultureQuantity(totalCultureQuantity);
        setCitesWildQuantity(totalWildQuantity);
        setWeightOfItems(totalWeight.toFixed(2));

        console.log("Total Quantity Culture in Cart:", totalCultureQuantity);
        console.log("Total Quantity Wild in Cart : ", totalWildQuantity)

        // Menampilkan total berat barang di keranjang
        console.log("Total Weight of Items in Cart:", totalWeight.toFixed(2), "kg");

        setTotalWeightItem(totalWeight);


    }, [cartItems, products, setCitesCultureQuantity, setCitesWildQuantity, setWeightOfItems]);


    return (
        <div className='border-t pt-14'>
            <h2 className='text-2xl mb-3'>
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
                                    <th className="px-4 py-2 whitespace-nowrap">Quantity</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Landed Cost</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Cost of Good Sold</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Delete</th>
                                </tr>
                                <hr className="w-4/5 mx-auto border-gray-300" />
                            </thead>

                            <tbody>
                                {cartData.map((item, index) => {
                                    const productData = products.find((product) => product._id === item._id);

                                    // Hitung Landed Cost per item
                                    const landedCostPerItem = (weightItem / totallWeightItem) * totalAmountAll

                                    console.log(`Total Weight = ${totallWeightItem}`)
                                    console.log(`Weight item ${weightItem}`)
                                    console.log(totalAmountAll)
                                    console.log(landedCostPerItem)

                                    return (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="px-4 py-2">
                                                <div className='flex items-start gap-6 flex-wrap'>
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
                                            <td className="px-4 py-2 mx-auto">
                                                <input
                                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                                    type='number'
                                                    min={1}
                                                    defaultValue={item.quantity}
                                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-red-50'
                                                />
                                            </td>
                                            <td className="px-4 py-2">{currency}{parseFloat(landedCostPerItem.toFixed(2))}</td>
                                            <td className="px-4 py-2">test</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100 font-bold">
                                    <td className="px-4 py-2" colSpan={3}>Total Landed Cost</td>
                                    <td className="px-4 py-2">tes</td>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
            </div>
            <div className='flex w-full justify-around gap-10'>
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
                <div className='flex justify-end my-20'>
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
