import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

    const textColorClass = 'text-white'; // misal: 'text-gray-100'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem("token", token); // 🔥 Simpan token ke local storage
                setToken(token);
                toast.success("Login successful!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Login failed!");
        }
    };

    return (


        // Dengan Efek Kaca
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">

            {/* Card login dengan efek kaca dan animasi fade-in */}
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 p-8 rounded-lg shadow-lg max-w-md w-full transform transition duration-500 hover:scale-105 fadeIn">
                {/* Blok style untuk keyframes animasi fadeIn dan efek glow tombol */}
                <style jsx>{`
                    @keyframes fadeIn {
                        from {
                        opacity: 0;
                        transform: translateY(-10px);
                        }
                        to {
                        opacity: 1;
                        transform: translateY(0);
                        }
                    }
                    .fadeIn {
                        animation: fadeIn 0.5s ease-out;
                    }
                    /* Efek glow untuk tombol */
                    .glow-button {
                        box-shadow: 0 0 3px rgba(59, 130, 246, 0.5);
                        transition: box-shadow 0.3s ease-in-out;
                    }
                    .glow-button:hover {
                        box-shadow: 0 0 10px rgba(59, 130, 246, 1);
                    }
                `}</style>

                {/* Logo dengan animasi bounce */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-white font-bold text-xl">L</span>
                    </div>
                </div>

                <h2 className={`text-2xl font-bold text-center mb-6 ${textColorClass} outfit-semibold`}>Login</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className={`block mb-2 ${textColorClass}`}>
                            Email
                        </label>
                        <input
                            type="email"

                            placeholder="Masukkan email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-90" required
                            onChange={(e) => setEmail(e.target.value)} value={email}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className={`block mb-2 ${textColorClass}`}>
                            Password
                        </label>
                        <input
                            type="password"

                            placeholder="Masukkan password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-90" required
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="glow-button w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="#" className={`text-sm hover:underline ${textColorClass}`}>
                        Lupa password?
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login