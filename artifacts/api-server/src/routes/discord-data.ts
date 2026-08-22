import { Router, type IRouter } from "express";

const router: IRouter = Router();

const DISCORD_API = "https://discord.com/api/v10";

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
}

interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  parent_id: string | null;
  position: number;
}

router.get("/discord-data", async (_req, res) => {
  const token = process.env["DISCORD_TOKEN"];

  if (!token) {
    return res.status(503).json({
      connected: false,
      error: "DISCORD_TOKEN is not configured",
      guilds: [],
    });
  }

  try {
    const guildsResponse = await fetch(`${DISCORD_API}/users/@me/guilds`, {
      headers: {
        Authorization: `Bot ${token}`,
      },
    });

    if (!guildsResponse.ok) {
      return res.status(502).json({
        connected: false,
        error: "Discord API rejected the bot authentication",
        guilds: [],
      });
    }

    const guilds = (await guildsResponse.json()) as DiscordGuild[];

    const result = await Promise.all(
      guilds.map(async (guild) => {
        const channelsResponse = await fetch(
          `${DISCORD_API}/guilds/${guild.id}/channels`,
          {
            headers: {
              Authorization: `Bot ${token}`,
            },
          },
        );

        if (!channelsResponse.ok) {
          return {
            id: guild.id,
            name: guild.name,
            icon: guild.icon,
            channels: [],
          };
        }

        const channels =
          (await channelsResponse.json()) as DiscordChannel[];

        return {
          id: guild.id,
          name: guild.name,
          icon: guild.icon,
          channels: channels
            .filter((channel) => [0, 2, 5].includes(channel.type))
            .sort((a, b) => a.position - b.position),
        };
      }),
    );

    return res.json({
      connected: true,
      guilds: result,
    });
  } catch {
    return res.status(502).json({
      connected: false,
      error: "Unable to reach Discord",
      guilds: [],
    });
  }
});

export default router;
