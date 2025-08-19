import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Fakir", value: 30 },
  { name: "Miskin", value: 45 },
  { name: "Gharim", value: 20 },
  { name: "Fisabilillah", value: 25 },
];

const COLORS = ["#16a34a", "#facc15", "#0ea5e9", "#ef4444"];

export default function ChartSection() {
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.from(chartRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div ref={chartRef} className="bg-white shadow-md rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Distribusi Mustahik</h3>
      <PieChart width={300} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
