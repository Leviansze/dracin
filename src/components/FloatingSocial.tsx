"use client";

import { useState } from "react";
import { Instagram, Send, Facebook, Share2, X } from "lucide-react";

export function FloatingSocial() {
    const [isOpen, setIsOpen] = useState(false);

    const socials = [
        {
            name: "Instagram",
            icon: Instagram,
            url: "https://instagram.com/mhmmddsta.__",
            color: "from-pink-500 to-purple-500",
        },
        {
            name: "Telegram",
            icon: Send,
            url: "https://t.me/cLepiu",
            color: "from-blue-400 to-blue-600",
        },
        {
            name: "Facebook",
            icon: Facebook,
            url: "https://facebook.com/leviannzy",
            color: "from-blue-600 to-blue-700",
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Social Icons */}
            <div
                className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
            >
                {socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 group relative`}
                            style={{
                                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                            }}
                            aria-label={social.name}
                        >
                            <Icon className="w-5 h-5" />
                            {/* Tooltip */}
                            <span className="absolute right-16 bg-background/90 backdrop-blur-sm text-foreground text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border/50">
                                {social.name}
                            </span>
                        </a>
                    );
                })}
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 ${isOpen ? "rotate-90" : "rotate-0"
                    }`}
                aria-label="Toggle social media"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
            </button>
        </div>
    );
}
