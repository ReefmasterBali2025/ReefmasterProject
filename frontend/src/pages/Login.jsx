import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [currentState, setCurrentState] = useState('Sign Up'); // untuk mengatur tampilan awal apakah sign up atau login

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        navigate('/home');
    }



    return (
        <div className='flex items-center h-screen'>
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 mx-auto mt-5 gap-4 text-gray-800'>
                <div className='inline-flex items-center gap-2 mb-2 '>
                    <p className='text-3xl'>{currentState}</p>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
                </div>


                {currentState === 'Login' ? '' : <input className='w-full px-3 py-2 border border-gray-800' type='text' placeholder='Name' required />} {/* Logic untuk menampilkan form nama  */}
                <input className='w-full px-3 py-2 border border-gray-800' type='email' placeholder='Email' required />
                <input className='w-full px-3 py-2 border border-gray-800' type='password' placeholder='Password' required />
                <div className='w-full flex justify-between text-sm mt-[-8px]'>
                    <p className='text-sm mt-3 cursor-pointer'>Forgot your password?</p>
                    {
                        currentState === 'Login' ? <p className='cursor-pointer mt-3 text-sm' onClick={() => setCurrentState('Sign Up')}>Create Account</p> : <p className='cursor-pointer mt-3 text-sm' onClick={() => setCurrentState('Login')}>Login Here</p> //logic untuk mengubah title saat klik create account atau login here
                    }
                </div>
                <button className='bg-black text-white font-light px-8 py-2 mt-2 border rounded-[5px]'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
            </form>
        </div>

    )
}

export default Login