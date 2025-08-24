import React, { useRef, useState, useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm, router } from "@inertiajs/react";
import MapMustahik from "@/Components/MapMustahik";
import Swal from 'sweetalert2';

export default function Index({ mustahik = [], }) {
  const fileInputRef = useRef(null);
  const { delete: destroy } = useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Max 5 items per page

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [golonganFilter, setGolonganFilter] = useState("all");
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");

  // Get unique golongan values for filter dropdown
  const uniqueGolongan = useMemo(() => {
    const golongans = mustahik.map(m => m.golongan).filter(Boolean);
    return [...new Set(golongans)];
  }, [mustahik]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = mustahik.filter(m => {
      const matchesSearch = searchTerm === "" || 
        m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.kontak.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || m.status === statusFilter;
      const matchesGolongan = golonganFilter === "all" || m.golongan === golonganFilter;
      
      return matchesSearch && matchesStatus && matchesGolongan;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortBy] || "";
      let bValue = b[sortBy] || "";
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [mustahik, searchTerm, statusFilter, golonganFilter, sortBy, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, golonganFilter, sortBy, sortOrder]);

  const handleImportClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show loading alert
    Swal.fire({
      title: 'Mengimport Data...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const formData = new FormData();
    formData.append("file", file);

    router.post("/mustahik/import", formData, {
      forceFormData: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Import Berhasil!',
          text: 'Data mustahik berhasil diimport ke sistem',
          showConfirmButton: true,
          confirmButtonColor: '#10B981',
          timer: 3000
        });
      },
      onError: (errors) => {
        Swal.fire({
          icon: 'error',
          title: 'Import Gagal!',
          text: 'Terjadi kesalahan saat mengimport data. Pastikan format file sudah benar.',
          showConfirmButton: true,
          confirmButtonColor: '#EF4444'
        });
      },
    });

    e.target.value = "";
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus data mustahik ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading
        Swal.fire({
          title: 'Menghapus Data...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        destroy(`/mustahik/${id}`, {
          onSuccess: () => {
            Swal.fire({
              icon: 'success',
              title: 'Data Terhapus!',
              text: 'Data mustahik berhasil dihapus dari sistem',
              showConfirmButton: true,
              confirmButtonColor: '#10B981',
              timer: 2000
            });
          },
          onError: () => {
            Swal.fire({
              icon: 'error',
              title: 'Gagal Menghapus!',
              text: 'Terjadi kesalahan saat menghapus data',
              showConfirmButton: true,
              confirmButtonColor: '#EF4444'
            });
          }
        });
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    Swal.fire({
      title: 'Reset Semua Filter?',
      text: 'Filter pencarian, status, golongan, dan pengurutan akan dikembalikan ke default',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Reset!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setSearchTerm("");
        setStatusFilter("all");
        setGolonganFilter("all");
        setSortBy("nama");
        setSortOrder("asc");
        
        Swal.fire({
          icon: 'success',
          title: 'Filter Direset!',
          text: 'Semua filter berhasil dikembalikan ke pengaturan default',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const exportToCSV = () => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Export Data ke CSV',
      text: `Apakah Anda ingin mengexport ${filteredAndSortedData.length} data mustahik?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8B5CF6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Export!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const headers = ["Nama", "Alamat", "Golongan", "Kontak", "Range Gaji", "Status"];
          const csvData = filteredAndSortedData.map(m => [
            m.nama,
            m.alamat,
            m.golongan,
            m.kontak,
            m.rangeGaji,
            m.status === "sudah_dibantu" ? "Sudah Dibantu" : "Belum Dibantu"
          ]);
          
          const csvContent = [headers, ...csvData]
            .map(row => row.map(field => `"${field}"`).join(","))
            .join("\n");
          
          const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", `mustahik-data-${new Date().toISOString().split('T')[0]}.csv`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Export Berhasil!',
            text: `${filteredAndSortedData.length} data berhasil diexport ke file CSV`,
            showConfirmButton: true,
            confirmButtonColor: '#8B5CF6',
            timer: 3000
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Export Gagal!',
            text: 'Terjadi kesalahan saat mengexport data',
            showConfirmButton: true,
            confirmButtonColor: '#EF4444'
          });
        }
      }
    });
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
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedData.length)}
          </span>
          <span className="block md:inline md:ml-1">
            of {filteredAndSortedData.length} entries
          </span>
          {filteredAndSortedData.length !== mustahik.length && (
            <span className="block md:inline md:ml-1 text-blue-600">
              (filtered from {mustahik.length} total)
            </span>
          )}
        </div>
      </div>
    );
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) {
      return (
        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      );
    }
    return (
      <svg className={`w-4 h-4 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <AdminLayout>
      <MapMustahik mustahik={mustahik} />

      <div className="p-4 bg-gray-50 min-h-screen">
        {/* Header Container */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Data Mustahik</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-full mr-2"></div>
                <span>Sudah Dibantu: {mustahik.filter(m => m.status === 'sudah_dibantu').length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-full mr-2"></div>
                <span>Belum Dibantu: {mustahik.filter(m => m.status !== 'sudah_dibantu').length}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
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

            <button
              onClick={exportToCSV}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
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

          {/* Filters */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cari</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari nama, alamat, atau kontak..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="sudah_dibantu">Sudah Dibantu</option>
                  <option value="belum_dibantu">Belum Dibantu</option>
                </select>
              </div>

              {/* Golongan Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Golongan</label>
                <select
                  value={golonganFilter}
                  onChange={(e) => setGolonganFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Semua Golongan</option>
                  {uniqueGolongan.map(golongan => (
                    <option key={golongan} value={golongan}>{golongan}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="nama">Nama</option>
                    <option value="alamat">Alamat</option>
                    <option value="golongan">Golongan</option>
                    <option value="status">Status</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Summary and Clear */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Menampilkan {filteredAndSortedData.length} dari {mustahik.length} data
              </div>
              {(searchTerm || statusFilter !== 'all' || golonganFilter !== 'all' || sortBy !== 'nama' || sortOrder !== 'asc') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Data Container */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {filteredAndSortedData.length ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('nama')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Nama</span>
                            <SortIcon field="nama" />
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('alamat')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Alamat</span>
                            <SortIcon field="alamat" />
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('golongan')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Golongan</span>
                            <SortIcon field="golongan" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kontak
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Range Gaji
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <SortIcon field="status" />
                          </div>
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
                              {m.status === "sudah_dibantu" ? "Sudah Dibantu" : "Belum Dibantu"}
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {mustahik.length === 0 ? "Belum ada data mustahik" : "Tidak ada data yang sesuai filter"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {mustahik.length === 0 
                  ? "Mulai dengan menambahkan data mustahik baru." 
                  : "Coba ubah filter pencarian Anda."
                }
              </p>
              <div className="mt-6">
                {mustahik.length === 0 ? (
                  <Link
                    href="/mustahik/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Mustahik
                  </Link>
                ) : (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}