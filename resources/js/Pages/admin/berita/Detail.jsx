import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import {
    ArrowLeft,
    Edit3,
    Trash2,
    Calendar,
    User,
    FileText,
    Image as ImageIcon,
    Eye,
    EyeOff,
    X,
    AlertTriangle,
    CheckCircle,
    Clock,
    BookOpen,
    Star,
    Share2,
    Printer,
    Download
} from "lucide-react";

export default function Show({ berita }) {
    const [showImageModal, setShowImageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const getStatusConfig = (status) => {
        const configs = {
            draft: {
                color: 'bg-gray-100 text-gray-800 border-gray-200',
                icon: <Clock size={16} />,
                label: 'Draft',
                bgColor: 'bg-gray-50'
            },
            published: {
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: <CheckCircle size={16} />,
                label: 'Published',
                bgColor: 'bg-green-50'
            },
            archived: {
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: <BookOpen size={16} />,
                label: 'Archived',
                bgColor: 'bg-blue-50'
            }
        };
        return configs[status] || configs.draft;
    };

    const statusConfig = getStatusConfig(berita.status);

    const handleEdit = () => {
        router.get(route('berita.edit', berita.id));
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('berita.destroy', berita.id), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            }
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fungsi untuk menghitung waktu baca (estimasi 200 kata per menit)
    const calculateReadTime = (content) => {
        const textContent = content.replace(/<[^>]*>/g, '');
        const wordCount = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
        const readTimeMinutes = Math.ceil(wordCount / 200);
        return readTimeMinutes;
    };

    const readTime = calculateReadTime(berita.content);

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => router.get(route('berita.index'))}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                                        <Eye size={32} className="text-blue-600" />
                                        Detail Berita
                                    </h1>
                                    <p className="text-gray-600 mt-1">Informasi lengkap berita yang dipilih</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {berita.featured && (
                                        <div className="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-200 rounded-full flex items-center gap-2">
                                            <Star size={14} />
                                            <span className="font-medium">Featured</span>
                                        </div>
                                    )}
                                    <div className={`px-4 py-2 rounded-full border ${statusConfig.color} flex items-center gap-2`}>
                                        {statusConfig.icon}
                                        <span className="font-medium capitalize">{statusConfig.label}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                                >
                                    <Edit3 size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
                                >
                                    <Trash2 size={16} />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Berita Info Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className={`h-2 ${statusConfig.bgColor}`}></div>
                            <div className="p-8">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-4">
                                        {berita.title}
                                    </h2>

                                    {/* Meta Information */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <User size={16} className="text-blue-600" />
                                            <span className="font-medium">{berita.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-green-600" />
                                            <span>{formatDate(berita.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-purple-600" />
                                            <span>{readTime} menit dibaca</span>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    {berita.excerpt && (
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                                            <p className="text-blue-800 font-medium italic">"{berita.excerpt}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <FileText size={20} className="text-blue-600" />
                                        Konten Berita
                                    </h3>
                                    <div className="prose max-w-none">
                                        <div
                                            className="text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: berita.content }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <Calendar size={20} className="text-blue-600" />
                                Timeline
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                                    <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full"></div>
                                    <div>
                                        <p className="font-medium text-gray-800">Dibuat</p>
                                        <p className="text-sm text-gray-600">{formatDateTime(berita.created_at)}</p>
                                    </div>
                                </div>

                                {berita.updated_at !== berita.created_at && (
                                    <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
                                        <div className="flex-shrink-0 w-3 h-3 bg-yellow-600 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-gray-800">Terakhir Diperbarui</p>
                                            <p className="text-sm text-gray-600">{formatDateTime(berita.updated_at)}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                                    <div className="flex-shrink-0 w-3 h-3 bg-green-600 rounded-full"></div>
                                    <div>
                                        <p className="font-medium text-gray-800">Tanggal Publikasi</p>
                                        <p className="text-sm text-gray-600">{formatDate(berita.date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Image Card */}
                        {berita.image && (
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <ImageIcon size={20} className="text-blue-600" />
                                    Gambar Berita
                                </h3>

                                <div className="relative group cursor-pointer" onClick={() => setShowImageModal(true)}>
                                    <img
                                        src={`/storage/${berita.image}`}
                                        alt={berita.title}
                                        className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-xl transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white bg-opacity-20 rounded-full p-3">
                                            <Eye size={24} className="text-white" />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 mt-3 text-center">
                                    Klik untuk melihat ukuran penuh
                                </p>
                            </div>
                        )}

                        {/* No Image Placeholder */}
                        {!berita.image && (
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <ImageIcon size={20} className="text-blue-600" />
                                    Gambar Berita
                                </h3>

                                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center">
                                    <EyeOff size={48} className="text-gray-400 mb-3" />
                                    <p className="text-gray-500 font-medium">Tidak ada gambar</p>
                                    <p className="text-sm text-gray-400 mt-1">Berita ini belum memiliki gambar</p>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>

                            <div className="space-y-3">
                                <button
                                    onClick={handleEdit}
                                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Edit3 size={18} />
                                    Edit Berita
                                </button>

                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="w-full py-3 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Trash2 size={18} />
                                    Hapus Berita
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-2 px-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm">
                                        <Share2 size={16} />
                                        Share
                                    </button>
                                    <button className="py-2 px-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm">
                                        <Printer size={16} />
                                        Print
                                    </button>
                                </div>

                                <button
                                    onClick={() => router.get(route('berita.index'))}
                                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <ArrowLeft size={18} />
                                    Kembali ke Daftar
                                </button>
                            </div>
                        </div>

                        {/* Berita Stats */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik Berita</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">ID Berita</span>
                                    <span className="font-semibold text-gray-800">#{berita.id}</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Panjang Konten</span>
                                    <span className="font-semibold text-gray-800">
                                        {berita.content.replace(/<[^>]*>/g, '').length} karakter
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Waktu Baca</span>
                                    <span className="font-semibold text-gray-800">{readTime} menit</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Status</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                                        {statusConfig.label}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Featured</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        berita.featured
                                            ? 'bg-amber-100 text-amber-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {berita.featured ? 'Ya' : 'Tidak'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Modal */}
                {showImageModal && berita.image && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
                        <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
                            <img
                                src={`/storage/${berita.image}`}
                                alt={berita.title}
                                className="w-full h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-300"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <AlertTriangle size={24} className="text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Konfirmasi Hapus</h3>
                                    <p className="text-sm text-gray-600">Tindakan ini tidak dapat dibatalkan</p>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6">
                                Apakah Anda yakin ingin menghapus berita <strong>"{berita.title}"</strong>?
                                Semua data terkait akan dihapus secara permanen.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors ${
                                        isDeleting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-red-600 hover:bg-red-700'
                                    }`}
                                >
                                    {isDeleting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Menghapus...
                                        </div>
                                    ) : (
                                        'Ya, Hapus'
                                    )}
                                </button>

                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
