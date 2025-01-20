import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // State untuk mengatur apakah sedang di halaman login atau sign up
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        navigate('/home');
    };

    return (
        <div className="flex h-screen w-full flex-col md:flex-row">
            {/* Bagian Kiri */}
            <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
                <h1 className="text-4xl font-bold mb-4">{isLogin ? 'Log in' : 'Sign Up'}</h1>
                <form onSubmit={onSubmitHandler} className="w-3/4 flex flex-col gap-4">
                    {!isLogin && (
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0079FF]"
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0079FF]"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0079FF]"
                        required
                    />
                    {isLogin ? (
                        <p className="text-sm text-[#0079FF] cursor-pointer mt-2">
                            Forgot your password?
                        </p>
                    ) : null}
                    <button
                        type="submit"
                        className="w-full bg-[#0079FF] text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {isLogin ? 'Log in' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-sm mt-4">
                    {isLogin
                        ? "Don't have an account? "
                        : 'Already have an account? '}
                    <span
                        className="text-[#0079FF] cursor-pointer"
                        onClick={toggleForm}
                    >
                        {isLogin ? 'Sign Up Here' : 'Login in Here'}
                    </span>
                </p>
            </div>

            {/* Bagian Kanan */}
            <div className="w-full md:w-1/2 relative h-full">
                {/* Video Background */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={assets.videologin1}
                    autoPlay
                    loop
                    muted
                ></video>

                {/* Teks */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-8 bg-black bg-opacity-40">
                    <h1 className="text-4xl font-bold mb-4 text-center">Welcome</h1>
                    <p className="text-center text-lg">
                        Explore our collection and enjoy a seamless shopping experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
