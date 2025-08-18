import UserLayout from '@/Layouts/UserLayout';
import React, { useState } from "react";

export default function Index() {
    const [form, setForm] = useState({
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Pesan terkirim:", form);
        alert("Pesan berhasil dikirim!");
        setForm({ email: "", message: "" });
    };

    return (
        <UserLayout>
            <div className="bg-gray-100 text-black min-h-screen">
                <main className="max-w-6xl mx-auto px-4 py-10">
                    <div className="bg-white shadow-lg rounded-2xl p-10">

                        {/* Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold text-gray-800">
                                Hubungi Kami
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Kami senang mendengar dari Anda. Silakan pilih cara terbaik untuk menghubungi kami.
                            </p>
                            <span className="block w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></span>
                        </div>

                        {/* Konten Kiri-Kanan */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                            {/* Kiri: Info Kontak */}
                            <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md h-full">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    Informasi Kontak
                                </h3>
                                <p className="text-gray-700">
                                    Tim kami siap membantu Anda melalui informasi berikut:
                                </p>

                                <div className="space-y-6">
                                    <p className="flex items-center gap-4">
                                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg shadow">
                                            ✉️
                                        </span>
                                        <span className="text-gray-800">info@zakatku.org</span>
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white text-lg shadow">
                                            📞
                                        </span>
                                        <span className="text-gray-800">+62 812 3456 7890</span>
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white text-lg shadow">
                                            📍
                                        </span>
                                        <span className="text-gray-800">Jl. Raya Contoh No. 123, Jakarta, Indonesia</span>
                                    </p>
                                </div>
                            </div>

                            {/* Kanan: Form Pesan */}
                            <div className="p-6 bg-gray-50 rounded-xl shadow-md h-full">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                                    Kirim Pesan
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium mb-2 text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                            placeholder="Masukkan email Anda"
                                        />
                                    </div>

                                    {/* Pesan */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium mb-2 text-gray-700"
                                        >
                                            Pesan
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                            placeholder="Tulis pesan Anda..."
                                        />
                                    </div>

                                    {/* Tombol Submit */}
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition"
                                    >
                                        Kirim Pesan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </UserLayout>
    );
}
