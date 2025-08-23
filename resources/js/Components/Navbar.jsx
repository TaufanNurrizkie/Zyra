"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Users, Camera, Info, Newspaper, Home } from "lucide-react"
import { gsap } from "gsap"
import { Link } from "@inertiajs/react"

const navItems = [
    { name: "Home", href: "#", icon: Home },
    { name: "Tentang", href: "#tentang", icon: Users },
    { name: "Informasi", href: "#informasi", icon: Info },
    { name: "Program", href: "#program", icon: Heart },
    { name: "Berita", href: "#berita", icon: Newspaper },
    { name: "Gallery", href: "#gallery", icon: Camera },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const navRef = useRef(null)
    const logoRef = useRef(null)
    const navItemsRef = useRef(null)
    const actionsRef = useRef(null)
    const donateButtonRef = useRef(null)

    // Smooth scroll function
    const scrollToSection = (href) => {
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80 // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            })
        }
    }

    // Handle navigation click
    const handleNavClick = (e, href) => {
        e.preventDefault()
        scrollToSection(href)
        setIsOpen(false) // Close mobile menu if open
    }

    // Detect active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["tentang", "informasi", "program", "berita", "gallery"]
            const scrollY = window.scrollY + 100

            // Check if we're at the top
            if (scrollY < 200) {
                setActiveSection("home")
                return
            }

            // Find active section
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetHeight = element.offsetHeight

                    if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const nav = navRef.current
        const logo = logoRef.current
        const navItemsEl = navItemsRef.current
        const actionsEl = actionsRef.current
        const donateBtn = donateButtonRef.current

        if (!nav || !logo || !navItemsEl || !actionsEl || !donateBtn) return

        // Timeline animasi masuk
        const tl = gsap.timeline()

        tl.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
          .fromTo(logo, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
          .fromTo(
            navItemsEl.children,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(
            actionsEl.children,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
          )

        // Simpan referensi untuk cleanup
        const navLinks = Array.from(navItemsEl.children)
        const allDonateButtons = [donateBtn, ...document.querySelectorAll('.donate-btn')].filter(Boolean)

        // Hover effect pada link
        const handleLinkEnter = (e) => {
            gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out" })
            gsap.to(e.currentTarget.querySelector(".nav-icon"), { rotate: 360, duration: 0.6, ease: "power2.out" })
        }
        const handleLinkLeave = (e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" })
            gsap.to(e.currentTarget.querySelector(".nav-icon"), { rotate: 0, duration: 0.3, ease: "power2.out" })
        }

        navLinks.forEach(link => {
            link.addEventListener("mouseenter", handleLinkEnter)
            link.addEventListener("mouseleave", handleLinkLeave)
        })

        // Animasi glow pada tombol donasi
        const glowAnim = gsap.to(allDonateButtons, {
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
        })

        // Hover effect tombol donasi
        const handleBtnEnter = (e) => {
            gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
            })
            gsap.to(e.currentTarget, {
                boxShadow: "0 8px 30px rgba(245, 158, 11, 0.6), 0 0 60px rgba(245, 158, 11, 0.3)",
                duration: 0.3,
            })
        }
        const handleBtnLeave = (e) => {
            gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            })
        }

        // Ripple effect
        const handleBtnClick = (e) => {
            const button = e.currentTarget
            const rect = button.getBoundingClientRect()
            const size = Math.max(rect.width, rect.height)
            const x = e.clientX - rect.left - size / 2
            const y = e.clientY - rect.top - size / 2

            const ripple = document.createElement("span")
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                transform: scale(0);
                opacity: 0.6;
            `
            ripple.classList.add("ripple-effect")
            button.appendChild(ripple)

            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove(),
            })

            gsap.to(button, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" })
        }

        allDonateButtons.forEach(btn => {
            btn.addEventListener("mouseenter", handleBtnEnter)
            btn.addEventListener("mouseleave", handleBtnLeave)
            btn.addEventListener("click", handleBtnClick)
        })

        // Cleanup: Hapus semua event dan animasi
        return () => {
            navLinks.forEach(link => {
                link.removeEventListener("mouseenter", handleLinkEnter)
                link.removeEventListener("mouseleave", handleLinkLeave)
            })
            allDonateButtons.forEach(btn => {
                btn.removeEventListener("mouseenter", handleBtnEnter)
                btn.removeEventListener("mouseleave", handleBtnLeave)
                btn.removeEventListener("click", handleBtnClick)
            })
            glowAnim.kill() // Hentikan animasi GSAP
        }
    }, [])

    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-50 w-full border-b border-green-200/50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-lg shadow-green-100/20"
        >
            <style jsx>{`
                .donate-btn {
                    position: relative;
                    overflow: hidden;
                }
                .ripple-effect {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    pointer-events: none;
                }
                .donate-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s;
                }
                .donate-btn:hover::before {
                    left: 100%;
                }
            `}</style>

            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div ref={logoRef} className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-green-800">Zyra</span>
                            <span className="text-xs text-green-600">Peduli Sesama</span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div ref={navItemsRef} className="hidden md:flex md:items-center md:space-x-8">
                        {navItems.map((item) => {
                            const sectionId = item.href === "#" ? "home" : item.href.substring(1)
                            const isActive = activeSection === sectionId

                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`nav-item group relative flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-green-50 cursor-pointer ${
                                        isActive
                                            ? "text-amber-500 bg-green-50"
                                            : "text-green-700 hover:text-amber-500"
                                    }`}
                                >
                                    <item.icon className="nav-icon h-4 w-4" />
                                    <span>{item.name}</span>
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 rounded-full ${
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    }`}></span>
                                </a>
                            )
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div ref={actionsRef} className="hidden md:flex md:items-center md:space-x-4">
                        <Button
                            ref={donateButtonRef}
                            size="lg"
                            className="donate-btn relative bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 text-white font-semibold px-10 py-3 h-12 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400 hover:border-amber-300"
                        >
                            <Heart className="mr-2 h-5 w-5" />
                            <span className="relative z-10 text-base">Donasi Sekarang</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-green-700 hover:text-amber-500">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <div className="flex flex-col space-y-4 mt-8">
                                    <div className="flex items-center space-x-2 pb-4 border-b">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                                            <Heart className="h-6 w-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-green-800">Zyra</span>
                                            <span className="text-xs text-green-600">Peduli Sesama</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        {navItems.map((item) => {
                                            const sectionId = item.href === "#" ? "home" : item.href.substring(1)
                                            const isActive = activeSection === sectionId

                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={(e) => handleNavClick(e, item.href)}
                                                    className={`flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors cursor-pointer ${
                                                        isActive
                                                            ? "bg-green-50 text-amber-500"
                                                            : "text-green-700 hover:bg-green-50 hover:text-amber-500"
                                                    }`}
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.name}</span>
                                                </a>
                                            )
                                        })}
                                    </div>

                                    <div className="flex flex-col space-y-3 pt-4 border-t">
                                        <Button className="donate-btn relative bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 text-white font-semibold px-10 py-4 h-14 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400 hover:border-amber-300 w-full text-base">
                                            <Heart className="mr-2 h-5 w-5 animate-bounce" />
                                            <span className="relative z-10">Donasi Sekarang</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </nav>
    )
}
