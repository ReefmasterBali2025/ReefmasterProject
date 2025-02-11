import React from 'react'

const Login = () => {

    const textColorClass = 'text-white'; // misal: 'text-gray-100'

    return (
        // <div className='flex items-center min-h-screen justify-center w-full'>
        //     <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        //         <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        //         <form>
        //             <div className='mb-3 min-w-72'>
        //                 <p className='text-sm font-medium text-gray-700 mb-3'>Email Address</p>
        //                 <input className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='your@email.com' required />
        //             </div>
        //             <div className='mb-3 min-w-72'>
        //                 <p className='text-sm font-medium text-gray-700 mb-3'>Password</p>
        //                 <input className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='password' placeholder='Enter your password' required />
        //             </div>
        //             <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
        //         </form>
        //     </div>
        // </div>

        // Tanpa efek Kaca
        // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        //     {/* Card login dengan animasi fade-in */}
        //     <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition duration-500 hover:scale-105 fadeIn">
        //         {/* Blok style untuk keyframes animasi fadeIn */}
        //         <style jsx>{`
        //             @keyframes fadeIn {
        //                 from {
        //                 opacity: 0;
        //                 transform: translateY(-10px);
        //                 }
        //                 to {
        //                 opacity: 1;
        //                 transform: translateY(0);
        //                 }
        //             }
        //             .fadeIn {
        //                 animation: fadeIn 0.5s ease-out;
        //             }
        //         `}</style>

        //         {/* Logo dengan animasi bounce */}
        //         <div className="flex justify-center mb-4">
        //             <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
        //                 <span className="text-white font-bold text-xl">L</span>
        //             </div>
        //         </div>

        //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        //         <form>
        //             <div className="mb-4">
        //                 <label htmlFor="email" className="block text-gray-700 mb-2">
        //                     Email
        //                 </label>
        //                 <input
        //                     type="email"
        //                     id="email"
        //                     placeholder="Masukkan email"
        //                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        //                 />
        //             </div>
        //             <div className="mb-6">
        //                 <label htmlFor="password" className="block text-gray-700 mb-2">
        //                     Password
        //                 </label>
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     placeholder="Masukkan password"
        //                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        //                 />
        //             </div>
        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        //             >
        //                 Sign In
        //             </button>
        //         </form>
        //         <div className="mt-4 text-center">
        //             <a href="#" className="text-sm text-blue-500 hover:underline">
        //                 Lupa password?
        //             </a>
        //         </div>
        //     </div>
        // </div>

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
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className={`block mb-2 ${textColorClass}`}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Masukkan email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-90"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className={`block mb-2 ${textColorClass}`}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Masukkan password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-90"
                        />
                    </div>
                    <button
                        type="submit"
                        className="glow-button w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        Sign In
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