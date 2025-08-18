import { useState } from "react";

export default function Footer() {
    const [selectedOffice, setSelectedOffice] = useState(0);

    const offices = [
        {
            name: "Kantor Pusat Jakarta",
            address: "Jl. Sudirman No. 123, Menteng, Jakarta Pusat 10310",
            phone: "+62 21 5555 1234",
            email: "jakarta@mustahik.org",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJl.%20Jenderal%20Sudirman%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1692345678901!5m2!1sen!2sid"
        },
        {
            name: "Cabang Surabaya", 
            address: "Jl. Pemuda No. 45, Gubeng, Surabaya 60271",
            phone: "+62 31 5555 5678",
            email: "surabaya@mustahik.org",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4930383819735!2d112.7378215!3d-7.2574719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f96dc8e8ec47%3A0x29c2c0c5c5e8ec47!2sJl.%20Pemuda%2C%20Surabaya!5e0!3m2!1sen!2sid!4v1692345678902!5m2!1sen!2sid"
        },
        {
            name: "Cabang Medan",
            address: "Jl. Diponegoro No. 78, Medan Baru, Medan 20154",
            phone: "+62 61 5555 9101",
            email: "medan@mustahik.org", 
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.077690994554!2d98.6667254!3d3.5833313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312b3b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sJl.%20Diponegoro%2C%20Medan!5e0!3m2!1sen!2sid!4v1692345678903!5m2!1sen!2sid"
        }
    ];

    const quickLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Program Zakat", href: "/program/zakat" },
        { name: "Bantuan Sosial", href: "/program/bantuan" },
        { name: "Laporan Keuangan", href: "/laporan" },
        { name: "Cara Berdonasi", href: "/donasi" },
        { name: "FAQ", href: "/faq" }
    ];

    const programs = [
        { name: "Zakat Fitrah", href: "/program/fitrah" },
        { name: "Zakat Mal", href: "/program/mal" },
        { name: "Bantuan Pendidikan", href: "/program/pendidikan" },
        { name: "Bantuan Kesehatan", href: "/program/kesehatan" },
        { name: "Pemberdayaan UMKM", href: "/program/umkm" },
        { name: "Bantuan Darurat", href: "/program/darurat" }
    ];

    const socialLinks = [
        { 
            name: "WhatsApp", 
            href: "https://wa.me/628115551234",
            icon: "💬",
            color: "hover:bg-green-500"
        },
        { 
            name: "Instagram", 
            href: "https://instagram.com/mustahik_official",
            icon: "📷", 
            color: "hover:bg-pink-500"
        },
        { 
            name: "Facebook", 
            href: "https://facebook.com/mustahik.official",
            icon: "👥",
            color: "hover:bg-blue-600"
        },
        { 
            name: "YouTube", 
            href: "https://youtube.com/@mustahik",
            icon: "🎥",
            color: "hover:bg-red-500"
        },
        { 
            name: "Email", 
            href: "mailto:info@mustahik.org",
            icon: "✉️",
            color: "hover:bg-amber-500"
        }
    ];

    return (
        <footer className="bg-gradient-to-br from-green-800 via-green-900 to-emerald-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Company Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-green-800 font-bold text-lg">M</span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">Mustahik</h2>
                                <p className="text-green-200 text-sm">Menyalurkan Berkah Bersama</p>
                            </div>
                        </div>
                        
                        <p className="text-green-100 leading-relaxed">
                            Mustahik adalah lembaga amil zakat terpercaya yang berkomitmen menyalurkan 
                            zakat, infaq, dan sedekah untuk membantu saudara-saudara kita yang membutuhkan 
                            dengan transparansi dan akuntabilitas penuh.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">1.2M+</div>
                                <div className="text-xs text-green-200">Mustahik Terbantu</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">500K+</div>
                                <div className="text-xs text-green-200">Donatur Aktif</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">15+</div>
                                <div className="text-xs text-green-200">Tahun Berpengalaman</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-semibold text-amber-400 border-b border-amber-400 pb-2">
                            Menu Cepat
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-green-100 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-amber-400 transition-colors"></span>
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-semibold text-amber-400 border-b border-amber-400 pb-2">
                            Program Kami
                        </h3>
                        <ul className="space-y-3">
                            {programs.map((program, index) => (
                                <li key={index}>
                                    <a 
                                        href={program.href}
                                        className="text-green-100 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-amber-400 transition-colors"></span>
                                        <span>{program.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Location */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-lg font-semibold text-amber-400 border-b border-amber-400 pb-2">
                            Lokasi & Kontak
                        </h3>

                        {/* Office Selector */}
                        <div className="flex flex-wrap gap-2">
                            {offices.map((office, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedOffice(index)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        selectedOffice === index
                                            ? 'bg-amber-400 text-green-800'
                                            : 'bg-white bg-opacity-10 text-green-100 hover:bg-opacity-20'
                                    }`}
                                >
                                    {office.name}
                                </button>
                            ))}
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                            <h4 className="font-semibold text-amber-400 mb-3">
                                {offices[selectedOffice].name}
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start space-x-3">
                                    <span className="text-lg">📍</span>
                                    <span className="text-green-100">{offices[selectedOffice].address}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">📞</span>
                                    <a href={`tel:${offices[selectedOffice].phone}`} 
                                       className="text-green-100 hover:text-amber-400">
                                        {offices[selectedOffice].phone}
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">✉️</span>
                                    <a href={`mailto:${offices[selectedOffice].email}`} 
                                       className="text-green-100 hover:text-amber-400">
                                        {offices[selectedOffice].email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                src={offices[selectedOffice].mapUrl}
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-xl"
                                title={`Lokasi ${offices[selectedOffice].name}`}
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Social Media & Newsletter */}
                <div className="mt-12 pt-8 border-t border-green-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        
                        {/* Social Media */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-amber-400">
                                Ikuti Media Sosial Kami
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 ${social.color} group`}
                                    >
                                        <span className="text-lg">{social.icon}</span>
                                        <span className="font-medium">{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-amber-400">
                                Berlangganan Newsletter
                            </h3>
                            <p className="text-green-100 text-sm">
                                Dapatkan update terbaru tentang program dan kegiatan kami
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    className="flex-1 px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-green-600 text-white placeholder-green-300 focus:outline-none focus:border-amber-400 focus:bg-opacity-20 transition-all duration-300"
                                />
                                <button className="px-6 py-3 bg-amber-400 text-green-800 font-semibold rounded-lg hover:bg-amber-300 transition-all duration-300 hover:scale-105 transform">
                                    Berlangganan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-green-900 bg-opacity-50 border-t border-green-700">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-green-200 text-sm">
                            © 2024 Mustahik. Seluruh hak cipta dilindungi. 
                            <span className="text-amber-400"> Dibuat dengan ❤️ untuk kebaikan umat</span>
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="/privacy" className="text-green-200 hover:text-amber-400 transition-colors">
                                Kebijakan Privasi
                            </a>
                            <a href="/terms" className="text-green-200 hover:text-amber-400 transition-colors">
                                Syarat & Ketentuan
                            </a>
                            <a href="/sitemap" className="text-green-200 hover:text-amber-400 transition-colors">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}