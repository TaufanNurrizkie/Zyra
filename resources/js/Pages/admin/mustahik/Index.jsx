import React, { useRef, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm, router } from "@inertiajs/react";
import MapMustahik from "@/Components/MapMustahik";

export default function Index({ mustahik = [], }) {
  const fileInputRef = useRef(null);
  const { delete: destroy } = useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Max 5 items per page

  // Calculate pagination
  const totalPages = Math.ceil(mustahik.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mustahik.slice(startIndex, endIndex);

  const handleImportClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    router.post("/mustahik/import", formData, {
      forceFormData: true,
      onSuccess: () => {
        alert("Import berhasil!");
      },
    });

    e.target.value = "";
  };

  const handleDelete = (id) => {
    if (confirm("Yakin hapus data ini?")) {
      destroy(`/mustahik/${id}`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = window.innerWidth < 768 ? 3 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-1.5 mx-0.5 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 text-xs md:px-3 md:py-2 md:mx-1 md:text-sm"
        >
          <span className="hidden md:inline">Previous</span>
          <span className="md:hidden">‹</span>
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1.5 mx-0.5 border rounded-md text-xs md:px-3 md:py-2 md:mx-1 md:text-sm ${
            currentPage === i
              ? "bg-blue-600 text-white border-blue-600"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-1.5 mx-0.5 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 text-xs md:px-3 md:py-2 md:mx-1 md:text-sm"
        >
          <span className="hidden md:inline">Next</span>
          <span className="md:hidden">›</span>
        </button>
      );
    }

    return (

      <div className="flex flex-col md:flex-row justify-center md:items-center mt-6 space-y-3 md:space-y-0">
        <div className="flex items-center justify-center">
          {pages}
        </div>
        <div className="text-center md:ml-4 text-xs md:text-sm text-gray-600">
          <span className="block md:inline">
            Showing {startIndex + 1}-{Math.min(endIndex, mustahik.length)}
          </span>
          <span className="block md:inline md:ml-1">
            of {mustahik.length} entries
          </span>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <MapMustahik mustahik={mustahik} />

      <div className="p-4 bg-gray-50 min-h-screen">
        {/* Header Container */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Data Mustahik</h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={handleImportClick}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import Excel
            </button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />

            <Link
              href="/mustahik/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Mustahik
            </Link>
          </div>
        </div>

        {/* Data Container */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {mustahik.length ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Alamat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          golongan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kontak
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Range Gaji
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentData.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{m.nama}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{m.alamat}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{m.golongan}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{m.kontak}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{m.rangeGaji}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                m.status === "sudah_dibantu"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {m.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Link
                                href={`/mustahik/${m.id}/edit`}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(m.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                              >
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

              {/* Mobile Table View - Responsive dan tanpa scroll */}
              <div className="lg:hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Nama
                        </th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Info
                        </th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentData.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-50">
                          <td className="px-2 py-3">
                            <div className="text-xs font-medium text-gray-900 leading-tight">
                              {m.nama}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {m.golongan}
                            </div>
                          </td>
                          <td className="px-2 py-3">
                            <div className="text-xs text-gray-900 leading-tight">
                              <div className="truncate max-w-24">{m.alamat}</div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {m.kontak}
                            </div>
                            <div className="text-xs text-gray-500">
                              {m.rangeGaji}
                            </div>
                          </td>
                          <td className="px-2 py-3">
                            <span
                              className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded ${
                                m.status === "sudah_dibantu"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {m.status === "sudah_dibantu" ? "Sudah" : "Belum"}
                            </span>
                          </td>
                          <td className="px-2 py-3">
                            <div className="flex flex-col space-y-1">
                              <Link
                                href={`/mustahik/${m.id}/edit`}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs text-center transition-colors"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(m.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
                              >
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

              {/* Pagination */}
              {renderPagination()}
            </>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada data mustahik</h3>
              <p className="mt-1 text-sm text-gray-500">Mulai dengan menambahkan data mustahik baru.</p>
              <div className="mt-6">
                <Link
                  href="/mustahik/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Mustahik
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
