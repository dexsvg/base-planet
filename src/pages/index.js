<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BASE PLANET | Virtual Real Estate on Base</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@thirdweb-dev/sdk@4.0.0/dist/browser/index.umd.js"></script>
  <!-- React & ReactDOM untuk Thirdweb React -->
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@thirdweb-dev/react@4.0.0/dist/thirdweb-react.umd.js"></script>
  <style>
    /* fallback sederhana jika gambar tidak ada */
    .asset-img {
      background-color: #1e293b;
      background-size: cover;
      background-position: center;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script>
    // Data properti (sama persis seperti sebelumnya)
    const PROPERTIES = [
      { id:1, name:"Tropical Exo-Planet", sector:"Primary Systems", specs:"4 Beds | 3 Baths | 10k Sq Ft", price:"0.15", tag:"FEATURED", image:"/assets/exo-planet.jpg", coordinates:"G-GLX-0482 // SECTOR 9", desc:"A breathtaking tropical paradise planet with pristine oceans and golden beaches." },
      { id:2, name:"Cyberpunk Space Station", sector:"Primary Systems", specs:"8 Beds | 6 Baths | 20k Sq Ft", price:"0.5", tag:"LUXURY", image:"/assets/station.jpg", coordinates:"N-CIT-9912 // NEON GRID", desc:"A massive decentralized space citadel powered by quantum computing cores." },
      { id:3, name:"Luxury Starship Hangar", sector:"Primary Systems", specs:"2 Beds | 4 Baths | 15k Sq Ft", price:"0.25", tag:"LIQUID", image:"/assets/hangar.jpeg", coordinates:"H-DRD-0115 // ORBITAL BAY", desc:"Industrial masterpiece for mega-starships with shield repair bays." },
      { id:4, name:"Family Home For Space", sector:"Primary Systems", specs:"5 Beds | 3 Baths | 12k Sq Ft", price:"0.5", tag:"LOUNGE", image:"/assets/family-home.jpeg", coordinates:"D-DOM-7411 // ATMOS-DOME", desc:"Secure climate-controlled biodome for colonization." },
      { id:5, name:"Gangeoses-Instrose Plot", sector:"Primary Systems", specs:"0 Beds | 0 Baths | 50k Sq Ft", price:"0.25", tag:"LUXURY", image:"/assets/plot.jpeg", coordinates:"M-NTA-8840 // CORE-MINE", desc:"Mineral-rich asset sector dense with rare cosmic compounds." },
      { id:6, name:"Sprawling Ice Planet", sector:"Primary Systems", specs:"2 Beds | 2 Baths | 8k Sq Ft", price:"0.25", tag:"HYDRO", image:"/assets/ice-planet.jpg", coordinates:"C-CRYO-0911 // FROZEN CORE", desc:"Majestic frozen world with endless cryo-oceans." }
    ];

    const MY_CONTRACT_ADDRESS = "0x263043098927A76cA8370363F6B815f34E716851";

    // Helper konversi ETH ke Wei (BigInt via string)
    function ethToWei(eth) {
      const [intPart, fracPart = ''] = eth.toString().split('.');
      const paddedFrac = fracPart.padEnd(18, '0').slice(0, 18);
      return BigInt(intPart) * 10n ** 18n + BigInt(paddedFrac);
    }

    // Render utama menggunakan React (ThirdwebProvider)
    const { ThirdwebProvider, ConnectWallet, useAddress, useContract, Web3Button } = window.thirdwebReact;
    const { BaseNetwork } = window.thirdwebChains || { BaseNetwork: { chainId: 8453, name: 'Base' } };

    function App() {
      const address = useAddress();
      const [selected, setSelected] = React.useState(null);
      const { contract, isLoading } = useContract(MY_CONTRACT_ADDRESS);

      return React.createElement('div', { className: 'min-h-screen bg-slate-50' },
        // Navbar
        React.createElement('nav', { className: 'bg-[#1a365d] text-white px-6 py-3 flex justify-between items-center sticky top-0 z-40' },
          React.createElement('span', { className: 'font-bold tracking-widest' }, '🪐 BASE PLANET'),
          React.createElement('div', { className: 'flex items-center gap-3' },
            address && React.createElement('span', { className: 'hidden sm:block text-xs font-mono' }, `${address.slice(0,6)}...${address.slice(-4)}`),
            React.createElement(ConnectWallet, { theme: 'dark', btnTitle: 'CONNECT WALLET' })
          )
        ),
        // Hero
        React.createElement('div', { 
          className: 'relative bg-slate-900 text-white py-24 px-6 text-center bg-cover bg-center',
          style: { backgroundImage: `linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.85)), url('/assets/hero-bg.jpeg')` }
        },
          React.createElement('h1', { className: 'text-2xl md:text-4xl font-light max-w-2xl mx-auto' }, 
            'Acquire exceptional virtual planets on the Base Network.'
          )
        ),
        // Grid properti
        React.createElement('main', { className: 'max-w-6xl mx-auto px-4 py-12' },
          React.createElement('h2', { className: 'text-xl md:text-2xl font-bold text-center mb-8' }, 'Discover Our Portfolios'),
          React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
            PROPERTIES.map(item => 
              React.createElement('div', { key: item.id, className: 'bg-white rounded-lg border shadow-md hover:scale-[1.02] transition overflow-hidden' },
                React.createElement('div', { className: 'h-52 relative bg-gray-200' },
                  React.createElement('img', { src: item.image, alt: item.name, className: 'w-full h-full object-cover', onError: (e) => e.target.src = 'https://placehold.co/600x400?text=No+Image' }),
                  React.createElement('span', { className: 'absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded' }, `🌌 ${item.coordinates}`)
                ),
                React.createElement('div', { className: 'p-4' },
                  React.createElement('div', { className: 'flex justify-between' },
                    React.createElement('h3', { className: 'font-bold' }, item.name),
                    React.createElement('span', { className: 'text-xs bg-blue-100 px-2 rounded' }, item.tag)
                  ),
                  React.createElement('p', { className: 'text-xs text-gray-400' }, item.sector),
                  React.createElement('p', { className: 'text-[10px] text-gray-500 border-t py-2 my-2' }, item.specs),
                  React.createElement('div', { className: 'flex justify-between items-center mt-2' },
                    React.createElement('span', { className: 'text-emerald-600 font-bold' }, `${item.price} ETH`),
                    React.createElement('button', { 
                      onClick: () => setSelected(item),
                      className: 'bg-blue-500 text-white text-xs px-3 py-1 rounded'
                    }, 'Detail')
                  )
                )
              )
            )
          )
        ),
        // Modal
        selected && React.createElement('div', { className: 'fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50' },
          React.createElement('div', { className: 'bg-white rounded-xl max-w-lg w-full' },
            React.createElement('div', { className: 'h-52 relative' },
              React.createElement('img', { src: selected.image, alt: selected.name, className: 'w-full h-full object-cover rounded-t-xl', onError: (e) => e.target.src = 'https://placehold.co/600x400?text=Preview' }),
              React.createElement('button', { onClick: () => setSelected(null), className: 'absolute top-2 right-2 bg-black/60 text-white w-7 h-7 rounded-full' }, '✕')
            ),
            React.createElement('div', { className: 'p-6' },
              React.createElement('h3', { className: 'text-xl font-bold' }, selected.name),
              React.createElement('p', { className: 'text-sm text-gray-500 mb-4' }, selected.sector),
              React.createElement('p', { className: 'text-sm bg-gray-50 p-3 rounded mb-4' }, selected.desc),
              React.createElement('p', { className: 'text-xs text-gray-400 border-b pb-2 mb-4' }, selected.specs),
              React.createElement('div', { className: 'flex justify-between items-center' },
                React.createElement('span', { className: 'text-xl font-bold text-emerald-600' }, `${selected.price} ETH`),
                !address ? React.createElement('button', { className: 'bg-gray-400 text-white px-6 py-2 rounded' }, 'Connect Wallet')
                : isLoading ? React.createElement('button', { className: 'bg-gray-400 px-6 py-2 rounded' }, 'Loading...')
                : React.createElement(Web3Button, {
                    contractAddress: MY_CONTRACT_ADDRESS,
                    action: async (contract) => {
                      const wei = ethToWei(selected.price);
                      await contract.call("mint", [selected.id], { value: wei.toString() });
                    },
                    onSuccess: () => { alert("Minting sukses!"); setSelected(null); },
                    onError: (err) => alert(`Error: ${err.message}`),
                    className: "!bg-emerald-500 !text-white !px-6 !py-2 !rounded"
                  }, "Mint / Buy")
              )
            )
          )
        )
      );
    }

    // Mounting dengan ThirdwebProvider
    const rootElement = document.getElementById('root');
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      React.createElement(ThirdwebProvider, { activeChain: "base" }, 
        React.createElement(App, null)
      )
    );
  </script>
</body>
</html>
