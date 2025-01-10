import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer border-2' to={`/product/${id}`}>
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img
                    className="w-full h-40 object-cover hover:scale-110 transition ease-in-out duration-300"
                    src={image[0]}
                    alt={name}
                />
                 {/* <video
                    className="w-full h-40 object-cover hover:scale-110 transition ease-in-out duration-300"
                    src={image[0]}
                    autoPlay
                    muted
                    loop
                /> */}
            </div>
            <p className='pt-3 pb-1 text-sm text-center'>{name}</p>
            <p className='text-sm font-medium text-center'>{currency}{price}</p>

        </Link>
    )
}

export default ProductItem