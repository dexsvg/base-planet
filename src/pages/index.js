import React, { useState } from 'react';
import { 
  ThirdwebProvider, 
  ConnectWallet, 
  useContract, 
  useContractWrite, 
  useAddress,
  Web3Button 
} from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";

// Ganti dengan Alamat Kontrak Bos setelah di-deploy nanti
const CONTRACT_ADDRESS = "0x263043098927A76cA8370363F6B815f34E716851"; 

function MarketplaceApp() {
  const address = useAddress();
  const [selectedAsset, setSelectedAsset] = useState(1); // 1: Pulau, 2: Gunung, 3: Tanah

  const assetsData = [
    { id: 1, name: "Neon Cyber Island", type: "Pulau Virtual", price: "0.005 ETH", desc: "Pulau terapung privat berteknologi tinggi di ekosistem Base Planet.", img: "🏝️" },
    { id: 2, name: "Quantum Peak", type: "Gunung Virtual", price: "0.005 ETH", desc: "Gunung penghasil energi kuantum dengan hak penambangan on-chain penuh.", img: "🌋" },
    { id: 3, name: "Nexus Grid Sector", type: "Tanah Virtual", price: "0.005 ETH", desc: "Kavling strategis di pusat kota megacity Base Planet untuk dApp komersial.", img: "🗺️" }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col justify-between selection:bg-green-500 selection:text-black">
      {/* HEADER / NAVIGATION */}
      <header className="border-b border-green-900 bg-zinc-950 p-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-black tracking-widest uppercase text-white">
              BASE<span className="text-green-500">_PLANET</span> v1.0
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-zinc-500">// NETWORK: BASE_MAINNET</span>
            <ConnectWallet 
              theme="dark"
              btnTitle="Konek Wallet"
              className="!bg-green-950 !text-green-400 !border !border-green-500 hover:!bg-green-500 hover:!text-black !transition-all !rounded-none"
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 flex-grow w-full">
        {/* HERO SECTION */}
        <div className="border border-green-900 bg-zinc-950/40 p-6 md:p-12 mb-12 relative overflow-hidden rounded-lg">
          <div className="absolute top-0 right-0 p-2 text-xs text-zinc-700 select-none">SECURE_CONNECTION_ESTABLISHED</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Kuasai Real Estate Masa Depan Secara On-Chain
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Selamat datang di Base Planet. Platform desentralisasi mutakhir untuk klaim, perdagangan, dan kepemilikan aset geografis virtual bersertifikat NFT di jaringan L2 Base.
          </p>
        </div>

        {/* MARKETPLACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ASSET LIST (LEFT & CENTER) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {assetsData.map((asset) => (
              <div 
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={`border cursor-pointer p-6 bg-zinc-950/60 transition-all rounded-lg flex flex-col justify-between h-80 relative ${
                  selectedAsset === asset.id 
                    ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)] bg-zinc-900/60' 
                    : 'border-zinc-800 hover:border-green-800'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl">{asset.img}</span>
                    <span className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded">
                      ID: 00{asset.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{asset.name}</h3>
                  <p className="text-xs text-green-500 mb-3 font-semibold tracking-wider uppercase">{asset.type}</p>
                  <p className="text-xs text-zinc-400 line-clamp-3">{asset.desc}</p>
                </div>
                
                <div className="border-t border-zinc-900 pt-4 flex justify-between items-center mt-4">
                  <span className="text-xs text-zinc-500">MINT_PRICE</span>
                  <span className="text-lg font-bold text-white tracking-wide">{asset.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CONTROL PANEL / MINTING TERMINAL (RIGHT) */}
          <div className="border border-green-500/30 bg-zinc-950 p-6 flex flex-col justify-between rounded-lg relative shadow-inner">
            <div className="absolute top-2 right-3 flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b border-zinc-800 pb-2 flex items-center gap-2">
                <span>📟</span> TERMINAL KONTROL
              </h3>

              <div className="space-y-4 text-xs">
                <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                  <span className="text-zinc-500 block mb-1">// ASSET_TERPILIH</span>
                  <span className="text-white text-sm font-bold">
                    {assetsData.find(a => a.id === selectedAsset)?.name}
                  </span>
                </div>

                <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                  <span className="text-zinc-500 block mb-1">// STATUS_USER</span>
                  <span className="text-sm font-bold block truncate">
                    {address ? `CONNECTED: ${address}` : "NOT_CONNECTED"}
                  </span>
                </div>

                <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                  <span className="text-zinc-500 block mb-2">// ESTIMASI_GAS_FEE</span>
                  <span className="text-green-500 font-semibold">ULTRA_LOW (BASE L2)</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {address ? (
                <Web3Button
                  contractAddress={CONTRACT_ADDRESS}
                  action={(contract) => contract.call("mintAsset", [selectedAsset], { value: "5000000000000000" })}
                  onSuccess={() => alert("Transaksi Sukses! Aset Planet Berhasil Di-mint, Bos!")}
                  onError={(err) => alert(`Gagal minting: ${err.message}`)}
                  className="!w-full !bg-green-500 !text-black !font-mono !font-bold !text-sm !py-3 !rounded-none hover:!bg-green-400 !transition-all !shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                >
                  EKSEKUSI MINTING ({assetsData.find(a => a.id === selectedAsset)?.price})
                </Web3Button>
              ) : (
                <div className="text-center p-3 bg-zinc-900 border border-dashed border-zinc-800 text-zinc-500 text-xs rounded">
                  Hubungkan wallet Anda di pojok kanan atas untuk mengaktifkan modul minting.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 p-4 text-center text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 BASE PLANET INC. ALL RIGHTS RESERVED.</span>
          <span className="text-green-900 animate-pulse font-bold">SYSTEM_OPERATIONAL_100%</span>
        </div>
      </footer>
    </div>
  );
}

// Wrapper utama untuk mengaktifkan Web3 Context Provider
export default function App() {
  return (
    <ThirdwebProvider 
      activeChain={Base} 
      clientId="YOUR_THIRDWEB_CLIENT_ID" // Ganti dengan Client ID Thirdweb milik Bos nanti
    >
      <MarketplaceApp />
    </ThirdwebProvider>
  );
                }
        
