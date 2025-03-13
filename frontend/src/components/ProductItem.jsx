import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, link_image, commonName, coralLocation, latinName, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer border-2 rounded-[8px]' to={`/product/${commonName}/${coralLocation || ''}`}>
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img
                    className="w-full h-40 object-cover hover:scale-110 transition ease-in-out duration-300 rounded-t-[8px]"
                    src={link_image}
                    alt={latinName}
                />
            </div>
            <p className='pt-3 text-left pl-4 text-lg'>{commonName} <span className='italic'>{coralLocation}</span></p>
            <p className='pb-1 text-left pl-4 text-lg'>{latinName}</p>
            <p className='text-md font-medium text-left pl-4'>{currency}{price}</p>
            <hr className='w-3/4 ml-3 mt-2' />
            {/* <p className='text-xs px-3 text-left py-3'>{description}</p> */}
        </Link>
    )
}

export default ProductItem