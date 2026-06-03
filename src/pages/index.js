import { useState } from "react";
import { ConnectWallet, useAddress, useContract, Web3Button } from "@thirdweb-dev/react";
import Head from "next/head";
import Image from "next/image";

const PROPERTIES = [
  { id:1, name:"Tropical Exo-Planet", sector:"Primary Systems", specs:"4 Beds | 3 Baths | 10k Sq Ft", price:"0.15", tag:"FEATURED", image:"/assets/exo-planet.jpg", coordinates:"G-GLX-0482 // SECTOR 9", desc:"A breathtaking tropical paradise planet..." },
  { id:2, name:"Cyberpunk Space Station", sector:"Primary Systems", specs:"8 Beds | 6 Baths | 20k Sq Ft", price:"0.5", tag:"LUXURY", image:"/assets/station.jpg", coordinates:"N-CIT-9912 // NEON GRID", desc:"A massive decentralized space citadel..." },
  { id:3, name:"Luxury Starship Hangar", sector:"Primary Systems", specs:"2 Beds | 4 Baths | 15k Sq Ft", price:"0.25", tag:"LIQUID", image:"/assets/hangar.jpeg", coordinates:"H-DRD-0115 // ORBITAL BAY", desc:"An industrial masterpiece..." },
  { id:4, name:"Family Home For Space", sector:"Primary Systems", specs:"5 Beds | 3 Baths | 12k Sq Ft", price:"0.5", tag:"LOUNGE", image:"/assets/family-home.jpeg", coordinates:"D-DOM-7411 // ATMOS-DOME", desc:"A secure, climate-controlled biodome..." },
  { id:5, name:"Gangeoses-Instrose Plot", sector:"Primary Systems", specs:"0 Beds | 0 Baths | 50k Sq Ft", price:"0.25", tag:"LUXURY", image:"/assets/plot.jpeg", coordinates:"M-NTA-8840 // CORE-MINE", desc:"Mineral-rich asset sector..." },
  { id:6, name:"Sprawling Ice Planet", sector:"Primary Systems", specs:"2 Beds | 2 Baths | 8k Sq Ft", price:"0.25", tag:"HYDRO", image:"/assets/ice-planet.jpg", coordinates:"C-CRYO-0911 // FROZEN CORE", desc:"Majestic frozen world..." }
];

const MY_CONTRACT_ADDRESS = "0x263043098927A76cA8370363F6B815f34E716851";

function ethToWei(eth) {
  const [int, dec = ""] = eth.toString().split(".");
  const decPadded = dec.padEnd(18, "0").slice(0,18);
  return BigInt(int) * 10n**18n + BigInt(decPadded);
}

export default function Home() {
  const address = useAddress();
  const [selected, setSelected] = useState(null);
  const { contract, isLoading } = useContract(MY_CONTRACT_ADDRESS);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Head>
        <title>BASE PLANET</title>
        <meta name="description" content="Virtual real estate on Base Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="bg-[#1a365d] text-white px-6 py-3 flex justify-between items-center sticky top-0 z-40">
        <span className="font-bold tracking-widest">🪐 BASE PLANET</span>
        <div className="flex items-center gap-3">
          {address && <span className="hidden sm:block text-xs font-mono">{address.slice(0,6)}...{address.slice(-4)}</span>}
          <ConnectWallet theme="dark" btnTitle="CONNECT WALLET" />
        </div>
      </nav>

      <div className="relative bg-slate-900 text-white py-24 px-6 text-center bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.85)), url('/assets/hero-bg.jpeg')`}}>
        <h1 className="text-2xl md:text-4xl font-light max-w-2xl mx-auto">Acquire exceptional virtual planets on the Base Network.</h1>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Discover Our Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map(item => (
            <div key={item.id} className="bg-white rounded-lg border shadow-md hover:scale-[1.02] transition">
              <div className="h-52 relative bg-gray-200">
                <Image src={item.image} alt={item.name} fill className="object-cover rounded-t-lg" unoptimized />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">🌌 {item.coordinates}</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between"><h3 className="font-bold">{item.name}</h3><span className="text-xs bg-blue-100 px-2 rounded">{item.tag}</span></div>
                <p className="text-xs text-gray-400">{item.sector}</p>
                <p className="text-[10px] text-gray-500 border-t py-2 my-2">{item.specs}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-emerald-600 font-bold">{item.price} ETH</span>
                  <button onClick={() => setSelected(item)} className="bg-blue-500 text-white text-xs px-3 py-1 rounded">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="h-52 relative">
              <Image src={selected.image} alt={selected.name} fill className="object-cover rounded-t-xl" unoptimized />
              <button onClick={() => setSelected(null)} className="absolute top-2 right-2 bg-black/60 text-white w-7 h-7 rounded-full">✕</button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{selected.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{selected.sector}</p>
              <p className="text-sm bg-gray-50 p-3 rounded mb-4">{selected.desc}</p>
              <p className="text-xs text-gray-400 border-b pb-2 mb-4">{selected.specs}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-emerald-600">{selected.price} ETH</span>
                {!address ? (
                  <button className="bg-gray-400 text-white px-6 py-2 rounded">Connect Wallet</button>
                ) : isLoading ? (
                  <button className="bg-gray-400 px-6 py-2 rounded">Loading...</button>
                ) : (
                  <Web3Button
                    contractAddress={MY_CONTRACT_ADDRESS}
                    action={async (contract) => {
                      const wei = ethToWei(selected.price);
                      await contract.call("mint", [selected.id], { value: wei });
                    }}
                    onSuccess={() => { alert("Minting sukses!"); setSelected(null); }}
                    onError={(err) => alert(`Error: ${err.message}`)}
                    className="!bg-emerald-500 !text-white !px-6 !py-2 !rounded"
                  >
                    Mint / Buy
                  </Web3Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  }
