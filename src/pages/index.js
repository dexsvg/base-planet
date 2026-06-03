import React, { useState } from "react";
import {
  ConnectWallet,
  useAddress,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import Head from "next/head";
import Image from "next/image";

// Data properti dengan path gambar lokal (sudah disediakan di folder public/assets)
const PROPERTIES = [
  {
    id: 1,
    name: "Tropical Exo-Planet",
    sector: "Primary Systems",
    specs: "4 Beds | 3 Baths | 10k Sq Ft | Habitable Biomes",
    price: "0.15",
    tag: "FEATURED",
    image: "/assets/exo-planet.jpg",
    coordinates: "G-GLX-0482 // SECTOR 9",
    desc: "A breathtaking tropical paradise planet boasting pristine oceans, golden sand beaches, and stable twin star radiation. Perfect for high-end orbital tourism and luxurious private planetary estates.",
  },
  {
    id: 2,
    name: "Cyberpunk Space Station",
    sector: "Primary Systems",
    specs: "8 Beds | 6 Baths | 20k Sq Ft | Primary Systems",
    price: "0.5",
    tag: "LUXURY",
    image: "/assets/station.jpg",
    coordinates: "N-CIT-9912 // NEON GRID",
    desc: "A massive decentralized space citadel powered by quantum computing cores. Features infinite cyber-neon infrastructure, elite docking bays, and encrypted mainframe channels for sovereign digital entities.",
  },
  {
    id: 3,
    name: "Luxury Starship Hangar",
    sector: "Primary Systems",
    specs: "2 Beds | 4 Baths | 15k Sq Ft | Surface Area (km²)",
    price: "0.25",
    tag: "LIQUID",
    image: "/assets/hangar.jpeg",
    coordinates: "H-DRD-0115 // ORBITAL BAY",
    desc: "An industrial masterpiece engineered for mega-starships. Equipped with automated shield repair bays, localized grav-generators, and deep space defense mechanisms to protect your fleet.",
  },
  {
    id: 4,
    name: "Family Home For Space",
    sector: "Primary Systems",
    specs: "5 Beds | 3 Baths | 12k Sq Ft | Family Biome",
    price: "0.5",
    tag: "LOUNGE",
    image: "/assets/family-home.jpeg",
    coordinates: "D-DOM-7411 // ATMOS-DOME",
    desc: "A secure, climate-controlled biodome tailored for long-term human colonization. Includes artificial eco-gardens, safe atmospheric filters, and full radiation shielding for planetary families.",
  },
  {
    id: 5,
    name: "Gangeoses-Instrose Plot",
    sector: "Primary Systems",
    specs: "0 Beds | 0 Baths | 50k Sq Ft | Surface Area (km²)",
    price: "0.25",
    tag: "LUXURY",
    image: "/assets/plot.jpeg",
    coordinates: "M-NTA-8840 // CORE-MINE",
    desc: "A mineral-rich asset sector dense with heavy metals, raw diamonds, and rare cosmic compounds. Perfectly suited for automated autonomous extraction setups and heavy manufacturing.",
  },
  {
    id: 6,
    name: "Sprawling Ice Planet",
    sector: "Primary Systems",
    specs: "2 Beds | 2 Baths | 8k Sq Ft | Asset Type",
    price: "0.25",
    tag: "HYDRO",
    image: "/assets/ice-planet.jpg",
    coordinates: "C-CRYO-0911 // FROZEN CORE",
    desc: "A majestic frozen world containing endless cryo-oceans and ancient sub-glacial structures. Perfect for heavy hydro-mining operations and stealth research labs.",
  },
];

const MY_CONTRACT_ADDRESS = "0x263043098927A76cA8370363F6B815f34E716851";

// Fungsi konversi ETH ke Wei (1 ETH = 10^18 Wei)
const ethToWei = (eth) => {
  const [integer, decimal = ""] = eth.toString().split(".");
  const paddedDecimal = decimal.padEnd(18, "0").slice(0, 18);
  return BigInt(integer) * 10n ** 18n + BigInt(paddedDecimal);
};

export default function Home() {
  const address = useAddress();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const { contract, isLoading: contractLoading } = useContract(MY_CONTRACT_ADDRESS);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="google" content="notranslate" />
        <title>BASE PLANET - Virtual Real Estate on Base Network</title>
        <meta name="description" content="Acquire exceptional virtual planets, starships, and habitats on the Base Network." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAVIGATION BAR */}
      <nav className="bg-[#1a365d] text-white px-6 py-3 flex justify-between items-center text-xs tracking-wider sticky top-0 z-40 shadow-md">
        <span className="text-sm font-bold tracking-widest">🪐 BASE PLANET</span>
        <div className="flex items-center gap-3">
          {address && (
            <span className="hidden sm:inline-block bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md font-mono text-[10px]">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          )}
          <ConnectWallet
            theme="dark"
            btnTitle="CONNECT WALLET"
            className="!bg-blue-600 hover:!bg-blue-700 !text-white !text-[11px] !font-bold !px-4 !py-2 !rounded-md"
          />
        </div>
      </nav>

      {/* HERO BANNER dengan gambar lokal */}
      <div
        className="relative bg-slate-900 text-white py-24 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/assets/hero-bg.jpeg')`,
        }}
      >
        <h1 className="text-2xl md:text-4xl font-light leading-tight max-w-2xl mx-auto mb-6">
          Acquire exceptional virtual planets, starships, and habitats on the Base Network.
        </h1>
        <p className="text-sm opacity-80 max-w-lg mx-auto">
          Own unique digital assets secured on-chain. Mint, trade, and explore the cosmos.
        </p>
      </div>

      {/* PORTFOLIO GRID */}
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8">Discover Our Curated Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-md text-left flex flex-col justify-between transition-transform duration-200 hover:scale-[1.02]"
            >
              <div>
                <div className="h-52 w-full bg-slate-200 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900 bg-opacity-70 text-slate-300 text-[9px] px-2 py-0.5 rounded font-mono">
                    🌌 {item.coordinates}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded">{item.tag}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">{item.sector}</p>
                  <p className="text-[10px] text-slate-500 font-semibold border-t border-b border-slate-100 py-2 my-2">
                    {item.specs}
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center bg-slate-50 border-t border-slate-100">
                <span className="text-xs font-bold text-emerald-600">{item.price} ETH</span>
                <button
                  onClick={() => setSelectedPlanet(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded uppercase tracking-wider transition"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* POPUP MODAL DETAIL */}
      {selectedPlanet && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 text-left">
            <div className="h-52 relative bg-slate-900">
              <Image
                src={selectedPlanet.image}
                alt={selectedPlanet.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-3 right-3 bg-black bg-opacity-60 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-opacity-80 text-xs transition"
              >
                ✕
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900 bg-opacity-70 text-emerald-400 text-[10px] px-2 py-1 rounded font-mono">
                COORDINATES: {selectedPlanet.coordinates}
              </span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">{selectedPlanet.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                  {selectedPlanet.tag}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{selectedPlanet.sector}</p>

              <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4 leading-relaxed">
                {selectedPlanet.desc}
              </p>

              <div className="text-[10px] text-slate-500 font-mono mb-6 border-b border-slate-100 pb-3">
                {selectedPlanet.specs}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Asset Valuation</p>
                  <p className="text-xl font-bold text-emerald-600">{selectedPlanet.price} ETH</p>
                </div>

                {!address ? (
                  <button
                    className="bg-gray-400 cursor-not-allowed text-white text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wide"
                    disabled
                  >
                    Connect Wallet First
                  </button>
                ) : contractLoading ? (
                  <button
                    className="bg-gray-400 cursor-wait text-white text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wide"
                    disabled
                  >
                    Loading Contract...
                  </button>
                ) : (
                  <Web3Button
                    contractAddress={MY_CONTRACT_ADDRESS}
                    action={async (contract) => {
                      if (!contract) throw new Error("Contract not loaded");
                      const priceWei = ethToWei(selectedPlanet.price);
                      if (priceWei === 0n) throw new Error("Invalid price");
                      // Panggil fungsi mint(uint256 tokenId) payable
                      const tx = await contract.call("mint", [selectedPlanet.id], {
                        value: priceWei,
                      });
                      return tx;
                    }}
                    onSuccess={() => {
                      alert("🎉 Selamat! NFT Properti Berhasil di-Minting!");
                      setSelectedPlanet(null);
                    }}
                    onError={(error) => {
                      console.error(error);
                      alert(`Transaksi gagal: ${error.message || "Pastikan kontrak memiliki fungsi mint(uint256) payable dan Anda memiliki cukup ETH + gas."}`);
                    }}
                    className="!bg-emerald-500 hover:!bg-emerald-600 !text-white !text-xs !font-bold !px-6 !py-3 !rounded-lg !uppercase !tracking-wide transition"
                  >
                    Mint / Buy Asset
                  </Web3Button>
                )}
              </div>
              {address && (
                <p className="text-[9px] text-slate-400 mt-4 text-center border-t pt-3">
                  ⚡ Pastikan Anda memiliki cukup ETH (termasuk gas) di wallet Base Network.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
    }
