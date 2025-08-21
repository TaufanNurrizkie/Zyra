"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  User,
  Eye,
  Share2,
  Search,
  Filter,
  ChevronRight,
  Newspaper,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function NewsPage() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const newsGridRef = useRef(null)

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const featuredNews = {
    id: 1,
    title: "Perkembangan Terbaru Sistem Zakat Digital di Indonesia",
    excerpt:
      "Teknologi digital mengubah cara masyarakat menunaikan zakat dengan lebih mudah dan transparan. Platform digital kini memungkinkan perhitungan otomatis dan distribusi yang lebih efektif.",
    image: "/young-muslims-discussing-zakat.png",
    author: "Dr. Ahmad Syafii",
    date: "15 Januari 2024",
    readTime: "5 menit",
    views: "2.1k",
    featured: true,
  }

  const newsArticles = [
    {
      id: 2,
      title: "Peningkatan Kesadaran Zakat di Kalangan Milenial",
      excerpt:
        "Survei terbaru menunjukkan peningkatan signifikan kesadaran zakat di kalangan generasi milenial Indonesia.",
      image: "/ramadan-iftar-preparation.png",
      author: "Siti Nurhaliza",
      date: "12 Januari 2024",
      readTime: "3 menit",
      views: "1.8k",
    },
    {
      id: 3,
      title: "Inovasi Distribusi Zakat untuk Pemberdayaan UMKM",
      excerpt:
        "Program baru distribusi zakat fokus pada pemberdayaan usaha mikro kecil menengah untuk menciptakan kemandirian ekonomi.",
      image: "/islamic-finance-empowerment.png",
      author: "Prof. Bambang Sudibyo",
      date: "10 Januari 2024",
      readTime: "4 menit",
      views: "1.5k",
    },
    {
      id: 7,
      title: "Regulasi Terbaru Zakat Perusahaan di Indonesia",
      excerpt:
        "Pemerintah mengeluarkan regulasi baru untuk mendorong perusahaan berpartisipasi aktif dalam program zakat korporat.",
      image: "/corporate-zakat-indonesia.png",
      author: "Ahmad Fauzi, S.H.",
      date: "1 Januari 2024",
      readTime: "4 menit",
      views: "1.6k",
    },
  ]

  const handleMouseMove = useCallback((e) => {
    const rect = pageRef.current?.getBoundingClientRect()
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".hero-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        },
      )

      // Featured news animation
      gsap.to(featuredRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
        },
      })

      // News grid animation
      gsap.fromTo(
        ".news-card",
        { y: 80, opacity: 0, rotationX: 45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: newsGridRef.current,
            start: "top 80%",
          },
        },
      )

      // Floating animations
      gsap.to(".floating-element", {
        y: -15,
        rotationZ: 3,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 3,
          from: "random",
        },
      })
    }, pageRef)

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      ctx.revert()
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <div id="berita"
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.05) 30%, transparent 70%)`,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200 via-emerald-300 to-teal-300 rounded-full blur-3xl opacity-30"></div>
        <div className="floating-element absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-amber-200 via-orange-300 to-red-300 rounded-full blur-3xl opacity-25"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-blue-200 via-cyan-300 to-teal-300 rounded-full blur-2xl opacity-35"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20 pt-12">
          <div className="hero-content inline-flex items-center space-x-2 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 shadow-lg mb-8">
            <Newspaper className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-semibold">Berita Terkini</span>
          </div>

          <h1 className="hero-content text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Portal Berita
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Islam & Zakat
            </span>
          </h1>

          <p className="hero-content text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Dapatkan informasi terbaru seputar perkembangan zakat, ekonomi syariah, dan kehidupan Islami di Indonesia.
            Berita terpercaya dan mendalam untuk memperkaya wawasan Anda.
          </p>
        </div>

        {/* Featured News */}
        <div ref={featuredRef} className="mb-20 opacity-0 translate-y-20">
          <Card className="overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 backdrop-blur-md border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Berita Utama
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-gray-500 text-sm space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredNews.readTime}</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">{featuredNews.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{featuredNews.author}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{featuredNews.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full">
                    Baca Selengkapnya
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* News Grid */}
        <div ref={newsGridRef} className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Berita Terbaru</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ikuti perkembangan terkini seputar zakat, ekonomi syariah, dan kehidupan Islami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card
                key={article.id}
                className="news-card overflow-hidden bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{article.author}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Section */}
        <div className="text-center">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
            Muat Berita Lainnya
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
