import React, { useState } from 'react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // State untuk mengatur apakah sedang di halaman login atau sign up

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (isLogin) {
            alert('Sign In berhasil!');
        } else {
            alert('Sign Up berhasil!');
        }
    };

    return (
        <div className="flex h-screen">
            {/* Bagian Kiri */}
            <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
                <h1 className="text-4xl font-bold mb-4">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
                <form onSubmit={onSubmitHandler} className="w-3/4 flex flex-col gap-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0079FF]"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
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
                            Lupa kata sandi anda?
                        </p>
                    ) : null}
                    <button
                        type="submit"
                        className="w-full bg-[#0079FF] text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
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
                        {isLogin ? 'Sign Up Here' : 'Sign In Here'}
                    </span>
                </p>
            </div>

            {/* Bagian Kanan */}
            <div className="w-1/2 bg-[#0079FF] flex flex-col justify-center items-center text-white p-8">
                <h1 className="text-4xl font-bold mb-4">Welcome, Febio!</h1>
                <p className="text-center text-lg">
                Explore our collection and enjoy a seamless shopping experience.
                </p>
            </div>
        </div>
    );
};

export default Login;