"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, TrendingUp, Radio, Play, Search, Heart, History, Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

const navLinks = [
    { path: "/", label: "Beranda", icon: Home },

    { path: "/terbaru", label: "Terbaru", icon: Clock },
    { path: "/terpopuler", label: "Terpopuler", icon: TrendingUp },
    { path: "/sulih-suara", label: "Sulih Suara", icon: Radio },
    { path: "/donasi", label: "Donasi", icon: Heart },
    { path: "/riwayat", label: "Riwayat", icon: History },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <aside className={`fixed left-0 top-0 h-screen bg-background border-r border-border z-40 flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
            {/* Logo & Toggle */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                {!isCollapsed && (
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="font-display font-bold text-xl gradient-text">
                            DramaCinaID
                        </span>
                    </Link>
                )}
                {isCollapsed && (
                    <Link href="/" className="mx-auto">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                    </Link>
                )}
                {!isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isCollapsed && (
                <button
                    onClick={toggleSidebar}
                    className="mx-auto mt-2 p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Expand Sidebar"
                >
                    <Menu className="w-5 h-5" />
                </button>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            title={isCollapsed ? link.label : undefined}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                } ${isCollapsed ? "justify-center" : ""}`}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && <span>{link.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Info */}
            {!isCollapsed && (
                <div className="p-6 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                        © 2026 DramaCinaID
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Nonton drama gratis
                    </p>
                </div>
            )}
        </aside>
    );
}
