import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useState, useMemo } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        date: new Date().toISOString().split('T')[0],
        featured: false,
        status: "draft",
        image: null,
    });

    const [wordCount, setWordCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [imagePreview, setImagePreview] = useState(null);

    // Konfigurasi modul React Quill
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
                ['link', 'image', 'video'],
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
        'link', 'image', 'video'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("berita.store"));
    };

    const handleContentChange = (content) => {
        setData("content", content);

        // Hitung jumlah kata dan karakter
        const textContent = content.replace(/<[^>]*>/g, '');
        setWordCount(textContent.trim() ? textContent.trim().split(/\s+/).length : 0);
        setCharacterCount(textContent.length);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);

            // Buat preview gambar
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData("image", null);
        setImagePreview(null);
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Berita Baru</h1>
                            <p className="text-gray-600">Isi informasi berita dengan lengkap dan akurat</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Berita</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Masukkan judul berita yang menarik"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ringkasan (Excerpt)
                                    <span className="text-xs text-gray-500 ml-2">(Max. 200 karakter)</span>
                                </label>
                                <textarea
                                    value={data.excerpt}
                                    onChange={(e) => setData("excerpt", e.target.value)}
                                    rows={3}
                                    maxLength={200}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Tulis ringkasan singkat tentang berita (akan ditampilkan di halaman daftar berita)"
                                />
                                <div className="text-xs text-gray-500 mt-1 text-right">
                                    {data.excerpt.length}/200 karakter
                                </div>
                                {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                            </div>

                            {/* Content - React Quill Editor */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Konten Lengkap</label>
                                    <div className="text-xs text-gray-500">
                                        {wordCount} kata • {characterCount} karakter
                                    </div>
                                </div>
                                <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
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
                                <div className="text-xs text-gray-500 mt-2">
                                    Tips: Gunakan heading untuk struktur konten, tambahkan media dengan toolbar, dan format teks untuk keterbacaan yang lebih baik.
                                </div>
                                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Author */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                                    <input
                                        type="text"
                                        value={data.author}
                                        onChange={(e) => setData("author", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="Nama penulis"
                                    />
                                    {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Publikasi</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData("status", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    >
                                        <option value="draft">Draft (Disimpan sebagai draf)</option>
                                        <option value="published">Published (Tayangkan sekarang)</option>
                                        <option value="archived">Archived (Arsipkan)</option>
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>

                                {/* Featured Checkbox */}
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="flex items-center h-full">
                                        <input
                                            type="checkbox"
                                            id="featured"
                                            checked={data.featured}
                                            onChange={(e) => setData("featured", e.target.checked)}
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="featured" className="ml-3 block text-sm font-medium text-gray-700">
                                            Jadikan sebagai berita featured
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {errors.featured && <p className="mt-1 text-sm text-red-600">{errors.featured}</p>}

                            {/* Image Upload dengan Preview */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Utama Berita</label>

                                {imagePreview ? (
                                    <div className="relative">
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    {data.image.name} • {Math.round(data.image.size / 1024)} KB
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Hapus Gambar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 2MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                )}
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                                >
                                    Batal
                                </button>
                                <div className="flex-1 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData("status", "draft");
                                            setTimeout(() => {
                                                document.querySelector('button[type="submit"]').click();
                                            }, 100);
                                        }}
                                        disabled={processing}
                                        className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200 font-medium"
                                    >
                                        Simpan sebagai Draft
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 font-medium flex items-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Menyimpan...
                                            </>
                                        ) : (
                                            "Publikasikan Sekarang"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
