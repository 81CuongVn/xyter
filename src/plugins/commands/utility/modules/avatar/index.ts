import getEmbedConfig from "../../../../../helpers/getEmbedConfig";

import { CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";

export default {
  metadata: { guildOnly: false, ephemeral: false },

  builder: (command: SlashCommandSubcommandBuilder) => {
    return command
      .setName("avatar")
      .setDescription("Check someones avatar!)")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The user whose avatar you want to check")
      );
  },
  execute: async (interaction: CommandInteraction) => {
    const { successColor, footerText, footerIcon } = await getEmbedConfig(
      interaction.guild
    );
    const userOption = interaction.options.getUser("user");

    const targetUser = userOption || interaction.user;

    const embed = new MessageEmbed()
      .setTitle("[:tools:] Avatar")
      .setTimestamp(new Date())
      .setFooter({ text: footerText, iconURL: footerIcon });

    return interaction.editReply({
      embeds: [
        embed
          .setDescription(`${targetUser.username}'s avatar:`)
          .setThumbnail(targetUser.displayAvatarURL())
          .setColor(successColor),
      ],
    });
  },
};
