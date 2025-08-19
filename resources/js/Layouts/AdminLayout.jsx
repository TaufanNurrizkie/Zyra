import React, { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  // Lock scroll saat sidebar open + ESC untuk close
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 shadow-lg fixed top-0 inset-x-0 z-40">
        <div className="h-16 flex items-center px-6">
          {/* Tombol Hamburger */}
          <button
            aria-label="Buka sidebar"
            onClick={() => setOpen(true)}
            className="text-white focus:outline-none mr-4"
          >
            {/* ICON HAMBURGER */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-green-800 font-bold text-sm">M</span>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              Zyra
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR + OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Sidebar */}
        <aside className="relative w-72 h-full bg-gradient-to-b from-green-600 via-green-700 to-emerald-800 text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                {/* ICON SETTINGS */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0-6c1.38 0 2.63.56 3.54 1.46A5 5 0 0119 8a5 5 0 01-3.46 4.54c-.91.9-2.16 1.46-3.54 1.46s-2.63-.56-3.54-1.46A5 5 0 015 8a5 5 0 013.46-4.54C9.37 2.56 10.62 2 12 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-xs text-white/70">Management Mustahik</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
                Manajemen
              </h3>
              <div className="space-y-1">
                <a
                  href="/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 transition"
                >
                  {/* ICON MAP */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 01.553-1.394L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A2 2 0 0021 18.382V8.618a2 2 0 00-.553-1.394L15 5m0 12V5" />
                  </svg>
                  <span>Daftar Area</span>
                </a>
                <a
                  href="/mustahik/data"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 transition"
                >
                  {/* ICON CALENDAR */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Data Mustahik</span>
                </a>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex items-center gap-3 mb-4 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <a href="/profile" className="flex items-center gap-3 w-full text-white no-underline">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  A
                </div>
                <div className="flex-1">
                  <h6 className="text-sm font-semibold mb-0">Admin</h6>
                  <small className="text-xs text-white/70">Administrator</small>
                </div>
              </a>
            </div>

            <a
              href="/logout"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              {/* ICON LOGOUT */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V4m-6 4V4m0 0H5a2 2 0 00-2 2v12a2 2 0 002 2h2" />
              </svg>
              <span>Logout</span>
            </a>
          </div>
        </aside>
      </div>

      {/* KONTEN */}
      <main className="pt-20 p-6 min-h-screen">{children}</main>
    </div>
  );
}
