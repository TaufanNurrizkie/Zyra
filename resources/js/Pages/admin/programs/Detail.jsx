import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import {
    ArrowLeft,
    Edit3,
    Trash2,
    Calendar,
    MapPin,
    Tag,
    FileText,
    Image,
    Eye,
    EyeOff,
    X,
    AlertTriangle,
    CheckCircle,
    Clock,
    Rocket
} from "lucide-react";

export default function Show({ program }) {
    const [showImageModal, setShowImageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const getStatusConfig = (status) => {
        const configs = {
            segera: {
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                icon: <Clock size={16} />,
                label: 'Segera Dimulai',
                bgColor: 'bg-yellow-50'
            },
            berjalan: {
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: <Rocket size={16} />,
                label: 'Sedang Berjalan',
                bgColor: 'bg-blue-50'
            },
            selesai: {
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: <CheckCircle size={16} />,
                label: 'Selesai',
                bgColor: 'bg-green-50'
            }
        };
        return configs[status] || configs.segera;
    };

    const statusConfig = getStatusConfig(program.status);

    const handleEdit = () => {
        router.get(route('programs.edit', program.id));
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('programs.destroy', program.id), {
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
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => router.get(route('programs.index'))}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                                        <Eye size={32} className="text-blue-600" />
                                        Detail Program
                                    </h1>
                                    <p className="text-gray-600 mt-1">Informasi lengkap program yang dipilih</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className={`px-4 py-2 rounded-full border ${statusConfig.color} flex items-center gap-2`}>
                                    {statusConfig.icon}
                                    <span className="font-medium">{statusConfig.label}</span>
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
                        {/* Program Info Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className={`h-2 ${statusConfig.bgColor}`}></div>
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                                        {program.judul}
                                    </h2>
                                </div>

                                {/* Meta Information */}
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Tag size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Jenis Program</p>
                                            <p className="text-lg font-semibold text-gray-800">{program.jenis}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <MapPin size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Daerah</p>
                                            <p className="text-lg font-semibold text-gray-800">{program.daerah}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <FileText size={20} className="text-blue-600" />
                                        Deskripsi Program
                                    </h3>
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {program.isi}
                                        </p>
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
                                        <p className="text-sm text-gray-600">{formatDate(program.created_at)}</p>
                                    </div>
                                </div>

                                {program.updated_at !== program.created_at && (
                                    <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
                                        <div className="flex-shrink-0 w-3 h-3 bg-yellow-600 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-gray-800">Terakhir Diperbarui</p>
                                            <p className="text-sm text-gray-600">{formatDate(program.updated_at)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Image Card */}
                        {program.foto && (
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Image size={20} className="text-blue-600" />
                                    Foto Program
                                </h3>

                                <div className="relative group cursor-pointer" onClick={() => setShowImageModal(true)}>
                                    <img
                                        src={`/storage/${program.foto}`}
                                        alt={program.judul}
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
                        {!program.foto && (
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Image size={20} className="text-blue-600" />
                                    Foto Program
                                </h3>

                                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center">
                                    <EyeOff size={48} className="text-gray-400 mb-3" />
                                    <p className="text-gray-500 font-medium">Tidak ada foto</p>
                                    <p className="text-sm text-gray-400 mt-1">Program ini belum memiliki foto</p>
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
                                    Edit Program
                                </button>

                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="w-full py-3 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Trash2 size={18} />
                                    Hapus Program
                                </button>

                                <button
                                    onClick={() => router.get(route('programs.index'))}
                                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <ArrowLeft size={18} />
                                    Kembali ke Daftar
                                </button>
                            </div>
                        </div>

                        {/* Program Stats */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">ID Program</span>
                                    <span className="font-semibold text-gray-800">#{program.id}</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Panjang Deskripsi</span>
                                    <span className="font-semibold text-gray-800">{program.isi.length} karakter</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Status</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                                        {statusConfig.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Modal */}
                {showImageModal && program.foto && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
                        <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
                            <img
                                src={`/storage/${program.foto}`}
                                alt={program.judul}
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
                                Apakah Anda yakin ingin menghapus program <strong>"{program.judul}"</strong>?
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
