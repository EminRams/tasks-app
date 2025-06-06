import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { logout } from "../api/auth";

export default function Layout() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [menuOpen, setMenuOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    function toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
        setDarkMode((prev) => !prev);
    }

    function handleLogout() {
        logout();
        window.location.href = "/login";
    }

    function handleMenuToggle() {
        setMenuOpen((prev) => !prev);
    }

    function handleClickOutside(e) {
        if (!e.target.closest("#user-menu")) setMenuOpen(false);
    }

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    return (
        <div className="flex flex-col min-h-screen items-center justify-center transition-colors bg-white dark:bg-gray-800 dark:text-gray-200">
            <header className="flex items-center justify-between w-full p-4 bg-gray-100 dark:bg-gray-900">
                <a href="/" className="text-lg flex items-center gap-2">
                    {/* Logo */}
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="7" width="18" height="13" rx="2" />
                        <path d="M16 3v4M8 3v4" />
                    </svg>
                    Tasks App
                </a>
                <div className="relative" id="user-menu">
                    <button
                        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        onClick={handleMenuToggle}
                    >
                        <span>
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
                                viewBox="0 0 24 24" className="inline-block">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
                            </svg>
                        </span>
                        <span>{user ? user.username : ""}</span>
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-10 border dark:border-gray-700">
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                onClick={toggleDarkMode}
                            >
                                <span>
                                    {darkMode ? (
                                        // Icono Modo Claro
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="5" />
                                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                        </svg>
                                    ) : (
                                        // Icono Modo Oscuro
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                                        </svg>
                                    )}
                                </span>
                                {darkMode ? "Modo claro" : "Modo oscuro"}
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 flex items-center gap-2"
                                onClick={handleLogout}
                            >
                                <span>
                                    {/*  Icono Cerrar Sesion */}
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                                        <path d="M3 21V3" />
                                    </svg>
                                </span>
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <Outlet />

            <footer className="flex justify-center w-full p-4 text-sm bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 items-center gap-2">
                {new Date().getFullYear()} - Tasks App by Emin Ramos.
            </footer>
        </div>
    )
}