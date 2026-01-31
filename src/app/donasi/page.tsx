"use client";

import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";

interface PaymentMethod {
    id: string;
    name: string;
    logo: string;
    accountNumber: string;
    accountName: string;
    color: string;
}

const paymentMethods: PaymentMethod[] = [
    {
        id: "dana",
        name: "DANA",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dana/dana-original.svg",
        accountNumber: "083841407959",
        accountName: "DramaCinaID",
        color: "#118EEA",
    },
    {
        id: "gopay",
        name: "GOPAY",
        logo: "https://lelogama.go-jek.com/prime/upload/image/GoPay.png",
        accountNumber: "083841407959",
        accountName: "DramaCinaID",
        color: "#00AA13",
    },
    {
        id: "seabank",
        name: "SEABANK",
        logo: "https://asset.kompas.com/crops/7v8T7R6dO3M2d_LD3TqTMtYh9Ns=/0x0:1000x667/750x500/data/photo/2021/11/15/6191e0b1ec4b5.png",
        accountNumber: "901121822291",
        accountName: "DramaCinaID",
        color: "#FF6B00",
    },
    {
        id: "jago",
        name: "BANK JAGO",
        logo: "https://i.pinimg.com/originals/d9/34/a1/d934a1a1e8fe0b15f53f4a87e3a87eb2.png",
        accountNumber: "106123026061",
        accountName: "DramaCinaID",
        color: "#0066FF",
    },
];

function PaymentCard({ method }: { method: PaymentMethod }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(method.accountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="glass-strong rounded-2xl p-6 hover:bg-muted/50 transition-all group">
            {/* Logo and Name */}
            <div className="flex items-center justify-between mb-6">
                <div className="bg-white rounded-2xl p-4 h-20 flex items-center justify-center min-w-[140px]">
                    {method.id === "dana" && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">D</span>
                            </div>
                            <span className="text-blue-600 font-bold text-2xl">DANA</span>
                        </div>
                    )}
                    {method.id === "gopay" && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <span className="text-green-600 font-bold text-2xl">gopay</span>
                        </div>
                    )}
                    {method.id === "seabank" && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-orange-600 font-bold text-2xl">SeaBank</span>
                        </div>
                    )}
                    {method.id === "jago" && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}>
                                <span className="text-white font-bold text-lg">J</span>
                            </div>
                            <span className="text-blue-600 font-bold text-2xl">Jago</span>
                        </div>
                    )}
                </div>
                <span
                    className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full opacity-50"
                    style={{ color: method.color }}
                >
                    {method.name}
                </span>
            </div>

            {/* Account Number */}
            <div className="mb-4">
                <label className="text-xs uppercase tracking-wider text-primary/70 mb-2 block">
                    Nomor Rekening / HP
                </label>
                <div className="flex items-center gap-3 bg-background/50 rounded-xl p-4 border border-border/50">
                    <span className="font-mono text-xl font-bold flex-1">
                        {method.accountNumber}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Copy account number"
                    >
                        {copied ? (
                            <Check className="w-5 h-5 text-green-500" />
                        ) : (
                            <Copy className="w-5 h-5 text-muted-foreground" />
                        )}
                    </button>
                </div>
            </div>

            {/* Account Name */}
            <div>
                <label className="text-xs uppercase tracking-wider text-primary/70 mb-2 block">
                    Atas Nama
                </label>
                <p className="text-foreground font-semibold text-lg">{method.accountName}</p>
            </div>
        </div>
    );
}

export default function DonasiPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Dukung <span className="gradient-text">DramaCinaID</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Bantu kami terus memberikan konten drama terbaik dengan memberikan
                        dukungan melalui metode pembayaran di bawah ini. Setiap dukungan Anda
                        sangat berarti bagi kami.
                    </p>
                </div>

                {/* Payment Methods Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {paymentMethods.map((method) => (
                        <PaymentCard key={method.id} method={method} />
                    ))}
                </div>

                {/* Footer Message */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4 text-destructive fill-destructive" />
                        Terima kasih atas dukungan Anda yang luar biasa!
                        <Heart className="w-4 h-4 text-destructive fill-destructive" />
                    </p>
                </div>
            </div>
        </div>
    );
}
