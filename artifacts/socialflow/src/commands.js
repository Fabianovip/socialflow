import { SlashCommandBuilder } from "discord.js";

const TIKTOK_CHANNEL_ID = "1534660973225578788";

export const commandDefinitions = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check whether SocialFlow is responding."),

  new SlashCommandBuilder()
    .setName("about")
    .setDescription("Learn what SocialFlow can do."),

  new SlashCommandBuilder()
    .setName("test-post")
    .setDescription("Send a test post from SocialFlow."),

  new SlashCommandBuilder()
    .setName("tiktok")
    .setDescription("Publish a TikTok link.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("The TikTok link to publish.")
        .setRequired(true),
    ),
].map((command) => command.toJSON());

export async function handleCommand(interaction) {
  if (interaction.commandName === "ping") {
    const latency = Math.max(0, Math.round(interaction.client.ws.ping));

    await interaction.reply(
      `Pong. Gateway latency: ${latency}ms.`,
    );

    return;
  }

  if (interaction.commandName === "about") {
    await interaction.reply(
      "SocialFlow is your foundation for managing community workflows on Discord. More automation and a web dashboard are coming next.",
    );

    return;
  }

  if (interaction.commandName === "test-post") {
    await interaction.reply(
      "🚀 **SocialFlow — Teste realizado com sucesso!**\n\nO bot conseguiu publicar uma mensagem neste canal.",
    );

    return;
  }

  if (interaction.commandName === "tiktok") {
    const link = interaction.options.getString("link", true);

    if (!/^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\//i.test(link)) {
      await interaction.reply({
        content: "❌ Por favor, envie um link válido do TikTok.",
        ephemeral: true,
      });
      return;
    }

    try {
      const channel = await interaction.client.channels.fetch(
        TIKTOK_CHANNEL_ID,
      );

      if (!channel || !channel.isTextBased()) {
        await interaction.reply({
          content: "❌ O canal configurado não é um canal de texto válido.",
          ephemeral: true,
        });
        return;
      }

      await channel.send({
        content: `🎵 **Novo TikTok!**\n\n${link}`,
      });

      await interaction.reply({
        content: "✅ TikTok publicado no canal configurado!",
        ephemeral: true,
      });
    } catch (error) {
      console.error("Erro ao publicar TikTok:", error);

      await interaction.reply({
        content:
          "❌ Não consegui publicar no canal do TikTok. Verifique se o ID está correto e se o bot possui permissão para ver e enviar mensagens nesse canal.",
        ephemeral: true,
      });
    }
  }
}
