import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DashboardCards from "@/Components/DashboardCards";
import ChartSection from "@/Components/ChartSection";
import MustahikTable from "@/Components/MustahikTable";
import MapMustahik from "@/Components/mapMustahik";
import SplitText from "@/Components/animasiText/SplitText";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ...import dll tetap sama

export default function AdminIndex({ mustahik }) {   // ✅ terima props dari Inertia
    const containerRef = useRef(null);

    useEffect(() => {
        const sections = containerRef.current.querySelectorAll(".anim-section");

        sections.forEach((section, index) => {
            gsap.from(section, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", 
                    toggleActions: "play none none none",
                },
                delay: index * 0.2, // biar muncul berurutan
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div
                ref={containerRef}
                className="p-8 bg-gray-100 min-h-screen space-y-12 dashboard-container"
            >
                <SplitText
                    text="Dashboard Admin"
                    className="text-[50px] font-semibold text-center w-full"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                />

                <DashboardCards mustahik={mustahik}/>
                <ChartSection />

                {/* ✅ lempar data mustahik ke MapMustahik */}
                <MapMustahik mustahik={mustahik} />

                <MustahikTable mustahik={mustahik} />

            </div>
        </AdminLayout>
    );
}

