import React, { useState } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import Head from "next/head";

const PROPERTIES = [
  { id: 1, name: "Tropical Exo-Planet", sector: "Primary Systems", specs: "Beds | Baths | Sq10 Sq Ft | Habitable Biomes", price: "0.15 ETH", tag: "FEATURED", image: "/assets/exo-planet.jpg" },
  { id: 2, name: "Cyberpunk Space Station", sector: "Primary Systems", specs: "Beds | Baths | SqFt Sq Ft | Primary Systems", price: "2.5k ETH", tag: "LUXURY", image: "/assets/Station.jpg" }, // S besar sesuai GitHub
  { id: 3, name: "Luxury Starship Hangar", sector: "Primary Systems", specs: "Beds | Baths | Sq10 Sq Ft | Surface Area (km²)", price: "0.25 ETH", tag: "LIQUID", image: "/assets/Hangar.jpeg" }, // .jpeg dan H besar sesuai GitHub
  { id: 4, name: "Family Home For Space", sector: "Primary Systems", specs: "Beds | Baths | Sq10 Sq Ft | Family Biome", price: "25k ETH", tag: "LOUNGE", image: "/assets/exo-planet.jpg" }, // Sementara pakai exo-planet dulu biar gak kosong
  { id: 5, name: "Gangeoses-Instrose Plot", sector: "Primary Systems", specs: "Beds | Baths | SqFt Sq Ft | Surface Area (km²)", price: "2.5k ETH", tag: "LUXURE", image: "/assets/Plot.jpeg" }, // .jpeg dan P besar sesuai GitHub
  { id: 6, name: "Sprawling Ice Planet", sector: "Primary Systems", specs: "Beds | Bath | SqF5 Sq Ft | Asset Type", price: "2.5k ETH", tag: "HYDRO", image: "/assets/ice-planet.jpg" }
];


export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Memaksa load Tailwind CSS langsung dari CDN */}
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="google" content="notranslate" />
        <title>BASE PLANET</title>
      </Head>

      <nav className="bg-[#1a365d] text-white px-6 py-3 flex justify-between items-center text-xs tracking-wider">
        <span className="text-sm font-bold tracking-widest">🪐 BASE PLANET</span>
        <ConnectWallet theme="dark" btnTitle="CONNECT WALLET" className="!bg-blue-600 hover:!bg-blue-700 !text-white !text-[11px] !font-bold !px-4 !py-2 !rounded-md" />
      </nav>

      <div className="relative bg-slate-900 text-white py-24 px-6 text-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/assets/hero-bg.jpg')` }}>
        <h1 className="text-2xl md:text-4xl font-light leading-tight max-w-2xl mx-auto mb-6">Acquire exceptional virtual planets, starships, and habitats on the Base Network.</h1>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8">Discover Our Curated Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-md text-left">
              <div className="h-52 bg-slate-200 flex items-center justify-center text-xs text-slate-400 font-mono">[ {item.name} Artwork ]</div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                <p className="text-[11px] text-slate-400 mb-3">{item.sector}</p>
                <p className="text-[10px] text-slate-500 font-semibold border-t border-b border-slate-100 py-2 my-2">{item.specs}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs font-bold text-emerald-600">{item.price}</span>
                  <button className="bg-blue-500 text-white text-[10px] font-bold px-4 py-1.5 rounded uppercase">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
    }
  
