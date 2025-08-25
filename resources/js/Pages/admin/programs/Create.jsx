import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        isi: "",
        jenis: "",
        daerah: "",
        foto: null,
        status: "segera",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("programs.store"));
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                            <h1 className="text-3xl font-bold text-gray-900">Tambah Program Baru</h1>
                        </div>
                        <p className="text-gray-600 ml-5">Lengkapi informasi program yang akan ditambahkan ke dalam sistem</p>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border border-white/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Detail Program
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {/* Form Grid Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Judul */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            Judul Program
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.judul}
                                                onChange={(e) => setData("judul", e.target.value)}
                                                className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl shadow-sm bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 ${
                                                    errors.judul
                                                        ? "border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400"
                                                        : "border-gray-200 group-hover:border-gray-300"
                                                }`}
                                                placeholder="Masukkan judul program yang menarik"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.judul && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                {errors.judul}
                                            </p>
                                        )}
                                    </div>

                                    {/* Jenis */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                            </svg>
                                            Jenis Program
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.jenis}
                                                onChange={(e) => setData("jenis", e.target.value)}
                                                className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl shadow-sm bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 ${
                                                    errors.jenis
                                                        ? "border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400"
                                                        : "border-gray-200 group-hover:border-gray-300"
                                                }`}
                                                placeholder="Contoh: Pendidikan, Kesehatan, Sosial"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.jenis && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                {errors.jenis}
                                            </p>
                                        )}
                                    </div>

                                    {/* Daerah */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            Daerah Pelaksanaan
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.daerah}
                                                onChange={(e) => setData("daerah", e.target.value)}
                                                className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl shadow-sm bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 ${
                                                    errors.daerah
                                                        ? "border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400"
                                                        : "border-gray-200 group-hover:border-gray-300"
                                                }`}
                                                placeholder="Masukkan lokasi atau wilayah"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.daerah && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                {errors.daerah}
                                            </p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Status Program
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.status}
                                                onChange={(e) => setData("status", e.target.value)}
                                                className="w-full px-4 py-4 pl-12 border-2 rounded-2xl shadow-sm bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 border-gray-200 group-hover:border-gray-300 appearance-none"
                                            >
                                                <option value="segera"> Segera Dimulai</option>
                                                <option value="berjalan"> Sedang Berjalan</option>
                                                <option value="selesai"> Selesai</option>
                                            </select>
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.status && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                {errors.status}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Isi Deskripsi */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                                            </svg>
                                            Deskripsi Program
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                rows={8}
                                                value={data.isi}
                                                onChange={(e) => setData("isi", e.target.value)}
                                                className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl shadow-sm bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none ${
                                                    errors.isi
                                                        ? "border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400"
                                                        : "border-gray-200 group-hover:border-gray-300"
                                                }`}
                                                placeholder="Tuliskan deskripsi lengkap program, tujuan, manfaat, dan target yang ingin dicapai..."
                                            />
                                            <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.isi && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                {errors.isi}
                                            </p>
                                        )}
                                    </div>

                                    {/* Upload Foto */}
                                    <div className="group">
                                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            Upload Foto Program
                                        </label>
                                        <div className="relative">
                                            <label className="group/upload cursor-pointer block">
                                                <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-all duration-300 group-hover/upload:scale-[1.02]">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover/upload:bg-blue-200 transition-colors">
                                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 010 10h-1M7 16v4m0 0l4-4m-4 4l-4-4"></path>
                                                            </svg>
                                                        </div>
                                                        <p className="mb-2 text-sm text-gray-600 font-medium">
                                                            <span className="text-blue-600 font-semibold">Klik untuk upload foto</span> atau drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            PNG, JPG, JPEG (maksimal 2MB)
                                                        </p>
                                                    </div>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => setData("foto", e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                        {errors.foto && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                {errors.foto}
                                            </p>
                                        )}
                                        {data.foto && (
                                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                                                <p className="text-sm text-green-700 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                    File terpilih: {data.foto.name}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="border-t border-gray-200 pt-8 mt-8">
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Menyimpan Program...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Simpan Program
                                            </>
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