# SocialFlow

SocialFlow is a Node.js Discord bot foundation. The first version includes:

- Secure environment-based Discord authentication
- `/ping` for a quick response and gateway latency check
- `/about` to introduce the bot
- Slash-command registration for a development guild or globally
- A `/healthz` endpoint for process monitoring
- Graceful shutdown handling

## Setup

1. Create an application and bot in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Copy the bot token into the Replit Secret named `DISCORD_TOKEN`.
3. Add the application ID as the non-secret environment variable `DISCORD_APPLICATION_ID`.
4. Optionally add `DISCORD_GUILD_ID` while developing so slash commands update immediately.
5. Invite the bot with the `bot` and `applications.commands` scopes.

## Run

```bash
pnpm --filter @workspace/socialflow run dev
```

For a production-style run:

```bash
pnpm --filter @workspace/socialflow run start
```

The health check is available at `http://localhost:3000/healthz` by default.

## Next step

The bot is intentionally separated from future dashboard concerns. A later dashboard can use the same bot process and add authenticated API routes without changing the command modules.