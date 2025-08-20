import { useForm } from "@inertiajs/react";
import ChartSection from "@/Components/ChartSection";

export default function Index({ laporanDistribusi = [] }) {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Laporan Distribusi</h1>
        <a
          href={route("laporan.create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Tambah Data
        </a>
      </div>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Penerima</th>
              <th className="p-2 border">Alamat</th>
              <th className="p-2 border">Jenis Bantuan</th>
              <th className="p-2 border">Dana Keluar</th>
            </tr>
          </thead>
          <tbody>
            {laporanDistribusi.length > 0 ? (
              laporanDistribusi.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.tanggal}</td>
                  <td className="p-2 border">{item.penerima}</td>
                  <td className="p-2 border">{item.alamat}</td>
                  <td className="p-2 border">{item.jenis_bantuan}</td>
                  <td className="p-2 border">{item.dana_keluar}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500"
                >
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
