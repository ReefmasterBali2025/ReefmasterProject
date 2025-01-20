import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link
            className="flex flex-col items-center text-gray-700 cursor-pointer border-2 rounded-lg overflow-hidden transition-shadow hover:shadow-md"
            to={`/product/${id}`}
        >
            {/* Gambar Produk */}
            <div className="relative w-full aspect-square">
                <img
                    className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform ease-in-out duration-300"
                    src={image[0]}
                    alt={name}
                />
            </div>

            {/* Detail Produk */}
            <div className="p-3 text-center">
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-sm font-medium text-gray-500">
                    {currency}
                    {price}
                </p>
            </div>
        </Link>
    )
}

export default ProductItem