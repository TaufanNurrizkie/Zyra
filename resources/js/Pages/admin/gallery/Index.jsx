import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import { Trash2, Upload, Image as ImageIcon, Plus, Eye, Calendar } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function GalleryIndex({ galleries }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const { data, setData, post, reset, processing } = useForm({
    title: "",
    foto: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("admin.gallery.store"), {
      onSuccess: () => {
        reset();
        setPreviewImage(null);
        Swal.fire({
          title: "Berhasil!",
          text: "Foto berhasil diupload ke galeri",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
          background: "#ffffff",
          color: "#1f2937",
          customClass: {
            popup: "rounded-2xl shadow-lg",
          },
        });
      },
      onError: () => {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat mengupload foto",
          icon: "error",
          confirmButtonColor: "#dc2626",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            confirmButton: "rounded-xl px-6 py-2.5 font-medium",
          },
        });
      },
    });
  };

  const handleFileChange = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          title: "File Terlalu Besar!",
          text: "Ukuran file maksimal 10MB",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            confirmButton: "rounded-xl px-6 py-2.5 font-medium",
          },
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        Swal.fire({
          title: "Format File Tidak Valid!",
          text: "Harap pilih file gambar (JPG, PNG, GIF)",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            confirmButton: "rounded-xl px-6 py-2.5 font-medium",
          },
        });
        return;
      }

      setData("foto", file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Hapus Foto",
      html: `Apakah Anda yakin ingin menghapus foto <strong>"${item.title || "Tanpa Judul"}"</strong>?<br><small class="text-gray-500">Tindakan ini tidak dapat dibatalkan.</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl shadow-lg",
        confirmButton: "rounded-xl px-6 py-2.5 font-medium",
        cancelButton: "rounded-xl px-6 py-2.5 font-medium",
      },
      scrollbarPadding: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Menghapus...",
          text: "Mohon tunggu sebentar",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        router.delete(route("admin.gallery.destroy", item.id), {
          onSuccess: () => {
            Swal.fire({
              title: "Berhasil!",
              text: "Foto berhasil dihapus dari galeri",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              customClass: {
                popup: "rounded-2xl shadow-lg",
              },
            });
          },
          onError: () => {
            Swal.fire({
              title: "Gagal!",
              text: "Terjadi kesalahan saat menghapus foto",
              icon: "error",
              confirmButtonColor: "#dc2626",
              customClass: {
                popup: "rounded-2xl shadow-lg",
                confirmButton: "rounded-xl px-6 py-2.5 font-medium",
              },
            });
          },
        });
      }
    });
  };

  const handlePreview = (item) => {
    Swal.fire({
      title: item.title || "Preview Foto",
      imageUrl: `/storage/${item.foto}`,
      imageAlt: item.title || "Gallery Image",
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-2xl shadow-lg",
        image: "rounded-xl max-h-[80vh] object-contain",
      },
      background: "#ffffff",
      width: "auto",
      heightAuto: true,
    });
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-magenta-500 rounded-full flex items-center justify-center shadow-lg">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Gallery Manager</h1>
            </div>
            <p className="text-lg text-gray-600 font-medium">
              Kelola koleksi foto Anda dengan antarmuka yang modern dan intuitif
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-full transform transition-all duration-500 hover:shadow-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Upload Foto Baru</h2>
              </div>

              <form onSubmit={submit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Foto (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan judul foto..."
                    className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  />
                </div>

                {/* Drag & Drop Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Gambar
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-teal-400 bg-teal-50 animate-pulse"
                        : "border-gray-300 hover:border-teal-400 hover:bg-teal-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {previewImage ? (
                      <div className="space-y-4">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-40 h-40 object-cover rounded-2xl mx-auto shadow-md transition-transform duration-300 hover:scale-105"
                        />
                        <p className="text-sm text-gray-600 font-medium">Gambar siap diupload</p>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(null);
                            setData("foto", null);
                          }}
                          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                        >
                          Hapus gambar
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                          <Upload className="w-10 h-10 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-700 mb-1">
                            Seret dan lepas file di sini atau{" "}
                            <label className="text-teal-600 hover:text-teal-700 cursor-pointer font-semibold underline transition-colors">
                              pilih file
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange(e.target.files[0])}
                              />
                            </label>
                          </p>
                          <p className="text-sm text-gray-500">
                            Mendukung JPG, PNG, GIF hingga 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing || !data.foto}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 transform ${
                    processing || !data.foto
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-500 to-magenta-500 hover:from-teal-600 hover:to-magenta-600 hover:scale-105 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mengupload...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Foto
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Gallery Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Koleksi Foto ({galleries.length})
              </h2>
            </div>

            {galleries.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center transform transition-all duration-500">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-teal-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Foto</h3>
                <p className="text-lg text-gray-600 font-medium">
                  Upload foto pertama Anda untuk memulai galeri
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {galleries.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03]"
                    style={{ animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s both` }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={`/storage/${item.foto}`}
                        alt={item.title || "Gallery"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handlePreview(item)}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-teal-50 transition-all duration-200"
                            title="Lihat Preview"
                          >
                            <Eye className="w-5 h-5 text-teal-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-red-50 transition-all duration-200"
                            title="Hapus Foto"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                        {item.title || "Tanpa Judul"}
                      </h3>

                      {item.created_at && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <Calendar className="w-4 h-4 text-teal-500" />
                          {new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </AdminLayout>
  );
}