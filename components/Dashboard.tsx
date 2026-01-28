
import React from 'react';
import { 
  BarChart3, 
  Activity, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Globe, 
  RefreshCcw,
  User,
  Settings,
  Bell,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { ViewState } from '../App';

interface DashboardProps {
  view: ViewState;
  setView: (v: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ view, setView }) => {
  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sub-Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-display">
            {view === 'overview' ? 'Network Overview' : 'User Terminal'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {view === 'overview' 
              ? 'Real-time protocol metrics and liquidity health.' 
              : 'Secure management of your neural assets and vault positions.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="p-3 glass rounded-xl hover:bg-white/5 transition-all text-gray-400">
             <Bell className="w-5 h-5" />
           </button>
           <button className="p-3 glass rounded-xl hover:bg-white/5 transition-all text-gray-400">
             <Settings className="w-5 h-5" />
           </button>
           <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
           <div className="flex items-center gap-3 glass py-1.5 px-3 rounded-xl border-cyan-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center">
                 <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Account</div>
                <div className="text-xs text-white font-mono">0x71C...3d92</div>
              </div>
           </div>
        </div>
      </div>

      {view === 'overview' ? <OverviewView /> : <MyPageView />}
    </div>
  );
};

const OverviewView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Main Stats Grid */}
    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard 
        title="Total Value Locked" 
        value="$12,482,001,492" 
        change="+2.4%" 
        isPositive={true}
        icon={<Wallet className="w-5 h-5 text-cyan-400" />}
      />
      <StatCard 
        title="24h Volume" 
        value="$841,209,122" 
        change="-0.8%" 
        isPositive={false}
        icon={<Activity className="w-5 h-5 text-magenta-400" />}
      />
      
      {/* Dynamic Chart Area */}
      <div className="md:col-span-2 glass p-8 rounded-3xl border-white/5 relative overflow-hidden group">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-bold">Protocol Revenue</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Last 30 Days</p>
          </div>
          <div className="flex gap-2">
            {['1D', '1W', '1M', '1Y'].map(t => (
              <button key={t} className={`px-3 py-1 text-[10px] font-bold rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all ${t === '1M' ? 'bg-cyan-500 text-black border-none' : 'text-gray-400'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        
        {/* Fake Visual Chart */}
        <div className="h-64 flex items-end gap-2 px-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-500/80 rounded-t-sm transition-all hover:brightness-150 cursor-pointer"
              style={{ height: `${20 + Math.sin(i * 0.5) * 40 + Math.random() * 30}%` }}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Sidebar Metrics */}
    <div className="space-y-6">
      <div className="glass p-6 rounded-3xl border-white/5">
        <h3 className="text-sm font-bold mb-6 tracking-widest uppercase text-gray-400">Node Clusters</h3>
        <div className="space-y-4">
          <NodeItem location="US-East-1" status="Operational" load={62} />
          <NodeItem location="EU-West-2" status="Operational" load={48} />
          <NodeItem location="AP-South-1" status="Maintenance" load={0} isWarning />
          <NodeItem location="Neural-Sync-0" status="Synchronizing" load={92} />
        </div>
      </div>

      <div className="glass p-6 rounded-3xl border-white/5 bg-cyan-500/5 group hover:bg-cyan-500/10 transition-all">
        <div className="flex items-center gap-4 mb-4">
           <div className="p-3 bg-cyan-500 rounded-2xl text-black">
              <RefreshCcw className="w-6 h-6 animate-spin-slow" />
           </div>
           <div>
              <div className="text-white font-bold">Auto-Compounding</div>
              <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">Protocol Active</div>
           </div>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed">
          The neural engine is currently rebalancing 4,821 liquidity pools to maximize yield across the mesh.
        </p>
      </div>
    </div>
  </div>
);

const MyPageView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Left Column: Wallet Summary */}
    <div className="lg:col-span-4 space-y-6">
       <div className="glass p-8 rounded-3xl border-cyan-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
          <div className="text-[10px] font-bold text-cyan-400 tracking-[0.3em] uppercase mb-2">Vault Balance</div>
          <div className="text-4xl font-black text-white mb-6 font-display">$241,084.<span className="text-gray-500 text-2xl">04</span></div>
          <div className="flex gap-2">
             <button className="flex-1 py-3 bg-cyan-500 text-black font-bold text-xs rounded-xl hover:bg-cyan-400 transition-all">DEPOSIT</button>
             <button className="flex-1 py-3 glass text-white font-bold text-xs rounded-xl hover:bg-white/10 transition-all">WITHDRAW</button>
          </div>
       </div>

       <div className="glass p-6 rounded-3xl border-white/5">
          <h3 className="text-sm font-bold mb-4 text-gray-400">YOUR ASSETS</h3>
          <div className="space-y-3">
             <AssetItem name="AE-CORE" amount="12.42" value="$84,201" color="bg-cyan-500" />
             <AssetItem name="NEURAL-GAS" amount="4,821.00" value="$12,110" color="bg-purple-500" />
             <AssetItem name="ETH-WRAP" amount="42.1" value="$144,773" color="bg-blue-500" />
          </div>
       </div>
    </div>

    {/* Right Column: Activity & Positions */}
    <div className="lg:col-span-8 space-y-6">
       <div className="glass rounded-3xl border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
             <h3 className="font-bold text-white uppercase tracking-widest text-xs">Active Staking Positions</h3>
             <button className="text-cyan-400 text-[10px] font-bold hover:underline">VIEW ALL</button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead>
                   <tr className="text-gray-500 border-b border-white/5">
                      <th className="px-6 py-4 font-medium uppercase tracking-widest text-[10px]">Strategy</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-widest text-[10px]">APY</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-widest text-[10px]">Earnings</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-widest text-[10px]">Status</th>
                      <th className="px-6 py-4"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   <PositionRow name="Aetheris-Prime" apy="12.4%" earnings="+$1,402" status="Active" />
                   <PositionRow name="Neural-Flash-LP" apy="24.8%" earnings="+$842" status="Active" />
                   <PositionRow name="Stable-Mesh" apy="4.2%" earnings="+$12" status="Locked" />
                </tbody>
             </table>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-3xl border-white/5">
             <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-6">Recent Activity</h3>
             <div className="space-y-4">
                <ActivityItem type="Deposit" date="2h ago" val="+12.4 AE" />
                <ActivityItem type="Withdraw" date="1d ago" val="-0.5 ETH" />
                <ActivityItem type="Stake" date="3d ago" val="12.4k AE" />
             </div>
          </div>
          <div className="glass p-6 rounded-3xl border-white/5 flex flex-col justify-between">
             <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Neural Security</h3>
                <div className="flex items-center gap-2 text-green-400 mb-4">
                   <ShieldCheck className="w-5 h-5" />
                   <span className="text-sm font-bold">100% Protection Level</span>
                </div>
                <p className="text-gray-500 text-xs">
                   Your account is protected by hardware-grade multi-sig authentication and neural-link behavioral monitoring.
                </p>
             </div>
             <button className="w-full py-3 glass mt-6 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-white/5">Manage Keys</button>
          </div>
       </div>
    </div>
  </div>
);

// Small UI Utility Components
const StatCard = ({ title, value, change, isPositive, icon }: any) => (
  <div className="glass p-6 rounded-3xl border-white/5 group hover:border-cyan-500/30 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 glass rounded-xl border-white/10">{icon}</div>
      <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {change}
      </div>
    </div>
    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">{title}</div>
    <div className="text-2xl font-black text-white font-display">{value}</div>
  </div>
);

const NodeItem = ({ location, status, load, isWarning }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${isWarning ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
      <div>
        <div className="text-xs text-white font-medium">{location}</div>
        <div className="text-[10px] text-gray-500 uppercase">{status}</div>
      </div>
    </div>
    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${isWarning ? 'bg-orange-500' : 'bg-cyan-500'} rounded-full`} style={{ width: `${load}%` }}></div>
    </div>
  </div>
);

const AssetItem = ({ name, amount, value, color }: any) => (
  <div className="flex items-center justify-between p-3 glass rounded-xl border-white/5">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-8 ${color} rounded-full`}></div>
      <div>
        <div className="text-xs font-bold text-white">{name}</div>
        <div className="text-[10px] text-gray-500">{amount} units</div>
      </div>
    </div>
    <div className="text-xs font-bold text-white">{value}</div>
  </div>
);

const PositionRow = ({ name, apy, earnings, status }: any) => (
  <tr className="hover:bg-white/5 transition-colors group">
    <td className="px-6 py-4 text-white font-medium">{name}</td>
    <td className="px-6 py-4 text-cyan-400 font-bold">{apy}</td>
    <td className="px-6 py-4 text-green-400 font-bold">{earnings}</td>
    <td className="px-6 py-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 glass px-3 py-1 rounded-full border-white/10 group-hover:border-white/30 transition-all">
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
       <button className="p-2 hover:bg-white/10 rounded-lg transition-all"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
    </td>
  </tr>
);

const ActivityItem = ({ type, date, val }: any) => (
  <div className="flex justify-between items-center text-xs">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center">
          <RefreshCcw className="w-3 h-3 text-gray-400" />
       </div>
       <div>
          <div className="text-white font-medium">{type}</div>
          <div className="text-[10px] text-gray-500">{date}</div>
       </div>
    </div>
    <div className={`font-bold ${val.startsWith('+') ? 'text-green-400' : val.startsWith('-') ? 'text-red-400' : 'text-white'}`}>
       {val}
    </div>
  </div>
);

export default Dashboard;
