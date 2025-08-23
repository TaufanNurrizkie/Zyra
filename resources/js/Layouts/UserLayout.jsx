import Footer from "@/Components/footer.jsx";
import Navbar from "../Components/Navbar.jsx";
import HeroSection from "@/Pages/user/HeroSection.jsx";
import AboutSection from "@/Pages/user/AboutSection.jsx";
import InformationSection from "@/Pages/user/InformationSection.jsx";
import ProgramSection from "@/Pages/user/ProgramSection.jsx";
import NewsSection from "@/Pages/user/NewSection.jsx";
import GallerySection from "@/Pages/user/GalerySection.jsx"; // pastikan typo: Gallery, bukan Galery
import FAQSection from "@/Pages/user/FaqSection.jsx";
import CalculatorSection from "@/Pages/user/CalculatorSection.jsx";
import { Calculator } from "lucide-react";

export default function UserLayout({ children, gallery }) {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <InformationSection />
            <CalculatorSection />
            <ProgramSection />
            <NewsSection />
            <GallerySection gallery={gallery} /> {/* kirim data ke sini */}
            <FAQSection />
            <Footer />
            {children}
        </div>
    );
}
