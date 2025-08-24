import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tanggal: "",
        penerima: "",
        alamat: "",
        jenis_bantuan: "",
        dana_keluar: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("laporan.store"));
        console.log("Mengirim data:", data);
    };

    // Format currency input
    const handleDanaKeluarChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setData("dana_keluar", value);
    };

    const formatCurrency = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID').format(value);
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex mb-6" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <a
                                    href={route("laporan.index")}
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    Laporan Distribusi
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Tambah Laporan</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    {/* Header Card */}
                    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Tambah Laporan Distribusi</h1>
                                <p className="text-sm text-gray-600 mt-1">Buat laporan distribusi bantuan yang baru</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Tanggal */}
                            <div>
                                <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Tanggal Distribusi</span>
                                    </div>
                                </label>
                                <input
                                    type="date"
                                    id="tanggal"
                                    value={data.tanggal}
                                    onChange={(e) => setData("tanggal", e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.tanggal ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                    required
                                />
                                {errors.tanggal && (
                                    <div className="flex items-center mt-2 text-red-600 text-sm">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.tanggal}
                                    </div>
                                )}
                            </div>

                            {/* Penerima */}
                            <div>
                                <label htmlFor="penerima" className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Nama Penerima</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    id="penerima"
                                    value={data.penerima}
                                    onChange={(e) => setData("penerima", e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.penerima ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                    placeholder="Masukkan nama lengkap penerima"
                                    required
                                />
                                {errors.penerima && (
                                    <div className="flex items-center mt-2 text-red-600 text-sm">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.penerima}
                                    </div>
                                )}
                            </div>

                            {/* Alamat */}
                            <div>
                                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Alamat Lengkap</span>
                                    </div>
                                </label>
                                <textarea
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData("alamat", e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y ${errors.alamat ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                        }`}
                                    placeholder="Masukkan alamat lengkap penerima bantuan"
                                    rows="3"
                                    required
                                />
                                {errors.alamat && (
                                    <div className="flex items-center mt-2 text-red-600 text-sm">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.alamat}
                                    </div>
                                )}
                            </div>

                            {/* Jenis Bantuan */}
                            <div>
                                <label htmlFor="jenis_bantuan" className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                        <span>Jenis Bantuan</span>
                                    </div>
                                </label>

                                <div className="relative">
                                    <select
                                        id="jenis_bantuan"
                                        value={data.jenis_bantuan}
                                        onChange={(e) => setData("jenis_bantuan", e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.jenis_bantuan
                                                ? "border-red-300 bg-red-50"
                                                : "border-gray-300 bg-white"
                                            }`}
                                        required
                                    >
                                        <option value="">-- Pilih Jenis Bantuan --</option>
                                        <option value="Sosial">Sosial</option>
                                        <option value="Ekonomi">Ekonomi</option>
                                        <option value="Kesehatan">Kesehatan</option>
                                        <option value="Pendidikan">Pendidikan</option>
                                        <option value="Makanan">Makanan</option>
                                    </select>
                                </div>

                                {errors.jenis_bantuan && (
                                    <div className="flex items-center mt-2 text-red-600 text-sm">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.jenis_bantuan}
                                    </div>
                                )}
                            </div>


                            {/* Dana Keluar */}
                            <div>
                                <label htmlFor="dana_keluar" className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        <span>Dana Keluar</span>
                                    </div>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm font-medium">Rp</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="dana_keluar"
                                        value={formatCurrency(data.dana_keluar)}
                                        onChange={handleDanaKeluarChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.dana_keluar ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                            }`}
                                        placeholder="0"
                                        required
                                    />
                                    {data.dana_keluar && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <span className="text-gray-400 text-xs">
                                                {data.dana_keluar ? `${Math.floor(data.dana_keluar / 1000)}K` : ''}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {errors.dana_keluar && (
                                    <div className="flex items-center mt-2 text-red-600 text-sm">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.dana_keluar}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200">
                                {/* Tombol Kembali (kiri) */}
                                <a
                                    href={route("laporan.index")}
                                    className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 bg-white
               text-gray-700 font-medium hover:bg-gray-50 focus:outline-none
               focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors
               duration-200 text-center flex items-center justify-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Kembali
                                </a>

                                {/* Tombol Simpan (kanan) */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-600 text-white
               font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2
               focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50
               disabled:cursor-not-allowed transition-all duration-200
               flex items-center justify-center min-w-[140px]"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373
               0 12h4zm2 5.291A7.962 7.962 0 014
               12H0c0 3.042 1.135 5.824 3
               7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Simpan Laporan
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Tips Card */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Tips Pengisian</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Pastikan tanggal distribusi sudah benar</li>
                                        <li>Nama penerima harus sesuai dengan identitas resmi</li>
                                        <li>Alamat diisi selengkap mungkin untuk memudahkan verifikasi</li>
                                        <li>Dana keluar harus sesuai dengan bukti pengeluaran</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
