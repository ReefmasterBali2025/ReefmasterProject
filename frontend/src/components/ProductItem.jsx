import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, description }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer border-2 rounded-[8px]' to={`/product/${id}`}>
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img
                    className="w-full h-40 object-cover hover:scale-110 transition ease-in-out duration-300 rounded-t-[8px]"
                    src={image[0]}
                    alt={name}
                />
            </div>
            <p className='pt-3 pb-1 text-left pl-4 text-lg'>{name}</p>

            <p className='text-md font-medium text-left pl-4'>{currency}{price}</p>
            <hr className='w-3/4 ml-3 mt-2' />
            <p className='text-xs px-3 text-left py-3'>{description}</p>
        </Link>
    )
}

export default ProductItem