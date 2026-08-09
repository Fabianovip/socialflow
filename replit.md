# SocialFlow

SocialFlow is a Node.js Discord bot foundation for community workflows, with a web dashboard planned for a future iteration.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/socialflow run dev` — run the SocialFlow Discord bot and health endpoint
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required secret: `DISCORD_TOKEN`
- Required env: `DISCORD_APPLICATION_ID`
- Optional env: `DISCORD_GUILD_ID`, `PORT`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Bot: Node.js, JavaScript, discord.js

## Where things live

- Bot entrypoint and command handlers: `artifacts/socialflow/src/`
- Bot setup and future extension notes: `artifacts/socialflow/README.md`

## Architecture decisions

- Discord credentials are read only from environment variables; tokens are never stored in source files.
- Slash commands are registered at startup, using a guild-specific route when `DISCORD_GUILD_ID` is provided.
- The health endpoint is kept separate from Discord interactions so process monitoring does not require a dashboard.

## Product

The current product is a small Discord bot with `/ping` and `/about` commands. A web dashboard can be added later without replacing the bot foundation.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
