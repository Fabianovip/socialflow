import { SlashCommandBuilder } from "discord.js";

const TIKTOK_CHANNEL_ID = "1534660973225578788";
const YOUTUBE_CHANNEL_ID = "1534660682065379570";
const INSTAGRAM_CHANNEL_ID = "1539503343431450624";
const TWITCH_CHANNEL_ID = "1534660897849610292";
const KICK_CHANNEL_ID = "1539502969047748629";

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

  new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Publish a YouTube link.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("The YouTube link to publish.")
        .setRequired(true),
    ),

  new SlashCommandBuilder()
    .setName("instagram")
    .setDescription("Publish an Instagram link.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("The Instagram link to publish.")
        .setRequired(true),
    ),

  new SlashCommandBuilder()
    .setName("twitch")
    .setDescription("Publish a Twitch channel or live link.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("The Twitch channel or live link to publish.")
        .setRequired(true),
    ),

  new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Publish a Kick channel or live link.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("The Kick channel or live link to publish.")
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
    await publishLink(
      interaction,
      TIKTOK_CHANNEL_ID,
      /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\//i,
      "TikTok",
      "🎵",
      "Novo TikTok!",
    );
    return;
  }

  if (interaction.commandName === "youtube") {
    await publishLink(
      interaction,
      YOUTUBE_CHANNEL_ID,
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i,
      "YouTube",
      "▶️",
      "Novo vídeo no YouTube!",
    );
    return;
  }

  if (interaction.commandName === "instagram") {
    await publishLink(
      interaction,
      INSTAGRAM_CHANNEL_ID,
      /^https?:\/\/(www\.)?instagram\.com\//i,
      "Instagram",
      "📸",
      "Nova publicação no Instagram!",
    );
    return;
  }

  if (interaction.commandName === "twitch") {
    await publishLink(
      interaction,
      TWITCH_CHANNEL_ID,
      /^https?:\/\/(www\.)?twitch\.tv\//i,
      "Twitch",
      "🟣",
      "Novo conteúdo na Twitch!",
    );
    return;
  }

  if (interaction.commandName === "kick") {
    await publishLink(
      interaction,
      KICK_CHANNEL_ID,
      /^https?:\/\/(www\.)?kick\.com\//i,
      "Kick",
      "🟢",
      "Novo conteúdo na Kick!",
    );
    return;
  }
}

async function publishLink(
  interaction,
  channelId,
  urlPattern,
  platformName,
  emoji,
  messageTitle,
) {
  const link = interaction.options.getString("link", true);

  if (!urlPattern.test(link)) {
    await interaction.reply({
      content: `❌ Por favor, envie um link válido da ${platformName}.`,
      ephemeral: true,
    });
    return;
  }

  try {
    const channel = await interaction.client.channels.fetch(channelId);

    if (!channel || !channel.isTextBased()) {
      await interaction.reply({
        content: `❌ O canal da ${platformName} não é válido.`,
        ephemeral: true,
      });
      return;
    }

    await channel.send(`${emoji} **${messageTitle}**\n\n${link}`);

    await interaction.reply({
      content: `✅ ${platformName} publicado no canal configurado!`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(`Erro ao publicar ${platformName}:`, error);

    await interaction.reply({
      content: `❌ Não consegui publicar no canal da ${platformName}. Verifique as permissões do bot.`,
      ephemeral: true,
    });
  }
}
