import './globals.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Ganti dengan Alamat Kontrak Bos setelah di-deploy
const CONTRACT_ADDRESS = "0x263043098927A76cA8370363F6B815f34E716851"; 

// ABI singkat untuk fungsi mintAsset
const CONTRACT_ABI = [
  "function mintAsset(uint256 _assetType) public payable",
  "function owner() public view returns (address)"
];

export default function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(1);
  const [loading, setLoading] = useState(false);

  const assetsData = [
    { id: 1, name: "Neon Cyber Island", type: "Pulau Virtual", price: "0.005 ETH", valueWei: "5000000000000000", desc: "Pulau terapung privat berteknologi tinggi di ekosistem Base Planet.", img: "🏝️" },
    { id: 2, name: "Quantum Peak", type: "Gunung Virtual", price: "0.005 ETH", valueWei: "5000000000000000", desc: "Gunung penghasil energi kuantum dengan hak penambangan on-chain penuh.", img: "🌋" },
    { id: 3, name: "Nexus Grid Sector", type: "Tanah Virtual", price: "0.005 ETH", valueWei: "5000000000000000", desc: "Kavling strategis di pusat kota megacity Base Planet untuk dApp komersial.", img: "🗺️" }
  ];

  // Fungsi Konek Wallet (OKX Wallet / MetaMask / Coinbase Wallet)
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const _signer = _provider.getSigner();
        const _account = await _signer.getAddress();
        
        setProvider(_provider);
        setSigner(_signer);
        setAccount(_account);
      } catch (err) {
        alert("Gagal konek wallet, Bos: " + err.message);
      }
    } else {
      alert("Wah, wallet tidak terdeteksi. Silakan pasang OKX Wallet atau MetaMask dulu, Bos!");
    }
  };

  // Fungsi Eksekusi Minting Langsung ke Blockchain
  const handleMint = async () => {
    if (!signer) return alert("Konek wallet dulu, Bos!");
    setLoading(true);

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const currentAsset = assetsData.find(a => a.id === selectedAsset);
      
      // Kirim transaksi mint ke Base Network
      const tx = await contract.mintAsset(selectedAsset, {
        value: currentAsset.valueWei
      });
      
      alert("Transaksi dikirim! Menunggu konfirmasi jaringan...");
      await tx.wait(); // Tunggu sampai block selesai di-mine
      alert("Mantap Bos! NFT Properti Berhasil Di-mint!");
    } catch (err) {
      alert("Gagal eksekusi minting: " + (err.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Deteksi jika user ganti account di wallet-nya
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
        else setAccount("");
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col justify-between selection:bg-green-500 selection:text-black">
      {/* HEADER */}
      <header className="border-b border-green-900 bg-zinc-950 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-black tracking-widest text-white">
              BASE<span className="text-green-500">_PLANET</span> v1.0
            </h1>
          </div>
          <div>
            <button 
              onClick={connectWallet}
              className="bg-green-950 text-green-400 border border-green-500 px-4 py-2 font-bold hover:bg-green-500 hover:text-black transition-all"
            >
              {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "KONEK WALLET"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 flex-grow w-full">
        <div className="border border-green-900 bg-zinc-950/40 p-6 md:p-12 mb-12 rounded-lg relative">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Kuasai Real Estate Masa Depan Secara On-Chain
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm">
            Selamat datang di Base Planet. Platform desentralisasi mutakhir untuk klaim, perdagangan, dan kepemilikan aset geografis virtual bersertifikat NFT di jaringan L2 Base.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CARDS LIST */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {assetsData.map((asset) => (
              <div 
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={`border cursor-pointer p-6 bg-zinc-950/60 transition-all rounded-lg flex flex-col justify-between h-80 ${
                  selectedAsset === asset.id ? 'border-green-500 bg-zinc-900/60 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-zinc-800 hover:border-green-800'
                }`}
              >
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-4xl">{asset.img}</span>
                    <span className="text-xs px-2 py-1 bg-zinc-900 text-zinc-400 rounded">ID: 00{asset.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{asset.name}</h3>
                  <p className="text-xs text-green-500 mb-3 font-semibold tracking-wider uppercase">{asset.type}</p>
                  <p className="text-xs text-zinc-400">{asset.desc}</p>
                </div>
                <div className="border-t border-zinc-900 pt-4 flex justify-between items-center mt-4">
                  <span className="text-xs text-zinc-500">MINT_PRICE</span>
                  <span className="text-lg font-bold text-white">{asset.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* TERMINAL PANEL */}
          <div className="border border-green-500/30 bg-zinc-950 p-6 flex flex-col justify-between rounded-lg">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b border-zinc-800 pb-2">📟 TERMINAL KONTROL</h3>
              <div className="space-y-4 text-xs">
                <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                  <span className="text-zinc-500 block mb-1">// ASSET_TERPILIH</span>
                  <span className="text-white text-sm font-bold">{assetsData.find(a => a.id === selectedAsset)?.name}</span>
                </div>
                <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                  <span className="text-zinc-500 block mb-1">// STATUS_USER</span>
                  <span className="text-sm font-bold block truncate">{account ? `CONNECTED: ${account}` : "NOT_CONNECTED"}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {account ? (
                <button
                  onClick={handleMint}
                  disabled={loading}
                  className="w-full bg-green-500 text-black font-mono font-bold text-sm py-3 hover:bg-green-400 transition-all disabled:opacity-50"
                >
                  {loading ? "PROSES MINTING..." : `EKSEKUSI MINTING (${assetsData.find(a => a.id === selectedAsset)?.price})`}
                </button>
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
        <span>&copy; 2026 BASE PLANET INC. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
                                                                           }
            
