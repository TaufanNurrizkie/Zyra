import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, router } from "@inertiajs/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Edit3,
    Save,
    X,
    Upload,
    Image as ImageIcon,
    AlertCircle,
    CheckCircle,
    ArrowLeft,
    Eye,
    Calendar,
    User,
    FileText,
    Star,
    Type,
    BookOpen,
    Clock,
    Hash
} from "lucide-react";

export default function Edit({ berita }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);

    // Pastikan data berita yang diterima sudah sesuai
    console.log("Data berita yang diterima:", berita);

    // Konfigurasi React Quill
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
            ],
        },
        clipboard: {
            matchVisual: false,
        }
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'align',
        'link', 'image'
    ];

    // Inisialisasi form dengan data yang benar
    const { data, setData, post, errors, progress, processing } = useForm({
        title: berita?.title || "",
        excerpt: berita?.excerpt || "",
        content: berita?.content || "",
        author: berita?.author || "",
        date: berita?.date ? new Date(berita.date).toISOString().split('T')[0] : "",
        featured: berita?.featured || false,
        image: null,
    });

    // Set image preview saat komponen dimuat
    useEffect(() => {
        if (berita?.image) {
            setImagePreview(`/storage/${berita.image}`);
        }
    }, [berita]);

    // Hitung jumlah kata dan karakter
    useEffect(() => {
        const textContent = data.content.replace(/<[^>]*>/g, '');
        setWordCount(textContent.trim() ? textContent.trim().split(/\s+/).length : 0);
        setCharacterCount(textContent.length);
    }, [data.content]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('excerpt', data.excerpt);
        formData.append('content', data.content);
        formData.append('author', data.author);
        formData.append('date', data.date);
        formData.append('featured', data.featured ? '1' : '0');

        if (data.image) {
            formData.append('image', data.image);
        }

        post(route("berita.update", berita.id), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log('Update berhasil');
                setData('image', null);
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
            }
        });
    };

    const handleContentChange = (content) => {
        setData("content", content);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            if (berita.image) {
                setImagePreview(`/storage/${berita.image}`);
            } else {
                setImagePreview(null);
            }
        }
    };

    const removeImage = () => {
        setData("image", null);
        if (berita.image) {
            setImagePreview(`/storage/${berita.image}`);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => window.history.back()}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                                        <Edit3 size={32} className="text-blue-600" />
                                        Edit Berita
                                    </h1>
                                    <p className="text-gray-600 mt-1">Perbarui informasi berita yang sudah ada</p>
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-full border ${data.featured ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white border-amber-300' : 'bg-gray-100 text-gray-800 border-gray-200'} flex items-center gap-2 transition-all duration-300`}>
                                <Star size={16} className={data.featured ? "text-white" : "text-gray-500"} />
                                <span className="font-medium">{data.featured ? 'Featured' : 'Standard'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-6xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Main Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Basic Information Card */}
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                        <FileText size={24} className="text-blue-600" />
                                        Informasi Berita
                                    </h2>

                                    <div className="space-y-6">
                                        {/* Judul */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Type size={16} className="text-blue-500" />
                                                Judul Berita
                                            </label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData("title", e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                    errors.title
                                                        ? 'border-red-300 focus:border-red-500 ring-2 ring-red-100'
                                                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:ring-4 focus:ring-blue-100'
                                                } focus:outline-none`}
                                                placeholder="Masukkan judul berita yang menarik..."
                                                required
                                            />
                                            {errors.title && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.title}
                                                </p>
                                            )}
                                        </div>

                                        {/* Author & Date */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                    <User size={16} className="text-blue-500" />
                                                    Penulis
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.author}
                                                    onChange={(e) => setData("author", e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                        errors.author
                                                            ? 'border-red-300 focus:border-red-500 ring-2 ring-red-100'
                                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:ring-4 focus:ring-blue-100'
                                                    } focus:outline-none`}
                                                    placeholder="Nama penulis..."
                                                    required
                                                />
                                                {errors.author && (
                                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                        <AlertCircle size={14} />
                                                        {errors.author}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                    <Calendar size={16} className="text-blue-500" />
                                                    Tanggal Publikasi
                                                </label>
                                                <input
                                                    type="date"
                                                    value={data.date}
                                                    onChange={(e) => setData("date", e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                        errors.date
                                                            ? 'border-red-300 focus:border-red-500 ring-2 ring-red-100'
                                                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:ring-4 focus:ring-blue-100'
                                                    } focus:outline-none`}
                                                    required
                                                />
                                                {errors.date && (
                                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                        <AlertCircle size={14} />
                                                        {errors.date}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Excerpt */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Hash size={16} className="text-blue-500" />
                                                Ringkasan Berita
                                                <span className="text-xs text-gray-500 ml-2">(Max. 500 karakter)</span>
                                            </label>
                                            <textarea
                                                value={data.excerpt}
                                                onChange={(e) => setData("excerpt", e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                    errors.excerpt
                                                        ? 'border-red-300 focus:border-red-500 ring-2 ring-red-100'
                                                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:ring-4 focus:ring-blue-100'
                                                } focus:outline-none resize-none`}
                                                rows="3"
                                                placeholder="Tulis ringkasan berita yang menarik..."
                                                maxLength="500"
                                                required
                                            />
                                            <div className="flex justify-between items-center mt-2">
                                                {errors.excerpt ? (
                                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                                        <AlertCircle size={14} />
                                                        {errors.excerpt}
                                                    </p>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        {data.excerpt.length}/500 karakter
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content - React Quill Editor */}
                                        <div className="group">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <BookOpen size={16} className="text-blue-500" />
                                                    Konten Lengkap
                                                </label>
                                                <div className="text-xs text-gray-500 flex items-center gap-2">
                                                    <Clock size={12} />
                                                    {wordCount} kata • {characterCount} karakter
                                                </div>
                                            </div>
                                            <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-blue-300 transition-all duration-300">
                                                <ReactQuill
                                                    value={data.content}
                                                    onChange={handleContentChange}
                                                    modules={modules}
                                                    formats={formats}
                                                    placeholder="Tulis konten lengkap berita di sini..."
                                                    theme="snow"
                                                    className="h-96 mb-12"
                                                />
                                            </div>
                                            {errors.content && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Featured Card */}
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <Star size={20} className="text-amber-500" />
                                        Status Berita
                                    </h3>
                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={data.featured}
                                                onChange={(e) => setData("featured", e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${data.featured ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${data.featured ? 'transform translate-x-6' : ''} shadow-md`}></div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-800">Featured Berita</span>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {data.featured
                                                    ? "Berita ini akan ditampilkan sebagai berita utama"
                                                    : "Berita ini akan ditampilkan sebagai berita biasa"}
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Image Upload Card */}
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <ImageIcon size={20} className="text-blue-500" />
                                        Gambar Berita
                                    </h3>

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                                                {data.image ? (
                                                    <>
                                                        <CheckCircle size={14} className="text-green-500" />
                                                        <span className="text-green-600">Gambar Baru:</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye size={14} className="text-blue-500" />
                                                        Gambar Saat Ini:
                                                    </>
                                                )}
                                            </p>
                                            <div className="relative group">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className={`w-full h-48 object-cover rounded-xl border-2 cursor-pointer transition-transform duration-300 hover:scale-105 ${
                                                        data.image ? 'border-green-300' : 'border-gray-300'
                                                    }`}
                                                    onClick={() => setShowImageModal(true)}
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-xl transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <Eye size={24} className="text-white" />
                                                </div>
                                                {data.image && (
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* File Input */}
                                    <div className="space-y-2">
                                        <label className="block">
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                                                <Upload size={32} className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2 transition-colors duration-300" />
                                                <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                                                    {berita.image ? 'Ganti Gambar' : 'Upload Gambar'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    PNG, JPG, JPEG (Maks. 2MB)
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
                                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-blue-800">Mengupload...</span>
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

                                        {errors.image && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1 bg-red-50 p-2 rounded-lg">
                                                <AlertCircle size={14} />
                                                {errors.image}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                                            processing
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
                                        }`}
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                                Memperbarui...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Save size={20} />
                                                Perbarui Berita
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="w-full py-3 px-6 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400"
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
                {showImageModal && imagePreview && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
                        <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white">
                            <img
                                src={imagePreview}
                                alt="Gambar Berita"
                                className="w-full h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
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
