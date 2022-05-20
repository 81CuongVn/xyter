import {
  successColor,
  errorColor,
  footerText,
  footerIcon,
} from "@config/embed";

import { CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import logger from "@logger";

import userSchema, { IUser } from "@schemas/user";

export default {
  metadata: { guildOnly: true, ephemeral: false },

  builder: (command: SlashCommandSubcommandBuilder) => {
    return command.setName("top").setDescription(`View the top users`);
  },
  execute: async (interaction: CommandInteraction) => {
    const { guild } = interaction;

    const embed = new MessageEmbed()
      .setTitle("[:dollar:] Top")
      .setTimestamp(new Date())
      .setFooter({ text: footerText, iconURL: footerIcon });

    if (guild === null) {
      logger.silly(`Guild is null`);

      return interaction.editReply({
        embeds: [
          embed
            .setDescription(
              "Guild is not found. Please try again with a valid guild."
            )
            .setColor(errorColor),
        ],
      });
    }

    const usersDB = await userSchema.find({ guildId: guild.id });

    const topTen = usersDB

      // Sort them after credits amount (ascending)
      .sort((a, b) => (a.credits > b.credits ? -1 : 1))

      // Return the top 10
      .slice(0, 10);

    // Create entry object
    const entry = (x: IUser, index: number) =>
      `${index + 1}. <@${x.userId}> - ${x.credits} credits`;

    return interaction.editReply({
      embeds: [
        embed
          .setDescription(
            `Below are the top 10 users in this guild.

            ${topTen.map(entry).join("\n")}
         `
          )
          .setColor(successColor),
      ],
    });
  },
};
