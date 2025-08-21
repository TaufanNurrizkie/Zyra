import { useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, Calendar, Target } from "lucide-react";

// Data for different charts
const distributionData = [
  { name: "Fakir", value: 30, color: "#10b981" },
  { name: "Miskin", value: 45, color: "#f59e0b" },
  { name: "Gharim", value: 20, color: "#3b82f6" },
  { name: "Fisabilillah", value: 25, color: "#ef4444" },
];

const monthlyData = [
  { month: "Jan", bantuan: 45, mustahik: 35 },
  { month: "Feb", bantuan: 52, mustahik: 42 },
  { month: "Mar", bantuan: 48, mustahik: 38 },
  { month: "Apr", bantuan: 61, mustahik: 47 },
  { month: "Mei", bantuan: 55, mustahik: 43 },
  { month: "Jun", bantuan: 67, mustahik: 52 },
];

const weeklyTrendData = [
  { week: "Minggu 1", total: 12 },
  { week: "Minggu 2", total: 19 },
  { week: "Minggu 3", total: 15 },
  { week: "Minggu 4", total: 22 },
  { week: "Minggu 5", total: 18 },
];

const categoryData = [
  { category: "Pendidikan", jumlah: 25 },
  { category: "Kesehatan", jumlah: 18 },
  { category: "Ekonomi", jumlah: 32 },
  { category: "Sosial", jumlah: 15 },
];

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

export default function ChartSection() {
  const chartsRef = useRef([]);

  useEffect(() => {
    // Animate charts with staggered entrance
    chartsRef.current.forEach((chart, index) => {
      if (chart) {
        chart.style.transform = 'translateY(30px) scale(0.95)';
        chart.style.opacity = '0';
        
        setTimeout(() => {
          chart.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          chart.style.transform = 'translateY(0px) scale(1)';
          chart.style.opacity = '1';
        }, index * 200);
      }
    });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 sm:p-3 border border-gray-200 rounded-lg shadow-lg text-xs sm:text-sm max-w-xs">
          <p className="font-medium text-gray-800 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs sm:text-sm truncate" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-4 sm:mt-6 lg:mt-8 space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-0">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        
        {/* Pie Chart - Distribution */}
        <div ref={(el) => (chartsRef.current[0] = el)} className="bg-white shadow-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Distribusi Mustahik</h3>
              <p className="text-xs sm:text-sm text-gray-500">Berdasarkan kategori asnaf</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="w-full max-w-xs sm:max-w-sm">
              <ResponsiveContainer width="100%" height={200} className="sm:!h-64">
                <PieChart>
                  <Pie 
                    data={distributionData} 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="70%"
                    innerRadius="40%"
                    dataKey="value"
                    stroke="none"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-2 sm:gap-3 sm:flex sm:flex-col">
              {distributionData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-0 rounded-lg sm:rounded-none bg-gray-50 sm:bg-transparent">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                  <div className="flex justify-between w-full min-w-0">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{item.name}</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 ml-1">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart - Monthly Data */}
        <div ref={(el) => (chartsRef.current[1] = el)} className="bg-white shadow-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Tren Bulanan</h3>
              <p className="text-xs sm:text-sm text-gray-500">Bantuan & mustahik per bulan</p>
            </div>
          </div>
          
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={200} className="sm:!h-64">
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} className="sm:text-xs" />
                <YAxis tick={{ fontSize: 10 }} className="sm:text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="bantuan" fill="#3b82f6" name="Bantuan" radius={[2, 2, 0, 0]} />
                <Bar dataKey="mustahik" fill="#10b981" name="Mustahik" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Weekly Trend */}
        <div ref={(el) => (chartsRef.current[2] = el)} className="bg-white shadow-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Tren Mingguan</h3>
              <p className="text-xs sm:text-sm text-gray-500">Penyaluran bantuan per minggu</p>
            </div>
          </div>
          
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={200} className="sm:!h-64">
              <AreaChart data={weeklyTrendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 9 }} className="sm:text-xs" angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} className="sm:text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fill="url(#colorTrend)" 
                  name="Total Bantuan"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Category Distribution */}
        <div ref={(el) => (chartsRef.current[3] = el)} className="bg-white shadow-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Kategori Bantuan</h3>
              <p className="text-xs sm:text-sm text-gray-500">Berdasarkan jenis bantuan</p>
            </div>
          </div>
          
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={200} className="sm:!h-64">
              <BarChart data={categoryData} layout="horizontal" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} className="sm:text-xs" />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 9 }} className="sm:text-xs" width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="jumlah" fill="#f59e0b" name="Jumlah" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div ref={(el) => (chartsRef.current[4] = el)} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Ringkasan Statistik</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="text-center bg-white bg-opacity-50 rounded-xl p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">120</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Penerima</div>
          </div>
          <div className="text-center bg-white bg-opacity-50 rounded-xl p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-1 sm:mb-2">85%</div>
            <div className="text-xs sm:text-sm text-gray-600">Tingkat Distribusi</div>
          </div>
          <div className="text-center bg-white bg-opacity-50 rounded-xl p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">4.8</div>
            <div className="text-xs sm:text-sm text-gray-600">Rating Kepuasan</div>
          </div>
          <div className="text-center bg-white bg-opacity-50 rounded-xl p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">15</div>
            <div className="text-xs sm:text-sm text-gray-600">Relawan Aktif</div>
          </div>
        </div>
      </div>
    </div>
  );
}