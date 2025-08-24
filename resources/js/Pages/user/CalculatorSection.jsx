import React, { useState, useEffect } from 'react';
import { Calculator, Coins, TrendingUp, Home, Car, Wheat } from 'lucide-react';

const ZakatCalculator = () => {
  const [activeTab, setActiveTab] = useState('mal');
  const [zakatType, setZakatType] = useState('emas');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Nisab values (in IDR)
  const nisab = {
    emas: 85 * 1300000, // 85 gram * harga emas per gram (estimasi)
    perak: 595 * 15000, // 595 gram * harga perak per gram (estimasi)
    uang: 85 * 1300000, // sama dengan nisab emas
    perdagangan: 85 * 1300000,
    pertanian: 653, // kg gabah/beras
    peternakan: {
      kambing: 40,
      sapi: 30,
      unta: 5
    }
  };

  const zakatTypes = {
    mal: [
      { id: 'emas', name: 'Emas', icon: Coins, desc: 'Zakat emas dan perhiasan' },
      { id: 'perak', name: 'Perak', icon: Coins, desc: 'Zakat perak' },
      { id: 'uang', name: 'Uang/Tabungan', icon: TrendingUp, desc: 'Zakat uang tunai dan tabungan' },
      { id: 'perdagangan', name: 'Perdagangan', icon: TrendingUp, desc: 'Zakat perdagangan dan investasi' }
    ],
    pertanian: [
      { id: 'padi', name: 'Padi/Beras', icon: Wheat, desc: 'Zakat hasil padi dan beras' },
      { id: 'jagung', name: 'Jagung', icon: Wheat, desc: 'Zakat hasil jagung' },
      { id: 'buah', name: 'Buah-buahan', icon: Wheat, desc: 'Zakat hasil buah-buahan' }
    ],
    peternakan: [
      { id: 'kambing', name: 'Kambing/Domba', icon: Home, desc: 'Zakat ternak kambing dan domba' },
      { id: 'sapi', name: 'Sapi/Kerbau', icon: Home, desc: 'Zakat ternak sapi dan kerbau' },
      { id: 'unta', name: 'Unta', icon: Home, desc: 'Zakat ternak unta' }
    ]
  };

  const calculateZakat = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    let zakatAmount = 0;
    let isWajib = false;
    let nisabValue = 0;

    switch (activeTab) {
      case 'mal':
        nisabValue = nisab[zakatType];
        isWajib = numAmount >= nisabValue;
        if (isWajib) {
          zakatAmount = numAmount * 0.025; // 2.5%
        }
        break;
      
      case 'pertanian':
        nisabValue = nisab.pertanian;
        isWajib = numAmount >= nisabValue;
        if (isWajib) {
          // Asumsi pengairan alami (10%), jika buatan (5%)
          zakatAmount = numAmount * 0.1;
        }
        break;
      
      case 'peternakan':
        nisabValue = nisab.peternakan[zakatType];
        isWajib = numAmount >= nisabValue;
        if (isWajib && zakatType === 'kambing') {
          if (numAmount >= 40 && numAmount <= 120) zakatAmount = 1;
          else if (numAmount >= 121 && numAmount <= 200) zakatAmount = 2;
          else if (numAmount >= 201 && numAmount <= 399) zakatAmount = 3;
          else zakatAmount = Math.floor(numAmount / 100);
        } else if (isWajib && zakatType === 'sapi') {
          if (numAmount >= 30 && numAmount <= 39) zakatAmount = 1; // 1 ekor tabi'/tabii'ah
          else if (numAmount >= 40 && numAmount <= 59) zakatAmount = 1; // 1 ekor musinnah
          else zakatAmount = Math.floor(numAmount / 30);
        }
        break;
    }

    setResult({
      amount: numAmount,
      zakatAmount,
      isWajib,
      nisabValue,
      type: zakatType,
      category: activeTab
    });
    setShowResult(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  useEffect(() => {
    setShowResult(false);
    setResult(null);
    setAmount('');
  }, [activeTab, zakatType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div id='kalkulator' className="text-center mb-8 transform transition-all duration-1000 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-emerald-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Kalkulator Zakat</h1>
          </div>
          <p className="text-lg text-gray-600">Hitung zakat Anda dengan mudah dan akurat</p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl shadow-lg p-2">
          {Object.keys(zakatTypes).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {tab === 'mal' ? 'Zakat Mal' : tab === 'pertanian' ? 'Zakat Pertanian' : 'Zakat Peternakan'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Coins className="w-6 h-6 mr-2 text-emerald-600" />
              Pilih Jenis Zakat
            </h2>

            {/* Zakat Type Selection */}
            <div className="grid gap-4 mb-6">
              {zakatTypes[activeTab].map((type) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.id}
                    onClick={() => setZakatType(type.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      zakatType === type.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <IconComponent className={`w-8 h-8 mr-3 ${zakatType === type.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                      <div>
                        <h3 className="font-semibold text-gray-800">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {activeTab === 'mal' ? 'Jumlah (Rupiah)' : 
                 activeTab === 'pertanian' ? 'Jumlah (Kg)' : 
                 'Jumlah (Ekor)'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Masukkan jumlah ${zakatType}`}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all duration-300 text-lg"
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateZakat}
              disabled={!amount}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Hitung Zakat
            </button>
          </div>

          {/* Result */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hasil Perhitungan</h2>
            
            {showResult && result ? (
              <div className="space-y-4 animate-fade-in">
                {/* Status Zakat */}
                <div className={`p-4 rounded-xl ${result.isWajib ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${result.isWajib ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <span className={`font-semibold ${result.isWajib ? 'text-emerald-700' : 'text-red-700'}`}>
                      {result.isWajib ? 'Wajib Zakat' : 'Belum Wajib Zakat'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Jenis Zakat:</span>
                    <span className="font-semibold capitalize">{result.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Jumlah Harta:</span>
                    <span className="font-semibold">
                      {activeTab === 'mal' ? formatCurrency(result.amount) : `${formatNumber(result.amount)} ${activeTab === 'pertanian' ? 'kg' : 'ekor'}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Nisab:</span>
                    <span className="font-semibold">
                      {activeTab === 'mal' ? formatCurrency(result.nisabValue) : `${formatNumber(result.nisabValue)} ${activeTab === 'pertanian' ? 'kg' : 'ekor'}`}
                    </span>
                  </div>
                  
                  {result.isWajib && (
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                      <span className="text-emerald-700 font-semibold">Jumlah Zakat:</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {activeTab === 'mal' ? formatCurrency(result.zakatAmount) : 
                         activeTab === 'pertanian' ? `${formatNumber(result.zakatAmount)} kg` :
                         `${result.zakatAmount} ekor`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Informasi:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {activeTab === 'mal' && (
                      <>
                        <li>• Zakat mal dikeluarkan sebesar 2,5% dari harta yang telah mencapai nisab</li>
                        <li>• Harta harus dimiliki selama 1 tahun (haul)</li>
                      </>
                    )}
                    {activeTab === 'pertanian' && (
                      <>
                        <li>• Zakat pertanian dikeluarkan sebesar 10% (pengairan alami) atau 5% (pengairan buatan)</li>
                        <li>• Dikeluarkan setiap kali panen</li>
                      </>
                    )}
                    {activeTab === 'peternakan' && (
                      <>
                        <li>• Zakat peternakan dikeluarkan dalam bentuk ternak</li>
                        <li>• Harus dimiliki selama 1 tahun dan digembalakan</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Masukkan jumlah harta untuk menghitung zakat</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            * Perhitungan ini berdasarkan panduan BAZNAS. Untuk perhitungan yang lebih akurat, silakan konsultasi dengan ustadz atau lembaga zakat resmi.
          </p>
        </div>
      </div>

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
};

export default ZakatCalculator;