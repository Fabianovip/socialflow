---
name: Dashboard data honesty
description: Data availability boundary for the SocialFlow dashboard.
---

The dashboard can currently verify the shared API service through `/api/healthz`, but the bot process does not expose bot health or activity metrics to the dashboard. Unavailable metrics must remain `0` or `Not available`, not demo values.

**Why:** The dashboard should not imply that placeholder numbers came from Discord or connected platforms.

**How to apply:** Add real metrics only after a stable API contract exposes them; until then keep the honest empty states and preserve the existing bot routes and environment variables.