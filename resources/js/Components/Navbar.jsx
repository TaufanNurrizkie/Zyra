import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Users, Camera, Info, Newspaper, Home } from "lucide-react"
import { gsap } from "gsap"

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
    const navRef = useRef(null)
    const logoRef = useRef(null)
    const navItemsRef = useRef(null)
    const actionsRef = useRef(null)
    const donateButtonRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline()

        tl.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
            .fromTo(
                logoRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.4",
            )
            .fromTo(
                navItemsRef.current?.children || [],
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.3",
            )
            .fromTo(
                actionsRef.current?.children || [],
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.2",
            )

        const navLinks = document.querySelectorAll(".nav-item")
        navLinks.forEach((link) => {
            link.addEventListener("mouseenter", () => {
                gsap.to(link, { scale: 1.05, duration: 0.3, ease: "power2.out" })
                gsap.to(link.querySelector(".nav-icon"), { rotate: 360, duration: 0.6, ease: "power2.out" })
            })

            link.addEventListener("mouseleave", () => {
                gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" })
                gsap.to(link.querySelector(".nav-icon"), { rotate: 0, duration: 0.3, ease: "power2.out" })
            })
        })

        const donateButtons = document.querySelectorAll(".donate-btn")

        gsap.to(donateButtons, {
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
        })

        donateButtons.forEach((button) => {
            button.addEventListener("mouseenter", () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out",
                })
                gsap.to(button, {
                    boxShadow: "0 8px 30px rgba(245, 158, 11, 0.6), 0 0 60px rgba(245, 158, 11, 0.3)",
                    duration: 0.3,
                })
            })

            button.addEventListener("mouseleave", () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                })
            })

            button.addEventListener("click", (e) => {
                const rect = button.getBoundingClientRect()
                const ripple = document.createElement("span")
                const size = Math.max(rect.width, rect.height)
                const x = e.clientX - rect.left - size / 2
                const y = e.clientY - rect.top - size / 2

                ripple.style.width = ripple.style.height = size + "px"
                ripple.style.left = x + "px"
                ripple.style.top = y + "px"
                ripple.classList.add("ripple-effect")

                button.appendChild(ripple)

                gsap.fromTo(
                    ripple,
                    { scale: 0, opacity: 0.6 },
                    {
                        scale: 2,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        onComplete: () => ripple.remove(),
                    },
                )

                gsap.to(button, {
                    scale: 0.98,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                })
            })
        })

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener("mouseenter", () => { })
                link.removeEventListener("mouseleave", () => { })
            })
            donateButtons.forEach((button) => {
                if (button.heartInterval) {
                    clearInterval(button.heartInterval)
                }
            })
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
                    <div ref={logoRef} className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-green-800">Zyra</span>
                            <span className="text-xs text-green-600">Peduli Sesama</span>
                        </div>
                    </div>

                    <div ref={navItemsRef} className="hidden md:flex md:items-center md:space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="nav-item group relative flex items-center space-x-2 px-3 py-2 text-sm font-medium text-green-700 transition-all duration-300 hover:text-amber-500 rounded-lg hover:bg-green-50"
                            >
                                <item.icon className="nav-icon h-4 w-4" />
                                <span>{item.name}</span>
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full rounded-full"></span>
                            </a>
                        ))}
                    </div>

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
                                            <span className="text-lg font-bold text-green-800">Mustahik</span>
                                            <span className="text-xs text-green-600">Peduli Sesama</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        {navItems.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium text-green-700 transition-colors hover:bg-green-50 hover:text-amber-500"
                                            >
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.name}</span>
                                            </a>
                                        ))}
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
      `}</style>
        </nav>
    )
}
