 import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  CircleAlert,
  Hash,
  Loader2,
  MessagesSquare,
  Radio,
  Server,
  ShieldCheck,
} from 'lucide-react';

interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  parent_id: string | null;
  position: number;
}

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  channels: DiscordChannel[];
}

interface DiscordDataResponse {
  connected: boolean;
  error?: string;
  guilds: DiscordGuild[];
}

const platforms = [
  {
    name: 'YouTube',
    accent: '#e87979',
    mark: 'YT',
    description: 'Canal usado para publicações do YouTube.',
  },
  {
    name: 'TikTok',
    accent: '#8ce3d2',
    mark: 'TT',
    description: 'Canal usado para publicações do TikTok.',
  },
  {
    name: 'Instagram',
    accent: '#eaa18a',
    mark: 'IG',
    description: 'Canal usado para publicações do Instagram.',
  },
  {
    name: 'Kick',
    accent: '#b8ef7e',
    mark: 'K',
    description: 'Canal usado para publicações da Kick.',
  },
  {
    name: 'Twitch',
    accent: '#b9a2ff',
    mark: 'TW',
    description: 'Canal usado para publicações da Twitch.',
  },
];

function Communities() {
  const [data, setData] = useState<DiscordDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedGuildId, setSelectedGuildId] = useState('');
  const [selectedChannelId, setSelectedChannelId] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadDiscordData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/discord-data', {
          headers: {
            Accept: 'application/json',
          },
        });

        const result = (await response.json()) as DiscordDataResponse;

        if (!response.ok || !result.connected) {
          throw new Error(
            result.error || 'Não foi possível obter os dados do Discord.',
          );
        }

        if (cancelled) return;

        setData(result);

        if (result.guilds.length > 0) {
          setSelectedGuildId(result.guilds[0].id);

          if (result.guilds[0].channels.length > 0) {
            setSelectedChannelId(result.guilds[0].channels[0].id);
          }
        }
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível conectar ao Discord.',
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadDiscordData();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedGuild = useMemo(
    () => data?.guilds.find((guild) => guild.id === selectedGuildId) ?? null,
    [data, selectedGuildId],
  );

  const channels = selectedGuild?.channels ?? [];

  function handleGuildChange(guildId: string) {
    setSelectedGuildId(guildId);

    const guild = data?.guilds.find((item) => item.id === guildId);

    if (guild && guild.channels.length > 0) {
      setSelectedChannelId(guild.channels[0].id);
    } else {
      setSelectedChannelId('');
    }
  }

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
            <span className="font-serif font-normal italic text-[#9aaec6]">
              Connect the signal.
            </span>
          </h1>

          <p className="mt-5 max-w-[560px] text-sm leading-relaxed text-[#8391a8] md:text-[15px]">
            Gerencie os servidores e canais reais disponíveis para o SocialFlow.
          </p>
        </div>

        <div
          className={`flex items-center gap-3 self-start rounded-xl border px-4 py-3 md:self-end ${
            loading
              ? 'border-[#4a4632] bg-[#282619]'
              : error
                ? 'border-[#5b4341] bg-[#2b2024]'
                : 'border-[#294653] bg-[#132a31]'
          }`}
          data-testid="status-communities-availability"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              loading
                ? 'bg-[#51472a] text-[#d1b982]'
                : error
                  ? 'bg-[#493033] text-[#f1ada7]'
                  : 'bg-[#1b3d42] text-[#8ce3d2]'
            }`}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : error ? (
              <CircleAlert size={18} />
            ) : (
              <ShieldCheck size={18} />
            )}
          </span>

          <span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9b8d62]">
              Configuration status
            </span>

            <span
              className={`mt-0.5 block text-sm font-semibold ${
                loading
                  ? 'text-[#e0ca8c]'
                  : error
                    ? 'text-[#f1ada7]'
                    : 'text-[#8ce3d2]'
              }`}
            >
              {loading
                ? 'Checking...'
                : error
                  ? 'Unavailable'
                  : 'Connected'}
            </span>
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
                {loading
                  ? 'Carregando servidores...'
                  : data?.guilds.length
                    ? `${data.guilds.length} servidor${data.guilds.length === 1 ? '' : 'es'} conectado${data.guilds.length === 1 ? '' : 's'}.`
                    : 'Nenhum servidor encontrado.'}
              </h2>

              <p className="mt-2 max-w-[480px] text-xs leading-relaxed text-[#7c8ca4]">
                O SocialFlow está consultando a API do Discord para obter os
                servidores e canais aos quais o bot tem acesso.
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                loading
                  ? 'border-[#4a4632] bg-[#282619] text-[#d1b982]'
                  : error
                    ? 'border-[#5b4341] bg-[#2b2024] text-[#f1ada7]'
                    : 'border-[#294653] bg-[#132a31] text-[#8ce3d2]'
              }`}
            >
              {loading ? 'Checking' : error ? 'Error' : 'Connected'}
            </span>
          </div>

          {loading && (
            <div className="mt-7 rounded-xl border border-dashed border-[#40506a] bg-[#111b30]/55 p-5">
              <div className="flex items-center gap-3 text-xs text-[#9aa9bf]">
                <Loader2 size={17} className="animate-spin text-[#8ce3d2]" />
                Buscando dados do Discord...
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="mt-7 rounded-xl border border-dashed border-[#5b4341] bg-[#211a23] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#35262d] text-[#f1ada7]">
                  <CircleAlert size={15} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#f0d5d3]">
                    Discord data unavailable
                  </p>

                  <p className="mt-1 text-[11px] leading-relaxed text-[#a98c91]">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && data?.guilds.length === 0 && (
            <div className="mt-7 rounded-xl border border-dashed border-[#40506a] bg-[#111b30]/55 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#24334b] text-[#8fa5bd]">
                  <CircleAlert size={15} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#cbd7e3]">
                    Nenhum servidor disponível
                  </p>

                  <p className="mt-1 text-[11px] leading-relaxed text-[#71819b]">
                    Verifique se o bot SocialFlow está dentro do seu servidor
                    do Discord.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && data?.guilds.length ? (
            <div className="mt-7">
              <label
                htmlFor="discord-server"
                className="mb-2 block text-[11px] font-semibold text-[#9aa9bf]"
              >
                Discord server
              </label>

              <div className="relative">
                <select
                  id="discord-server"
                  value={selectedGuildId}
                  onChange={(event) =>
                    handleGuildChange(event.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-lg border border-[#34425a] bg-[#111b30] px-3 pr-10 text-xs text-[#dce6ef] outline-none focus:border-[#527181]"
                >
                  {data.guilds.map((guild) => (
                    <option key={guild.id} value={guild.id}>
                      {guild.name}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-3.5 text-[#71819b]"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-[#293750] bg-[#162137] p-5 md:p-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8391a8]">
            <MessagesSquare size={14} className="text-[#d1b982]" />
            Primary Discord channel
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[#edf4f6]">
            {selectedGuild
              ? `${channels.length} canal${channels.length === 1 ? '' : 'is'} disponível${channels.length === 1 ? '' : 'is'}`
              : 'Escolha um servidor.'}
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-[#7c8ca4]">
            Selecione um canal real do servidor conectado.
          </p>

          <div className="mt-7">
            <label
              htmlFor="discord-channel"
              className="mb-2 block text-[11px] font-semibold text-[#9aa9bf]"
            >
              Discord channel
            </label>

            <div className="relative">
              <select
                id="discord-channel"
                value={selectedChannelId}
                onChange={(event) =>
                  setSelectedChannelId(event.target.value)
                }
                disabled={!channels.length}
                className="h-11 w-full appearance-none rounded-lg border border-[#34425a] bg-[#111b30] px-3 pr-10 text-xs text-[#dce6ef] outline-none disabled:opacity-60 focus:border-[#527181]"
              >
                {!channels.length ? (
                  <option value="">
                    Nenhum canal disponível
                  </option>
                ) : (
                  channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name}
                    </option>
                  ))
                )}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-3.5 text-[#71819b]"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-[#66768e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8ce3d2]" />
            {selectedChannelId
              ? 'Canal selecionado'
              : 'Nenhum canal selecionado'}
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
              Seus canais estão prontos para configuração.
            </h2>

            <p className="mt-2 max-w-[600px] text-sm text-[#7c8ca4]">
              Os canais abaixo vêm do Discord conectado. A automação de
              publicação será configurada na próxima etapa.
            </p>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#62718a]">
            5 plataformas
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {platforms.map((platform, index) => (
            <PlatformConfigurationCard
              key={platform.name}
              platform={platform}
              index={index}
              channels={channels}
            />
          ))}
        </div>
      </section>

      <footer className="mt-10 flex flex-col gap-2 border-t border-[#27334d] pt-5 text-[10px] font-medium uppercase tracking-[0.13em] text-[#5f6f87] sm:flex-row sm:items-center sm:justify-between">
        <span>
          SocialFlow operations /{' '}
          {selectedGuild ? selectedGuild.name : 'communities not configured'}
        </span>

        <span className="flex items-center gap-2">
          <Radio size={12} className="text-[#8ce3d2]" />
          {error ? 'Discord data unavailable' : 'Discord data connected'}
        </span>
      </footer>
    </div>
  );
}

function PlatformConfigurationCard({
  platform,
  index,
  channels,
}: {
  platform: {
    name: string;
    accent: string;
    mark: string;
    description: string;
  };
  index: number;
  channels: DiscordChannel[];
}) {
  const matchingChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(platform.name.toLowerCase()),
  );

  return (
    <div
      className={`reveal reveal-delay-${Math.min(
        index + 1,
        4,
      )} group relative overflow-hidden rounded-2xl border border-[#293750] bg-[#141f35] p-5 transition-colors hover:border-[#3a4c66]`}
      data-testid={`card-platform-${platform.name.toLowerCase()}`}
    >
      <div
        className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-[0.07]"
        style={{
          background: platform.accent,
          transform: 'translate(25%, -25%)',
        }}
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
          {matchingChannels.length > 0 ? 'Available' : 'Ready'}
        </span>
      </div>

      <h3 className="mt-6 text-base font-semibold text-[#dfe8f1]">
        {platform.name}
      </h3>

      <p className="mt-2 max-w-[340px] text-xs leading-relaxed text-[#71819b]">
        {platform.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#73839b]">
            Discord channels
          </span>

          <span className="text-[10px] text-[#65758d]">
            {matchingChannels.length} encontrado
            {matchingChannels.length === 1 ? '' : 's'}
          </span>
        </div>

        {matchingChannels.length > 0 ? (
          <div className="space-y-2">
            {matchingChannels.slice(0, 3).map((channel) => (
              <div
                key={channel.id}
                className="flex items-center gap-2 rounded-lg border border-[#34425a] bg-[#111b30] px-3 py-2.5 text-[11px] text-[#cbd7e3]"
              >
                <Hash size={13} className="text-[#71819b]" />
                <span className="truncate">{channel.name}</span>
                <Check
                  size={13}
                  className="ml-auto shrink-0 text-[#8ce3d2]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-10 items-center rounded-lg border border-dashed border-[#34425a] bg-[#111b30] px-3 text-[11px] text-[#697993]">
            Nenhum canal com esse nome encontrado
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-[#66768e]">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background:
              matchingChannels.length > 0 ? platform.accent : '#52617a',
          }}
        />

        {matchingChannels.length > 0
          ? 'Canal encontrado no Discord'
          : 'Configuração disponível'}
      </div>
    </div>
  );
}

export default Communities;    
