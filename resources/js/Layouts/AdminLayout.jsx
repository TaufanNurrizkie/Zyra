import React, { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Mount animation
    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock scroll saat sidebar open + ESC untuk close
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        const onEsc = (e) => {
            if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };
        
        window.addEventListener("keydown", onEsc);
        
        return () => {
            window.removeEventListener("keydown", onEsc);
            document.body.classList.remove("overflow-hidden");
        };
    }, [open]);

    const handleNavClick = (href) => {
        setOpen(false);
        console.log(`Navigating to: ${href}`);
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-x-hidden relative">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* NAVBAR */}
            <nav className={`backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-xl fixed top-0 inset-x-0 z-40 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="h-16 flex items-center justify-between px-6">
                    {/* Tombol Hamburger */}
                    <button
                        aria-label="Buka sidebar"
                        onClick={() => setOpen(true)}
                        className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6">
                                <span className="text-white font-bold text-lg drop-shadow-lg">Z</span>
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                        </div>
                        <div className="text-3xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
                            Zyra
                        </div>
                    </div>
                </div>
            </nav>

            {/* SIDEBAR */}
            <aside 
                className={`fixed left-0 top-0 w-80 h-full backdrop-blur-2xl bg-gradient-to-b from-emerald-600/90 via-teal-700/90 to-cyan-800/90 text-white shadow-2xl flex flex-col transform transition-all duration-500 ease-out z-50 border-r border-white/20 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Glass overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none"></div>
                
                {/* Header */}
                <div className="relative p-6 border-b border-white/20">
                    {/* Close Button */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            aria-label="Tutup sidebar"
                            onClick={() => setOpen(false)}
                            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-40 animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white drop-shadow-lg">Admin Panel</h1>
                            <p className="text-xs text-white/80 font-medium">Management Mustahik</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto relative">
                    <div className="space-y-8">
                        <div>
                            <h3 className={`text-xs font-bold text-white/70 uppercase tracking-widest mb-4 px-3 transition-all duration-500 delay-100 ${
                                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                            }`}>
                                ✨ Manajemen
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleNavClick("/dashboard")}
                                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/90 hover:text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:translate-x-2 border border-white/20 hover:border-white/30 hover:shadow-lg ${
                                        open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{ transitionDelay: open ? "200ms" : "0ms" }}
                                >
                                    <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 01.553-1.394L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A2 2 0 0021 18.382V8.618a2 2 0 00-.553-1.394L15 5m0 12V5" />
                                        </svg>
                                    </div>
                                    <span className="flex-1 text-left">Daftar Area</span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                                </button>
                                <button
                                    onClick={() => handleNavClick("/mustahik/data")}
                                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/90 hover:text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:translate-x-2 border border-white/20 hover:border-white/30 hover:shadow-lg ${
                                        open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{ transitionDelay: open ? "300ms" : "0ms" }}
                                >
                                    <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <span className="flex-1 text-left">Data Mustahik</span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Footer */}
                <div className="relative p-4 border-t border-white/20 bg-white/5 backdrop-blur-sm">
                    <div className={`flex items-center gap-4 mb-4 p-4 rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 ${
                        open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: open ? "400ms" : "0ms" }}>
                        <button
                            onClick={() => handleNavClick("/profile")}
                            className="flex items-center gap-4 w-full text-white"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xl">
                                    A
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl blur opacity-40 animate-pulse"></div>
                            </div>
                            <div className="flex-1 text-left">
                                <h6 className="text-sm font-bold mb-1">Admin</h6>
                                <small className="text-xs text-white/80 font-medium">Administrator</small>
                            </div>
                        </button>
                    </div>

                    <button
                        onClick={() => handleNavClick("/logout")}
                        className={`group w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white font-semibold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 border border-red-400/30 ${
                            open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                        }`}
                        style={{ transitionDelay: open ? "500ms" : "0ms" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setOpen(false)}
            />

            {/* KONTEN */}
            <main className={`transition-all duration-500 ease-in-out pt-20 p-6 min-h-screen relative ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${open ? "ml-80" : "ml-0"}`}>
                {children || (
                    <div className="max-w-6xl mx-auto">
                        {/* Hero Section */}
                        <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                            Selamat Datang di Admin Panel
                                        </h1>
                                        <p className="text-lg text-gray-600 font-medium mt-2">
                                            Sistem manajemen mustahik dengan desain modern dan interaktif ✨
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="group backdrop-blur-xl bg-white/70 p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 01.553-1.394L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A2 2 0 0021 18.382V8.618a2 2 0 00-.553-1.394L15 5m0 12V5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                                        Daftar Area
                                    </h3>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        Kelola area distribusi dengan mudah dan efisien menggunakan interface yang intuitif
                                    </p>
                                </div>
                            </div>

                            <div className="group backdrop-blur-xl bg-white/70 p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                                        Data Mustahik
                                    </h3>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        Pantau dan kelola data penerima manfaat dengan sistem yang terintegrasi dan aman
                                    </p>
                                </div>
                            </div>

                            <div className="group backdrop-blur-xl bg-white/70 p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden md:col-span-2 lg:col-span-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        Analytics
                                    </h3>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        Analisis mendalam untuk pengambilan keputusan yang lebih baik dan terukur
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}