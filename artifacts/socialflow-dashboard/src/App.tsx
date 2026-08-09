import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Activity, ArrowUpRight, Bell, Bot, Check, ChevronDown, CircleHelp,
  Command, Gauge, Hash, Instagram, LayoutDashboard, Menu, MessagesSquare,
  MoreHorizontal, Play, Radio, Settings2, ShieldCheck, Sparkles, Twitch, Youtube,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
type IconType = typeof LayoutDashboard;

function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [botOnline, setBotOnline] = useState(true);
  const navItems = [
    { label: 'Overview', icon: LayoutDashboard }, { label: 'Activity log', icon: Activity },
    { label: 'Communities', icon: MessagesSquare },
  ];
  const channels = [
    { name: 'YouTube', icon: Youtube, accent: '#e87979', note: 'Video intelligence & publishing', detail: 'Connect your channel to see reach, cadence, and audience signals here.' },
    { name: 'TikTok', icon: Play, accent: '#8ce3d2', note: 'Short-form performance', detail: 'A focused view of your short-form workflow is being mapped next.' },
    { name: 'Instagram', icon: Instagram, accent: '#eaa18a', note: 'Visual community pulse', detail: 'Your posts, replies, and conversation health will live in this space.' },
    { name: 'Kick', icon: Twitch, accent: '#b8ef7e', note: 'Live stream rhythm', detail: 'Stream activity and live audience signals are on the roadmap.' },
  ];
  const changeTab = (tab: string) => { setActiveTab(tab); setMobileNavOpen(false); };
  return (
    <div className="noise-layer min-h-[100dvh] bg-[#101729] text-[#dfe8f3]">
      <div className="dashboard-grid fixed inset-0 pointer-events-none" />
      <div className="relative flex min-h-[100dvh]">
        <aside className="hidden w-[246px] shrink-0 border-r border-[#27334d] bg-[#0d1426]/90 px-4 py-5 lg:flex lg:flex-col">
          <Brand />
          <div className="mt-12 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#71809b]">Command center</div>
          <nav className="mt-3 space-y-1.5">{navItems.map((item) => <NavItem key={item.label} item={item} active={activeTab === item.label} onClick={() => changeTab(item.label)} />)}</nav>
          <div className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#71809b]">Workspace</div>
          <nav className="mt-3 space-y-1.5">
            <NavItem item={{ label: 'Bot settings', icon: Settings2 }} active={false} onClick={() => changeTab('Bot settings')} />
            <NavItem item={{ label: 'Help center', icon: CircleHelp }} active={false} onClick={() => changeTab('Help center')} />
          </nav>
          <div className="mt-auto rounded-2xl border border-[#28364c] bg-[#162137] p-3.5"><div className="flex items-center gap-2 text-[11px] font-semibold text-[#aebdd1]"><ShieldCheck size={14} className="text-[#8ce3d2]" />Private workspace</div><p className="mt-2 text-[11px] leading-relaxed text-[#72829e]">Your operational data stays close to your community.</p></div>
          <div className="mt-5 flex items-center gap-3 border-t border-[#27334d] px-2 pt-5"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#234b54] text-xs font-bold text-[#9deede]">AM</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-[#d9e3ee]">Alex Morgan</p><p className="text-[10px] text-[#71809b]">Community lead</p></div><MoreHorizontal size={16} className="text-[#71809b]" /></div>
        </aside>
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-[#27334d]/80 bg-[#101729]/85 px-5 backdrop-blur-xl md:px-9">
            <div className="flex items-center gap-3"><button type="button" onClick={() => setMobileNavOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2b3851] text-[#9eabc0] lg:hidden" data-testid="button-open-mobile-navigation" aria-label="Open navigation"><Menu size={17} /></button><div className="hidden items-center gap-2 text-xs text-[#71809b] sm:flex"><span>SocialFlow</span><span className="text-[#46536b]">/</span><span className="text-[#d6e0eb]">{activeTab}</span></div><span className="text-sm font-semibold text-[#d6e0eb] sm:hidden">{activeTab}</span></div>
            <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-[#294653] bg-[#132a31] px-3 py-1.5 text-[11px] font-semibold text-[#8ce3d2] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#8ce3d2] status-pulse" />All systems nominal</div><button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#8c9ab2] hover:bg-[#1a2740] hover:text-[#dce7f2]" data-testid="button-notifications" aria-label="View notifications"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#8ce3d2]" /></button><button type="button" className="flex items-center gap-2 rounded-lg border border-[#2b3851] bg-[#152039] px-2.5 py-1.5 text-xs font-semibold text-[#dce7f2]" data-testid="button-workspace-selector"><span className="flex h-5 w-5 items-center justify-center rounded bg-[#3d6575] text-[9px] font-bold text-[#d7faf4]">N</span><span className="hidden sm:block">Northstar</span><ChevronDown size={13} className="text-[#8190aa]" /></button></div>
          </header>
          {mobileNavOpen && <div className="absolute left-3 right-3 top-[76px] z-40 rounded-2xl border border-[#2b3851] bg-[#101b31] p-2 shadow-2xl lg:hidden">{navItems.map((item) => <NavItem key={item.label} item={item} active={activeTab === item.label} onClick={() => changeTab(item.label)} />)}<div className="my-2 border-t border-[#28364c]" /><NavItem item={{ label: 'Bot settings', icon: Settings2 }} active={false} onClick={() => changeTab('Bot settings')} /></div>}
          <div className="mx-auto max-w-[1370px] px-5 pb-14 pt-9 md:px-9 md:pt-12">
            <section className="reveal flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ce3d2]"><span className="h-px w-7 bg-[#8ce3d2]" />{activeTab === 'Overview' ? 'Monday, October 21' : 'Workspace view'}</div><h1 className="max-w-[700px] text-4xl font-semibold tracking-[-0.04em] text-[#eef4f8] md:text-[54px] md:leading-[1.03]">Keep the signal.<br /><span className="font-serif font-normal italic text-[#9aaec6]">Lose the noise.</span></h1><p className="mt-5 max-w-[520px] text-sm leading-relaxed text-[#8391a8] md:text-[15px]">A quiet read on how your community is moving, shared across every channel SocialFlow touches.</p></div><button type="button" onClick={() => setBotOnline((online) => !online)} className={`group flex items-center gap-3 self-start rounded-xl border px-4 py-3 md:self-end ${botOnline ? 'border-[#285248] bg-[#122b2e]' : 'border-[#5b4341] bg-[#2b2024]'}`} data-testid="button-toggle-bot-status"><span className={`relative flex h-9 w-9 items-center justify-center rounded-lg ${botOnline ? 'bg-[#194d49] text-[#8ce3d2]' : 'bg-[#573139] text-[#f3a2a0]'}`}><Bot size={18} /><span className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#122b2e] ${botOnline ? 'bg-[#8ce3d2]' : 'bg-[#f3a2a0]'}`} /></span><span className="text-left"><span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#7f90a8]">SocialFlow bot</span><span className={`mt-0.5 block text-sm font-semibold ${botOnline ? 'text-[#9deede]' : 'text-[#f1ada7]'}`}>{botOnline ? 'Online & listening' : 'Paused for maintenance'}</span></span><ArrowUpRight size={15} className="ml-3 text-[#71839c]" /></button></section>
            <section className="reveal reveal-delay-1 mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Messages processed" value="12,486" change="+18.4%" detail="this week" icon={MessagesSquare} tone="teal" /><StatCard label="Response health" value="94.8%" change="+2.1%" detail="vs last week" icon={Gauge} tone="blue" /><StatCard label="Active communities" value="07" change="+1" detail="this month" icon={Hash} tone="amber" /><StatCard label="Signals surfaced" value="128" change="+24.6%" detail="this week" icon={Sparkles} tone="lilac" /></section>
            <section className="reveal reveal-delay-2 mt-8 grid gap-4 xl:grid-cols-[1.45fr_0.75fr]"><div className="glass-panel relative overflow-hidden rounded-2xl border border-[#293750] p-5 md:p-6"><div className="scan-line absolute left-0 right-0 top-0 h-px bg-[#8ce3d2]/40" /><div className="flex items-start justify-between"><div><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8391a8]"><Radio size={14} className="text-[#8ce3d2]" />Workflow pulse</div><h2 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[#edf4f6]">Your communities are in rhythm.</h2><p className="mt-2 text-xs text-[#7c8ca4]">Activity has held steady across your connected Discord servers.</p></div><button type="button" className="rounded-lg p-2 text-[#71809b] hover:bg-[#22304a] hover:text-[#dfe8f3]" data-testid="button-pulse-options" aria-label="Workflow pulse options"><MoreHorizontal size={18} /></button></div><div className="mt-8 flex h-[152px] items-end gap-2 px-1 sm:gap-3">{[42,54,47,68,59,81,74,91,73,79,86,97,88,102,94,118,108,124,116,132,126,143,136,151].map((height, index) => <div key={index} className="group relative flex h-full flex-1 items-end"><div className={`w-full rounded-sm transition-all duration-500 group-hover:opacity-100 ${index > 17 ? 'bg-[#73cfc5]' : 'bg-[#3b6671]'}`} style={{ height: `${height}px`, opacity: index > 17 ? 0.88 : 0.6 }} /></div>)}</div><div className="mt-3 flex justify-between border-t border-[#293750] pt-3 text-[10px] font-medium text-[#64748a]"><span>Oct 14</span><span>Oct 17</span><span>Oct 21</span></div></div><div className="rounded-2xl border border-[#293750] bg-[#162137] p-5 md:p-6"><div className="flex items-center justify-between"><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8391a8]"><Command size={14} className="text-[#d1b982]" />Watchlist</div><span className="rounded-full bg-[#293248] px-2 py-1 text-[10px] font-bold text-[#9aa9bf]">3 quiet</span></div><div className="mt-5 space-y-4"><WatchItem label="No moderation spikes" detail="Last 24 hours" state="clear" /><WatchItem label="Reply velocity" detail="Holding at 18m average" state="clear" /><WatchItem label="Community focus" detail="General chat is leading" state="info" /></div><button type="button" onClick={() => changeTab('Activity log')} className="mt-6 flex w-full items-center justify-between border-t border-[#293750] pt-4 text-xs font-semibold text-[#9deede] hover:text-[#c7fbf1]" data-testid="button-view-activity">View activity log <ArrowUpRight size={15} /></button></div></section>
            <section className="reveal reveal-delay-3 mt-11"><div className="flex items-end justify-between"><div><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8391a8]"><span className="h-px w-5 bg-[#8391a8]" />Channel horizon</div><h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#edf4f6]">More of your world, soon.</h2><p className="mt-2 max-w-[500px] text-sm text-[#7c8ca4]">SocialFlow is starting with Discord. These integrations are planned next.</p></div><span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-[#62718a] md:block">Roadmap / 2025</span></div><div className="mt-5 grid gap-3 md:grid-cols-2">{channels.map((channel, index) => <ChannelCard key={channel.name} channel={channel} index={index} />)}</div></section>
            <footer className="mt-10 flex flex-col gap-2 border-t border-[#27334d] pt-5 text-[10px] font-medium uppercase tracking-[0.13em] text-[#5f6f87] sm:flex-row sm:items-center sm:justify-between"><span>SocialFlow operations / Northstar workspace</span><span className="flex items-center gap-2"><Check size={12} className="text-[#8ce3d2]" />Last synced just now</span></footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function Brand() {
  return <div className="flex items-center gap-3 px-2"><div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#85dfd1] text-[#10242d] shadow-[0_0_0_5px_rgba(133,223,209,0.08)]"><Activity size={19} strokeWidth={2.4} /></div><div><div className="text-[15px] font-bold tracking-[-0.03em] text-[#e9f1f5]">Social<span className="text-[#8ce3d2]">Flow</span></div><div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#66758d]">Operations room</div></div></div>;
}
function NavItem({ item, active, onClick }: { item: { label: string; icon: IconType }; active: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return <button type="button" onClick={onClick} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition-colors ${active ? 'bg-[#1c3340] text-[#a6f0e3]' : 'text-[#7f8da4] hover:bg-[#18253c] hover:text-[#d5e0ec]'}`} data-testid={`button-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}><Icon size={16} className={active ? 'text-[#8ce3d2]' : 'text-[#71819a] group-hover:text-[#aebdd1]'} />{item.label}{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8ce3d2]" />}</button>;
}
function StatCard({ label, value, change, detail, icon: Icon, tone }: { label: string; value: string; change: string; detail: string; icon: IconType; tone: 'teal' | 'blue' | 'amber' | 'lilac' }) {
  const colors = { teal: 'text-[#8ce3d2] bg-[#163b3e]', blue: 'text-[#9bc8ef] bg-[#20374c]', amber: 'text-[#e8c67e] bg-[#403724]', lilac: 'text-[#cfbbed] bg-[#362b48]' };
  return <div className="group rounded-2xl border border-[#293750] bg-[#162137] p-4 transition-transform duration-300 hover:-translate-y-0.5 md:p-5"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold text-[#8391a8]">{label}</span><span className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors[tone]}`}><Icon size={14} /></span></div><div className="mt-5 flex items-end gap-2"><span className="text-[28px] font-semibold tracking-[-0.05em] text-[#edf4f6]">{value}</span><span className="mb-1 text-[10px] font-bold text-[#8ce3d2]">{change}</span></div><div className="mt-1 text-[10px] text-[#65758d]">{detail}</div></div>;
}
function WatchItem({ label, detail, state }: { label: string; detail: string; state: 'clear' | 'info' }) {
  return <div className="flex items-center gap-3"><div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${state === 'clear' ? 'bg-[#183a3a] text-[#8ce3d2]' : 'bg-[#352f28] text-[#e8c67e]'}`}>{state === 'clear' ? <Check size={14} /> : <Activity size={14} />}</div><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#d6e1ec]">{label}</p><p className="mt-0.5 truncate text-[10px] text-[#71819b]">{detail}</p></div></div>;
}
function ChannelCard({ channel, index }: { channel: { name: string; icon: IconType; accent: string; note: string; detail: string }; index: number }) {
  const Icon = channel.icon;
  return <div className={`reveal reveal-delay-${index + 1} group relative overflow-hidden rounded-2xl border border-[#293750] bg-[#141f35] p-5 transition-colors hover:border-[#3a4c66]`}><div className="absolute right-0 top-0 h-20 w-20 rounded-full opacity-[0.07]" style={{ background: channel.accent, transform: 'translate(25%, -25%)' }} /><div className="flex items-start justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#33435c] bg-[#1b2941]" style={{ color: channel.accent }}><Icon size={17} /></span><span className="rounded-full border border-[#34425a] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#75849b]">Planned</span></div><h3 className="mt-7 text-base font-semibold text-[#dfe8f1]">{channel.name}</h3><p className="mt-1 text-[11px] font-medium" style={{ color: channel.accent }}>{channel.note}</p><p className="mt-3 max-w-[280px] text-xs leading-relaxed text-[#71819b]">{channel.detail}</p><div className="mt-5 flex items-center gap-2 text-[10px] font-semibold text-[#66768e]"><span className="h-1.5 w-1.5 rounded-full bg-[#52617a]" />Integration not connected</div></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;