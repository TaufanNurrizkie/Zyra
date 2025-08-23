"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { HelpCircle, Star, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const faqData = [
    {
        id: 1,
        question: "Apa itu program bantuan mustahik?",
        answer:
            "Program bantuan mustahik adalah program pemberdayaan masyarakat yang bertujuan untuk membantu mereka yang membutuhkan melalui berbagai bentuk bantuan seperti pendidikan, kesehatan, dan ekonomi.",
    },
    {
        id: 2,
        question: "Siapa saja yang berhak menerima bantuan?",
        answer:
            "Yang berhak menerima bantuan adalah fakir, miskin, amil, muallaf, riqab, gharimin, fisabilillah, dan ibnu sabil sesuai dengan ketentuan syariat Islam.",
    },
    {
        id: 3,
        question: "Bagaimana cara mendaftar untuk menerima bantuan?",
        answer:
            "Anda dapat mendaftar dengan mengunjungi kantor kami atau melalui website resmi. Siapkan dokumen identitas, surat keterangan tidak mampu, dan dokumen pendukung lainnya.",
    },
    {
        id: 4,
        question: "Apa saja jenis bantuan yang tersedia?",
        answer:
            "Kami menyediakan bantuan pendidikan (beasiswa), bantuan kesehatan, bantuan modal usaha, bantuan pangan, dan program pemberdayaan ekonomi lainnya.",
    },
    {
        id: 5,
        question: "Berapa lama proses verifikasi bantuan?",
        answer:
            "Proses verifikasi biasanya memakan waktu 7-14 hari kerja setelah semua dokumen lengkap diterima dan telah melalui survei lapangan.",
    },
    {
        id: 6,
        question: "Apakah ada batasan waktu untuk menerima bantuan?",
        answer:
            "Bantuan diberikan sesuai dengan kebutuhan dan ketersediaan dana. Beberapa program bersifat berkelanjutan, sementara yang lain memiliki periode tertentu.",
    },
]

