import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { NavLink } from 'react-router-dom'

const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img src={assets.fotofarm1} className='w-full md:max-w-[450px]' />
                <div className='flex flex-col justify-center sm:items-center md:items-start gap-6 '>
                    <p className='font-semibold text-xl text-gray-600 text-center md:text-left'>Our Company</p>
                    <p className='text-gray-500 text-center md:text-left'>Jl. Raya Goa Lawah No.88, Pesinggahan, Kec. Dawan,<br />Kabupaten Klungkung, Bali 80761</p>
                    <p className='text-gray-500 text-center md:text-left'>WhatsApp : +6281910707079 <br />Email  : sales@reefmasterbali.com</p>
                    {/* <p className='font-semibold text-xl text-gray-600 text-center md:text-left'>Careers at Forever</p> */}
                    <p className='text-gray-500 text-center md:text-left'>Learn more about our collection</p>
                    <NavLink to='/collection' className='border border-black px-8 py-4 text-sm hover:bg-[#3A3960] hover:text-white hover:rounded-sm transition-all duration-500'>
                    <p>Explore Collection</p>
                    </NavLink>
                    {/* <button to='/collection' className='border border-black px-8 py-4 text-sm hover:bg-[#3A3960] hover:text-white hover:rounded-sm transition-all duration-500'>Explore Collection</button> */}

                </div>
            </div>

            <NewsletterBox />

        </div>
    )
}

export default Contact