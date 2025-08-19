import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const data = [
  { nama: "Ahmad", kategori: "Fakir", bantuan: "Sembako" },
  { nama: "Siti", kategori: "Miskin", bantuan: "Uang Tunai" },
  { nama: "Budi", kategori: "Gharim", bantuan: "Pembayaran Hutang" },
];

export default function MustahikTable() {
  const rowRefs = useRef([]);

  useEffect(() => {
    gsap.from(rowRefs.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">📋 Daftar Mustahik Terbaru</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-left">Bantuan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m, i) => (
            <tr
              key={i}
              ref={(el) => (rowRefs.current[i] = el)}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{m.nama}</td>
              <td className="p-3">{m.kategori}</td>
              <td className="p-3">{m.bantuan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
