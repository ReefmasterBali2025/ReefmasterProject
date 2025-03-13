import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import { backendUrl } from '../App';


const Product = () => {

    const { combineProductId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [warning, setWarning] = useState("");
    const { commonName, coralLocation } = useParams();
    const [selectedSize, setSelectedSize] = useState(null);
    const validCoralLocation = coralLocation && coralLocation !== 'none' ? coralLocation : '';
    const [priceRange, setPriceRange] = useState("");
    const [stockError, setStockError] = useState("");
    const [displayStock, setDisplayStock] = useState(0);

    const handleQuantityChange = (value) => {
        const stock = selectedSize ? (selectedSize.actualStock || 0) : 0;

        if (value === "") {
            setQuantity(""); // Bisa dikosongkan sementara
            setDisplayStock(stock);
            setStockError("");
            return;
        }

        let newQuantity = parseInt(value);

        if (isNaN(newQuantity) || newQuantity < 0) {
            newQuantity = 0; // Cegah negatif
        }

        if (newQuantity > stock) {
            setStockError("Stock tidak mencukupi!");
            setDisplayStock(0); // Stock tetap 0 kalau quantity lebih dari actualStock
        } else {
            setStockError("");
            setDisplayStock(stock - newQuantity);
        }

        setQuantity(newQuantity);
    };


    useEffect(() => {
        if (productData.length > 0) {
            const prices = productData.map(p => p.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPriceRange(`${currency}${minPrice} ~ ${currency}${maxPrice}`);
        }
    }, [productData, currency]);



    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/product/byCommonName/${commonName}/${coralLocation || ''}`);
                if (response.data.success) {
                    setProductData(response.data.products);
                    setImage(response.data.products[0]?.link_image || '');

                    // Console log untuk melihat _id dan code setiap produk yang didapat
                    response.data.products.forEach(product => {
                        console.log("Product ID:", product._id, "Product Code:", product.code);
                    });
                } else {
                    console.error("Failed to fetch product:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProductData();
    }, [commonName, coralLocation]);

    const availableSizes = productData ? [...new Set(productData.map(p => p.size))] : [];

    const availableLocations = productData ? [...new Set(productData.map(p => p.location))] : [];
    const handleSizeSelection = (size) => {
        const selectedProduct = productData.find(p => p.size === size);
        setSelectedSize(selectedProduct);
        setWarning("");
        setDisplayStock(selectedProduct ? (selectedProduct.actualStock || 0) : 0);
        // Console log hanya setelah memilih size
        console.log("Selected Product ID:", selectedProduct._id);
        console.log("Selected Product Code:", selectedProduct.code);
        console.log("Common Name:", selectedProduct.commonName);
        console.log("Price: $", selectedProduct.price);

    };


    const handleAddToCart = () => {
        if (!selectedSize) {
            setWarning("Please select a size before adding to cart.");
            return;
        }

        if (quantity > selectedSize.actualStock) {
            setWarning("Stock Melebihi batas!");
            return;
        }

        setWarning("");

        // Pastikan hanya menyimpan berdasarkan size yang dipilih
        addToCart(selectedSize._id, selectedSize.size, selectedSize.commonName, quantity);

        console.log("Added to Cart:", {
            id: selectedSize._id,
            commonName: selectedSize.commonName,
            size: selectedSize.size,
            quantity: quantity
        });
    };

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 my-10 px-16'>
            <div className="flex flex-col gap-6 sm:flex-row">
                {/*--------- Product Images ---------- */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    {/* Thumbnail Images */}
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:w-[20%] w-full">
                        {productData[0]?.link_image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item[0]}
                                key={index}
                                className="w-[25%] sm:w-full sm:mb-3 object-cover flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                            />
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto object-cover rounded-md shadow" src={image} />
                    </div>
                </div>

                {/* ------------- Product Info ------------- */}
                <div className="flex-1 space-y-5">
                    <h1 className="font-medium text-xl sm:text-2xl">{productData[0]?.commonName}</h1>
                    <div className="flex items-center gap-1">
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_dull_icon} alt="" className="w-4" />
                        <p className="pl-2 text-sm">(122)</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-medium text-gray-900">
                        {selectedSize ? `${currency}${selectedSize.price}` : priceRange}
                    </p>
                    {/* Actual Stock */}
                    {selectedSize && (
                        <p className="text-lg font-medium text-gray-700">
                            Stock: {displayStock}
                        </p>
                    )}



                    {/* ------- Select Size -------- */}
                    <div>
                        {/* Size Selector */}
                        <div className="flex flex-col gap-3">
                            <p className="font-semibold">Select Size</p>
                            <div className="flex gap-2 flex-wrap">
                                {availableSizes.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSizeSelection(item)}
                                        className={`px-4 py-2 border rounded ${selectedSize?.size === item ? 'bg-red-400' : ''}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            {/* Warning Message */}
                            {warning && <p className="text-red-500 text-sm mt-2">{warning}</p>}
                        </div>
                        {/* End Size Selector */}

                        {/* Quantity Selector and Add to Cart */}
                        <div className="flex items-center gap-4 mt-5">
                            {/* Input Quantity */}
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    disabled={quantity <= 0} // Bisa sampai 0, tapi tidak bisa negatif
                                >
                                    -
                                </button>
                                <input
                                    type="text" // Ubah ke text agar bisa dikosongkan sementara
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                    onBlur={() => { if (quantity === "") setQuantity(0); }} // Jika kosong, ubah ke 0 saat kehilangan fokus
                                    className="w-12 text-center outline-none border-l border-r"
                                />
                                <button
                                    onClick={() => {
                                        const stock = selectedSize ? (selectedSize.actualStock || 0) : 0;
                                        if (quantity < stock) {
                                            handleQuantityChange(quantity + 1);
                                        } else {
                                            setStockError("Stock tidak mencukupi!");
                                        }
                                    }}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    disabled={quantity >= (selectedSize ? (selectedSize.actualStock || 0) : 0)}
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className={`py-3 px-6 text-sm rounded-lg shadow ${stockError || quantity > (selectedSize?.actualStock || 0)
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black text-white hover:bg-gray-800"
                                    }`}
                                disabled={stockError || quantity > (selectedSize?.actualStock || 0)}
                            >
                                ADD TO CART
                            </button>
                        </div>
                        {stockError && <p className="text-red-500 text-sm mt-2">{stockError}</p>}
                    </div>
                    {/* End Add to Cart */}

                    <hr className="mt-6 sm:w-4/5" />
                    <div className="text-sm text-gray-500 space-y-2">
                        <p>100% Original Product</p>
                        <p>Pay Via Transfer</p>
                        <p>Easy return and exchange on 7 days</p>
                    </div>
                </div>
                {/* End Product Info */}

            </div>
            {/* End Product Images */}

            {/* Decsription & Review Section */}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>

            </div>
            {/* Display related products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

        </div>
    ) : <div className='opacity-0'></div>
}

export default Product