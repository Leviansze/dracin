"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface WatchHistoryItem {
    bookId: number;
    bookName: string;
    cover: string;
    episodeIndex?: number;
    episodeName?: string;
    timestamp: number;
    watchProgress?: number; // in seconds
}

interface WatchHistoryContextType {
    history: WatchHistoryItem[];
    addToHistory: (item: Omit<WatchHistoryItem, "timestamp">) => void;
    clearHistory: () => void;
    removeFromHistory: (bookId: number) => void;
}

const WatchHistoryContext = createContext<WatchHistoryContextType | undefined>(undefined);

const STORAGE_KEY = "dramacinaid_watch_history";
const MAX_HISTORY_ITEMS = 100;

export function WatchHistoryProvider({ children }: { children: ReactNode }) {
    const [history, setHistory] = useState<WatchHistoryItem[]>([]);

    // Load history from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setHistory(Array.isArray(parsed) ? parsed : []);
            }
        } catch (error) {
            console.error("Failed to load watch history:", error);
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (error) {
            console.error("Failed to save watch history:", error);
        }
    }, [history]);

    const addToHistory = useCallback((item: Omit<WatchHistoryItem, "timestamp">) => {
        setHistory((prev) => {
            // Remove existing entry for this drama if it exists
            const filtered = prev.filter((h) => h.bookId !== item.bookId);

            // Add new entry at the beginning
            const newHistory = [
                {
                    ...item,
                    timestamp: Date.now(),
                },
                ...filtered,
            ];

            // Keep only the most recent MAX_HISTORY_ITEMS
            return newHistory.slice(0, MAX_HISTORY_ITEMS);
        });
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear watch history:", error);
        }
    }, []);

    const removeFromHistory = useCallback((bookId: number) => {
        setHistory((prev) => prev.filter((h) => h.bookId !== bookId));
    }, []);

    return (
        <WatchHistoryContext.Provider
            value={{ history, addToHistory, clearHistory, removeFromHistory }}
        >
            {children}
        </WatchHistoryContext.Provider>
    );
}

export function useWatchHistory() {
    const context = useContext(WatchHistoryContext);
    if (context === undefined) {
        throw new Error("useWatchHistory must be used within a WatchHistoryProvider");
    }
    return context;
}
