import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className="section py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap mx-4">
          {/* Shop 1 */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="shop bg-white shadow rounded-lg overflow-hidden">
              <div className="shop-img">
              <video
                    className="w-full h-48 object-cover hover:scale-110 transition ease-in-out duration-300"
                    src={assets.videowysiwyg}
                    autoPlay
                    muted
                    loop
                />
              </div>
              <div className="shop-body p-4 text-center">
                <h3 className="text-lg font-bold mb-2">WYSIWYG<br />Collection</h3>
                <Link className='cta-btn text-blue-500 hover:text-blue-700 font-semibold inline-flex items-center' to='/WYSIWYG_Only'>
                Shop now <img src={assets.go_shop} className='w-5 min-w-5 ml-3' alt='cart-icon'/>
                </Link>
              </div>
            </div>
          </div>

          {/* Shop 2 */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="shop bg-white shadow rounded-lg overflow-hidden">
              <div className="shop-img">
              <video
                    className="w-full h-48 object-cover hover:scale-110 transition ease-in-out duration-300"
                    src={assets.videogeneral}
                    autoPlay
                    muted
                    loop
                />
              </div>
              <div className="shop-body p-4 text-center">
                <h3 className="text-lg font-bold mb-2">Stock List<br />Collection</h3>
                <Link className='cta-btn text-blue-500 hover:text-blue-700 font-semibold inline-flex items-center' to='/Stocklist_Only'>
                Shop now <img src={assets.go_shop} className='w-5 min-w-5 ml-3' alt='cart-icon'/>
                </Link>
              </div>
            </div>
          </div>

          {/* Shop 3 */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="shop bg-white shadow rounded-lg overflow-hidden">
              <div className="shop-img">
              <video
                    className="w-full h-48 object-cover hover:scale-110 transition ease-in-out duration-300"
                    src={assets.videofish}
                    autoPlay
                    muted
                    loop
                />
              </div>
              <div className="shop-body p-4 text-center">
                <h3 className="text-lg font-bold mb-2">Fish<br />Collection</h3>
                <Link className='cta-btn text-blue-500 hover:text-blue-700 font-semibold inline-flex items-center' to='/Fish&Invert'>
                Shop now <img src={assets.go_shop} className='w-5 min-w-5 ml-3' alt='cart-icon'/>
                </Link>
              </div>
            </div>
          </div>

          {/* Shop 4 */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="shop bg-white shadow rounded-lg overflow-hidden">
              <div className="shop-img">
              <video
                    className="w-full h-48 object-cover hover:scale-110 transition ease-in-out duration-300"
                    src={assets.videofish}
                    autoPlay
                    muted
                    loop
                />
              </div>
              <div className="shop-body p-4 text-center">
                <h3 className="text-lg font-bold mb-2">Invertebrate<br />Collection</h3>
                <Link className='cta-btn text-blue-500 hover:text-blue-700 font-semibold inline-flex items-center' to='/Fish&Invert'>
                Shop now <img src={assets.go_shop} className='w-5 min-w-5 ml-3' alt='cart-icon'/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Hero
