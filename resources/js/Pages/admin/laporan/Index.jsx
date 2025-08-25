import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Swal from "sweetalert2";

export default function Index({ laporanDistribusi, danaMasuk, danaKeluar, sisaDana = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("tanggal");
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedFilter, setSelectedFilter] = useState("all");

    const handleDelete = (id, penerima) => {
        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: `Yakin ingin menghapus data distribusi untuk ${penerima}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("laporan.destroy", id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Data distribusi berhasil dihapus.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Terjadi kesalahan saat menghapus data.',
                            icon: 'error'
                        });
                    }
                });
            }
        });
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("desc");
        }
    };

    // Get unique jenis bantuan for filter
    const jenisBantuanOptions = [...new Set(laporanDistribusi.map(item => item.jenis_bantuan))];

    // Filter and sort data
    const filteredAndSortedData = laporanDistribusi
        .filter(item => {
            const matchesSearch = 
                item.penerima?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.alamat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.jenis_bantuan?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilter = selectedFilter === "all" || item.jenis_bantuan === selectedFilter;
            
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'dana_keluar') {
                aValue = parseInt(aValue || 0);
                bValue = parseInt(bValue || 0);
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    // Calculate statistics
    const totalDanaKeluar = laporanDistribusi.reduce(
        (sum, item) => sum + parseInt(item.dana_keluar || 0),
        0
    );

    const SortIcon = ({ column }) => {
        if (sortBy !== column) {
            return (
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4M8 15l4 4 4-4" />
                </svg>
            );
        }
        return sortOrder === 'asc' ? (
            <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        );
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    {/* Header Section with Gradient */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg text-white p-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                                     Laporan Distribusi
                                </h1>
                                <p className="text-blue-100 text-lg">
                                    Kelola dan pantau distribusi bantuan dengan mudah
                                </p>
                            </div>
                            <Link
                                href={route("laporan.create")}
                                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Data
                            </Link>
                        </div>
                    </div>

                    {/* Enhanced Stats Cards */}
                    {laporanDistribusi.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Total Distribusi */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            Total Distribusi
                                        </h3>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {laporanDistribusi.length}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Data terdaftar
                                        </p>
                                    </div>
                                    <div className="bg-blue-100 rounded-2xl p-4">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Dana Masuk */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">
                                            Dana Masuk
                                        </h3>
                                        <p className="text-2xl font-bold text-green-700">
                                            Rp {danaMasuk.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Total pemasukan
                                        </p>
                                    </div>
                                    <div className="bg-green-100 rounded-2xl p-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Dana Keluar */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-1">
                                            Dana Keluar
                                        </h3>
                                        <p className="text-2xl font-bold text-red-700">
                                            Rp {danaKeluar.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Total pengeluaran
                                        </p>
                                    </div>
                                    <div className="bg-red-100 rounded-2xl p-4">
                                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Sisa Dana */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">
                                            Sisa Dana
                                        </h3>
                                        <p className={`text-2xl font-bold ${sisaDana >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
                                            Rp {sisaDana.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Saldo tersisa
                                        </p>
                                    </div>
                                    <div className="bg-purple-100 rounded-2xl p-4">
                                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Search and Filter Section */}
                    {laporanDistribusi.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search Input */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="🔍 Cari berdasarkan penerima, alamat, atau jenis bantuan..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Filter Dropdown */}
                                <div className="lg:w-64">
                                    <select
                                        value={selectedFilter}
                                        onChange={(e) => setSelectedFilter(e.target.value)}
                                        className="block w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
                                    >
                                        <option value="all"> Semua Jenis Bantuan</option>
                                        {jenisBantuanOptions.map(jenis => (
                                            <option key={jenis} value={jenis}>
                                                {jenis}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Results Counter */}
                                <div className="text-sm text-gray-500 flex items-center bg-gray-50 px-4 py-2 rounded-xl">
                                    <span className="font-medium">
                                        {filteredAndSortedData.length} dari {laporanDistribusi.length} data
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Data Table/Cards */}
                    {laporanDistribusi.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <tr>
                                                <th
                                                    className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-all duration-200 select-none"
                                                    onClick={() => handleSort('tanggal')}
                                                >
                                                    <div className="flex items-center">
                                                         Tanggal
                                                        <SortIcon column="tanggal" />
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-all duration-200 select-none"
                                                    onClick={() => handleSort('penerima')}
                                                >
                                                    <div className="flex items-center">
                                                         Penerima
                                                        <SortIcon column="penerima" />
                                                    </div>
                                                </th>
                                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                     Alamat
                                                </th>
                                                <th
                                                    className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-all duration-200 select-none"
                                                    onClick={() => handleSort('jenis_bantuan')}
                                                >
                                                    <div className="flex items-center">
                                                         Jenis Bantuan
                                                        <SortIcon column="jenis_bantuan" />
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-all duration-200 select-none"
                                                    onClick={() => handleSort('dana_keluar')}
                                                >
                                                    <div className="flex items-center">
                                                         Dana Keluar
                                                        <SortIcon column="dana_keluar" />
                                                    </div>
                                                </th>
                                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                     Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredAndSortedData.map((item, index) => (
                                                <tr key={item.id} className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <div className="text-sm font-semibold text-gray-900">{item.penerima}</div>
                                                    </td>
                                                    <td className="px-6 py-5 text-sm text-gray-600 max-w-xs truncate" title={item.alamat}>
                                                        {item.alamat}
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                                                            {item.jenis_bantuan}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-red-600">
                                                        -Rp {parseInt(item.dana_keluar || 0).toLocaleString('id-ID')}
                                                    </td>
                                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            <Link
                                                                href={route("laporan.edit", item.id)}
                                                                className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                                            >
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(item.id, item.penerima)}
                                                                className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                                            >
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Enhanced Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {filteredAndSortedData.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 text-lg mb-1">
                                                    👤 {item.penerima}
                                                </h3>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    📅 {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-red-600 text-lg mb-2">
                                                     -Rp {parseInt(item.dana_keluar || 0).toLocaleString('id-ID')}
                                                </p>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                                                     {item.jenis_bantuan}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-700 flex items-start">
                                                <span className="ml-1">{item.alamat}</span>
                                            </p>
                                        </div>

                                        <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                            <Link
                                                href={route("laporan.edit", item.id)}
                                                className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id, item.penerima)}
                                                className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-20">
                            <div className="mx-auto w-32 h-32 bg-gradient-to-r from-gray-100 to-blue-100 rounded-full flex items-center justify-center mb-8">
                                <svg
                                    className="w-16 h-16 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">📋 Belum Ada Data Distribusi</h3>
                            <p className="text-gray-500 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                                Mulai dengan menambahkan laporan distribusi pertama Anda untuk melacak bantuan yang telah disalurkan dengan sistem yang terorganisir.
                            </p>
                            <Link
                                href={route("laporan.create")}
                                className="inline-flex items-center px-8 py-4 border border-transparent shadow-lg text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Data Distribusi
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}