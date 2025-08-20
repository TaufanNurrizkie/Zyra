import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DashboardCards from "@/Components/DashboardCards";
import ChartSection from "@/Components/ChartSection";
import MustahikTable from "@/Components/MustahikTable";
import DistributionProgress from "@/Components/DistributionProgress";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "@/Components/animasiText/SplitText";

export default function AdminIndex() {
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
                {/* Judul */}
                <SplitText
                    text="Dashboard Admin"
                    className="text-8xl font-semibold text-center w-full"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                />

                {/* Cards Statistik */}
                <DashboardCards />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chart Distribusi */}
                    <ChartSection />

                    {/* Progress Distribusi */}
                    <DistributionProgress />
                </div>

                {/* Tabel Mustahik */}
                <MustahikTable />
            </div>

            {/* Animasi masuk */}
        </AdminLayout>
    );
}
