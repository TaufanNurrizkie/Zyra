import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Mount animation
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === "Escape" && open) {
                setOpen(false); // ESC untuk nutup
            }
        };

        window.addEventListener("keydown", onEsc);

        return () => {
            window.removeEventListener("keydown", onEsc);
            document.body.classList.remove("overflow-hidden"); // jaga-jaga
        };
    }, [open]);
    const handleNavClick = (href) => {
        if (href === "/logout") {
            router.post("/logout"); // Breeze logout pakai POST
        } else {
            router.visit(href); // Navigasi biasa
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-x-hidden relative">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "4s" }}
                ></div>
            </div>

            {/* NAVBAR */}
            <nav
                className={`backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-xl fixed top-0 inset-x-0 z-40 transition-all duration-700 ${
                    mounted
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                }`}
            >
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
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6">
                                <span className="text-white font-bold text-lg drop-shadow-lg">
                                    Z
                                </span>
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
                <div className="relative p-6 border-b border-white/20 ">
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
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
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-40 animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white drop-shadow-lg">
                                Admin Panel
                            </h1>
                            <p className="text-xs text-white/80 font-medium">
                                Management Mustahik
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto relative">
                    <div className="space-y-8">
                        <div>
                            <h3
                                className={`text-xs font-bold text-white/70 uppercase tracking-widest mb-4 px-3 transition-all duration-500 delay-100 ${
                                    open
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-4"
                                }`}
                            >
                                ✨ Manajemen
                            </h3>
                            <div className="space-y-2">
                                <a
                                    href="/admin"
                                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/90 hover:text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:translate-x-2 border border-white/20 hover:border-white/30 hover:shadow-lg ${
                                        open
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{
                                        transitionDelay: open ? "200ms" : "0ms",
                                    }}
                                >
                                    <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 01.553-1.394L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A2 2 0 0021 18.382V8.618a2 2 0 00-.553-1.394L15 5m0 12V5"
                                            />
                                        </svg>
                                    </div>
                                    <span className="flex-1 text-left">
                                        Dashboard
                                    </span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                                </a>

                                <a
                                    href="/mustahik"
                                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/90 hover:text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:translate-x-2 border border-white/20 hover:border-white/30 hover:shadow-lg ${
                                        open
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{
                                        transitionDelay: open ? "300ms" : "0ms",
                                    }}
                                >
                                    <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="flex-1 text-left">
                                        Data Mustahik
                                    </span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                                </a>

                                <a
                                    href="/admin/gallery"
                                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/90 hover:text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:translate-x-2 border border-white/20 hover:border-white/30 hover:shadow-lg ${
                                        open
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{
                                        transitionDelay: open ? "300ms" : "0ms",
                                    }}
                                >
                                    <div className="p-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        {/* Gallery Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4-4 4 4 4-4 4 4"
                                            />
                                        </svg>
                                    </div>
                                    <span className="flex-1 text-left">
                                        Gallery
                                    </span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                                </a>

                                <a
                                    href="/programs"
                                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/90 hover:text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:translate-x-2 border border-white/20 hover:border-white/30 hover:shadow-lg ${
                                        open
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{
                                        transitionDelay: open ? "300ms" : "0ms",
                                    }}
                                >
                                    <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        {/* Program Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6M7 8h10M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="flex-1 text-left">
                                        Program
                                    </span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                                </a>

                                <a
                                    href="/laporan"
                                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white/90 hover:text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:translate-x-2 border border-white/20 hover:border-white/30 hover:shadow-lg ${
                                        open
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{
                                        transitionDelay: open ? "300ms" : "0ms",
                                    }}
                                >
                                    <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        {/* Report Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 17v-6h6v6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="flex-1 text-left">
                                        Laporan
                                    </span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Footer */}
                <div className="relative p-4 border-t border-white/20 bg-white/5 backdrop-blur-sm">
                    <div
                        className={`flex items-center gap-4 mb-4 p-4 rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 ${
                            open
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4"
                        }`}
                        style={{ transitionDelay: open ? "400ms" : "0ms" }}
                    >
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
                                <h6 className="text-sm font-bold mb-1">
                                    Admin
                                </h6>
                                <small className="text-xs text-white/80 font-medium">
                                    Administrator
                                </small>
                            </div>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleNavClick("/logout")}
                        className={`group w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 
        hover:from-red-600 hover:via-red-700 hover:to-red-800 
        text-white font-semibold py-3.5 px-4 rounded-2xl 
        flex items-center justify-center gap-3 transition-all duration-300 
        hover:shadow-xl hover:scale-105 active:scale-95 
        border border-red-400/30 ${
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
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* OVERLAY */}
            <div onClick={() => setOpen(true)} />

            {/* KONTEN */}
            <main
                className={`transition-all duration-500 ease-in-out pt-20 p-6 min-h-screen relative ${
                    mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                } ${open ? "ml-80" : "ml-0"}`}
            >
                {children}
            </main>

            {/* FOOTER */}
            <footer
                className={`backdrop-blur-xl bg-white/70 border-t border-white/20 shadow-md p-4 text-center text-sm text-gray-600 transition-all duration-500 ${
                    open ? "ml-80" : "ml-0"
                }`}
            >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-gray-800">
                            Zyra Mustahik
                        </span>
                        . All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-gray-500">
                        <a
                            href="#"
                            className="hover:text-emerald-600 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-emerald-600 transition-colors"
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className="hover:text-emerald-600 transition-colors"
                        >
                            Help
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
