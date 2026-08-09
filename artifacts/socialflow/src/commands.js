import { SlashCommandBuilder } from "discord.js";

export const commandDefinitions = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check whether SocialFlow is responding."),
  new SlashCommandBuilder()
    .setName("about")
    .setDescription("Learn what SocialFlow can do."),
].map((command) => command.toJSON());

export async function handleCommand(interaction) {
  if (interaction.commandName === "ping") {
    const latency = Math.max(0, Math.round(interaction.client.ws.ping));
    await interaction.reply(`Pong. Gateway latency: ${latency}ms.`);
    return;
  }

  if (interaction.commandName === "about") {
    await interaction.reply(
      "SocialFlow is your foundation for managing community workflows on Discord. More automation and a web dashboard are coming next.",
    );
  }
}