---
name: Dashboard boundary
description: Scope boundary between the SocialFlow dashboard and Discord bot.
---

The SocialFlow dashboard is intentionally a separate frontend surface and currently uses presentation-only foundation data. It must not alter the Discord bot process, commands, health endpoint, authentication, or existing environment variables until backend publishing and persistence are explicitly requested.

**Why:** The dashboard was requested as a foundation only, while the bot is already running as a separate stable service.

**How to apply:** Keep future dashboard UI work in its web artifact. Add API or database behavior only as a separately scoped change with explicit contracts, and preserve the bot package as-is.