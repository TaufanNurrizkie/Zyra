import { useEffect, useRef } from "react";
import { Users, HandHeart, Layers, UserCheck } from "lucide-react";

export default function DashboardCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Enhanced GSAP animation with more dynamic effects
    const cards = cardsRef.current.filter(Boolean);
    
    // Initial state
    cards.forEach(card => {
      card.style.transform = 'translateY(50px)';
      card.style.opacity = '0';
    });

    // Animate in sequence
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.transform = 'translateY(0px)';
        card.style.opacity = '1';
      }, i * 200);
    });
  }, []);

  const stats = [
    { 
      title: "Total Mustahik", 
      value: "120",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    { 
      title: "Bantuan Disalurkan", 
      value: "85",
      icon: HandHeart,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    { 
      title: "Kategori Asnaf", 
      value: "8",
      icon: Layers,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    { 
      title: "Relawan Aktif", 
      value: "15",
      icon: UserCheck,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative bg-white shadow-lg rounded-3xl p-6 text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            {/* Background decoration */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full -translate-y-6 translate-x-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
            
            {/* Icon container */}
            <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className={`w-8 h-8 ${stat.textColor}`} />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                {stat.title}
              </h3>
              <p className={`text-3xl font-bold ${stat.textColor} group-hover:scale-105 transition-transform duration-300`}>
                {stat.value}
              </p>
            </div>

            {/* Subtle gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}></div>
            
            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl`}></div>
          </div>
        );
      })}
    </div>
  );
}