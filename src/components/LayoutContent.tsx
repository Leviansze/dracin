"use client";

import { Suspense } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useSidebar } from "@/contexts/SidebarContext";

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <>
            <Suspense fallback={<div className="h-screen w-64 bg-background border-r" />}>
                <Sidebar />
            </Suspense>
            <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
                <Suspense fallback={<div className="h-16" />}>
                    <Header />
                </Suspense>
                <main className="pt-16">
                    {children}
                </main>
            </div>
        </>
    );
}
