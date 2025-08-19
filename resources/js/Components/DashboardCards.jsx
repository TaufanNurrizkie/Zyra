import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function DashboardCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const stats = [
    { title: "Total Mustahik", value: "120" },
    { title: "Bantuan Disalurkan", value: "85" },
    { title: "Kategori Asnaf", value: "8" },
    { title: "Relawan Aktif", value: "15" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="bg-white shadow-md rounded-2xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold">{stat.title}</h3>
          <p className="text-2xl font-bold text-green-700">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
