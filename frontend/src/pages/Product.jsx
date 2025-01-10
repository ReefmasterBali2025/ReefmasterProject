import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [warning, setWarning] = useState("");

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0])
                console.log(item);
                return null;
            }
        })
    }

    const handleAddToCart = () => {
        if (!size) {
            setWarning("Please select a size before adding to cart.");
            return;
        }
        setWarning(""); // Clear warning if size is selected
        addToCart(productData._id, size, quantity);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 my-10'>
            <div className="flex flex-col gap-6 sm:flex-row">
                {/*--------- Product Images ---------- */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    {/* Thumbnail Images */}
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:w-[20%] w-full">
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
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
                    <h1 className="font-medium text-xl sm:text-2xl">{productData.name}</h1>
                    <div className="flex items-center gap-1">
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_icon} alt="" className="w-4" />
                        <img src={assets.star_dull_icon} alt="" className="w-4" />
                        <p className="pl-2 text-sm">(122)</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-medium text-gray-900">
                        {currency}{productData.price}
                    </p>
                    <p className="text-gray-600 text-sm sm:w-4/5">{productData.description}</p>

                    {/* ------- Select Size -------- */}
                    <div>
                        {/* Size Selector */}
                        <div className="flex flex-col gap-3">
                            <p className="font-semibold">Select Size</p>
                            <div className="flex gap-2 flex-wrap">
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => {
                                            setSize(item);
                                            setWarning(""); // Clear warning when a size is selected
                                        }}
                                        className={`border py-2 px-4 bg-gray-100 rounded-lg ${item === size
                                            ? "bg-red-950 text-white"
                                            : "hover:bg-gray-200"
                                            }`}
                                        key={index}
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
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                                    }
                                    className="w-12 text-center outline-none border-l border-r"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="bg-black text-white py-3 px-6 text-sm rounded-lg shadow hover:bg-gray-800"
                            >
                                ADD TO CART
                            </button>
                        </div>
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