import { successColor, footerText, footerIcon } from "@config/embed";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
export default {
  meta: { guildOnly: false, ephemeral: false },

  data: (command: SlashCommandSubcommandBuilder) => {
    return command.setName("stats").setDescription("Check bot statistics!)");
  },
  execute: async (interaction: CommandInteraction) => {
    const { client } = interaction;
    if (client?.uptime === null) return;
    let totalSeconds = client?.uptime / 1000;
    const days = Math?.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math?.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math?.floor(totalSeconds / 60);
    const seconds = Math?.floor(totalSeconds % 60);

    const uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    const interactionEmbed = {
      title: ":hammer: Utilities - Stats",
      description: "Below you can see a list of statistics about the bot.",
      fields: [
        {
          name: "⏰ Latency",
          value: `${Date?.now() - interaction?.createdTimestamp} ms`,
          inline: true,
        },
        {
          name: "⏰ API Latency",
          value: `${Math?.round(client?.ws?.ping)} ms`,
          inline: true,
        },
        {
          name: "⏰ Uptime",
          value: `${uptime}`,
          inline: false,
        },
        {
          name: "📈 Guilds",
          value: `${client?.guilds?.cache?.size}`,
          inline: true,
        },
        {
          name: "📈 Users (non-unique)",
          value: `${client?.guilds?.cache?.reduce(
            (acc, guild) => acc + guild?.memberCount,
            0
          )}`,
          inline: true,
        },
      ],
      color: successColor,
      timestamp: new Date(),
      footer: {
        iconURL: footerIcon,
        text: footerText,
      },
    };
    interaction?.editReply({ embeds: [interactionEmbed] });
  },
};
