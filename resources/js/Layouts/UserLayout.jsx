import Footer from "@/Components/footer.jsx";
import Navbar from "../Components/Navbar.jsx";
import HeroSection from "@/Pages/user/HeroSection.jsx";
import AboutSection from "@/Pages/user/AboutSection.jsx";
import InformationSection from "@/Pages/user/InformationSection.jsx";
import ProgramSection from "@/Pages/user/ProgramSection.jsx";
import NewsSection from "@/Pages/user/NewSection.jsx";
import GallerySection from "@/Pages/user/GalerySection.jsx";
import ChatWidget from "@/Pages/user/ChatWidget.jsx";

export default function UserLayout() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <InformationSection />
            <ProgramSection />
            <NewsSection />
            <GallerySection />
            <Footer />

            <ChatWidget />
        </div>
    );
}
