import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Users, Camera, Info, Newspaper, Home, Calculator } from "lucide-react"
import { Link } from "@inertiajs/react"

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Tentang", href: "#tentang", icon: Users },
    { name: "Informasi", href: "#informasi", icon: Info },
    // { name: "Kalkulator", href: "#kalkulator", icon: Calculator },
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

    // Enhanced smooth scroll function
    const scrollToSection = (href) => {
        if (href === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            })
        }
    }

    // Handle navigation click
    const handleNavClick = (e, href) => {
        e.preventDefault()
        if (href.startsWith("#")) {
            scrollToSection(href)
        } else {
            window.location.href = href
        }
        setIsOpen(false)
    }

    // Detect active section on scroll
    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const sections = ["tentang", "informasi", "kalkulator", "program", "berita", "gallery"]
                    const scrollY = window.pageYOffset + 100

                    if (scrollY < 200) {
                        setActiveSection("home")
                        ticking = false
                        return
                    }

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
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Animation effects
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return

        const nav = navRef.current
        const logo = logoRef.current
        const navItemsEl = navItemsRef.current
        const actionsEl = actionsRef.current
        const donateBtn = donateButtonRef.current

        if (!nav || !logo || !navItemsEl || !actionsEl || !donateBtn) return

        // Simple CSS animations
        nav.style.animation = 'slideDown 0.8s ease-out'
        logo.style.animation = 'slideRight 0.6s ease-out 0.4s both'

        // Animate nav items
        Array.from(navItemsEl.children).forEach((child, index) => {
            child.style.animation = `fadeInUp 0.5s ease-out ${0.1 * index + 0.3}s both`
        })

        // Animate action items
        Array.from(actionsEl.children).forEach((child, index) => {
            child.style.animation = `fadeInLeft 0.5s ease-out ${0.1 * index + 0.2}s both`
        })

        // Simple hover effects
        const navLinks = Array.from(navItemsEl.children)
        const allDonateButtons = [donateBtn, ...document.querySelectorAll('.donate-btn')].filter(Boolean)

        const handleLinkEnter = (e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
        }
        const handleLinkLeave = (e) => {
            e.currentTarget.style.transform = 'scale(1)'
        }

        const handleBtnEnter = (e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(245, 158, 11, 0.6)'
        }
        const handleBtnLeave = (e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = ''
        }

        navLinks.forEach(link => {
            link.addEventListener("mouseenter", handleLinkEnter)
            link.addEventListener("mouseleave", handleLinkLeave)
        })

        allDonateButtons.forEach(btn => {
            btn.addEventListener("mouseenter", handleBtnEnter)
            btn.addEventListener("mouseleave", handleBtnLeave)
        })

        return () => {
            navLinks.forEach(link => {
                link.removeEventListener("mouseenter", handleLinkEnter)
                link.removeEventListener("mouseleave", handleLinkLeave)
            })
            allDonateButtons.forEach(btn => {
                btn.removeEventListener("mouseenter", handleBtnEnter)
                btn.removeEventListener("mouseleave", handleBtnLeave)
            })
        }
    }, [])

    return (
        <>
            <style jsx>{`
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @keyframes slideRight {
                    from { transform: translateX(-50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes fadeInUp {
                    from { transform: translateY(-30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @keyframes fadeInLeft {
                    from { transform: translateX(50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }
                    50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.6); }
                }

                .donate-btn {
                    position: relative;
                    overflow: hidden;
                    animation: glow 3s ease-in-out infinite;
                    transition: all 0.3s ease;
                }

                .nav-item {
                    transition: all 0.3s ease;
                }

                .nav-item:hover .nav-icon {
                    transform: rotate(360deg);
                    transition: transform 0.6s ease;
                }

                /* CSS-only smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Optimasi untuk perangkat mobile */
                @media (hover: none) and (pointer: coarse) {
                    .nav-item:hover,
                    .donate-btn:hover {
                        transform: none !important;
                    }
                }

                /* Respect user preferences untuk reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    html {
                        scroll-behavior: auto;
                    }

                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>

            <nav
                ref={navRef}
                className="sticky top-0 z-50 w-full border-b border-green-200/50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-lg shadow-green-100/20"
            >
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div ref={logoRef} className="flex items-center space-x-2">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                                    <Heart className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-green-800">Zyra</span>
                                    <span className="text-xs text-green-600">Peduli Sesama</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div ref={navItemsRef} className="hidden md:flex md:items-center md:space-x-8">
                            {navItems.map((item) => {
                                const sectionId = item.href === "/" ? "home" : item.href.substring(1)
                                const isActive = activeSection === sectionId

                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className={`nav-item group relative flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-green-50 cursor-pointer ${
                                            isActive
                                                ? "text-amber-500 bg-green-50"
                                                : "text-green-700 hover:text-amber-500"
                                        }`}
                                    >
                                        <item.icon className="nav-icon h-4 w-4" />
                                        <span>{item.name}</span>
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-300 ${
                                            isActive ? "w-full" : "w-0 group-hover:w-full"
                                        }`}></span>
                                    </a>
                                )
                            })}
                        </div>

                        {/* Desktop Actions */}
                        <div ref={actionsRef} className="hidden md:flex md:items-center md:space-x-4">
                            <Link href="/zakat">
                                <Button
                                    ref={donateButtonRef}
                                    size="lg"
                                    className="donate-btn relative bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 text-white font-semibold px-10 py-3 h-12 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400 hover:border-amber-300"
                                >
                                    <Heart className="mr-2 h-5 w-5" />
                                    <span className="relative z-10 text-base">Bayar Zakat Sekarang</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                </Button>
                            </Link>
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
                                                const sectionId = item.href === "/" ? "home" : item.href.substring(1)
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
                                            <Link href="/zakat">
                                                <Button className="donate-btn relative bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 text-white font-semibold px-10 py-4 h-14 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400 hover:border-amber-300 w-full text-base">
                                                    <Heart className="mr-2 h-5 w-5 animate-bounce" />
                                                    <span className="relative z-10">Bayar Zakat Sekarang</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
