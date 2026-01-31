"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Filter, Bell } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { isCollapsed } = useSidebar();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`fixed top-0 right-0 z-50 glass-strong border-b border-border/50 transition-all duration-300 ${isCollapsed ? "left-20" : "left-64"}`}>
      <div className="px-6">
        <div className="flex items-center justify-center h-16 gap-6">
          {/* Search Bar - Centered */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Drama..."
                className="w-full h-11 pl-12 pr-12 bg-muted/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
                aria-label="Filter"
              >
                <Filter className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </form>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative p-2 hover:bg-muted/50 rounded-lg transition-colors outline-none"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-4 cursor-pointer focus:bg-muted/50">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Info Admin</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">Baru</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Selamat datang di DramaCinaID! Nikmati ribuan drama pendek gratis tanpa gangguan iklan.
                    </p>
                    <span className="text-[10px] text-muted-foreground mt-1">Baru saja</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
