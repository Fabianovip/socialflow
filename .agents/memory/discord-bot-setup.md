---
name: Discord bot setup
description: Durable setup choices for the SocialFlow Discord bot.
---

SocialFlow authenticates with a Replit Secret rather than storing a Discord token in project files. Slash commands are registered globally when no development guild is configured; global propagation can take time, so use a guild ID when iterating on commands.

**Why:** Bot tokens are credentials, and Discord's global command registration is eventually propagated.

**How to apply:** Keep `DISCORD_TOKEN` secret. Set `DISCORD_GUILD_ID` for fast local command feedback, and omit it only when intentionally publishing commands globally.