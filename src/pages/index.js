import React, { useState } from 'react';
import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import Head from "next/head";

const PROPERTIES = [
  { id: 1, name: "Tropical Exo-Planet", sector: "Primary Systems", specs: "Beds | Baths | Sq10 Sq Ft | Habitable Biomes", price: "0.15", tag: "FEATURED", image: "/assets/exo-planet.jpg" },
  { id: 2, name: "Cyberpunk Space Station", sector: "Primary Systems", specs: "Beds | Baths | SqFt Sq Ft | Primary Systems", price: "0.5", tag: "LUXURY", image: "/assets/station.jpg" },
  { id: 3, name: "Luxury Starship Hangar", sector: "Primary Systems", specs: "Bar | Playground | Sq10 Sq Ft | Surface Area (km²)", price: "0.25", tag: "LIQUID", image: "/assets/hangar.jpeg" },
  { id: 4, name: "Family Home For Space", sector: "Primary Systems", specs: "Beds | Baths | Sq10 Sq Ft | Family Biome", price: "0.5", tag: "LOUNGE", image: "/assets/family-home.jpeg" }, 
  { id: 5, name: "Gangeoses-Instrose Plot", sector: "Primary Systems", specs: "Beds | Baths | SqFt Sq Ft | Surface Area (km²)", price: "0.25", tag: "LUXURE", image: "/assets/plot.jpeg" },
  { id: 6, name: "Sprawling Ice Planet", sector: "Primary Systems", specs: "Cold | full ice | SqF5 Sq Ft | Asset Type", price: "0.25", tag: "HYDRO", image: "/assets/ice-planet.jpg" }
];

const MY_CONTRACT_ADDRESS = 0x263043098927A76cA8370363F6B815f34E716851; 

export default function Home() {
  const address = useAddress();
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="google" content="notranslate" />
        <title>BASE PLANET</title>
      </Head>

      {/* NAVBAR */}
      <nav className="bg-[#1a365d] text-white px-6 py-3 flex justify-between items-center text-xs tracking-wider sticky top-0 z-40 shadow-md">
        <span className="text-sm font-bold tracking-widest">🪐 BASE PLANET</span>
        <div className="flex items-center gap-2">
          {address && (
            <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono text-[10px]">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          )}
          <ConnectWallet theme="dark" btnTitle="CONNECT WALLET" className="!bg-blue-600 hover:!bg-blue-700 !text-white !text-[11px] !font-bold !px-4 !py-2 !rounded-md" />
        </div>
      </nav>

      {/* HERO */}
      <div className="relative bg-slate-900 text-white py-24 px-6 text-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/assets/hero-bg.jpeg')` }}>
        <h1 className="text-2xl md:text-4xl font-light leading-tight max-w-2xl mx-auto mb-6">Acquire exceptional virtual planets, starships, and habitats on the Base Network.</h1>
      </div>

      {/* GRID PORTFOLIO */}
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8">Discover Our Curated Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-md text-left flex flex-col justify-between">
              <div>
                <div className="h-52 w-full bg-slate-200 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                  <p className="text-[11px] text-slate-400 mb-3">{item.sector}</p>
                  <p className="text-[10px] text-slate-500 font-semibold border-t border-b border-slate-100 py-2 my-2">{item.specs}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center bg-slate-50 border-t border-slate-100">
                <span className="text-xs font-bold text-emerald-600">{item.price} ETH</span>
                <button 
                  onClick={() => setSelectedPlanet(item)} 
                  className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded uppercase"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DETAIL POPUP */}
      {selectedPlanet && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 text-left">
            <div className="h-48 relative bg-slate-900">
              <img src={selectedPlanet.image} alt={selectedPlanet.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedPlanet(null)} className="absolute top-3 right-3 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">✕</button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{selectedPlanet.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{selectedPlanet.sector}</p>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">Properti virtual masa depan di jaringan Base Network. Siap di-minting menggunakan smart contract.</p>
              <div className="text-[10px] text-slate-500 font-mono mb-6">{selectedPlanet.specs}</div>
              <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Price</p>
                  <p className="text-lg font-bold text-emerald-600">{selectedPlanet.price} ETH</p>
                </div>

                {/* VERSI TERAMAN: Menggunakan parsing objek bawaan Thirdweb SDK */}
                <Web3Button
                  contractAddress={MY_CONTRACT_ADDRESS}
                  action={async (contract) => {
                    await contract.call("mint", [selectedPlanet.id], {
                      value: (parseFloat(selectedPlanet.price) * 10 ** 18).toString(),
                    });
                  }}
                  onSuccess={() => alert("Selamat! Transaksi minting berhasil ditransmisikan.")}
                  onError={(err) => alert(`Gagal transaksi: ${err.message}`)}
                  className="!bg-emerald-500 hover:!bg-emerald-600 !text-white !text-xs !font-bold !px-6 !py-2.5 !rounded-lg !uppercase"
                >
                  Mint / Buy Asset
                </Web3Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
    }
    
