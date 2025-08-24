import Footer from "@/Components/footer.jsx";
import Navbar from "../Components/Navbar.jsx";
import HeroSection from "@/Pages/user/HeroSection.jsx";
import AboutSection from "@/Pages/user/AboutSection.jsx";
import InformationSection from "@/Pages/user/InformationSection.jsx";
import ProgramSection from "@/Pages/user/ProgramSection.jsx";
import NewsSection from "@/Pages/user/NewSection.jsx";
import GallerySection from "@/Pages/user/GalerySection.jsx";
import ChatWidget from "@/Pages/user/ChatWidget.jsx";
import FAQSection from "@/Pages/user/FaqSection.jsx";
import CalculatorSection from "@/Pages/user/CalculatorSection.jsx";
import { Calculator } from "lucide-react";

export default function UserLayout({ children, mustahik, program, gallery, dana, programData, donatur, danaHariIni, berita }) {
    return (
        <div>
            <Navbar />
            <HeroSection
                danaHariIni={danaHariIni}
                mustahik={mustahik}
                donatur={donatur}
                program={program}
                dana={dana}
            />
            <AboutSection />
            <InformationSection />
            <CalculatorSection />
            <ProgramSection programData={programData} />
            <NewsSection berita={berita} />
            <GallerySection gallery={gallery} />
            <FAQSection />
            <Footer />
            <ChatWidget />
            {children}
        </div>
    );
}
