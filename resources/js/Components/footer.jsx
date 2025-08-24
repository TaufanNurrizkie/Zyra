import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Users,
  Heart,
  TrendingUp,
  Award,
  Send,
  ExternalLink,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const [email, setEmail] = useState("")
  const footerRef = useRef(null)
  const statsRef = useRef(null)
  const socialRef = useRef(null)
  const [animatedStats, setAnimatedStats] = useState({
    mustahik: 0,
    donatur: 0,
    tahun: 0,
  })

  const office = {
    name: "Kantor Pusat Jakarta",
    address: "Jl. Sudirman No. 123, Menteng, Jakarta Pusat 10310",
    phone: "+62 21 5555 1234",
    email: "jakarta@mustahik.org",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJl.%20Jenderal%20Sudirman%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1692345678901!5m2!1sen!2sid",
  }

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Tentang", href: "#tentang" },
    { name: "Informasi", href: "#informasi" },
    { name: "program", href: "#program" },
    { name: "Berita", href: "#berita" },
    { name: "FAQ", href: "#faq" },
  ]

  const programs = [
    { name: "Zakat Fitrah", href: "/program/fitrah" },
    { name: "Zakat Mal", href: "/program/mal" },
    { name: "Bantuan Pendidikan", href: "/program/pendidikan" },
    { name: "Bantuan Kesehatan", href: "/program/kesehatan" },
    { name: "Pemberdayaan UMKM", href: "/program/umkm" },
    { name: "Bantuan Darurat", href: "/program/darurat" },
  ]

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/628115551234",
      icon: MessageCircle,
      color: "hover:bg-green-500 hover:shadow-green-500/25",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/mustahik_official",
      icon: Instagram,
      color: "hover:bg-pink-500 hover:shadow-pink-500/25",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/mustahik.official",
      icon: Facebook,
      color: "hover:bg-blue-600 hover:shadow-blue-600/25",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@mustahik",
      icon: Youtube,
      color: "hover:bg-red-500 hover:shadow-red-500/25",
    },
    {
      name: "Email",
      href: "mailto:info@mustahik.org",
      icon: Mail,
      color: "hover:bg-amber-500 hover:shadow-amber-500/25",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer sections on scroll
      gsap.fromTo(
        ".footer-section",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate stats counter
      gsap.to(animatedStats, {
        mustahik: 1200000,
        donatur: 500000,
        tahun: 15,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          onUpdate: function () {
            setAnimatedStats({
              mustahik: Math.floor(this.progress() * 1200000),
              donatur: Math.floor(this.progress() * 500000),
              tahun: Math.floor(this.progress() * 15),
            })
          },
        },
      })

      // Floating animation for social icons
      gsap.to(".social-icon", {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      gsap.to(".newsletter-button", {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Add success animation here
          setEmail("")
        },
      })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-400 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="footer-section lg:col-span-4 space-y-8">
            <div className="flex items-center space-x-4 group">
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-amber-500/25 transition-all duration-300 group-hover:scale-110">
                <Heart className="w-8 h-8 text-green-800" />
                <div className="absolute inset-0 bg-amber-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                  Mustahik
                </h2>
                <p className="text-emerald-200 text-sm font-medium">Menyalurkan Berkah Bersama</p>
              </div>
            </div>

            <p className="text-emerald-100 leading-relaxed text-lg">
              Mustahik adalah lembaga amil zakat terpercaya yang berkomitmen menyalurkan zakat, infaq, dan sedekah untuk
              membantu saudara-saudara kita yang membutuhkan dengan transparansi dan akuntabilitas penuh.
            </p>

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 bg-white/10 rounded-2xl p-6 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="text-center group">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-amber-400 mr-2" />
                </div>
                <div className="text-3xl font-bold text-amber-400 group-hover:scale-110 transition-transform">
                  {animatedStats.mustahik > 1000000
                    ? `${(animatedStats.mustahik / 1000000).toFixed(1)}M+`
                    : `${Math.floor(animatedStats.mustahik / 1000)}K+`}
                </div>
                <div className="text-xs text-emerald-200 font-medium">Mustahik Terbantu</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-amber-400 mr-2" />
                </div>
                <div className="text-3xl font-bold text-amber-400 group-hover:scale-110 transition-transform">
                  {animatedStats.donatur > 1000
                    ? `${Math.floor(animatedStats.donatur / 1000)}K+`
                    : `${animatedStats.donatur}+`}
                </div>
                <div className="text-xs text-emerald-200 font-medium">Donatur Aktif</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-amber-400 mr-2" />
                </div>
                <div className="text-3xl font-bold text-amber-400 group-hover:scale-110 transition-transform">
                  {animatedStats.tahun}+
                </div>
                <div className="text-xs text-emerald-200 font-medium">Tahun Berpengalaman</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 border-b-2 border-amber-400 pb-3 inline-block">
              Menu Cepat
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-emerald-100 hover:text-amber-400 transition-all duration-300 flex items-center space-x-3 group hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-section lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 border-b-2 border-amber-400 pb-3 inline-block">
              Program Kami
            </h3>
            <ul className="space-y-4">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.href}
                    className="text-emerald-100 hover:text-amber-400 transition-all duration-300 flex items-center space-x-3 group hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">{program.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="footer-section lg:col-span-4 space-y-8">
            <h3 className="text-xl font-bold text-amber-400 border-b-2 border-amber-400 pb-3 inline-block">
              Lokasi & Kontak
            </h3>

            <div className="office-content bg-white/10 rounded-2xl p-6 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h4 className="font-bold text-amber-400 mb-4 text-lg">{office.name}</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:bg-amber-400/30 transition-colors">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-emerald-100 flex-1 leading-relaxed">{office.address}</span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:bg-amber-400/30 transition-colors">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <a
                    href={`tel:${office.phone}`}
                    className="text-emerald-100 hover:text-amber-400 transition-colors font-medium"
                  >
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:bg-amber-400/30 transition-colors">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <a
                    href={`mailto:${office.email}`}
                    className="text-emerald-100 hover:text-amber-400 transition-colors font-medium"
                  >
                    {office.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover:border-amber-400/50 transition-all duration-300">
              <iframe
                src={office.mapUrl}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title={`Lokasi ${office.name}`}
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-emerald-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Social Media */}
            <div className="footer-section space-y-6">
              <h3 className="text-xl font-bold text-amber-400">Ikuti Media Sosial Kami</h3>
              <div ref={socialRef} className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon flex items-center space-x-3 px-6 py-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 ${social.color} group backdrop-blur-sm border border-white/20 hover:scale-105 transform hover:shadow-2xl`}
                    >
                      <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{social.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="footer-section space-y-6">
              <h3 className="text-xl font-bold text-amber-400">Berlangganan Newsletter</h3>
              <p className="text-emerald-100 leading-relaxed">
                Dapatkan update terbaru tentang program dan kegiatan kami langsung di inbox Anda
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda"
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-emerald-300 focus:outline-none focus:border-amber-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-300" />
                </div>
                <button
                  type="submit"
                  className="newsletter-button w-full px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-green-800 font-bold rounded-2xl hover:from-amber-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-amber-500/25 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Berlangganan Sekarang</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-t border-emerald-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-emerald-200 text-center md:text-left">
              <div className="font-medium">© 2024 Mustahik. Seluruh hak cipta dilindungi.</div>
              <div className="text-amber-400 font-semibold flex items-center justify-center md:justify-start space-x-2 mt-1">
                <span>Dibuat dengan</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>untuk kebaikan umat</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <a
                href="/privacy"
                className="text-emerald-200 hover:text-amber-400 transition-colors font-medium hover:underline"
              >
                Kebijakan Privasi
              </a>
              <a
                href="/terms"
                className="text-emerald-200 hover:text-amber-400 transition-colors font-medium hover:underline"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="/sitemap"
                className="text-emerald-200 hover:text-amber-400 transition-colors font-medium hover:underline"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
