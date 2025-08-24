import { usePage } from '@inertiajs/react'
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function GallerySection() {
    const { gallery } = usePage().props // Ambil data dari Inertia
    const pageRef = useRef(null)
    const heroRef = useRef(null)
    const galleryGridRef = useRef(null)

    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
    const [images, setImages] = useState(gallery || [])
    const [selectedImage, setSelectedImage] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Update mouse position untuk efek gradient
    const handleMouseMove = useCallback((e) => {
        const rect = pageRef.current?.getBoundingClientRect()
        if (rect) {
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            setMousePosition({ x, y })
        }
    }, [])

    // Simulasi loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    // Buka lightbox
    const openLightbox = (image) => {
        setSelectedImage(image)
        document.body.style.overflow = "hidden"
    }

    // Tutup lightbox
    const closeLightbox = () => {
        setSelectedImage(null)
        document.body.style.overflow = "unset"
    }

    // Navigasi gambar
    const navigateImage = (direction) => {
        if (!selectedImage) return

        const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
        let newIndex

        if (direction === "prev") {
            newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
        } else {
            newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
        }

        setSelectedImage(images[newIndex])
    }

    // Format tanggal ke bahasa Indonesia
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    // Animasi dengan GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animasi hero text
            gsap.fromTo(
                ".hero-content",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                }
            )

            gsap.fromTo(
                ".header-title",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power2.out",
                }
            )

            // Animasi grid gallery saat discroll
            gsap.fromTo(
                ".gallery-card",
                { y: 80, opacity: 0, rotationX: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: galleryGridRef.current,
                        start: "top 80%",
                    },
                }
            )

            // Animasi mengambang (floating)
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

        // Event listener untuk mouse move
        document.addEventListener("mousemove", handleMouseMove)

        return () => {
            ctx.revert() // Cleanup GSAP
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [handleMouseMove])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        )
    }

    return (
        <div
            id="gallery"
            ref={pageRef}
            className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 overflow-hidden"
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.05) 30%, transparent 70%)`,
            }}
        >
            <div className="relative max-w-7xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div ref={heroRef} className="pt-12">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 shadow-lg mb-8 header-title floating-element">
                            <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
                            <span className="text-green-700 font-semibold">Galeri Foto Mustahik</span>
                            <Star className="w-4 h-4 text-amber-500 animate-spin" />
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-bold mb-6 header-title">
                            <span className="bg-gradient-to-r from-green-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                                Koleksi Foto
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                Kegiatan & Program
                            </span>
                        </h2>

                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed header-title">
                            Jelajahi momen-momen berharga dari berbagai kegiatan dan program yang telah kami selenggarakan untuk masyarakat.
                        </p>
                    </div>
                </div>

                {/* Gallery Grid */}
                <main ref={galleryGridRef} className="mb-24">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {images.length > 0 ? (
                            images.map((image) => (
                                <div
                                    key={image.id}
                                    className="gallery-card break-inside-avoid group cursor-pointer"
                                    onClick={() => openLightbox(image)}
                                >
                                    <div className="relative overflow-hidden rounded-lg bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                                        <img
                                            src={image.foto ? `/storage/${image.foto}` : "/placeholder.svg"}
                                            alt={image.title}
                                            className="w-full h-auto object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                                                <p className="text-xs opacity-90">{formatDate(image.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">Tidak ada foto tersedia.</p>
                        )}
                    </div>
                </main>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white"
                            onClick={closeLightbox}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white"
                            onClick={() => navigateImage("prev")}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white"
                            onClick={() => navigateImage("next")}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>

                        <img
                            src={selectedImage.foto ? `/storage/${selectedImage.foto}` : "/placeholder.svg"}
                            alt={selectedImage.title}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />

                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">{selectedImage.title}</h3>
                            <p className="text-gray-600">{formatDate(selectedImage.created_at)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
