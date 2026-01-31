"use client";

import { HeroSection } from "@/components/HeroSection";
import { DramaGrid } from "@/components/DramaGrid";
import {
  useForYouDramas,
  useLatestDramas,
  useTrendingDramas,
  useDubindoDramas
} from "@/hooks/useDramas";
import Link from "next/link";
import { ChevronRight, Sparkles, Flame, Clock, Radio } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

function SectionHeader({ title, icon, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="text-2xl font-bold font-display">{title}</h2>
      </div>
      <Link
        href={href}
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
      >
        Lihat Semua
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

export default function HomeContent() {
  const { data: forYou, isLoading: forYouLoading } = useForYouDramas();
  const { data: trending, isLoading: trendingLoading } = useTrendingDramas();
  const { data: latest, isLoading: latestLoading } = useLatestDramas();
  const { data: dubindo, isLoading: dubindoLoading } = useDubindoDramas();

  return (
    <main className="min-h-screen bg-background pb-24">
      <HeroSection
        title="DramaCinaID"
        description="Nonton drama pendek gratis dan tanpa iklan. Koleksi terlengkap dengan kualitas terbaik!"
        icon="sparkles"
      />

      <div className="container mx-auto px-4 space-y-16 mt-8">
        {/* Untuk Kamu Section */}
        <section>
          <SectionHeader
            title="Untuk Kamu"
            icon={<Sparkles className="w-5 h-5" />}
            href="/terpopuler"
          />
          <DramaGrid dramas={forYou} isLoading={forYouLoading} />
        </section>

        {/* Terpopuler Section */}
        <section>
          <SectionHeader
            title="Terpopuler"
            icon={<Flame className="w-5 h-5" />}
            href="/terpopuler"
          />
          <DramaGrid dramas={trending?.slice(0, 10)} isLoading={trendingLoading} />
        </section>

        {/* Terbaru Section */}
        <section>
          <SectionHeader
            title="Baru Rilis"
            icon={<Clock className="w-5 h-5" />}
            href="/terbaru"
          />
          <DramaGrid dramas={latest?.slice(0, 10)} isLoading={latestLoading} />
        </section>

        {/* Dubindo Section */}
        <section>
          <SectionHeader
            title="Sulih Suara Indonesia"
            icon={<Radio className="w-5 h-5" />}
            href="/sulih-suara"
          />
          <DramaGrid dramas={dubindo?.slice(0, 10)} isLoading={dubindoLoading} />
        </section>
      </div>
    </main>
  );
}
