import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Heart,
    Users,
    TrendingUp,
    Award,
    ArrowRight,
    Play,
    CheckCircle,
    Sparkles,
    Globe,
    Star,
    Zap,
    Share2
} from "lucide-react"

export default function HeroSection() {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const buttonsRef = useRef(null)
    const statsRef = useRef(null)
    const imageRef = useRef(null)

    const typewriterRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })

    const [isLoaded, setIsLoaded] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [typedText, setTypedText] = useState("")
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isTypingPaused, setIsTypingPaused] = useState(false)
    const [showCursor, setShowCursor] = useState(true)
    const [activeStatCard, setActiveStatCard] = useState(null)

    const words = [
        { text: "Wujudkan", gradient: "from-green-800 via-emerald-600 to-teal-700" },
        { text: "Kebaikan", gradient: "from-amber-600 via-orange-600 to-red-600" },
        { text: "Bersama", gradient: "from-green-500 via-emerald-500 to-teal-500" }
    ]

    const [animatedStats, setAnimatedStats] = useState({
        mustahik: 0,
        donatur: 0,
        program: 0,
        dana: 0,
    })

    const stats = [
        {
            icon: Users,
            value: "1.2M+",
            animatedValue: "mustahik",
            label: "Mustahik Terbantu",
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
            hoverColor: "hover:bg-emerald-500/20",
            description: "Keluarga yang telah menerima bantuan"
        },
        {
            icon: Heart,
            value: "500K+",
            animatedValue: "donatur",
            label: "Donatur Aktif",
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
            hoverColor: "hover:bg-amber-500/20",
            description: "Donatur yang aktif berdonasi"
        },
        {
            icon: Award,
            value: "50+",
            animatedValue: "program",
            label: "Program Aktif",
            color: "text-amber-600",
            bgColor: "bg-amber-600/10",
            hoverColor: "hover:bg-amber-600/20",
            description: "Program pemberdayaan masyarakat"
        },
        {
            icon: TrendingUp,
            value: "25M+",
            animatedValue: "dana",
            label: "Dana Tersalurkan",
            color: "text-green-700",
            bgColor: "bg-teal-700/10",
            hoverColor: "hover:bg-green-700/20",
            description: "Rupiah yang telah disalurkan"
        },
    ]

    const features = [
        {
            text: "Transparansi penuh dalam penyaluran dana",
            icon: CheckCircle,
            delay: 0,
            description: "Laporan detail setiap transaksi"
        },
        {
            text: "Laporan real-time untuk setiap donasi",
            icon: TrendingUp,
            delay: 100,
            description: "Update status donasi secara langsung"
        },
        {
            text: "Program terintegrasi untuk pemberdayaan",
            icon: Award,
            delay: 200,
            description: "Solusi holistik untuk kesejahteraan"
        },
        {
            text: "Jangkauan nasional dengan dampak lokal",
            icon: Globe,
            delay: 300,
            description: "Menjangkau seluruh Indonesia"
        },
    ]

    // Smooth typewriter effect
    useEffect(() => {
        if (!isLoaded || isTypingPaused) return

        const currentWord = words[currentWordIndex]
        const targetText = currentWord.text

        const typeInterval = setInterval(() => {
            if (isDeleting) {
                if (currentCharIndex > 0) {
                    const newIndex = currentCharIndex - 1
                    setCurrentCharIndex(newIndex)
                    setTypedText(targetText.substring(0, newIndex))
                } else {
                    // selesai hapus → ganti kata berikutnya
                    setIsDeleting(false)
                    setCurrentWordIndex(prev => (prev + 1) % words.length)
                    setIsTypingPaused(true)
                    setTimeout(() => setIsTypingPaused(false), 300)
                }
            } else {
                if (currentCharIndex < targetText.length) {
                    const newIndex = currentCharIndex + 1
                    setCurrentCharIndex(newIndex)
                    setTypedText(targetText.substring(0, newIndex))
                } else {
                    // selesai ketik → jeda lalu hapus
                    setIsTypingPaused(true)
                    setTimeout(() => {
                        setIsDeleting(true)
                        setIsTypingPaused(false)
                    }, 2000)
                }
            }
        }, isDeleting ? 50 : 120)

        return () => clearInterval(typeInterval)
    }, [isLoaded, currentCharIndex, currentWordIndex, isDeleting, isTypingPaused])


    // Cursor blinking
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)
        return () => clearInterval(cursorInterval)
    }, [])


    const handleMouseMove = useCallback((e) => {
        const rect = heroRef.current?.getBoundingClientRect()
        if (rect) {
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            setMousePosition({ x, y })
            mouseRef.current = { x: e.clientX, y: e.clientY }

            // Smooth mouse follower
            const follower = document.querySelector('.mouse-follower')
            if (follower) {
                follower.style.transform = `translate(${e.clientX - rect.left - 12}px, ${e.clientY - rect.top - 12}px)`
            }
        }
    }, [])


    const handleStatCardHover = useCallback((index, isEntering) => {
        if (isEntering) {
            setActiveStatCard(index)
            // Animate other cards
            document.querySelectorAll('.stat-card').forEach((card, i) => {
                if (i !== index) {
                    card.style.transform = 'scale(0.95) translateY(4px)'
                    card.style.opacity = '0.7'
                }
            })
        } else {
            setActiveStatCard(null)
            document.querySelectorAll('.stat-card').forEach((card) => {
                card.style.transform = 'scale(1) translateY(0px)'
                card.style.opacity = '1'
            })
        }
    }, [])

    useEffect(() => {
        setIsLoaded(true)

        // Initial animations with stagger
        const elements = [titleRef.current, subtitleRef.current, buttonsRef.current, imageRef.current, statsRef.current]
        elements.forEach((element, index) => {
            if (element) {
                element.style.opacity = '0'
                element.style.transform = 'translateY(50px) rotateX(15deg)'
                setTimeout(() => {
                    element.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    element.style.opacity = '1'
                    element.style.transform = 'translateY(0px) rotateX(0deg)'
                }, index * 200 + 500)
            }
        })

        // Animate stats counter
        setTimeout(() => {
            let progress = 0
            const duration = 2500
            const startTime = Date.now()

            const animateStats = () => {
                const elapsed = Date.now() - startTime
                progress = Math.min(elapsed / duration, 1)
                const easeProgress = 1 - Math.pow(1 - progress, 3)

                setAnimatedStats({
                    mustahik: Math.floor(easeProgress * 1200000),
                    donatur: Math.floor(easeProgress * 500000),
                    program: Math.floor(easeProgress * 50),
                    dana: Math.floor(easeProgress * 25000000),
                })

                if (progress < 1) {
                    requestAnimationFrame(animateStats)
                }
            }

            animateStats()
        }, 1500)

        document.addEventListener("mousemove", handleMouseMove)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [handleMouseMove])

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+'
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+'
        return num.toString()
    }

    return (
        <section id="home"
            ref={heroRef}
            className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden flex items-center transition-all duration-700"
        >
            {/* Enhanced mouse follower */}
            <div className="mouse-follower absolute w-6 h-6 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full blur-lg pointer-events-none z-10 transition-all duration-300 ease-out" />

            {/* Enhanced floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200 via-amber-300 to-orange-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-44 h-44 bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-300 rounded-full blur-2xl opacity-25 animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-orange-200 via-amber-300 to-yellow-300 rounded-full blur-xl opacity-35 animate-pulse delay-2000"></div>
                <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 rounded-full blur-lg opacity-40 animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-amber-100 via-yellow-200 to-orange-200 rounded-full blur-2xl opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-1500"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-orange-300 via-amber-300 to-yellow-300 rounded-full blur-lg opacity-30 animate-pulse delay-3000"></div>
            </div>



            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 md:space-y-8">
                        <div ref={titleRef} className="space-y-4 md:space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/40 shadow-lg hover:bg-white/60 transition-all duration-300 hover:scale-105 group cursor-pointer">
                                <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
                                <span className="text-amber-700 font-bold text-sm md:text-base group-hover:text-amber-800 transition-colors">Platform Zakat Terpercaya #1</span>
                                <Star className="w-4 h-4 text-amber-500 animate-pulse" />
                            </div>

                            {/* Enhanced typewriter title */}
                            <div ref={typewriterRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                                <div className={`bg-gradient-to-r ${words[currentWordIndex]?.gradient} bg-clip-text text-transparent drop-shadow-lg transition-all duration-500`}>
                                    {typedText}
                                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                                        <span className="text-amber-500 animate-pulse">|</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div ref={subtitleRef} className="space-y-4 md:space-y-6">
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg hover:bg-white/70 transition-all duration-300">
                                Bergabunglah dengan jutaan donatur dalam menyalurkan zakat, infaq, dan sedekah untuk membantu
                                saudara-saudara kita yang membutuhkan di seluruh Indonesia.
                            </p>

                            <div className="space-y-3">
                                {features.map((feature, index) => {
                                    const IconComponent = feature.icon
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-lg"
                                            style={{ animationDelay: `${feature.delay}ms` }}
                                            onMouseEnter={() => handleInteraction('feature')}
                                        >
                                            <IconComponent className="w-5 h-5 text-green-600 flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                                            <div className="flex-1">
                                                <span className="text-gray-700 text-sm md:text-base font-medium group-hover:text-green-800 transition-colors block">
                                                    {feature.text}
                                                </span>
                                                <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                                                    {feature.description}
                                                </span>
                                            </div>
                                            <Zap className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 md:gap-6">
                            <a href="/zakat"
                                size="md"
                                className="relative bg-gradient-to-r from-green-600 via-green-400 to-green-500 hover:from-green-700 hover:via-green-600 hover:to-green-500 text-white font-bold px-10 py-8 h-auto text-xl shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden border-2 border-amber-500/30 hover:border-amber-400/50 hover:scale-105"
                                onMouseEnter={() => handleInteraction('donate')}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-300%] group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                                <Heart className="mr-4 h-6 w-6 group-hover:animate-bounce group-hover:scale-110 transition-all duration-300" />
                                <span className="relative z-10 group-hover:scale-105 transition-transform">Donasi Sekarang</span>
                                <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                            </a>

                            <a href="#program"
                                variant="outline"
                                size="lg"
                                className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-bold px-10 py-8 h-auto text-xl group transition-all duration-500 bg-white/70 backdrop-blur-lg hover:bg-white/90 hover:border-amber-700 hover:shadow-xl hover:scale-105"
                                onMouseEnter={() => handleInteraction('program')}
                            >
                                <Play className="mr-4 h-5 w-5 group-hover:scale-125 group-hover:text-amber-600 transition-all duration-300" />
                                <span className="group-hover:scale-105 transition-transform">Lihat Program</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div ref={imageRef} className="relative group">
                        <div className="relative bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                            <div className="aspect-square bg-gradient-to-br from-green-200/80 to-emerald-200/80 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src="/zakat.png"
                                    alt="Keluarga Indonesia menerima bantuan zakat"
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextElementSibling.style.display = 'flex'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent rounded-2xl group-hover:from-green-900/20 transition-all duration-500"></div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg group-hover:bg-white/98 transition-all duration-300">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                                <Heart className="w-6 h-6 text-white animate-pulse" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-green-800 text-base">Bantuan Tersalurkan</div>
                                                <div className="text-gray-600 text-sm font-medium">Hari ini: Rp 2.5 Miliar</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced floating info cards */}
                        <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/30 hover:bg-white/98 hover:scale-110 transition-all duration-300 group cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800 text-base">34 Provinsi</div>
                                    <div className="text-gray-600 text-sm font-medium">Jangkauan Nasional</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/30 hover:bg-white/98 hover:scale-110 transition-all duration-300 group cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <div className="font-bold text-gray-800 text-base">100% Amanah</div>
                                    <div className="text-gray-600 text-sm font-medium">Tersertifikasi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Stats Section */}
                <div ref={statsRef} className="mt-20 lg:mt-24">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Dampak Nyata Bersama</h3>
                        <p className="text-gray-600 text-lg">Pencapaian yang telah kita wujudkan bersama-sama</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon
                            const isActive = activeStatCard === index
                            return (
                                <Card
                                    key={index}
                                    className={`stat-card p-6 text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-md ${stat.hoverColor} group cursor-pointer hover:-translate-y-2 relative overflow-hidden ${isActive ? 'ring-2 ring-green-400 shadow-2xl scale-105' : ''}`}
                                    onMouseEnter={() => {
                                        handleStatCardHover(index, true)
                                        handleInteraction('stat')
                                    }}
                                    onMouseLeave={() => handleStatCardHover(index, false)}
                                    style={{
                                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02 - 1}deg) rotateY(${mousePosition.x * 0.02 - 1}deg)`,
                                    }}
                                >


                                    <div className="relative z-10">
                                        <div
                                            className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group -hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                                        >
                                            <IconComponent className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                                        </div>

                                        <div className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                                            {formatNumber(animatedStats[stat.animatedValue]) || stat.value}
                                        </div>

                                        <div className="text-gray-600 text-sm font-semibold group-hover:text-gray-800 transition-colors duration-300 mb-2">
                                            {stat.label}
                                        </div>

                                        {/* Description that appears on hover */}
                                        <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            {stat.description}
                                        </div>

                                        {/* Interactive progress bar */}
                                        <div className="mt-3 w-full bg-gray-200 rounded-full h-1 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div
                                                className={`h-full bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-green-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                                            ></div>
                                        </div>
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
