
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  ChevronRight, 
  X, 
  Activity, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Maximize2
} from 'lucide-react';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
  sparkline: number[];
}

const INITIAL_COINS: Coin[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 94281.42, change: 2.4, high: 96102.00, low: 92400.00, volume: '42.1B', marketCap: '1.8T', sparkline: [40, 50, 45, 60, 55, 70, 65, 80, 75, 90] },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 2841.12, change: -1.2, high: 2950.00, low: 2810.00, volume: '18.4B', marketCap: '341B', sparkline: [70, 65, 60, 55, 50, 45, 40, 35, 30, 25] },
  { id: '3', symbol: 'SOL', name: 'Solana', price: 142.08, change: 8.4, high: 145.00, low: 130.00, volume: '6.2B', marketCap: '62B', sparkline: [20, 30, 25, 40, 35, 50, 45, 60, 55, 70] },
  { id: '4', symbol: 'BNB', name: 'BNB', price: 612.45, change: 0.5, high: 620.00, low: 605.00, volume: '1.2B', marketCap: '94B', sparkline: [50, 52, 51, 53, 52, 54, 53, 55, 54, 56] },
  { id: '5', symbol: 'ADA', name: 'Cardano', price: 0.42, change: -2.1, high: 0.45, low: 0.41, volume: '482M', marketCap: '15B', sparkline: [60, 58, 56, 54, 52, 50, 48, 46, 44, 42] },
  { id: '6', symbol: 'DOT', name: 'Polkadot', price: 7.12, change: 1.8, high: 7.30, low: 6.90, volume: '210M', marketCap: '10B', sparkline: [30, 32, 31, 33, 32, 35, 34, 38, 37, 40] },
  { id: '7', symbol: 'LINK', name: 'Chainlink', price: 18.24, change: 3.2, high: 18.50, low: 17.10, volume: '512M', marketCap: '11B', sparkline: [40, 45, 42, 48, 45, 52, 50, 58, 55, 62] },
];

const TradingViewWidget: React.FC<{ symbol: string }> = ({ symbol }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": `BINANCE:${symbol}USDT`,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "backgroundColor": "rgba(5, 5, 5, 1)",
      "gridColor": "rgba(255, 255, 255, 0.05)",
      "hide_top_toolbar": false,
      "hide_legend": false,
      "save_image": false,
      "calendar": false,
      "hide_volume": false,
      "support_host": "https://www.tradingview.com"
    });

    if (container.current) {
      container.current.innerHTML = "";
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={container}>
      <div className="tradingview-widget-container__widget h-full w-full"></div>
    </div>
  );
};

