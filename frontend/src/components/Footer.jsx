import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] w-full bg-[#0079FF] text-white">
            <div className='flex flex-row flex-wrap item sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-10 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-32' />
                    <p className='w-full md:w-2/3'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>


                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1'>
                        <li>+6281910707079</li>
                        <li>sales@reefmasterbali.com</li>
                    </ul>
                </div>



            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright<sup>&copy;</sup> 2025 reefmaster.com - All Right Reserved</p>
            </div>
        </div>

    )
}

export default Footer