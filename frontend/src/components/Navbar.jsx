import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State untuk pop-up logout
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Tambahkan logika logout seperti menghapus token, dsb.
        alert('You have been logged out.');
        setShowLogoutPopup(false);
        navigate('/login'); // Arahkan ke halaman login
    };

    if (location.pathname === '/login') {
        return null;
    }

    return (



        <nav className='w-full bg-[#0079FF] fixed top-0 left-0 z-50'>
            <div className='flex items-center justify-around py-5 font-medium'>
                <Link to='/home'>
                    <img src={assets.logo} className='w-36' alt='Reefmaster Logo' />
                </Link>
                <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                    <NavLink to='/home' className='flex flex-col items-center gap-1 text-white'>
                        <p>Home</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-white hidden ' />
                    </NavLink>
                    <NavLink to='/collection' className='flex flex-col items-center gap-1 text-white'>
                        <p>Collection</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
                    </NavLink>
                    <NavLink to='/Cites' className='flex flex-col items-center gap-1 text-white'>
                        <p>Cites</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
                    </NavLink>
                    <NavLink to='/about' className='flex flex-col items-center gap-1 text-white'>
                        <p>About</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
                    </NavLink>
                    <NavLink to='/contact' className='flex flex-col items-center gap-1 text-white'>
                        <p>Contact</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-6'>
                    {location.pathname === '/collection' && (
                        <img
                            onClick={() => setShowSearch(true)}
                            src={assets.search_icon}
                            className='w-5 cursor-pointer'
                        />
                    )}

                    <div className='group relative'>
                        <Link to={'#'}>
                            <img className='w-6 cursor-pointer' src={assets.profile_icon} />
                        </Link>
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <Link to='/MyProfile' className='cursor-pointer hover:text-black'>
                                    My Profile
                                </Link>
                                <Link to='/orders' className='cursor-pointer hover:text-black'>
                                    Orders
                                </Link>
                                {/* Tombol Logout memunculkan pop-up */}
                                <button
                                    onClick={() => setShowLogoutPopup(true)}
                                    className='text-left cursor-pointer hover:text-black'
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-16 min-w-10' alt='cart-icon' />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                            {getCartCount()}
                        </p>
                    </Link>
                    <Link to='/DOA' className='relative'>
                        <img src={assets.unboxing_icon} className='w-24 min-w-10' alt='cart-icon' />
                    </Link>
                    <img
                        onClick={() => setVisible(true)}
                        src={assets.menu_icon}
                        className='w-5 cursor-pointer sm:hidden'
                    />
                </div>
                {/* Sidebar menu for small screen */}
                <div
                    className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
                        visible ? 'w-1/2' : 'w-0'
                    } z-10`}
                >
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Dropdown-Icon' />
                            <p className='cursor-pointer'>Back</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/home'>
                            Home
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>
                            Collection
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>
                            About
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>
                            Contact
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Pop-up Logout */}
            {showLogoutPopup && (
                <div
                    className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'
                >
                    <div className='bg-white p-5 rounded-lg text-center'>
                        <h2 className='mb-3 text-lg font-semibold'>Logout Account</h2>
                        <p className='text-sm text-gray-600 mb-4'>
                            Are you sure you want to logout? Once you logout, you need to login again. Are you OK?
                        </p>
                        <div className='flex justify-around'>
                            <button
                                onClick={() => setShowLogoutPopup(false)}
                                className='px-4 py-2 bg-blue-600 text-white rounded-md'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className='px-4 py-2 bg-red-500 text-white rounded-md'
                            >
                                Yes, Logout!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;