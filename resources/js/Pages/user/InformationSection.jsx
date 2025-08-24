import { useState, useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    BookOpen,
    Calculator,
    Coins,
    Wheat,
    Home,
    Gem,
    DollarSign,
    Info,
    Users,
    Heart,
    Shield,
    MapPin,
    ArrowRight,
    CheckCircle,
    Sparkles,
    Star,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function InformationSection() {
    const pageRef = useRef(null)
    const heroRef = useRef(null)
    const definitionRef = useRef(null)
    const typesRef = useRef(null)
    const mustahikRef = useRef(null)
    const calculatorRef = useRef(null)

    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

    const zakatTypes = [
        {
            icon: DollarSign,
            title: "Zakat Mal (Harta)",
            description:
                "Zakat yang dikeluarkan dari harta yang telah mencapai nisab dan haul (1 tahun). Sebesar 2.5% dari total harta.",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50",
            hoverColor: "hover:bg-green-100",
            nisab: "85 gram emas",
            rate: "2.5%",
            details:
                "Meliputi uang tunai, tabungan, deposito, saham, dan investasi lainnya yang telah dimiliki selama 1 tahun penuh.",
        },
        {
            icon: Wheat,
            title: "Zakat Pertanian",
            description:
                "Zakat dari hasil pertanian seperti padi, gandum, kurma. Besarnya 5% atau 10% tergantung sistem pengairan.",
            color: "from-amber-500 to-orange-500",
            bgColor: "bg-amber-50",
            hoverColor: "hover:bg-amber-100",
            nisab: "653 kg gabah",
            rate: "5% - 10%",
            details: "10% untuk tanaman yang diairi hujan atau sumber air alami, 5% untuk tanaman yang diairi dengan biaya.",
        },
        {
            icon: Coins,
            title: "Zakat Perdagangan",
            description:
                "Zakat dari keuntungan usaha dagang yang telah mencapai nisab dan haul. Dihitung dari modal + keuntungan.",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            hoverColor: "hover:bg-blue-100",
            nisab: "85 gram emas",
            rate: "2.5%",
            details:
                "Dihitung dari total aset perdagangan (modal + keuntungan + piutang - hutang) yang telah dimiliki 1 tahun.",
        },
        {
            icon: Gem,
            title: "Zakat Emas & Perak",
            description: "Zakat dari kepemilikan emas dan perak yang telah mencapai nisab dan disimpan selama 1 tahun.",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50",
            hoverColor: "hover:bg-purple-100",
            nisab: "85g emas / 595g perak",
            rate: "2.5%",
            details: "Berlaku untuk emas dan perak dalam bentuk apapun, termasuk perhiasan yang tidak digunakan sehari-hari.",
        },
    ]

    const mustahikCategories = [
        {
            title: "Fakir",
            description: "Orang yang tidak memiliki harta dan pekerjaan yang dapat memenuhi kebutuhan hidupnya",
            icon: Users,
            color: "text-red-600",
            bgColor: "bg-red-50",
            detail:
                "Mereka yang sama sekali tidak memiliki penghasilan atau harta untuk memenuhi kebutuhan pokok sehari-hari.",
        },
        {
            title: "Miskin",
            description: "Orang yang memiliki harta/pekerjaan namun tidak mencukupi kebutuhan hidupnya",
            icon: Home,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            detail: "Mereka yang memiliki penghasilan namun tidak mencukupi untuk memenuhi kebutuhan dasar keluarga.",
        },
        {
            title: "Amil",
            description: "Petugas yang bertugas mengumpulkan, mengelola, dan mendistribusikan zakat",
            icon: Users,
            color: "text-green-600",
            bgColor: "bg-green-50",
            detail: "Petugas resmi yang ditunjuk untuk mengelola zakat, baik pengumpulan, administrasi, maupun distribusi.",
        },
        {
            title: "Muallaf",
            description: "Orang yang baru masuk Islam atau yang hatinya perlu dilembutkan terhadap Islam",
            icon: Heart,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            detail: "Mereka yang baru memeluk Islam dan membutuhkan dukungan untuk memperkuat keimanan.",
        },
        {
            title: "Riqab",
            description: "Budak yang ingin memerdekakan diri atau orang yang terlilit hutang karena menjamin orang lain",
            icon: Shield,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            detail: "Dalam konteks modern, termasuk mereka yang terjerat hutang karena membantu orang lain.",
        },
        {
            title: "Gharim",
            description: "Orang yang berhutang untuk kepentingan yang tidak maksiat dan tidak mampu melunasinya",
            icon: Calculator,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            detail: "Mereka yang memiliki hutang untuk kebutuhan yang halal namun tidak mampu membayar.",
        },
        {
            title: "Fi Sabilillah",
            description: "Orang yang berjuang di jalan Allah, termasuk untuk pendidikan dan dakwah Islam",
            icon: BookOpen,
            color: "text-teal-600",
            bgColor: "bg-teal-50",
            detail: "Meliputi kegiatan dakwah, pendidikan Islam, và perjuangan untuk menegakkan agama Allah.",
        },
        {
            title: "Ibnu Sabil",
            description: "Orang yang sedang dalam perjalanan dan kehabisan bekal dalam perjalanan yang tidak maksiat",
            icon: MapPin,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
            detail: "Musafir yang kehabisan bekal dalam perjalanan yang tidak melanggar syariat Islam.",
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
            // Animasi header yang lebih detail
            const headerTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            // Animasi untuk badge header
            headerTimeline.fromTo(".hero-badge",
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
            headerTimeline.fromTo(".hero-title-part1",
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

            headerTimeline.fromTo(".hero-title-part2",
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
            headerTimeline.fromTo(".hero-description",
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

            // Animasi untuk tombol
            headerTimeline.fromTo(".hero-button",
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out"
                },
                "-=0.3"
            );

            // Animasi untuk elemen dekoratif (sparkles dan star)
            headerTimeline.fromTo(".hero-sparkle",
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

            // Definition animation
            gsap.to(definitionRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: definitionRef.current,
                    start: "top 85%",
                },
            })

            // Types animation
            gsap.to(typesRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: typesRef.current,
                    start: "top 85%",
                },
            })

            gsap.fromTo(
                ".zakat-type-card",
                { y: 80, opacity: 0, rotationX: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: typesRef.current,
                        start: "top 80%",
                    },
                }
            )

            // Mustahik animation
            gsap.to(mustahikRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: mustahikRef.current,
                    start: "top 85%",
                },
            })

            gsap.fromTo(
                ".mustahik-card",
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: mustahikRef.current,
                        start: "top 80%",
                    },
                }
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
        <div id="informasi"
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
                    <div className="hero-badge inline-flex items-center space-x-2 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 shadow-lg mb-8">
                        <BookOpen className="hero-sparkle w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-semibold">Panduan Lengkap Zakat</span>
                        <Info className="hero-sparkle w-4 h-4 text-blue-500" />
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        <span className="hero-title-part1 block bg-gradient-to-r from-green-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                            Memahami Zakat
                        </span>
                        <span className="hero-title-part2 block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            dalam Islam
                        </span>
                    </h1>

                    <p className="hero-description text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                        Zakat adalah rukun Islam ketiga yang wajib ditunaikan oleh setiap Muslim yang mampu. Pelajari jenis-jenis
                        zakat, cara menghitung, dan siapa saja yang berhak menerimanya.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="#kalkulator"
                            className="group inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg transform hover:scale-105"
                        >
                            <Calculator className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                            Kalkulator Zakat
                        </a>
                    </div>
                </div>

                {/* Definition Section */}
                <div ref={definitionRef} className="mb-24 opacity-0 translate-y-20">
                    <Card className="p-12 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 backdrop-blur-md border-0 shadow-2xl">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <BookOpen className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Apa itu Zakat?</h2>
                            <div className="max-w-4xl mx-auto space-y-6">
                                <p className="text-xl text-gray-700 leading-relaxed">
                                    <strong>Zakat</strong> secara bahasa berarti "tumbuh" dan "suci". Secara istilah, zakat adalah
                                    sejumlah harta tertentu yang wajib dikeluarkan oleh orang yang beragama Islam dan diberikan kepada
                                    golongan yang berhak menerimanya.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Zakat merupakan ibadah <em>maliyah ijtima'iyah</em> (ibadah yang berkaitan dengan harta dan
                                    kemasyarakatan) yang memiliki posisi sangat penting dalam Islam. Zakat berfungsi untuk membersihkan
                                    harta dan jiwa, serta menciptakan keseimbangan sosial dalam masyarakat.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    <div className="text-center p-4 bg-white/60 rounded-xl">
                                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                        <h4 className="font-semibold text-gray-800">Rukun Islam ke-3</h4>
                                        <p className="text-sm text-gray-600">Kewajiban setiap Muslim yang mampu</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/60 rounded-xl">
                                        <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                                        <h4 className="font-semibold text-gray-800">Membersihkan Harta</h4>
                                        <p className="text-sm text-gray-600">Mensucikan harta dari hak orang lain</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/60 rounded-xl">
                                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                        <h4 className="font-semibold text-gray-800">Keadilan Sosial</h4>
                                        <p className="text-sm text-gray-600">Menciptakan keseimbangan ekonomi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Types of Zakat */}
                <div ref={typesRef} className="mb-24 opacity-0 translate-y-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">Jenis-Jenis Zakat</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Terdapat berbagai jenis zakat yang wajib dikeluarkan sesuai dengan jenis harta yang dimiliki
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {zakatTypes.map((zakat, index) => {
                            const IconComponent = zakat.icon
                            return (
                                <Card
                                    key={index}
                                    className={`zakat-type-card p-8 ${zakat.bgColor} ${zakat.hoverColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105`}
                                >
                                    <div className="flex items-start space-x-6 mb-6">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${zakat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0`}
                                        >
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                                                {zakat.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-4">{zakat.description}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-600 leading-relaxed">{zakat.details}</p>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="bg-white/80 px-4 py-2 rounded-full">
                                                <span className="font-semibold text-gray-600">Nisab: </span>
                                                <span className="text-gray-800">{zakat.nisab}</span>
                                            </div>
                                            <div className="bg-white/80 px-4 py-2 rounded-full">
                                                <span className="font-semibold text-gray-600">Tarif: </span>
                                                <span className="text-gray-800">{zakat.rate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Mustahik Section */}
                <div ref={mustahikRef} className="mb-24 opacity-0 translate-y-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">8 Golongan Penerima Zakat (Mustahik)</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                            Berdasarkan Al-Quran Surah At-Taubah ayat 60, terdapat 8 golongan yang berhak menerima zakat
                        </p>
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto">
                            <p className="text-lg text-gray-700 italic leading-relaxed">
                                "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ
                                السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ"
                            </p>
                            <p className="text-sm text-gray-600 mt-3">
                                "Sesungguhnya zakat-zakat itu, hanyalah untuk orang-orang fakir, orang-orang miskin, pengurus-pengurus
                                zakat, para mu'allaf yang dibujuk hatinya, untuk (memerdekakan) budak, orang-orang yang berhutang, untuk
                                jalan Allah dan untuk mereka yang sedang dalam perjalanan, sebagai suatu ketetapan yang diwajibkan
                                Allah, dan Allah Maha Mengetahui lagi Maha Bijaksana." (QS. At-Taubah: 60)
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mustahikCategories.map((category, index) => {
                            const IconComponent = category.icon
                            return (
                                <Card
                                    key={index}
                                    className={`mustahik-card p-6 ${category.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105`}
                                >
                                    <div className="text-center">
                                        <div
                                            className={`w-14 h-14 ${category.color} bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                                        >
                                            <IconComponent className={`w-7 h-7 ${category.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-3">{category.description}</p>
                                        <p className="text-xs text-gray-500 leading-relaxed">{category.detail}</p>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}
