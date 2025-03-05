import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen bg-white border-r border-gray-200 shadow-lg">
            <div className="flex flex-col gap-6 pt-8 pl-6 text-sm text-gray-700">

                {/* Sidebar Title */}
                <div className="text-gray-800 font-bold text-lg mb-6 pl-4">
                    Admin Panel
                </div>

                {/* Sidebar Links */}
                {[
                    { to: "/add", icon: assets.add_icon, label: "Add Items" },
                    { to: "/list", icon: assets.order_icon, label: "List Items" },
                    { to: "/orders", icon: assets.order_icon, label: "Orders" },
                    { to: "/listUser", icon: assets.order_icon, label: "Users" }
                ].map((item, index) => (
                    <NavLink
                        key={index}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 mr-2 rounded-md transition-all duration-300 
                            ${isActive ? "bg-blue-500 text-white shadow-md" : "hover:bg-gray-100"}
                            `
                        }
                        to={item.to}
                    >
                        <img
                            src={item.icon}
                            className="w-5 h-5 transition-transform duration-300 hover:scale-110"
                        />
                        <p className="hidden md:block">{item.label}</p>
                    </NavLink>
                ))}
            </div>
        </div>

    )
}

export default Sidebar