export default function FAQSection() {
    const pageRef = useRef(null)
    const heroRef = useRef(null)
    const faqGridRef = useRef(null)
    const boxesRef = useRef(null)
    const particlesRef = useRef(null)
    const cursorRef = useRef(null)

    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
    const [selectedQuestion, setSelectedQuestion] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback((e) => {
        const rect = pageRef.current?.getBoundingClientRect()
        if (rect) {
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            setMousePosition({ x, y })
            setCursorPosition({ x: e.clientX, y: e.clientY })
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(faqGridRef.current?.children || [], {
                y: 80,
                opacity: 0,
                scale: 0.9,
                rotationY: 10,
            })

            if (boxesRef.current) {
                const boxes = boxesRef.current.querySelectorAll(".animated-box")
                boxes.forEach((box, index) => {
                    gsap.to(box, {
                        motionPath: {
                            path: `M0,0 Q${gsap.utils.random(-30, 30)},${gsap.utils.random(-30, 30)} ${gsap.utils.random(-20, 20)},${gsap.utils.random(-20, 20)} T${gsap.utils.random(-15, 15)},${gsap.utils.random(-15, 15)}`,
                            autoRotate: true,
                        },
                        duration: gsap.utils.random(8, 15),
                        repeat: -1,
                        ease: "none",
                        delay: index * 0.5,
                    })

                    gsap.to(box, {
                        scale: gsap.utils.random(0.8, 1.2),
                        duration: gsap.utils.random(3, 6),
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: gsap.utils.random(0, 2),
                    })
                })
            }

            if (particlesRef.current) {
                const particles = particlesRef.current.querySelectorAll(".particle")
                particles.forEach((particle, index) => {
                    gsap.set(particle, {
                        x: gsap.utils.random(-100, window.innerWidth + 100),
                        y: gsap.utils.random(-100, window.innerHeight + 100),
                        scale: gsap.utils.random(0.1, 0.3),
                        opacity: gsap.utils.random(0.1, 0.4),
                    })

                    gsap.to(particle, {
                        y: "-=100",
                        x: `+=${gsap.utils.random(-50, 50)}`,
                        rotation: gsap.utils.random(0, 360),
                        duration: gsap.utils.random(10, 20),
                        repeat: -1,
                        ease: "none",
                        delay: index * 0.2,
                    })
                })
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    onEnter: () => {
                        gsap.to(".particle", {
                            scale: gsap.utils.random(0.2, 0.5),
                            opacity: gsap.utils.random(0.3, 0.7),
                            duration: 0.5,
                            stagger: 0.02,
                            ease: "back.out(1.7)",
                        })
                    },
                },
            })

            tl.to(faqGridRef.current?.children || [], {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1,
                ease: "back.out(1.7)",
                stagger: 0.2,
            })

            gsap.to(".floating-element", {
                y: -20,
                rotationZ: 5,
                scale: 1.05,
                duration: 6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                stagger: {
                    amount: 4,
                    from: "random",
                },
            })

            const faqItems = document.querySelectorAll(".faq-item")
            faqItems.forEach((item) => {
                item.addEventListener("mouseenter", () => {
                    gsap.to(item, {
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
                        duration: 0.3,
                        ease: "power2.out",
                    })
                })

                item.addEventListener("mouseleave", () => {
                    gsap.to(item, {
                        scale: 1,
                        y: 0,
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        duration: 0.3,
                        ease: "power2.out",
                    })
                })
            })
        }, pageRef)

        document.addEventListener("mousemove", handleMouseMove)

        return () => {
            ctx.revert()
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [handleMouseMove])

    const handleQuestionSelect = (index) => {
        setSelectedQuestion(index)

        const answerPanel = document.querySelector(".answer-panel")
        if (answerPanel) {
            gsap.fromTo(
                answerPanel,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
            )
        }
    }

    return (
        <div
            id="faq"
            ref={pageRef}
            className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 overflow-hidden relative"
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.05) 30%, transparent 70%)`,
            }}
        >



            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
                `,
                        backgroundSize: "35px 35px",
                    }}
                ></div>

                <div ref={boxesRef} className="absolute inset-0">
                    <div className="animated-box absolute top-[8%] left-[8%] w-20 h-20 border-2 border-green-500/25 rounded-xl opacity-40 bg-gradient-to-br from-green-100/20 to-emerald-100/20"></div>
                    <div className="animated-box absolute top-[15%] left-[85%] w-28 h-28 border-2 border-emerald-500/20 rounded-xl opacity-30 bg-gradient-to-br from-emerald-100/20 to-teal-100/20"></div>
                    <div className="animated-box absolute top-[35%] left-[12%] w-24 h-24 border-2 border-green-500/25 rounded-xl opacity-35 bg-gradient-to-br from-green-100/20 to-emerald-100/20"></div>
                    <div className="animated-box absolute top-[55%] left-[80%] w-32 h-32 border-2 border-emerald-500/20 rounded-xl opacity-25 bg-gradient-to-br from-emerald-100/20 to-teal-100/20"></div>
                    <div className="animated-box absolute top-[75%] left-[15%] w-26 h-26 border-2 border-green-500/25 rounded-xl opacity-40 bg-gradient-to-br from-green-100/20 to-emerald-100/20"></div>
                    <div className="animated-box absolute top-[85%] left-[75%] w-22 h-22 border-2 border-emerald-500/20 rounded-xl opacity-30 bg-gradient-to-br from-emerald-100/20 to-teal-100/20"></div>

                    <Sparkles className="absolute top-[20%] left-[70%] w-4 h-4 text-green-400/40 animate-pulse" />
                    <Sparkles className="absolute top-[60%] left-[25%] w-3 h-3 text-emerald-400/40 animate-pulse" />
                    <Sparkles className="absolute top-[80%] left-[60%] w-5 h-5 text-green-400/40 animate-pulse" />
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-12">
                <div className="pt-12">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 shadow-lg mb-8">
                            <HelpCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-semibold">Pertanyaan Umum</span>
                            <Star className="w-4 h-4 text-amber-500" />
                        </div>


                        <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-green-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                                Frequently Asked
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h2>

                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Temukan jawaban atas pertanyaan yang sering diajukan seputar program bantuan dan layanan kami.
                        </p>
                    </div>
                </div>

                <div ref={faqGridRef} className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[600px]">
                        <div className="lg:col-span-2 space-y-3">
                            {faqData.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleQuestionSelect(index)}
                                    className={`faq-item w-full text-left p-4 rounded-xl transition-all duration-300 group ${selectedQuestion === index
                                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 shadow-lg"
                                            : "bg-white/40 hover:bg-white/60 border border-white/20 hover:border-white/40"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${selectedQuestion === index
                                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                                                    : "bg-white/20 group-hover:bg-white/40"
                                                }`}
                                        >
                                            <HelpCircle
                                                className={`w-4 h-4 ${selectedQuestion === index ? "text-white" : "text-green-600 group-hover:text-green-700"
                                                    }`}
                                            />
                                        </div>
                                        <span
                                            className={`text-sm font-medium leading-tight ${selectedQuestion === index ? "text-green-700" : "text-gray-700 group-hover:text-gray-900"
                                                }`}
                                        >
                                            {item.question}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="lg:col-span-3">
                            <div className="answer-panel sticky top-8 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl min-h-[400px]">
                                {selectedQuestion !== null && (
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4 pb-6 border-b border-white/20">
                                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                                <HelpCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                                                    {faqData[selectedQuestion].question}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="prose prose-gray max-w-none">
                                            <p className="text-gray-700 leading-relaxed text-lg">{faqData[selectedQuestion].answer}</p>
                                        </div>
                                    </div>
                                )}

                                {selectedQuestion === null && (
                                    <div className="flex items-center justify-center h-full text-center">
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                                                <HelpCircle className="w-8 h-8 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pilih Pertanyaan</h3>
                                                <p className="text-gray-600">
                                                    Klik salah satu pertanyaan di sebelah kiri untuk melihat jawabannya
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
