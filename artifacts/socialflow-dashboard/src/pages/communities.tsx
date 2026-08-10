import {
  Check,
  ChevronDown,
  CircleAlert,
  Hash,
  LockKeyhole,
  MessagesSquare,
  Radio,
  Server,
  ShieldCheck,
} from 'lucide-react';

const platforms = [
  {
    name: 'YouTube',
    accent: '#e87979',
    mark: 'YT',
    description: 'Video publishing configuration is planned for a later integration phase.',
  },
  {
    name: 'TikTok',
    accent: '#8ce3d2',
    mark: 'TT',
    description: 'Short-form channel configuration is planned for a later integration phase.',
  },
  {
    name: 'Instagram',
    accent: '#eaa18a',
    mark: 'IG',
    description: 'Visual channel configuration is planned for a later integration phase.',
  },
  {
    name: 'Kick',
    accent: '#b8ef7e',
    mark: 'K',
    description: 'Live channel configuration is planned for a later integration phase.',
  },
  {
    name: 'Twitch',
    accent: '#b9a2ff',
    mark: 'TW',
    description: 'Stream channel configuration is planned for a later integration phase.',
  },
];

function Communities() {
  return (
    <div className="reveal">
      <section className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
        <div>
          <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ce3d2]">
            <span className="h-px w-7 bg-[#8ce3d2]" />
            Community configuration
          </div>
          <h1
            className="max-w-[700px] text-4xl font-semibold tracking-[-0.04em] text-[#eef4f8] md:text-[52px] md:leading-[1.03]"
            data-testid="text-communities-title"
          >
            Set the room.
            <br />
            <span className="font-serif font-normal italic text-[#9aaec6]">Connect the signal.</span>
          </h1>
          <p className="mt-5 max-w-[560px] text-sm leading-relaxed text-[#8391a8] md:text-[15px]">
            A configuration foundation for the communities and channels SocialFlow will support.
            Real Discord data will appear here once a connection is available.
          </p>
        </div>
        <div
          className="flex items-center gap-3 self-start rounded-xl border border-[#4a4632] bg-[#282619] px-4 py-3 md:self-end"
          data-testid="status-communities-availability"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#51472a] text-[#d1b982]">
            <ShieldCheck size={18} />
          </span>
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9b8d62]">
              Configuration status
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-[#e0ca8c]">Not available</span>
          </span>
        </div>
      </section>

      <section className="mt-9 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="glass-panel relative overflow-hidden rounded-2xl border border-[#293750] p-5 md:p-6">
          <div className="scan-line absolute left-0 right-0 top-0 h-px bg-[#8ce3d2]/40" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8391a8]">
                <Server size={14} className="text-[#8ce3d2]" />
                Discord connection
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[#edf4f6]">
                No server is connected.
              </h2>
              <p className="mt-2 max-w-[480px] text-xs leading-relaxed text-[#7c8ca4]">
                Discord guild and channel data is not available to this dashboard yet. This
                space is ready for a real connection without showing placeholder server details.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-[#5b4341] bg-[#2b2024] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#f1ada7]">
              Not connected
            </span>
          </div>

          <div className="mt-7 rounded-xl border border-dashed border-[#40506a] bg-[#111b30]/55 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#24334b] text-[#8fa5bd]">
                <CircleAlert size={15} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#cbd7e3]" data-testid="text-discord-data-status">
                  Discord server data unavailable
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#71819b]">
                  Guild names, IDs, permissions, and channel lists will populate only from a
                  connected Discord source.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg border border-[#34425a] bg-[#1c2940] px-3.5 text-xs font-semibold text-[#74839b] opacity-80"
            data-testid="button-connect-discord"
            aria-label="Connect Discord unavailable"
          >
            <LockKeyhole size={14} />
            Connection unavailable
          </button>
        </div>

        <div className="rounded-2xl border border-[#293750] bg-[#162137] p-5 md:p-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8391a8]">
            <MessagesSquare size={14} className="text-[#d1b982]" />
            Primary Discord channel
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[#edf4f6]">
            Choose a channel later.
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-[#7c8ca4]">
            The selector stays intentionally empty until Discord channel data is available.
          </p>
          <div className="mt-7">
            <label htmlFor="discord-channel" className="mb-2 block text-[11px] font-semibold text-[#9aa9bf]">
              Discord channel
            </label>
            <button
              id="discord-channel"
              type="button"
              disabled
              className="flex h-11 w-full items-center justify-between rounded-lg border border-[#34425a] bg-[#111b30] px-3 text-left text-xs text-[#6f7e96] opacity-80"
              data-testid="button-select-discord-channel"
              aria-label="Discord channel data unavailable"
            >
              <span className="flex items-center gap-2">
                <Hash size={14} />
                Discord channel data unavailable
              </span>
              <ChevronDown size={15} />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-[#66768e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#52617a]" />
            No channel selected
          </div>
        </div>
      </section>

      <section className="mt-11">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8391a8]">
              <span className="h-px w-5 bg-[#8391a8]" />
              Platform configuration
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#edf4f6]">
              Your publishing map starts here.
            </h2>
            <p className="mt-2 max-w-[600px] text-sm text-[#7c8ca4]">
              Platform configuration is planned. Nothing will publish automatically from this
              foundation.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#62718a]">
            5 planned platforms
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {platforms.map((platform, index) => (
            <PlatformConfigurationCard key={platform.name} platform={platform} index={index} />
          ))}
        </div>
      </section>

      <footer className="mt-10 flex flex-col gap-2 border-t border-[#27334d] pt-5 text-[10px] font-medium uppercase tracking-[0.13em] text-[#5f6f87] sm:flex-row sm:items-center sm:justify-between">
        <span>SocialFlow operations / communities not configured</span>
        <span className="flex items-center gap-2">
          <Radio size={12} className="text-[#71819b]" />
          Discord data not available
        </span>
      </footer>
    </div>
  );
}

function PlatformConfigurationCard({
  platform,
  index,
}: {
  platform: {
    name: string;
    accent: string;
    mark: string;
    description: string;
  };
  index: number;
}) {
  return (
    <div
      className={`reveal reveal-delay-${Math.min(index + 1, 4)} group relative overflow-hidden rounded-2xl border border-[#293750] bg-[#141f35] p-5 transition-colors hover:border-[#3a4c66]`}
      data-testid={`card-platform-${platform.name.toLowerCase()}`}
    >
      <div
        className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-[0.07]"
        style={{ background: platform.accent, transform: 'translate(25%, -25%)' }}
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#33435c] bg-[#1b2941] text-[10px] font-bold tracking-[0.08em]"
          style={{ color: platform.accent }}
          aria-hidden="true"
        >
          {platform.mark}
        </span>
        <span className="rounded-full border border-[#34425a] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#75849b]">
          Planned
        </span>
      </div>
      <h3 className="mt-6 text-base font-semibold text-[#dfe8f1]">{platform.name}</h3>
      <p className="mt-2 max-w-[340px] text-xs leading-relaxed text-[#71819b]">{platform.description}</p>
      <div className="mt-5">
        <label
          htmlFor={`${platform.name.toLowerCase()}-channel`}
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#73839b]"
        >
          Channel selector
        </label>
        <button
          id={`${platform.name.toLowerCase()}-channel`}
          type="button"
          disabled
          className="flex h-10 w-full items-center justify-between rounded-lg border border-[#34425a] bg-[#111b30] px-3 text-left text-[11px] text-[#697993] opacity-80"
          data-testid={`button-select-${platform.name.toLowerCase()}-channel`}
          aria-label={`${platform.name} channel data unavailable`}
        >
          <span>Channel data unavailable</span>
          <ChevronDown size={14} />
        </button>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-[#66768e]">
        <Check size={12} className="text-[#596983]" />
        Configuration not available
      </div>
    </div>
  );
}

export default Communities;