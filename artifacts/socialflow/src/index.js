import "dotenv/config";
import http from "node:http";
import {
  Client,
  Events,
  REST,
  Routes,
} from "discord.js";
import { commandDefinitions, handleCommand } from "./commands.js";

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;
const guildId = process.env.DISCORD_GUILD_ID;
const port = Number(process.env.PORT ?? 3000);

if (!token) {
  throw new Error("DISCORD_TOKEN is required. Add it as a private environment secret.");
}

const client = new Client({
  intents: [],
});

async function registerCommands() {
  if (!applicationId) {
    console.warn(
      "DISCORD_APPLICATION_ID is not set; slash commands will not be registered.",
    );
    return;
  }

  const rest = new REST({ version: "10" }).setToken(token);
  const route = guildId
    ? Routes.applicationGuildCommands(applicationId, guildId)
    : Routes.applicationCommands(applicationId);

  await rest.put(route, { body: commandDefinitions });
  console.log(
    `Registered ${commandDefinitions.length} slash commands ${
      guildId ? `for guild ${guildId}` : "globally"
    }.`,
  );
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`SocialFlow is online as ${readyClient.user.tag}.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await handleCommand(interaction);
  } catch (error) {
    console.error(`Command /${interaction.commandName} failed:`, error);

    const response = {
      content: "Something went wrong while handling that command.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response);
    } else {
      await interaction.reply(response);
    }
  }
});

const healthServer = http.createServer((request, response) => {
  if (request.url !== "/healthz") {
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const isReady = client.isReady();
  response.writeHead(isReady ? 200 : 503, {
    "content-type": "application/json",
  });
  response.end(
    JSON.stringify({
      service: "socialflow",
      status: isReady ? "ok" : "starting",
      bot: isReady ? client.user.tag : null,
    }),
  );
});

async function start() {
  await registerCommands();
  healthServer.listen(port, "0.0.0.0", () => {
    console.log(`Health check available at http://0.0.0.0:${port}/healthz.`);
  });
  await client.login(token);
}

async function shutdown(signal) {
  console.log(`${signal} received; shutting down SocialFlow.`);
  healthServer.close();
  client.destroy();
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

start().catch((error) => {
  console.error("SocialFlow failed to start:", error);
  process.exitCode = 1;
});