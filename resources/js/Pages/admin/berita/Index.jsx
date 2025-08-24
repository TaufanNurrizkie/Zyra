import React from 'react';
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import {
    Eye,
    Edit3,
    Trash2,
    Plus,
    User,
    Tag,
    Calendar,
    Image as ImageIcon,
    Filter,
    Search,
    Grid3X3,
    List,
    Clock,
    CheckCircle,
    AlertCircle,
    Star
} from "lucide-react";

// Berita List Item Component
const BeritaListItem = ({ berita, onDelete }) => {
    // Fungsi untuk mendapatkan status (fallback jika tidak ada field status)
    const getStatus = () => {
        if (berita.status) return berita.status;
        // Fallback: anggap published jika tidak ada status
        return 'published';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'draft':
                return <Clock className="w-4 h-4" />;
            case 'published':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <CheckCircle className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft':
                return 'text-yellow-600 bg-yellow-100';
            case 'published':
                return 'text-green-600 bg-green-100';
            default:
                return 'text-green-600 bg-green-100';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Tanggal tidak tersedia';
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const currentStatus = getStatus();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{berita.title}</h3>
                    <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(currentStatus)}`}>
                            {getStatusIcon(currentStatus)}
                            {currentStatus}
                        </div>
                        {berita.featured && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full text-amber-600 bg-amber-100">
                                <Star className="w-4 h-4" />
                                Featured
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{berita.author || 'Author tidak tersedia'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(berita.date)}</span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{berita.excerpt || 'Excerpt tidak tersedia'}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
                <Link
                    href={route("berita.show", berita.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    <Eye className="w-4 h-4" />
                    Detail
                </Link>
                <Link
                    href={route("berita.edit", berita.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    <Edit3 className="w-4 h-4" />
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(berita)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                </button>
            </div>
        </div>
    );
};

// Empty State Component
const EmptyState = () => (
    <div className="text-center py-20">
        <div className="mb-6">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
            Belum Ada Berita
        </h3>
        <p className="text-gray-600 mb-6">
            Mulai dengan membuat berita pertama Anda.
        </p>
        <Link
            href={route("berita.create")}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
            <Plus className="w-5 h-5" />
            Buat Berita Pertama
        </Link>
    </div>
);

// Filter Component
const FilterBar = ({ onSearch, onFilterChange, viewMode, onViewModeChange, beritaData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleSearch = (value) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        onFilterChange(value);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari berita..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                        >
                            <option value="">Semua Status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                                    ? 'bg-white shadow-md text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Grid3X3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                                    ? 'bg-white shadow-md text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Enhanced Berita Card
const BeritaCard = ({ berita, onDelete }) => {
    // Fungsi untuk mendapatkan status (fallback jika tidak ada field status)
    const getStatus = () => {
        if (berita.status) return berita.status;
        return 'published'; // Default status
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'draft':
                return <Clock className="w-4 h-4" />;
            case 'published':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <CheckCircle className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft':
                return 'from-yellow-400 to-orange-500';
            case 'published':
                return 'from-green-400 to-emerald-500';
            default:
                return 'from-green-400 to-emerald-500';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Tanggal tidak tersedia';
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const currentStatus = getStatus();

    return (
        <div className="group bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative border border-gray-100">
            {/* Status Badge */}
            <div className="absolute top-4 left-4 z-10">
                <div className="flex flex-col gap-2">
                    <div className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r ${getStatusColor(currentStatus)} text-white shadow-lg`}>
                        {getStatusIcon(currentStatus)}
                        {currentStatus}
                    </div>
                    {berita.featured && (
                        <div className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg">
                            <Star className="w-4 h-4" />
                            Featured
                        </div>
                    )}
                </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden h-56">
                {berita.image ? (
                    <img
                        src={`/storage/${berita.image}`}
                        alt={berita.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${berita.image ? 'hidden' : 'flex'}`}>
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{berita.author || 'Author tidak tersedia'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{formatDate(berita.date)}</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {berita.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {berita.excerpt || 'Excerpt tidak tersedia'}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                    <Link
                        href={route("berita.show", berita.id)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        <Eye className="w-4 h-4" />
                        Detail
                    </Link>
                    <Link
                        href={route("berita.edit", berita.id)}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        <Edit3 className="w-4 h-4" />
                        Edit
                    </Link>
                    <button
                        onClick={() => onDelete(berita)}
                        className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Component
export default function Index({ berita }) {
    // Pastikan berita adalah array
    const beritaArray = Array.isArray(berita) ? berita : [];

    const [filteredBerita, setFilteredBerita] = useState(beritaArray);
    const [viewMode, setViewMode] = useState("grid");

    const handleDelete = (berita) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            html: `Berita <strong>"${berita.title}"</strong> akan dihapus secara permanen!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
            background: "#fef2f2",
            customClass: {
                popup: "rounded-2xl",
                confirmButton: "rounded-xl",
                cancelButton: "rounded-xl",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("berita.destroy", berita.id), {
                    onSuccess: () => {
                        // ✅ Hapus dari state secara langsung, tanpa reload
                        setFilteredBerita(prev => prev.filter(item => item.id !== berita.id));

                        // Opsional: Tampilkan toast sukses
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Berita berhasil dihapus",
                            showConfirmButton: false,
                            timer: 1500,
                            background: "#f0fdf4",
                            color: "#166534",
                            customClass: {
                                popup: "rounded-2xl",
                            },
                        });
                    },
                    onError: (errors) => {
                        // Jika error, tampilkan pesan
                        Swal.fire({
                            icon: "error",
                            title: "Gagal!",
                            text: errors?.message || "Terjadi kesalahan saat menghapus berita",
                            background: "#fef2f2",
                            color: "#dc2626",
                            customClass: {
                                popup: "rounded-2xl",
                            },
                        });
                    },
                });
            }
        });
    };

    const handleSearch = (searchTerm) => {
        const filtered = beritaArray.filter(
            (item) =>
                (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredBerita(filtered);
    };

    const handleFilterChange = (status) => {
        if (status === "") {
            setFilteredBerita(beritaArray);
        } else {
            const filtered = beritaArray.filter(
                (item) => {
                    const itemStatus = item.status || 'published';
                    return itemStatus === status;
                }
            );
            setFilteredBerita(filtered);
        }
    };

    // Hitung statistik dengan aman
    const totalBerita = beritaArray.length;
    const publishedCount = beritaArray.filter(p => (p.status || 'published') === 'published').length;
    const featuredCount = beritaArray.filter(p => p.featured).length;

    return (
        <AdminLayout>
            <Head title="Berita Management" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
                                Berita Management
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Kelola semua berita dengan mudah dan efisien
                            </p>
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <div className="flex items-center gap-6">
                                <span className="text-gray-700 font-medium">
                                    Total Berita:{" "}
                                    <span className="font-bold text-blue-600">
                                        {totalBerita}
                                    </span>
                                </span>
                                <span className="text-gray-700 font-medium">
                                    Published:{" "}
                                    <span className="font-bold text-green-600">
                                        {publishedCount}
                                    </span>
                                </span>
                                <span className="text-gray-700 font-medium">
                                    Featured:{" "}
                                    <span className="font-bold text-amber-600">
                                        {featuredCount}
                                    </span>
                                </span>
                            </div>
                            <Link
                                href={route("berita.create")}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Berita
                            </Link>
                        </div>

                        {/* Filter Bar */}
                        <FilterBar
                            onSearch={handleSearch}
                            onFilterChange={handleFilterChange}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            beritaData={beritaArray}
                        />

                        {/* List/Grid */}
                        {filteredBerita.length > 0 ? (
                            <div
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                                        : "space-y-6"
                                }
                            >
                                {filteredBerita.map((item) => (
                                    <div key={item.id}>
                                        {viewMode === "grid" ? (
                                            <BeritaCard
                                                berita={item}
                                                onDelete={handleDelete}
                                            />
                                        ) : (
                                            <BeritaListItem
                                                berita={item}
                                                onDelete={handleDelete}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState />
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
