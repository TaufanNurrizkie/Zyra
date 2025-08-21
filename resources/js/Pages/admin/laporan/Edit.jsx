import { useForm, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ laporan }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [formattedAmount, setFormattedAmount] = useState('');

    const { data, setData, put, processing, errors, wasSuccessful } = useForm({
        penerima: laporan.penerima || "",
        alamat: laporan.alamat || "",
        jenis_bantuan: laporan.jenis_bantuan || "",
        dana_keluar: laporan.dana_keluar || "",
        tanggal: laporan.tanggal || "",
    });

    // Format currency display
    useEffect(() => {
        if (data.dana_keluar) {
            const formatted = parseInt(data.dana_keluar).toLocaleString('id-ID');
            setFormattedAmount(`Rp ${formatted}`);
        } else {
            setFormattedAmount('');
        }
    }, [data.dana_keluar]);

    // Show success message
    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [wasSuccessful]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("laporan.update", laporan.id), {
            onSuccess: () => {
                // Success handled by useEffect
            },
            onError: () => {
                // Scroll to first error
                const firstError = document.querySelector('.border-red-500');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    };

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/[^\d]/g, ''); // Only numbers
        setData("dana_keluar", value);
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const jenisbantuanOptions = [
        'Bantuan Tunai',
        'Bantuan Sembako',
        'Bantuan Pendidikan',
        'Bantuan Kesehatan',
        'Bantuan Usaha',
        'Bantuan Renovasi',
        'Bantuan Lainnya'
    ];

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Success Message */}
                    {showSuccess && (
                        <div className="mb-4 sm:mb-6 lg:mb-8 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6 flex items-start sm:items-center animate-fade-in shadow-lg">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="h-4 w-4 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-3 sm:ml-4 flex-1">
                                <h3 className="text-sm sm:text-lg font-semibold text-green-800">Berhasil Diperbarui!</h3>
                                <p className="text-xs sm:text-sm text-green-700 mt-1">
                                    Data laporan distribusi untuk <span className="font-semibold">{laporan.penerima}</span> berhasil diperbarui
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Header Section */}
                    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
                        <div className="flex flex-col space-y-4 sm:space-y-6">
                            {/* Icon + Title */}
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                                        Edit Laporan Distribusi
                                    </h1>
                                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-snug break-words">
                                        Perbarui data distribusi bantuan untuk{" "}
                                        <span className="font-semibold text-blue-600">{laporan.penerima}</span>
                                    </p>
                                </div>
                            </div>

                            {/* ID Box and Breadcrumb */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                {/* ID Box */}
                                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg self-start">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span>ID: {laporan.id}</span>
                                </div>

                                {/* Breadcrumb */}
                                <nav className="flex" aria-label="Breadcrumb">
                                    <ol className="inline-flex items-center space-x-1 md:space-x-3 text-xs sm:text-sm">
                                        <li className="inline-flex items-center">
                                            <Link
                                                href={route("laporan.index")}
                                                className="inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                                </svg>
                                                <span className="hidden sm:inline">Laporan Distribusi</span>
                                                <span className="sm:hidden">Laporan</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="ml-1 text-gray-500">Edit Data</span>
                                            </div>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Update Informasi Distribusi</h2>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">Ubah data yang diperlukan di bawah ini</p>
                        </div>

                        <form onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                            <div className="space-y-6 sm:space-y-8">
                                {/* Recipient Information */}
                                <div className="space-y-4 sm:space-y-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                            <svg className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        Informasi Penerima
                                    </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                                <span className="flex items-center">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Nama Penerima
                                                    <span className="text-red-500 ml-1">*</span>
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={data.penerima}
                                                    onChange={(e) => setData("penerima", e.target.value)}
                                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.penerima ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                        }`}
                                                    placeholder="Masukkan nama lengkap penerima"
                                                />
                                            </div>
                                            {errors.penerima && (
                                                <div className="flex items-center mt-2 text-red-600">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm">{errors.penerima}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                                <span className="flex items-center">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    Tanggal Distribusi
                                                    <span className="text-red-500 ml-1">*</span>
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                value={formatDateForInput(data.tanggal)}
                                                onChange={(e) => setData("tanggal", e.target.value)}
                                                max={new Date().toISOString().split('T')[0]}
                                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.tanggal ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.tanggal && (
                                                <div className="flex items-center mt-2 text-red-600">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm">{errors.tanggal}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                            <span className="flex items-center">
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Alamat Lengkap
                                                <span className="text-red-500 ml-1">*</span>
                                            </span>
                                        </label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={(e) => setData("alamat", e.target.value)}
                                            rows={4}
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none ${errors.alamat ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                            placeholder="Masukkan alamat lengkap penerima"
                                        />
                                        {errors.alamat && (
                                            <div className="flex items-center mt-2 text-red-600">
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-xs sm:text-sm">{errors.alamat}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Aid Information */}
                                <div className="space-y-4 sm:space-y-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                            <svg className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        Informasi Bantuan
                                    </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                                <span className="flex items-center">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    Jenis Bantuan
                                                    <span className="text-red-500 ml-1">*</span>
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={data.jenis_bantuan}
                                                    onChange={(e) => setData("jenis_bantuan", e.target.value)}
                                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white ${errors.jenis_bantuan ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                        }`}
                                                >
                                                    <option value="">Pilih jenis bantuan</option>
                                                    {jenisbantuanOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <svg className="absolute right-3 top-3 sm:top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {errors.jenis_bantuan && (
                                                <div className="flex items-center mt-2 text-red-600">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm">{errors.jenis_bantuan}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                                <span className="flex items-center">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                    Jumlah Dana Keluar
                                                    <span className="text-red-500 ml-1">*</span>
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 text-xs sm:text-sm font-semibold">Rp</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.dana_keluar}
                                                    onChange={handleAmountChange}
                                                    className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.dana_keluar ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                        }`}
                                                    placeholder="0"
                                                />
                                            </div>
                                            {formattedAmount && (
                                                <div className="mt-2 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                    <p className="text-xs sm:text-sm text-blue-700">
                                                        <span className="font-semibold">Format:</span> {formattedAmount}
                                                    </p>
                                                </div>
                                            )}
                                            {errors.dana_keluar && (
                                                <div className="flex items-center mt-2 text-red-600">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm">{errors.dana_keluar}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 lg:space-x-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-200">
                                {/* Cancel Button */}
                                <Link
                                    href={route("laporan.index")}
                                    className="w-full lg:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-sm font-medium rounded-lg sm:rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali ke Daftar
                                </Link>

                                {/* Action Buttons Group */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:ml-auto">
                                    {/* Reset Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (confirm("Yakin ingin mereset semua perubahan?")) {
                                                setData({
                                                    penerima: laporan.penerima || "",
                                                    alamat: laporan.alamat || "",
                                                    jenis_bantuan: laporan.jenis_bantuan || "",
                                                    dana_keluar: laporan.dana_keluar || "",
                                                    tanggal: laporan.tanggal || "",
                                                });
                                            }
                                        }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-amber-300 text-sm font-medium rounded-lg sm:rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0a8.003 8.003 0 0115.357 2m-7.475 7c-.955 0-1.888-.188-2.75-.546m3.268-3.268A8.001 8.001 0 014.582 9" />
                                        </svg>
                                        Reset Form
                                    </button>

                                    {/* Save Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border border-transparent text-sm font-medium rounded-lg sm:rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-xs sm:text-sm">Menyimpan...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="hidden sm:inline">Simpan Perubahan</span>
                                                <span className="sm:hidden">Simpan</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Quick Actions Section */}
                    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mt-4 sm:mt-6 lg:mt-8">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                <svg className="w-3 h-3 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            Aksi Cepat
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                            <Link
                                href={route("laporan.create")}
                                className="group flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-blue-200 transition-colors">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-700 text-center leading-tight">
                                    <span className="hidden sm:inline">Tambah Distribusi Baru</span>
                                    <span className="sm:hidden">Tambah Baru</span>
                                </span>
                                <span className="text-xs text-gray-500 text-center mt-1 hidden sm:block">Buat laporan distribusi baru</span>
                            </Link>

                            <button
                                onClick={() => window.print()}
                                className="group flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-green-200 transition-colors">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-green-700 text-center leading-tight">Print Data</span>
                                <span className="text-xs text-gray-500 text-center mt-1 hidden sm:block">Cetak laporan distribusi</span>
                            </button>

                            <button
                                onClick={() => {
                                    const data = {
                                        penerima: laporan.penerima,
                                        alamat: laporan.alamat,
                                        jenis_bantuan: laporan.jenis_bantuan,
                                        dana_keluar: laporan.dana_keluar,
                                        tanggal: laporan.tanggal
                                    };
                                    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                                    alert('Data berhasil disalin ke clipboard!');
                                }}
                                className="group flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-purple-200 transition-colors">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-purple-700 text-center leading-tight">Salin Data</span>
                                <span className="text-xs text-gray-500 text-center mt-1 hidden sm:block">Copy data ke clipboard</span>
                            </button>

                            <Link
                                href={route("laporan.index")}
                                className="group flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-indigo-200 transition-colors">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-indigo-700 text-center leading-tight">
                                    <span className="hidden sm:inline">Lihat Semua Data</span>
                                    <span className="sm:hidden">Lihat Semua</span>
                                </span>
                                <span className="text-xs text-gray-500 text-center mt-1 hidden sm:block">Kembali ke daftar laporan</span>
                            </Link>
                        </div>
                    </div>

                    {/* Help & Tips */}
                    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="h-4 w-4 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Tips Pengisian Form</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">Pastikan nama penerima ditulis dengan lengkap dan sesuai identitas</p>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">Alamat harus detail dan mudah ditemukan</p>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">Pilih jenis bantuan sesuai dengan yang diberikan</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">Dana keluar harus diisi dengan nominal yang tepat</p>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">Tanggal distribusi tidak boleh lebih dari hari ini</p>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">Gunakan tombol Reset jika ingin membatalkan perubahan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
