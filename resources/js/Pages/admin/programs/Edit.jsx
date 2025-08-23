import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, router } from "@inertiajs/react";
import {
    Edit3,
    Save,
    X,
    Upload,
    Image,
    AlertCircle,
    CheckCircle,
    ArrowLeft,
    Eye,
    Calendar,
    MapPin,
    Tag,
    FileText
} from "lucide-react";

export default function Edit({ program }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);

    const { data, setData, errors, progress, processing } = useForm({
        judul: program.judul || "",
        isi: program.isi || "",
        jenis: program.jenis || "",
        daerah: program.daerah || "",
        status: program.status || "segera",
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(route("programs.update", program.id), {
            _method: 'PUT',
            judul: data.judul,
            isi: data.isi,
            jenis: data.jenis,
            daerah: data.daerah,
            status: data.status,
            foto: data.foto,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setData('foto', null);
                setImagePreview(null);
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("foto", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            segera: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            berjalan: 'bg-blue-100 text-blue-800 border-blue-200',
            selesai: 'bg-green-100 text-green-800 border-green-200'
        };
        return colors[status] || colors.segera;
    };

    const getStatusIcon = (status) => {
        const icons = {
            segera: '⏳',
            berjalan: '🚀',
            selesai: '✅'
        };
        return icons[status] || icons.segera;
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => window.history.back()}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                                        <Edit3 size={32} className="text-blue-600" />
                                        Edit Program
                                    </h1>
                                    <p className="text-gray-600 mt-1">Perbarui informasi program yang sudah ada</p>
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-full border ${getStatusColor(program.status)} flex items-center gap-2`}>
                                <span>{getStatusIcon(program.status)}</span>
                                <span className="font-medium capitalize">{program.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Main Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Basic Information Card */}
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                        <FileText size={24} className="text-blue-600" />
                                        Informasi Dasar
                                    </h2>

                                    <div className="space-y-6">
                                        {/* Judul */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Tag size={16} />
                                                Judul Program
                                            </label>
                                            <input
                                                type="text"
                                                value={data.judul}
                                                onChange={(e) => setData("judul", e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                    errors.judul
                                                        ? 'border-red-300 focus:border-red-500'
                                                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                } focus:outline-none focus:ring-4 focus:ring-blue-100`}
                                                placeholder="Masukkan judul program..."
                                                required
                                            />
                                            {errors.judul && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.judul}
                                                </p>
                                            )}
                                        </div>

                                        {/* Jenis & Daerah */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                    <Tag size={16} />
                                                    Jenis Program
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.jenis}
                                                    onChange={(e) => setData("jenis", e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                        errors.jenis
                                                            ? 'border-red-300 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                    } focus:outline-none focus:ring-4 focus:ring-blue-100`}
                                                    placeholder="Pendidikan, Kesehatan, dll..."
                                                    required
                                                />
                                                {errors.jenis && (
                                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                        <AlertCircle size={14} />
                                                        {errors.jenis}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                    <MapPin size={16} />
                                                    Daerah
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.daerah}
                                                    onChange={(e) => setData("daerah", e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                        errors.daerah
                                                            ? 'border-red-300 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                    } focus:outline-none focus:ring-4 focus:ring-blue-100`}
                                                    placeholder="Lokasi pelaksanaan..."
                                                    required
                                                />
                                                {errors.daerah && (
                                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                        <AlertCircle size={14} />
                                                        {errors.daerah}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Isi */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <FileText size={16} />
                                                Deskripsi Program
                                            </label>
                                            <textarea
                                                value={data.isi}
                                                onChange={(e) => setData("isi", e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                    errors.isi
                                                        ? 'border-red-300 focus:border-red-500'
                                                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                } focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none`}
                                                rows="6"
                                                placeholder="Jelaskan detail program secara lengkap..."
                                                required
                                            />
                                            <div className="flex justify-between items-center mt-2">
                                                {errors.isi ? (
                                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                                        <AlertCircle size={14} />
                                                        {errors.isi}
                                                    </p>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        {data.isi.length} karakter
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Status Card */}
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <Calendar size={20} className="text-blue-600" />
                                        Status Program
                                    </h3>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData("status", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                    >
                                        <option value="segera">⏳ Segera Dimulai</option>
                                        <option value="berjalan">🚀 Sedang Berjalan</option>
                                        <option value="selesai">✅ Selesai</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* Image Upload Card */}
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <Image size={20} className="text-blue-600" />
                                        Foto Program
                                    </h3>

                                    {/* Current Image */}
                                    {program.foto && (
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-600 mb-2">Foto Saat Ini:</p>
                                            <div className="relative group">
                                                <img
                                                    src={`/storage/${program.foto}`}
                                                    alt="Foto Program"
                                                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 cursor-pointer transition-transform duration-300 hover:scale-105"
                                                    onClick={() => setShowImageModal(true)}
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-xl transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <Eye size={24} className="text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* New Image Preview */}
                                    {imagePreview && (
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-green-600 mb-2 flex items-center gap-1">
                                                <CheckCircle size={14} />
                                                Foto Baru:
                                            </p>
                                            <div className="relative group">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-xl border-2 border-green-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreview(null);
                                                        setData('foto', null);
                                                    }}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* File Input */}
                                    <div className="space-y-2">
                                        <label className="block">
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                                                <Upload size={32} className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2" />
                                                <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                                                    Klik untuk upload foto baru
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    JPG, JPEG, PNG (Maks. 2MB)
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                accept="image/jpeg,image/jpg,image/png"
                                            />
                                        </label>

                                        {progress && (
                                            <div className="bg-blue-50 rounded-xl p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-blue-800">Uploading...</span>
                                                    <span className="text-sm font-bold text-blue-800">{progress.percentage}%</span>
                                                </div>
                                                <div className="w-full bg-blue-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${progress.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        {errors.foto && (
                                            <p className="text-red-500 text-sm flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.foto}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                                            processing
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                                Updating...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Save size={20} />
                                                Update Program
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="w-full py-3 px-6 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <X size={20} />
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Image Modal */}
                {showImageModal && program.foto && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
                        <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
                            <img
                                src={`/storage/${program.foto}`}
                                alt="Foto Program"
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
            </div>
        </AdminLayout>
    );
}
