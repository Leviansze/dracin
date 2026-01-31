"use client";

import { useState } from "react";
import Link from "next/link";
import { useWatchHistory } from "@/contexts/WatchHistoryContext";
import { Clock, Trash2, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function RiwayatPage() {
    const { history, clearHistory, removeFromHistory } = useWatchHistory();
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const formatTimestamp = (timestamp: number) => {
        try {
            return formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                locale: id,
            });
        } catch {
            return "Baru saja";
        }
    };

    const handleClearHistory = () => {
        clearHistory();
        setShowClearConfirm(false);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold gradient-text mb-2">
                            Riwayat Tontonan
                        </h1>
                        <p className="text-muted-foreground">
                            {history.length} drama {history.length === 1 ? "ditonton" : "ditonton"}
                        </p>
                    </div>

                    {history.length > 0 && (
                        <button
                            onClick={() => setShowClearConfirm(true)}
                            className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Hapus Semua</span>
                        </button>
                    )}
                </div>

                {/* Clear Confirmation Modal */}
                {showClearConfirm && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="glass-strong rounded-2xl p-6 max-w-md w-full">
                            <h3 className="text-xl font-bold mb-2">Hapus Semua Riwayat?</h3>
                            <p className="text-muted-foreground mb-6">
                                Tindakan ini tidak dapat dibatalkan. Semua riwayat tontonan akan dihapus.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="flex-1 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleClearHistory}
                                    className="flex-1 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* History List */}
                {history.length === 0 ? (
                    <div className="text-center py-20">
                        <Clock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Belum Ada Riwayat</h3>
                        <p className="text-muted-foreground mb-6">
                            Drama yang kamu tonton akan muncul di sini
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Jelajahi Drama
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {history.map((item) => (
                            <div
                                key={`${item.bookId}-${item.timestamp}`}
                                className="glass rounded-2xl p-4 hover:bg-muted/50 transition-all group"
                            >
                                <div className="flex gap-4">
                                    {/* Cover Image */}
                                    <Link
                                        href={`/detail/${item.bookId}`}
                                        className="relative w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-muted"
                                    >
                                        <img
                                            src={item.cover}
                                            alt={item.bookName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </Link>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/detail/${item.bookId}`}>
                                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                {item.bookName}
                                            </h3>
                                        </Link>

                                        {item.episodeName && (
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Episode {item.episodeIndex}: {item.episodeName}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{formatTimestamp(item.timestamp)}</span>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromHistory(item.bookId)}
                                        className="p-2 h-fit rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                                        aria-label="Hapus dari riwayat"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
