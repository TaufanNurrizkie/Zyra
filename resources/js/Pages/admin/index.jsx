import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DashboardCards from '@/Components/DashboardCards';
import ChartSection from '@/Components/ChartSection';
import MustahikTable from '@/Components/MustahikTable';
import DistributionProgress from '@/Components/DistributionProgress';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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

            <div ref={containerRef} className="p-8 bg-gray-100 min-h-screen space-y-8">
                {/* Judul */}
                <h1 className="text-4xl font-extrabold text-green-700">
                    📊 Dashboard Admin
                </h1>

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
        </AdminLayout>
    );
}
