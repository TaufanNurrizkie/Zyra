import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        alamat: "",
        golongan: "",
        kontak: "",
        latitude: "",
        longitude: "",
        rangeGaji: "",
        status: "belum_dibantu",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/mustahik", {
            onSuccess: () => Inertia.visit("/mustahik"),
        });
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Tambah Data Mustahik
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Masukkan informasi lengkap untuk data mustahik baru
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link
                                        href="/mustahik"
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                                    >
                                        <svg className="w-3 h-3 mr-2.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        Data Mustahik
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-1 text-sm font-medium text-gray-500">Tambah Data</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Formulir Data Mustahik</h2>
                            <p className="text-sm text-gray-600 mt-1">Lengkapi semua field yang diperlukan</p>
                        </div>

                        <form onSubmit={handleSubmit} className="px-8 py-6">
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Informasi Personal
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    placeholder="Masukkan nama lengkap"
                                                    value={data.nama}
                                                    onChange={(e) => setData("nama", e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
                                                    required
                                                />
                                                <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            {errors.nama && <p className="mt-1 text-sm text-red-600">{errors.nama}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nomor Kontak *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="kontak"
                                                    placeholder="Contoh: 08123456789"
                                                    value={data.kontak}
                                                    onChange={(e) => setData("kontak", e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
                                                    required
                                                />
                                                <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            {errors.kontak && <p className="mt-1 text-sm text-red-600">{errors.kontak}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat Lengkap *
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                name="alamat"
                                                placeholder="Masukkan alamat lengkap"
                                                value={data.alamat}
                                                onChange={(e) => setData("alamat", e.target.value)}
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10 resize-none"
                                                required
                                            />
                                            <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        {errors.alamat && <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>}
                                    </div>
                                </div>

                                {/* Classification Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Klasifikasi
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Golongan Mustahik *
                                            </label>
                                            <select
                                                name="golongan"
                                                value={data.golongan}
                                                onChange={(e) => setData("golongan", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                required
                                            >
                                                <option value="">-- Pilih Golongan --</option>
                                                <option value="fakir">Fakir</option>
                                                <option value="miskin">Miskin</option>
                                                <option value="amil">Amil</option>
                                                <option value="mualaf">Mualaf</option>
                                                <option value="riqab">Riqab</option>
                                                <option value="gharim">Gharim</option>
                                                <option value="fisabilillah">Fisabilillah</option>
                                                <option value="ibnu sabil">Ibnu Sabil</option>
                                            </select>
                                            {errors.golongan && <p className="mt-1 text-sm text-red-600">{errors.golongan}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Range Gaji *
                                            </label>
                                            <select
                                                name="rangeGaji"
                                                value={data.rangeGaji}
                                                onChange={(e) => setData("rangeGaji", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                required
                                            >
                                                <option value="">-- Pilih Range Gaji --</option>
                                                <option value="1-1000000">Rp 1 - 1.000.000</option>
                                                <option value="1000000-3000000">Rp 1.000.000 - 3.000.000</option>
                                                <option value="3000000-5000000">Rp 3.000.000 - 5.000.000</option>
                                                <option value="5000000-10000000">Rp 5.000.000 - 10.000.000</option>
                                            </select>
                                            {errors.rangeGaji && <p className="mt-1 text-sm text-red-600">{errors.rangeGaji}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status Bantuan *
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className="relative flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="belum_dibantu"
                                                    checked={data.status === "belum_dibantu"}
                                                    onChange={(e) => setData("status", e.target.value)}
                                                    className="sr-only"
                                                />
                                                <div className={`w-4 h-4 rounded-full border-2 mr-3 ${data.status === "belum_dibantu" ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
                                                    {data.status === "belum_dibantu" && (
                                                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-900">Belum Dibantu</span>
                                                    <p className="text-sm text-gray-500">Masih membutuhkan bantuan</p>
                                                </div>
                                            </label>
                                            <label className="relative flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="sudah_dibantu"
                                                    checked={data.status === "sudah_dibantu"}
                                                    onChange={(e) => setData("status", e.target.value)}
                                                    className="sr-only"
                                                />
                                                <div className={`w-4 h-4 rounded-full border-2 mr-3 ${data.status === "sudah_dibantu" ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                                                    {data.status === "sudah_dibantu" && (
                                                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-900">Sudah Dibantu</span>
                                                    <p className="text-sm text-gray-500">Telah menerima bantuan</p>
                                                </div>
                                            </label>
                                        </div>
                                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Koordinat Lokasi
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Latitude *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.0000001"
                                                    name="latitude"
                                                    placeholder="Contoh: -6.175392"
                                                    value={data.latitude}
                                                    onChange={(e) => setData("latitude", e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
                                                    required
                                                />
                                                <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                            </div>
                                            {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Longitude *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.0000001"
                                                    name="longitude"
                                                    placeholder="Contoh: 106.827183"
                                                    value={data.longitude}
                                                    onChange={(e) => setData("longitude", e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
                                                    required
                                                />
                                                <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                            </div>
                                            {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex">
                                            <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h4 className="text-sm font-medium text-blue-800">Tips Mendapatkan Koordinat</h4>
                                                <p className="text-sm text-blue-700 mt-1">
                                                    Anda dapat menggunakan Google Maps untuk mendapatkan koordinat latitude dan longitude lokasi dengan klik kanan pada peta.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-8 mt-8 border-t border-gray-200">
                                <Link
                                    href="/mustahik"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 w-full sm:w-auto"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Simpan Data
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
