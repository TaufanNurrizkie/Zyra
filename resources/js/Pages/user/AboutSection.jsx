"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Heart,
    Users,
    Shield,
    ArrowRight,
    CheckCircle,
    Sparkles,
    Star,
    Target,
    Eye,
    Handshake,
    TrendingUp,
    Clock,
    MapPin,
    Phone,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
    const aboutRef = useRef(null)
    const missionRef = useRef(null)
    const visionRef = useRef(null)
    const valuesRef = useRef(null)
    const processRef = useRef(null)
    const impactRef = useRef(null)
    const teamRef = useRef(null)
    const particlesRef = useRef(null)
    const headerRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })

    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
    const [activeStep, setActiveStep] = useState(0)
    const [animatedNumbers, setAnimatedNumbers] = useState({
        years: 0,
        provinces: 0,
        partners: 0,
        programs: 0,
    })

    const values = [
        {
            icon: Shield,
            title: "Amanah",
            description: "Menjaga kepercayaan dengan transparansi penuh dalam setiap penyaluran dana zakat dan donasi.",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50",
            hoverColor: "hover:bg-green-100",
        },
        {
            icon: Heart,
            title: "Empati",
            description: "Memahami dan merasakan penderitaan saudara-saudara kita yang membutuhkan bantuan.",
            color: "from-red-500 to-pink-500",
            bgColor: "bg-red-50",
            hoverColor: "hover:bg-red-100",
        },
        {
            icon: Handshake,
            title: "Kolaborasi",
            description: "Bekerja sama dengan berbagai pihak untuk menciptakan dampak yang lebih besar dan berkelanjutan.",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            hoverColor: "hover:bg-blue-100",
        },
        {
            icon: TrendingUp,
            title: "Inovasi",
            description: "Menggunakan teknologi terdepan untuk memudahkan proses donasi dan penyaluran bantuan.",
            color: "from-amber-500 to-orange-500",
            bgColor: "bg-amber-50",
            hoverColor: "hover:bg-amber-100",
        },
    ]

    const processSteps = [
        {
            step: 1,
            title: "Registrasi Mustahik",
            description: "Calon penerima mendaftar dan melengkapi data dengan verifikasi ketat",
            icon: Users,
            color: "from-green-500 to-emerald-500",
        },
        {
            step: 2,
            title: "Verifikasi Data",
            description: "Tim lapangan melakukan survei dan validasi kondisi ekonomi mustahik",
            icon: CheckCircle,
            color: "from-blue-500 to-cyan-500",
        },
        {
            step: 3,
            title: "Penyaluran Dana",
            description: "Dana disalurkan langsung kepada mustahik yang telah terverifikasi",
            icon: Heart,
            color: "from-amber-500 to-orange-500",
        },
        {
            step: 4,
            title: "Monitoring & Evaluasi",
            description: "Pemantauan berkelanjutan untuk memastikan dampak positif yang berkelanjutan",
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500",
        },
    ]

    const impactStats = [
        {
            icon: Clock,
            value: "8+",
            label: "Tahun Pengalaman",
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            icon: MapPin,
            value: "34",
            label: "Provinsi Terjangkau",
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            icon: Handshake,
            value: "150+",
            label: "Mitra Strategis",
            color: "text-amber-600",
            bgColor: "bg-amber-100",
        },
        {
            icon: Target,
            value: "200+",
            label: "Program Aktif",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
    ]

    const teamMembers = [
        {
            name: "Dr. Ahmad Syafii",
            role: "Direktur Utama",
            expertise: "Manajemen Zakat & Filantropi Islam",
            image: "/placeholder-mm9ri.png",
            color: "from-green-500 to-emerald-500",
        },
        {
            name: "Siti Nurhaliza, M.Sc",
            role: "Direktur Program",
            expertise: "Pemberdayaan Masyarakat & CSR",
            image: "/professional-indonesian-woman-hijab.png",
            color: "from-blue-500 to-cyan-500",
        },
        {
            name: "Budi Santoso, S.T",
            role: "Direktur Teknologi",
            expertise: "Fintech & Digital Innovation",
            image: "/indonesian-professional-man.png",
            color: "from-amber-500 to-orange-500",
        },
    ]

    const handleMouseMove = useCallback((e) => {
        const rect = aboutRef.current?.getBoundingClientRect()
        if (rect) {
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            setMousePosition({ x, y })
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
    }, [])

    const createParticles = useCallback(() => {
        if (!particlesRef.current) return

        const particles = []
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div")
            const size = Math.random() * 3 + 1
            const hue = Math.random() > 0.5 ? "from-green-400 to-emerald-400" : "from-amber-400 to-orange-400"
            particle.className = `particle absolute bg-gradient-to-r ${hue} rounded-full opacity-40 blur-sm`
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
                duration: Math.random() * 20 + 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.1,
            })
        })
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animasi header yang lebih detail
            const headerTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            // Animasi untuk badge header
            headerTimeline.fromTo(".header-badge",
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }
            );

            // Animasi untuk judul utama - bagian per bagian
            headerTimeline.fromTo(".header-title-part1",
                {
                    y: 50,
                    opacity: 0,
                    skewY: 5
                },
                {
                    y: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 1,
                    ease: "power3.out"
                },
                "-=0.3"
            );

            headerTimeline.fromTo(".header-title-part2",
                {
                    y: 50,
                    opacity: 0,
                    skewY: 5
                },
                {
                    y: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 1,
                    ease: "power3.out"
                },
                "-=0.7"
            );

            // Animasi untuk deskripsi
            headerTimeline.fromTo(".header-description",
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                },
                "-=0.5"
            );

            // Animasi untuk elemen dekoratif (sparkles dan star)
            headerTimeline.fromTo(".header-sparkle",
                {
                    scale: 0,
                    rotation: -180
                },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "elastic.out(1, 0.5)"
                },
                "-=0.3"
            );

            // Initial setup untuk section lainnya
            gsap.set(
                [
                    missionRef.current,
                    visionRef.current,
                    valuesRef.current,
                    processRef.current,
                    impactRef.current,
                    teamRef.current,
                ],
                {
                    opacity: 0,
                    y: 100,
                }
            )

            // Mission & Vision animation
            gsap.to([missionRef.current, visionRef.current], {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: missionRef.current,
                    start: "top 85%",
                }
            })

            // Values animation
            gsap.to(valuesRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: "top 85%",
                }
            })

            gsap.fromTo(
                ".value-card",
                { y: 80, opacity: 0, rotationX: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: "top 80%",
                    }
                }
            )

            // Process animation
            gsap.to(processRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: processRef.current,
                    start: "top 85%",
                }
            })

            gsap.fromTo(
                ".process-step",
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: processRef.current,
                        start: "top 80%",
                    }
                }
            )

            // Impact animation
            gsap.to(impactRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: impactRef.current,
                    start: "top 85%",
                }
            })

            // Animate numbers with smoother animation
            gsap.to(animatedNumbers, {
                years: 8,
                provinces: 34,
                partners: 150,
                programs: 200,
                duration: 2.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: impactRef.current,
                    start: "top 80%",
                },
                onUpdate: function () {
                    setAnimatedNumbers({
                        years: Math.floor(this.progress() * 8),
                        provinces: Math.floor(this.progress() * 34),
                        partners: Math.floor(this.progress() * 150),
                        programs: Math.floor(this.progress() * 200),
                    })
                },
            })

            // Team animation
            gsap.to(teamRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: teamRef.current,
                    start: "top 85%",
                }
            })

            gsap.fromTo(
                ".team-card",
                { y: 100, opacity: 0, scale: 0.8 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: teamRef.current,
                        start: "top 80%",
                    }
                }
            )

            // CTA animation
            gsap.fromTo(
                ".cta-section",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".cta-section",
                        start: "top 85%",
                    }
                }
            )

            // Floating animations with smoother movement
            gsap.to(".floating-about", {
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

            // Subtle background pulse animation
            gsap.to(aboutRef.current, {
                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                duration: 0.5,
                ease: "power1.out",
                repeat: -1,
                yoyo: true,
            })

            createParticles()
        }, aboutRef)

        document.addEventListener("mousemove", handleMouseMove)

        return () => {
            ctx.revert()
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [handleMouseMove, createParticles])

    return (
        <section id="tentang"
            ref={aboutRef}
            className="relative py-24 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 overflow-hidden"
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.05) 30%, transparent 70%)`,
            }}
        >
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="floating-about absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200 via-emerald-300 to-teal-300 rounded-full blur-3xl opacity-30"></div>
                <div className="floating-about absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-amber-200 via-orange-300 to-red-300 rounded-full blur-3xl opacity-25"></div>
                <div className="floating-about absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-blue-200 via-cyan-300 to-teal-300 rounded-full blur-2xl opacity-35"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                {/* Header dengan ref terpisah */}
                <div ref={headerRef} className="text-center mb-20">
                    <div className="header-badge inline-flex items-center space-x-2 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 shadow-lg mb-8">
                        <Sparkles className="header-sparkle w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-semibold">Tentang Platform Mustahik</span>
                        <Star className="header-sparkle w-4 h-4 text-amber-500" />
                    </div>

                    <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                        <span className="header-title-part1 block bg-gradient-to-r from-green-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                            Membangun Jembatan
                        </span>
                        <span className="header-title-part2 block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            Kebaikan Digital
                        </span>
                    </h2>

                    <p className="header-description text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Kami hadir sebagai platform teknologi yang menghubungkan hati para donatur dengan saudara-saudara yang
                        membutuhkan, menciptakan ekosistem kebaikan yang berkelanjutan di Indonesia.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    <Card
                        ref={missionRef}
                        className="p-12 bg-gradient-to-br from-white via-green-50/50 to-emerald-50/30 backdrop-blur-md border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:scale-105 overflow-hidden relative"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full blur-xl opacity-15 group-hover:opacity-25 transition-opacity"></div>

                        <div className="relative z-10">
                            <div className="flex items-start space-x-6 mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-gray-800 group-hover:text-green-700 transition-colors mb-2">
                                        Misi Kami
                                    </h3>
                                    <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:w-24 transition-all duration-300"></div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-xl font-semibold text-green-800 leading-relaxed">
                                    "Membangun Ekosistem Kebaikan Digital yang Berkelanjutan"
                                </p>

                                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                        <span>Menghubungkan hati para donatur dengan saudara yang membutuhkan melalui teknologi terdepan</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                        <span>Memastikan transparansi penuh dalam setiap proses penyaluran dana zakat dan donasi</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                        <span>Menciptakan dampak sosial yang terukur dan berkelanjutan untuk kemajuan bangsa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card
                        ref={visionRef}
                        className="p-12 bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 backdrop-blur-md border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:scale-105 overflow-hidden relative"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-200 to-red-300 rounded-full blur-xl opacity-15 group-hover:opacity-25 transition-opacity"></div>

                        <div className="relative z-10">
                            <div className="flex items-start space-x-6 mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <Eye className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-gray-800 group-hover:text-amber-700 transition-colors mb-2">
                                        Visi Kami
                                    </h3>
                                    <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full group-hover:w-24 transition-all duration-300"></div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-xl font-semibold text-amber-800 leading-relaxed">
                                    "Indonesia yang Sejahtera Melalui Solidaritas Digital"
                                </p>

                                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                                    <div className="flex items-start space-x-3">
                                        <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                                        <span>Menjadi platform zakat dan donasi digital #1 yang paling dipercaya di Indonesia</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                                        <span>Membangun gerakan kebaikan nasional yang melibatkan seluruh lapisan masyarakat</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                                        <span>Mewujudkan Indonesia Emas 2045 melalui pengentasan kemiskinan yang sistematis dan berkelanjutan</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Values */}
                <div ref={valuesRef} className="mb-24">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">Nilai-Nilai Kami</h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Prinsip-prinsip yang menjadi fondasi dalam setiap langkah perjalanan kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon
                            return (
                                <Card
                                    key={index}
                                    className={`value-card p-8 text-center ${value.bgColor} ${value.hoverColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105 hover:-translate-y-2`}
                                >
                                    <div
                                        className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg`}
                                    >
                                        <IconComponent className="w-10 h-10 text-white" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-800 mb-4 group-hover:scale-110 transition-transform">
                                        {value.title}
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors">
                                        {value.description}
                                    </p>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Process */}
                <div ref={processRef} className="mb-24">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">Bagaimana Kami Bekerja</h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Proses yang terstruktur dan transparan untuk memastikan bantuan tepat sasaran
                        </p>
                    </div>

                    <div className="space-y-8">
                        {processSteps.map((step, index) => {
                            const IconComponent = step.icon
                            return (
                                <div
                                    key={index}
                                    className="process-step flex items-center space-x-8 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-[1.02]"
                                    onMouseEnter={() => setActiveStep(index)}
                                >
                                    <div
                                        className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0`}
                                    >
                                        <IconComponent className="w-10 h-10 text-white" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-3">
                                            <span className="text-3xl font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                                                0{step.step}
                                            </span>
                                            <h4 className="text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                                                {step.title}
                                            </h4>
                                        </div>
                                        <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors">
                                            {step.description}
                                        </p>
                                    </div>

                                    <ArrowRight className="w-8 h-8 text-gray-400 group-hover:text-green-600 group-hover:translate-x-2 transition-all duration-300" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
