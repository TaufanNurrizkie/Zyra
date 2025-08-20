import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DashboardCards from "@/Components/DashboardCards";
import ChartSection from "@/Components/ChartSection";
import MustahikTable from "@/Components/MustahikTable";
import DistributionProgress from "@/Components/DistributionProgress";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "@/Components/animasiText/SplitText";
import MapMustahik from "@/Components/mapMustahik";

// ...import dll tetap sama

export default function AdminIndex({ mustahik }) {   // ✅ terima props dari Inertia
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.from(containerRef.current.children, {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, []);

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div
                ref={containerRef}
                className="p-8 bg-gray-100 min-h-screen space-y-8"
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