const Markets: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>(INITIAL_COINS);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prev => prev.map(coin => {
        const drift = (Math.random() - 0.5) * (coin.price * 0.001);
        const newPrice = Math.max(0.01, coin.price + drift);
        const newSparkline = [...coin.sparkline.slice(1), 30 + Math.random() * 40];
        return { ...coin, price: newPrice, sparkline: newSparkline };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = useMemo(() => 
    coins.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.symbol.toLowerCase().includes(searchTerm.toLowerCase())),
    [coins, searchTerm]
  );

  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase font-display">Live Markets</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Real-time Trading Terminals Active</span>
          </div>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search assets (BTC, SOL, ETH...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all glass"
          />
        </div>
      </div>

      {/* Top Tickers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {coins.slice(0, 3).map(coin => (
          <div key={coin.id} className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BarChart3 className="w-16 h-16" />
             </div>
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold">
                      {coin.symbol[0]}
                   </div>
                   <div>
                      <div className="text-white font-bold">{coin.name}</div>
                      <div className="text-[10px] text-gray-500 tracking-widest uppercase">{coin.symbol} / USDT</div>
                   </div>
                </div>
                <div className={`text-xs font-bold ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                   {coin.change >= 0 ? '+' : ''}{coin.change}%
                </div>
             </div>
             <div className="text-2xl font-black text-white font-display mb-1">
                ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </div>
             <div className="h-12 mt-4">
                <Sparkline data={coin.sparkline} color={coin.change >= 0 ? '#4ade80' : '#f87171'} />
             </div>
          </div>
        ))}
      </div>

      {/* Market Table */}
      <div className="glass rounded-3xl border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
             <tr className="text-gray-500 border-b border-white/5 bg-white/5">
                <th className="px-6 py-5 font-bold uppercase tracking-widest text-[10px]">Asset</th>
                <th className="px-6 py-5 font-bold uppercase tracking-widest text-[10px]">Price</th>
                <th className="px-6 py-5 font-bold uppercase tracking-widest text-[10px]">24h Change</th>
                <th className="px-6 py-5 font-bold uppercase tracking-widest text-[10px] hidden md:table-cell">High / Low</th>
                <th className="px-6 py-5 font-bold uppercase tracking-widest text-[10px] hidden lg:table-cell">Volume (24h)</th>
                <th className="px-6 py-5 font-bold uppercase tracking-widest text-[10px]">Recent Trend</th>
                <th className="px-6 py-5"></th>
             </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
             {filteredCoins.map(coin => (
               <tr 
                key={coin.id} 
                className="hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => setSelectedCoin(coin)}
               >
                  <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-cyan-400 transition-colors font-bold text-xs border border-white/5 group-hover:border-cyan-500/30">
                           {coin.symbol}
                        </div>
                        <div>
                           <div className="text-white font-bold">{coin.name}</div>
                           <div className="text-[10px] text-gray-500 font-mono">{coin.symbol}</div>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-white font-medium">
                     ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5">
                     <div className={`flex items-center gap-1 font-bold ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {coin.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(coin.change)}%
                     </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                     <div className="text-[10px] text-gray-500">
                        <div className="flex justify-between w-24"><span>H:</span> <span className="text-gray-300">${coin.high}</span></div>
                        <div className="flex justify-between w-24"><span>L:</span> <span className="text-gray-300">${coin.low}</span></div>
                     </div>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell text-gray-400">
                     ${coin.volume}
                  </td>
                  <td className="px-6 py-5 w-32">
                     <div className="h-8">
                        <Sparkline data={coin.sparkline} color={coin.change >= 0 ? '#4ade80' : '#f87171'} />
                     </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                     <button className="p-2 hover:bg-cyan-500/20 rounded-lg transition-all text-gray-500 group-hover:text-cyan-400">
                        <Maximize2 className="w-4 h-4" />
                     </button>
                  </td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>

      {/* Chart Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass w-full max-w-6xl h-[85vh] rounded-[2.5rem] border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/40">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black font-black">
                      {selectedCoin.symbol}
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-white font-display uppercase">{selectedCoin.name} Analysis</h3>
                      <p className="text-gray-500 text-[10px] tracking-widest uppercase">Live Terminal Powered by TradingView</p>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedCoin(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white"
                >
                   <X className="w-6 h-6" />
                </button>
             </div>
             
             <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-4">
                {/* TradingView Integrated Chart */}
                <div className="lg:col-span-3 h-full relative border-r border-white/5">
                   <TradingViewWidget symbol={selectedCoin.symbol} />
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-1 p-6 space-y-6 overflow-y-auto bg-black/20">
                   <div>
                      <div className="text-3xl font-black text-white font-display mb-1">
                        ${selectedCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className={`flex items-center gap-2 font-bold text-xs ${selectedCoin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                         <TrendingUp className="w-3 h-3" />
                         {selectedCoin.change}% (24h)
                      </div>
                   </div>

                   <div className="glass p-5 rounded-2xl border-white/5 bg-white/[0.02]">
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-4">Market Metrics</h4>
                      <div className="space-y-3">
                         <MetricRow label="Market Cap" value={`$${selectedCoin.marketCap}`} />
                         <MetricRow label="Circulating Supply" value="19.7M" />
                         <MetricRow label="All-Time High" value="$98,421" />
                         <MetricRow label="Market Rank" value="#1" />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <button className="w-full py-4 bg-green-500 text-black font-black text-xs rounded-xl hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] uppercase tracking-widest">
                         Execute Long
                      </button>
                      <button className="w-full py-4 bg-red-500 text-white font-black text-xs rounded-xl hover:bg-red-400 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] uppercase tracking-widest">
                         Execute Short
                      </button>
                   </div>

                   <div className="p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
                      <div className="flex items-center gap-2 mb-2">
                         <Activity className="w-3 h-3 text-cyan-400" />
                         <span className="text-[10px] font-bold text-cyan-400 uppercase">Neural Alert</span>
                      </div>
                      <p className="text-gray-400 text-[10px] leading-relaxed">
                         Strong buy sentiment detected across neural-sync protocols. Market structure remains bullish on higher timeframes.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - d}`).join(' ');
  return (
    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const MetricRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] text-gray-500 uppercase font-medium">{label}</span>
    <span className="text-xs font-bold text-white">{value}</span>
  </div>
);

export default Markets;
