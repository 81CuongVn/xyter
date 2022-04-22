import { successColor, footerText, footerIcon } from "@config/embed";
import { hosterName, hosterUrl } from "@config/other";

import i18next from "i18next";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";

export default {
  data: (command: SlashCommandSubcommandBuilder) => {
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
    const { locale } = interaction;

    const userOption = interaction.options.getUser("user");

    const targetUser = userOption || interaction.user;

    const embed = new MessageEmbed()
      .setTitle(
        i18next.t("utilities:modules:avatar:general:title", {
          lng: locale,
          ns: "plugins",
        })
      )
      .setTimestamp(new Date())
      .setFooter({ text: footerText, iconURL: footerIcon });

    return interaction.editReply({
      embeds: [
        embed
          .setDescription(
            i18next.t("utilities:modules:avatar:success01:description", {
              lng: locale,
              ns: "plugins",
              user: targetUser,
            })
          )
          .setThumbnail(targetUser.displayAvatarURL())
          .setColor(successColor),
      ],
    });
  },
};
