import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const menuItems = [
        { href: "/dashboard", label: "Dashboard", icon: "🏠" },
        { href: "/informasi", label: "Informasi", icon: "📰" },
        { 
            href: "/program", 
            label: "Program", 
            icon: "📋",
            dropdown: [
                { href: "/program/bantuan", label: "Bantuan Sosial" },
                { href: "/program/pendidikan", label: "Pendidikan" },
                { href: "/program/kesehatan", label: "Kesehatan" }
            ]
        },
        { href: "/gallery", label: "Gallery", icon: "🖼️" },
        { href: "/tentang", label: "Tentang", icon: "ℹ️" },
        { href: "/kontak", label: "Kontak", icon: "📞" }
    ];

    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    // SVG Icons sebagai komponen
    const MenuIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    const CloseIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const ChevronDownIcon = ({ isOpen }) => (
        <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    return (
        <>
            <nav className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 shadow-lg fixed w-full z-50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-green-800 font-bold text-sm">M</span>
                            </div>
                            <div className="text-2xl font-bold text-white tracking-tight">
                                Zyra
                            </div>
                        </div>

                        {/* Menu Desktop */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {menuItems.map((item, index) => (
                                <div key={index} className="relative">
                                    {item.dropdown ? (
                                        <div className="relative group">
                                            <button
                                                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 group-hover:text-blue-100"
                                                onMouseEnter={() => setActiveDropdown(index)}
                                            >
                                                <span className="mr-1">{item.icon}</span>
                                                <span className="font-medium">{item.label}</span>
                                                <ChevronDownIcon isOpen={false} />
                                            </button>
                                            
                                            <div 
                                                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                                                onMouseLeave={() => setActiveDropdown(null)}
                                            >
                                                <div className="py-2">
                                                    {item.dropdown.map((dropItem, dropIndex) => (
                                                        <Link
                                                            key={dropIndex}
                                                            href={dropItem.href}
                                                            className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 font-medium"
                                                        >
                                                            {dropItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 hover:text-blue-100 font-medium"
                                        >
                                            <span>{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA Button Desktop */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <button className="bg-amber-400 text-green-800 px-6 py-2 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300 hover:scale-105 shadow-lg transform">
                                Daftar Sekarang
                            </button>
                        </div>

                        {/* Mobile Button */}
                        <div className="lg:hidden">
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                            >
                                {isOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div 
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="bg-white bg-opacity-95 backdrop-blur-md border-t border-white border-opacity-20">
                        <div className="px-4 py-6 space-y-2">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    {item.dropdown ? (
                                        <div>
                                            <button
                                                onClick={() => handleDropdownToggle(index)}
                                                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-lg">{item.icon}</span>
                                                    <span>{item.label}</span>
                                                </div>
                                                <ChevronDownIcon isOpen={activeDropdown === index} />
                                            </button>
                                            
                                            <div 
                                                className={`overflow-hidden transition-all duration-300 ${
                                                    activeDropdown === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <div className="ml-8 mt-2 space-y-1">
                                                    {item.dropdown.map((dropItem, dropIndex) => (
                                                        <Link
                                                            key={dropIndex}
                                                            href={dropItem.href}
                                                            className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {dropItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200 font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}
                            
                            {/* Mobile CTA */}
                            <div className="pt-4 border-t border-gray-200">
                                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg">
                                    Daftar Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer untuk fixed navbar */}
            <div className="h-16"></div>
        </>
    );
}