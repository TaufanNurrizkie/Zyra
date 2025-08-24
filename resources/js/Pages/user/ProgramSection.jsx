import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  GraduationCap,
  Home,
  Stethoscope,
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
  Heart,
  Users,
  Building,
  School,
  Utensils,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProgramSection({ programData }) {
     console.log("Program Data:", programData);

  const programRef = useRef(null)
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const categoriesRef = useRef(null)
  const statsRef = useRef(null)
  const particlesRef = useRef(null)

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [activeCategory, setActiveCategory] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    programs: 0,
    beneficiaries: 0,
    provinces: 0,
    partners: 0,
  })

  // Fungsi untuk memetakan jenis program ke ikon dan warna
  const mapProgramTypeToStyle = (jenis) => {
    const styleMap = {
      'Pendidikan': {
        icon: GraduationCap,
        color: "from-orange-500 to-amber-500",
        bgColor: "bg-orange-50",
        hoverColor: "hover:bg-orange-100",
      },
      'Kesehatan': {
        icon: Stethoscope,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        hoverColor: "hover:bg-green-100",
      },
      'Perumahan': {
        icon: Home,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        hoverColor: "hover:bg-orange-100",
      },
      'Sosial': {
        icon: Users,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        hoverColor: "hover:bg-blue-100",
      },
      'Ekonomi': {
        icon: Building,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        hoverColor: "hover:bg-purple-100",
      },
      'Makanan': {
        icon: Utensils,
        color: "from-red-500 to-orange-500",
        bgColor: "bg-red-50",
        hoverColor: "hover:bg-red-100",
      },
    };

    return styleMap[jenis] || {
      icon: Heart,
      color: "from-gray-500 to-gray-700",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
    };
  };

  // Data program dari controller - mapping ke format yang diharapkan
  const featuredPrograms = programData ? programData.map(program => {
    const style = mapProgramTypeToStyle(program.jenis);
    return {
      id: program.id,
      title: program.judul,
      description: program.isi,
      category: program.jenis,
      progress: 75, // Default value, bisa disesuaikan jika ada di database
      image: program.foto || "/placeholder.svg",
      icon: style.icon,
      color: style.color,
      bgColor: style.bgColor,
      hoverColor: style.hoverColor,
      status: program.status,
      location: program.daerah,
    };
  }) : [
    // Data default jika tidak ada data dari controller
    {
      id: 1,
      title: "Beasiswa Yatim Berprestasi",
      description: "Program beasiswa pendidikan untuk anak yatim berprestasi dari SD hingga perguruan tinggi",
      category: "Pendidikan",
      progress: 75,
      image: "/indonesian-students-studying.png",
      icon: GraduationCap,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      status: "Aktif",
      location: "Seluruh Indonesia",
    },
    {
      id: 2,
      title: "Bantuan Kesehatan Dhuafa",
      description: "Program bantuan biaya pengobatan dan operasi untuk keluarga kurang mampu",
      category: "Kesehatan",
      progress: 60,
      image: "/indonesian-medical-care.png",
      icon: Stethoscope,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      status: "Aktif",
      location: "34 Provinsi",
    },
    {
      id: 3,
      title: "Rumah Layak Huni",
      description: "Program renovasi dan pembangunan rumah layak huni untuk keluarga prasejahtera",
      category: "Perumahan",
      progress: 45,
      image: "/indonesian-house-construction.png",
      icon: Home,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      status: "Aktif",
      location: "Jawa & Sumatra",
    },
  ];

  const handleMouseMove = useCallback((e) => {
    const rect = programRef.current?.getBoundingClientRect()
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }
  }, [])

  const createParticles = useCallback(() => {
    if (!particlesRef.current) return

    const particles = []
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div")
      const size = Math.random() * 3 + 1
      const hue = Math.random() > 0.5 ? "from-green-400 to-emerald-400" : "from-orange-400 to-amber-400"
      particle.className = `particle absolute bg-gradient-to-r ${hue} rounded-full opacity-30 blur-sm`
      particle.style.width = size + "px"
      particle.style.height = size + "px"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particlesRef.current.appendChild(particle)
      particles.push(particle)
    }

    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: () => Math.random() * 200 - 100,
        y: () => Math.random() * 200 - 100,
        rotationZ: () => Math.random() * 360,
        scale: () => Math.random() * 1.5 + 0.5,
        duration: Math.random() * 35 + 30,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.15,
      })
    })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".hero-program",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: "power2.out",
        },
      )

      // Featured programs animation
      gsap.to(featuredRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
        },
      })

      gsap.fromTo(
        ".featured-card",
        { y: 80, opacity: 0, rotationX: 45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.0,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 80%",
          },
        },
      )

      // Categories animation
      gsap.to(categoriesRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 85%",
        },
      })

      gsap.fromTo(
        ".category-card",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 80%",
          },
        },
      )

      // Stats animation
      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
      })

      // Animate stats numbers
      gsap.to(animatedStats, {
        programs: 190,
        beneficiaries: 50000,
        provinces: 34,
        partners: 200,
        duration: 3.0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        onUpdate: function () {
          setAnimatedStats({
            programs: Math.floor(this.progress() * 190),
            beneficiaries: Math.floor(this.progress() * 50000),
            provinces: Math.floor(this.progress() * 34),
            partners: Math.floor(this.progress() * 200),
          })
        },
      })

      // Floating animations
      gsap.to(".floating-program", {
        y: -15,
        rotationZ: 3,
        duration: 8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 6,
          from: "random",
        },
      })

      createParticles()
    }, programRef)

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      ctx.revert()
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove, createParticles])

  return (
    <section id="program"
      ref={programRef}
      className="relative py-24 bg-gradient-to-br from-slate-50 via-orange-50 to-green-50 overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.1) 0%, rgba(34, 197, 94, 0.05) 30%, transparent 70%)`,
      }}
    >
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-program absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 via-amber-300 to-yellow-300 rounded-full blur-3xl opacity-30"></div>
        <div className="floating-program absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-green-200 via-emerald-300 to-teal-300 rounded-full blur-3xl opacity-25"></div>
        <div className="floating-program absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-orange-200 via-red-300 to-pink-300 rounded-full blur-2xl opacity-35"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20">
          <div className="hero-program inline-flex items-center space-x-2 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 shadow-lg mb-8">
            <Target className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-semibold">Program Pemberdayaan</span>
            <Sparkles className="w-4 h-4 text-green-500" />
          </div>

          <h2 className="hero-program text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-800 via-amber-600 to-yellow-700 bg-clip-text text-transparent">
              Program Kami
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              untuk Indonesia
            </span>
          </h2>

          <p className="hero-program text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Berbagai program pemberdayaan yang dirancang khusus untuk mengangkat harkat dan martabat saudara-saudara
            kita yang membutuhkan di seluruh Indonesia.
          </p>
        </div>

        {/* Featured Programs */}
        <div ref={featuredRef} className="mb-24 opacity-0 translate-y-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Program Unggulan</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Program-program prioritas yang sedang berjalan dan memberikan dampak signifikan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card
                  key={program.id || index}
                  className={`featured-card ${program.bgColor} ${program.hoverColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105 overflow-hidden`}
                >
                  <div className="relative">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-green-700">
                        {program.status || "Aktif"}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-600">{program.category}</span>
                      <span className="text-sm text-gray-500">{program.location}</span>
                    </div>

                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                      {program.title}
                    </h4>

                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {program.description}
                    </p>

                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
