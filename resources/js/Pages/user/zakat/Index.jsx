import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Index({ zakat }) {
    const [activeTab, setActiveTab] = useState("bayar"); // default "bayar zakat"
    const [calcTab, setCalcTab] = useState("maal"); // default kalkulator "maal"

    const { data, setData, post, reset } = useForm({
        jenis: "",
        total: "",
    });

    // state untuk kalkulator maal
    const [emas, setEmas] = useState("");
    const [tabungan, setTabungan] = useState("");
    const [aset, setAset] = useState("");
    const [hutang, setHutang] = useState("");
    const [hasilMaal, setHasilMaal] = useState(null);

    // --- State Zakat Penghasilan ---
    const [gaji, setGaji] = useState("");
    const [bonus, setBonus] = useState("");
    const [hasilPenghasilan, setHasilPenghasilan] = useState(null);
    // Statae Tanya Ai
    const [pertanyaan, setPertanyaan] = useState("");
    const [jawabanAI, setJawabanAI] = useState("");

    const submit = (e) => {
        e.preventDefault();
        post(route("zakat.store"), {
            onSuccess: () => reset(),
        });
    };

    const hitungZakatMaal = (e) => {
        e.preventDefault();
        const totalHarta =
            (parseInt(emas || 0) +
                parseInt(tabungan || 0) +
                parseInt(aset || 0)) -
            parseInt(hutang || 0);

        const nisab = 165835000;
        if (totalHarta < nisab) {
            setHasilMaal("Anda tidak wajib membayar zakat maal");
        } else {
            const zakat = totalHarta * 0.025;
            setHasilMaal(
                `Total harta: Rp ${totalHarta.toLocaleString()} \nZakat maal (2.5%): Rp ${zakat.toLocaleString()}`
            );
        }
    };

    const hitungZakatPenghasilan = (e) => {
        e.preventDefault();
        const totalPenghasilan = parseInt(gaji || 0) + parseInt(bonus || 0);
        const nisabBulanan = Math.floor(165835000 / 12); // 13.819.583

        if (totalPenghasilan < nisabBulanan) {
            setHasilPenghasilan("Anda tidak wajib membayar zakat penghasilan");
        } else {
            const zakat = totalPenghasilan * 0.025;
            setHasilPenghasilan(
                `Total penghasilan: Rp ${totalPenghasilan.toLocaleString()} \nZakat penghasilan (2.5%): Rp ${zakat.toLocaleString()}`
            );
        }
    };

    // handler submit
    const kirimPertanyaan = async (e) => {
        e.preventDefault();
        setJawabanAI("Memproses...");

        try {
            const res = await fetch(route("tanya.ai"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({ pertanyaan }),
            });

            const ct = res.headers.get("content-type") || "";

            if (!res.ok) {
                let errorMsg = "";
                if (ct.includes("application/json")) {
                    const errJson = await res.json();
                    errorMsg = errJson.message ?? JSON.stringify(errJson);
                } else {
                    errorMsg = await res.text();
                }
                setJawabanAI(`Error ${res.status}: ${errorMsg}`);
                return;
            }

            const data = await res.json(); // ✅ hanya sekali
            setJawabanAI(data.jawaban || "Tidak ada jawaban dari AI.");
        } catch (err) {
            setJawabanAI(`Network error: ${err?.message || err}`);
        }
    };

    return (
        <UserLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                            Portal Zakat Digital
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Bayar zakat, hitung kewajiban, dan konsultasi dengan AI
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-8 p-1 bg-white rounded-xl shadow-sm">
                        <button
                            onClick={() => setActiveTab("bayar")}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                                activeTab === "bayar"
                                    ? "bg-green-600 text-white shadow-md transform scale-105"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                        >
                            💰 Bayar Zakat
                        </button>

                        <button
                            onClick={() => setActiveTab("kalkulator")}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                                activeTab === "kalkulator"
                                    ? "bg-green-600 text-white shadow-md transform scale-105"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                        >
                            🧮 Kalkulator Zakat
                        </button>

                        <button
                            onClick={() => setActiveTab("tanya")}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                                activeTab === "tanya"
                                    ? "bg-green-600 text-white shadow-md transform scale-105"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                        >
                            🤖 Tanya AI
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6">
                        {/* Bayar Zakat Tab */}
                        {activeTab === "bayar" && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                        💰 Pembayaran Zakat
                                    </h2>
                                    <p className="text-green-100 text-sm sm:text-base">
                                        Lakukan pembayaran zakat dengan mudah dan aman
                                    </p>
                                </div>

                                <form onSubmit={submit} className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Jenis Zakat
                                            </label>
                                            <input
                                                type="text"
                                                value={data.jenis}
                                                onChange={(e) => setData("jenis", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Contoh: Zakat Maal, Zakat Penghasilan"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nominal (Rp)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.total}
                                                onChange={(e) => setData("total", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Masukkan jumlah nominal"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        Bayar Zakat Sekarang
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Kalkulator Tab */}
                        {activeTab === "kalkulator" && (
                            <div className="space-y-6">
                                {/* Usage Instructions */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                                        📋 Tata Cara Penggunaan Kalkulator
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-blue-700">
                                        <div className="space-y-2">
                                            <h4 className="font-medium">Zakat Maal:</h4>
                                            <ul className="space-y-1 ml-4">
                                                <li>• Masukkan nilai semua aset (emas, tabungan, properti)</li>
                                                <li>• Input hutang yang masih harus dibayar</li>
                                                <li>• Nisab saat ini: Rp 165.835.000</li>
                                                <li>• Zakat wajib jika harta ≥ nisab selama 1 tahun</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-medium">Zakat Penghasilan:</h4>
                                            <ul className="space-y-1 ml-4">
                                                <li>• Input gaji pokok per bulan</li>
                                                <li>• Tambahkan bonus/THR jika ada</li>
                                                <li>• Nisab bulanan: Rp 13.819.583</li>
                                                <li>• Zakat 2.5% dari penghasilan bersih</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Calculator Main Content */}
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                            🧮 Kalkulator Zakat
                                        </h2>
                                        <p className="text-blue-100 text-sm sm:text-base">
                                            Hitung kewajiban zakat Anda dengan akurat
                                        </p>
                                    </div>

                                    {/* Sub Tabs */}
                                    <div className="p-4 sm:p-6 border-b border-gray-200">
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                            <button
                                                onClick={() => setCalcTab("maal")}
                                                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                                                    calcTab === "maal"
                                                        ? "bg-blue-600 text-white shadow-md"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                            >
                                                💎 Zakat Maal
                                            </button>
                                            <button
                                                onClick={() => setCalcTab("penghasilan")}
                                                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                                                    calcTab === "penghasilan"
                                                        ? "bg-blue-600 text-white shadow-md"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                            >
                                                💼 Zakat Penghasilan
                                            </button>
                                        </div>
                                    </div>

                                    {/* Zakat Maal Calculator */}
                                    {calcTab === "maal" && (
                                        <div className="p-4 sm:p-6">
                                            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <h4 className="font-medium text-yellow-800 mb-2">ℹ️ Informasi Zakat Maal</h4>
                                                <p className="text-sm text-yellow-700">
                                                    Zakat maal dihitung dari total harta yang telah mencapai nisab (Rp 165.835.000)
                                                    dan telah dimiliki selama satu tahun penuh (haul).
                                                </p>
                                            </div>

                                            <form onSubmit={hitungZakatMaal} className="space-y-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            💎 Nilai Emas/Perak/Permata (Rp)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={emas}
                                                            onChange={(e) => setEmas(e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="0"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            💰 Uang Tunai/Tabungan/Deposito (Rp)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={tabungan}
                                                            onChange={(e) => setTabungan(e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="0"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            🏠 Kendaraan/Rumah/Aset Lain (Rp)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={aset}
                                                            onChange={(e) => setAset(e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="0"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            📉 Hutang (Rp)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={hutang}
                                                            onChange={(e) => setHutang(e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                                >
                                                    🧮 Hitung Zakat Maal
                                                </button>

                                                {hasilMaal && (
                                                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl">
                                                        <h3 className="font-semibold text-green-800 mb-3 text-lg">
                                                            📊 Hasil Perhitungan:
                                                        </h3>
                                                        <div className="text-green-700 whitespace-pre-line font-medium">
                                                            {hasilMaal}
                                                        </div>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    )}

                                    {/* Zakat Penghasilan Calculator */}
                                    {calcTab === "penghasilan" && (
                                        <div className="p-4 sm:p-6">
                                            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <h4 className="font-medium text-yellow-800 mb-2">ℹ️ Informasi Zakat Penghasilan</h4>
                                                <p className="text-sm text-yellow-700">
                                                    Zakat penghasilan wajib dibayar setiap bulan jika penghasilan
                                                    mencapai nisab bulanan (Rp 13.819.583). Rate zakat 2.5%.
                                                </p>
                                            </div>

                                            <form onSubmit={hitungZakatPenghasilan} className="space-y-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            💼 Penghasilan Per Bulan (Rp)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={gaji}
                                                            onChange={(e) => setGaji(e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="Gaji pokok per bulan"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            🎁 Bonus / THR / Insentif (Rp)
                                                            <span className="text-gray-500">(Opsional)</span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={bonus}
                                                            onChange={(e) => setBonus(e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="Bonus tambahan"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                                >
                                                    🧮 Hitung Zakat Penghasilan
                                                </button>

                                                {hasilPenghasilan && (
                                                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl">
                                                        <h3 className="font-semibold text-green-800 mb-3 text-lg">
                                                            📊 Hasil Perhitungan:
                                                        </h3>
                                                        <div className="text-green-700 whitespace-pre-line font-medium">
                                                            {hasilPenghasilan}
                                                        </div>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tanya AI Tab */}
                        {activeTab === "tanya" && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                        🤖 Tanya AI Seputar Zakat
                                    </h2>
                                    <p className="text-purple-100 text-sm sm:text-base">
                                        Konsultasi dengan AI untuk pertanyaan seputar zakat
                                    </p>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                        <h4 className="font-medium text-purple-800 mb-2">💡 Contoh Pertanyaan:</h4>
                                        <div className="text-sm text-purple-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <div>• "Kapan zakat fitrah dibayar?"</div>
                                            <div>• "Berapa nisab zakat emas?"</div>
                                            <div>• "Bagaimana menghitung zakat profesi?"</div>
                                            <div>• "Apa perbedaan zakat maal dan fitrah?"</div>
                                        </div>
                                    </div>

                                    <form onSubmit={kirimPertanyaan} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Pertanyaan Anda
                                            </label>
                                            <textarea
                                                value={pertanyaan}
                                                onChange={(e) => setPertanyaan(e.target.value)}
                                                placeholder="Tulis pertanyaan tentang zakat di sini... Contoh: Bagaimana cara menghitung zakat emas?"
                                                className="w-full border border-gray-300 rounded-lg p-4 h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!pertanyaan.trim()}
                                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
                                        >
                                            🚀 Kirim Pertanyaan
                                        </button>
                                    </form>

                                    {jawabanAI && (
                                        <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                                            <h3 className="font-semibold text-gray-800 mb-3 text-lg flex items-center">
                                                🤖 Jawaban AI:
                                            </h3>
                                            <div className="text-gray-700 leading-relaxed">
                                                {jawabanAI === "Memproses..." ? (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                                                        <span className="text-purple-600">Memproses...</span>
                                                    </div>
                                                ) : (
                                                    <p className="whitespace-pre-wrap">{jawabanAI}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
                        <p>Perhitungan berdasarkan standar zakat Indonesia. Konsultasikan dengan ustadz untuk kepastian.</p>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
