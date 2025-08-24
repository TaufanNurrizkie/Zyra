import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";

import CalculatorSection from "./CalculatorSection";
import {
    CreditCard,
    Wallet,
    Building,
    CheckCircle,
    Calculator,
    Briefcase,
    Gem,
    Store,
    Moon,
    Info,
    ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Index({ zakat }) {
    const { data, setData, post, reset, processing } = useForm({
        jenis: "",
        total: "",
    });

    const [selectedJenis, setSelectedJenis] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);

    const jenisZakatOptions = [
        {
            value: "maal",
            label: "Zakat Maal",
            desc: "Zakat harta kekayaan",
            detail: "Nisab zakat maal setara dengan 85 gram emas. Jumlah zakatnya 2,5% dari harta simpanan yang telah mencapai haul (1 tahun).",
            icon: <Gem className="w-6 h-6" />,
        },
        {
            value: "penghasilan",
            label: "Zakat Penghasilan",
            desc: "Zakat gaji/profesi",
            detail: "Nisab zakat penghasilan setara dengan 85 gram emas per tahun. Jumlah zakatnya 2,5% dari pendapatan bersih setiap bulan.",
            icon: <Briefcase className="w-6 h-6" />,
        },
        {
            value: "fitrah",
            label: "Zakat Fitrah",
            desc: "Zakat wajib saat Ramadan",
            detail: "Besaran zakat fitrah adalah 2,5 kg beras/makanan pokok setempat, atau setara Rp40.000 - Rp50.000 per orang.",
            icon: <Moon className="w-6 h-6" />,
        },
        {
            value: "perdagangan",
            label: "Zakat Perdagangan",
            desc: "Zakat usaha dagang",
            detail: "Zakat perdagangan wajib jika modal + keuntungan mencapai nisab (85 gram emas). Besarnya 2,5% dari nilai total harta usaha.",
            icon: <Store className="w-6 h-6" />,
        },
    ];

    const nominalSuggestions = [
        { amount: "50000", label: "Rp 50.000" },
        { amount: "100000", label: "Rp 100.000" },
        { amount: "250000", label: "Rp 250.000" },
        { amount: "500000", label: "Rp 500.000" },
        { amount: "1000000", label: "Rp 1.000.000" },
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route("zakat.store"), {
            onSuccess: () => {
                reset();
                setSelectedJenis("");
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 3000);
            },
        });
    };

    const formatRupiah = (amount) =>
        new Intl.NumberFormat("id-ID").format(amount);

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setData("total", value);
    };

    const handleCalculatorResult = (amount) => {
        setData("total", amount.toString());
        setShowCalculator(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            <Link
                href="/"
                className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 group"
                title="Kembali"
            >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-white group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" />
            </Link>

            <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex items-center justify-center mb-4">
                        <Calculator className="w-10 h-10 text-emerald-600 mr-2" />
                        <h1 className="text-3xl font-bold text-gray-800">
                            Pembayaran Zakat
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Pilih jenis zakat dan tunaikan kewajiban Anda dengan
                        mudah
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Toggle */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button
                        onClick={() => setShowCalculator(false)}
                        className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                            !showCalculator
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                                : "bg-white text-gray-600 hover:bg-emerald-50 shadow-md"
                        }`}
                    >
                        Bayar Zakat
                    </button>
                    <button
                        onClick={() => setShowCalculator(true)}
                        className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                            showCalculator
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                                : "bg-white text-gray-600 hover:bg-emerald-50 shadow-md"
                        }`}
                    >
                        Kalkulator Zakat
                    </button>
                </div>

                {/* Kalkulator */}
                {showCalculator && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <CalculatorSection
                            onCalculatorResult={handleCalculatorResult}
                        />
                    </motion.div>
                )}

                {/* Form Pembayaran */}
                {!showCalculator && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        <form onSubmit={submit} className="p-8 space-y-8">
                            {/* Jenis Zakat */}
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-6">
                                    Pilih Jenis Zakat
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {jenisZakatOptions.map((option) => (
                                        <motion.div
                                            key={option.value}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`cursor-pointer transition-all ${
                                                selectedJenis === option.value
                                                    ? "ring-2 ring-emerald-500 shadow-lg"
                                                    : "hover:shadow-md"
                                            }`}
                                            onClick={() => {
                                                setSelectedJenis(option.value);
                                                setData("jenis", option.label);
                                            }}
                                        >
                                            <div
                                                className={`p-6 rounded-xl border-2 ${
                                                    selectedJenis ===
                                                    option.value
                                                        ? "border-emerald-500 bg-emerald-50"
                                                        : "border-gray-200 bg-white hover:border-emerald-300"
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`p-3 rounded-xl ${
                                                            selectedJenis ===
                                                            option.value
                                                                ? "bg-emerald-100"
                                                                : "bg-gray-100"
                                                        }`}
                                                    >
                                                        {option.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-800 text-lg flex items-center justify-between">
                                                            {option.label}
                                                            <button
                                                                type="button"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    setSelectedInfo(
                                                                        option
                                                                    );
                                                                    setShowInfoModal(
                                                                        true
                                                                    );
                                                                }}
                                                                className="ml-2 text-emerald-600 hover:text-emerald-700"
                                                            >
                                                                <Info className="w-5 h-5" />
                                                            </button>
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            {option.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Nominal */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-lg font-bold text-gray-800">
                                        Nominal Zakat
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowCalculator(true)}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        <Calculator className="w-4 h-4" />{" "}
                                        Hitung
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-4">
                                    {nominalSuggestions.map((suggestion) => (
                                        <button
                                            key={suggestion.amount}
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    "total",
                                                    suggestion.amount
                                                )
                                            }
                                            className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                                data.total === suggestion.amount
                                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
                                            }`}
                                        >
                                            {suggestion.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-medium">
                                            Rp
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={
                                            data.total
                                                ? formatRupiah(data.total)
                                                : ""
                                        }
                                        onChange={handleAmountChange}
                                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                                        placeholder="Masukkan nominal"
                                    />
                                </div>
                            </div>

                            {/* Tombol Submit */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={
                                        !data.jenis || !data.total || processing
                                    }
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-400 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                                >
                                    {processing
                                        ? "Memproses..."
                                        : "Bayar Zakat Sekarang"}
                                </button>
                            </div>

                            {/* Metode Pembayaran */}
                            <div className="border-t pt-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">
                                    Metode Pembayaran
                                </h4>
                                <div className="flex justify-center gap-6 text-gray-600">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard className="w-5 h-5 text-blue-500" />{" "}
                                        Kartu Kredit
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Building className="w-5 h-5 text-green-500" />{" "}
                                        Transfer Bank
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Wallet className="w-5 h-5 text-purple-500" />{" "}
                                        E-Wallet
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </div>

            {/* Modal Success */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Pembayaran Berhasil!
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Terima kasih telah menunaikan zakat. Semoga
                                    menjadi amal jariyah yang berkah.
                                </p>
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all"
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Info Zakat */}
            <AnimatePresence>
                {showInfoModal && selectedInfo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-emerald-600" />
                                {selectedInfo.label}
                            </h3>
                            <p className="text-gray-700 mb-6">
                                {selectedInfo.detail}
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowInfoModal(false)}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all"
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
