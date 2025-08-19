import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function DistributionProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      { width: "75%", duration: 2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Progress Distribusi Bantuan</h3>
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div
          ref={barRef}
          className="h-6 bg-green-600 text-white flex items-center justify-center text-sm font-bold"
        >
          75%
        </div>
      </div>
    </div>
  );
}
