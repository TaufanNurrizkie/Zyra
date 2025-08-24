import Footer from "@/Components/footer.jsx";
import Navbar from "../Components/Navbar.jsx";
import HeroSection from "@/Pages/user/HeroSection.jsx";
import AboutSection from "@/Pages/user/AboutSection.jsx";
import InformationSection from "@/Pages/user/InformationSection.jsx";
import ProgramSection from "@/Pages/user/ProgramSection.jsx";
import NewsSection from "@/Pages/user/NewSection.jsx";
import GallerySection from "@/Pages/user/GalerySection.jsx"; // pastikan typo: Gallery, bukan Galery
import FAQSection from "@/Pages/user/FaqSection.jsx";

export default function UserLayout({  children, mustahik, program, gallery, dana  }) {
    return (
        <div>
            <Navbar />
             <HeroSection
                mustahik={mustahik}
                // donatur={donatur}
                program={program}
                dana={dana}
            />
            <AboutSection />
            <InformationSection />
            <ProgramSection programs={program} />
            <NewsSection />
            <GallerySection gallery={gallery} />
            <FAQSection />
            <Footer />
            {children}
        </div>
    );
}
