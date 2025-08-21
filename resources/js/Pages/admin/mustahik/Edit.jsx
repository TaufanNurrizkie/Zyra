import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ mustahik }) {
    const { data, setData, put, processing, errors } = useForm({
        nama: mustahik.nama || "",
        alamat: mustahik.alamat || "",
        golongan: mustahik.golongan || "",
        kontak: mustahik.kontak || "",
        latitude: mustahik.latitude || "",
        longitude: mustahik.longitude || "",
        rangeGaji: mustahik.rangeGaji || "",
        status: mustahik.status || "belum_dibantu",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/mustahik/${mustahik.id}`);
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
                                    Edit Data Mustahik
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Perbarui informasi untuk <span className="font-semibold text-blue-600">{mustahik.nama}</span>
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
                                        <span className="ml-1 text-sm font-medium text-gray-500">Edit Data</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Current Data Preview */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {mustahik.nama.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{mustahik.nama}</h3>
                                <p className="text-sm text-gray-600 mt-1">{mustahik.golongan} • {mustahik.rangeGaji}</p>
                                <div className="flex items-center mt-2">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${mustahik.status === "sudah_dibantu"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {mustahik.status === "sudah_dibantu" ? "Sudah Dibantu" : "Belum Dibantu"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Update Informasi</h2>
                            <p className="text-sm text-gray-600 mt-1">Ubah data yang diperlukan di bawah ini</p>
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
                                            <div className="relative">
                                                <select
                                                    name="golongan"
                                                    value={data.golongan}
                                                    onChange={(e) => setData("golongan", e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
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
                                                <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {errors.golongan && <p className="mt-1 text-sm text-red-600">{errors.golongan}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Range Gaji *
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="rangeGaji"
                                                    value={data.rangeGaji}
                                                    onChange={(e) => setData("rangeGaji", e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                                                    required
                                                >
                                                    <option value="">-- Pilih Range Gaji --</option>
                                                    <option value="1-1000000">Rp 1 - 1.000.000</option>
                                                    <option value="1000000-3000000">Rp 1.000.000 - 3.000.000</option>
                                                    <option value="3000000-5000000">Rp 3.000.000 - 5.000.000</option>
                                                    <option value="5000000-10000000">Rp 5.000.000 - 10.000.000</option>
                                                </select>
                                                <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {errors.rangeGaji && <p className="mt-1 text-sm text-red-600">{errors.rangeGaji}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Status Bantuan *
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${data.status === "belum_dibantu"
                                                    ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                                                    : 'border-gray-300 hover:border-red-400'
                                                }`}>
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
                                            <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${data.status === "sudah_dibantu"
                                                    ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                                                    : 'border-gray-300 hover:border-green-400'
                                                }`}>
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

                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <div className="flex">
                                            <svg className="w-5 h-5 text-amber-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h4 className="text-sm font-medium text-amber-800">Koordinat Saat Ini</h4>
                                                <p className="text-sm text-amber-700 mt-1">
                                                    Lat: <span className="font-mono">{mustahik.latitude}</span>,
                                                    Long: <span className="font-mono">{mustahik.longitude}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 mt-8 border-t border-gray-200">

                                {/* Tombol Batal di kiri */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        // aksi batal (misalnya navigate atau reset state)
                                        window.history.back();
                                    }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Batal
                                </button>

                                {/* Reset + Update di kanan */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">

                                    {/* Reset */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (confirm("Yakin ingin mereset semua perubahan?")) {
                                                setData({
                                                    nama: mustahik.nama || "",
                                                    alamat: mustahik.alamat || "",
                                                    golongan: mustahik.golongan || "",
                                                    kontak: mustahik.kontak || "",
                                                    latitude: mustahik.latitude || "",
                                                    longitude: mustahik.longitude || "",
                                                    rangeGaji: mustahik.rangeGaji || "",
                                                    status: mustahik.status || "belum_dibantu",
                                                });
                                            }
                                        }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0a8.003 8.003 0 0115.357 2m-7.475 7c-.955 0-1.888-.188-2.75-.546m3.268-3.268A8.001 8.001 0 014.582 9" />
                                        </svg>
                                        Reset
                                    </button>

                                    {/* Update */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Mengupdate...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                                Update Data
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Aksi Cepat</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link
                                href="/mustahik/create"
                                className="flex items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                            >
                                <div className="text-center">
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Tambah Baru</span>
                                </div>
                            </Link>

                            <button
                                onClick={() => window.print()}
                                className="flex items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
                            >
                                <div className="text-center">
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Print Data</span>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    const coords = `${mustahik.latitude},${mustahik.longitude}`;
                                    window.open(`https://maps.google.com/maps?q=${coords}`, '_blank');
                                }}
                                className="flex items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group"
                            >
                                <div className="text-center">
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Lihat Peta</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
