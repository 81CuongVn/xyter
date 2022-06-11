import { CommandInteraction } from "discord.js";
import getEmbedConfig from "../../../../../helpers/getEmbedConfig";
import { timeout } from "../../../../../config/reputation";
import logger from "../../../../../logger";
import fetchUser from "../../../../../helpers/fetchUser";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import * as cooldown from "../../../../../helpers/cooldown";
import noSelfReputation from "./components/noSelfReputation";

export default {
  metadata: { guildOnly: true, ephemeral: true },

  builder: (command: SlashCommandSubcommandBuilder) => {
    return command
      .setName("give")
      .setDescription("Give reputation to a user")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("The user you want to repute.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("type")
          .setDescription("What type of reputation you want to repute")
          .setRequired(true)
          .addChoices(
            { name: "Positive", value: "positive" },
            {
              name: "Negative",
              value: "negative",
            }
          )
      );
  },
  execute: async (interaction: CommandInteraction) => {
    const { options, user, guild } = interaction;

    const { errorColor, successColor, footerText, footerIcon } =
      await getEmbedConfig(guild); // Destructure

    const optionTarget = options?.getUser("target");
    const optionType = options?.getString("type");

    if (!guild) throw new Error("Guild is undefined");

    const userObj = await fetchUser(user, guild);
    if (!userObj) throw new Error("User is undefined");

    // Pre-checks
    await noSelfReputation(optionTarget, user);

    // Check if user is on cooldown otherwise create one
    await cooldown.command(interaction, timeout);

    switch (optionType) {
      case "positive":
        userObj.reputation += 1;
        break;
      case "negative":
        userObj.reputation += 1;
        break;
      default:
        throw new Error("Invalid reputation type");
    }

    await userObj.save().then(async () => {
      logger.silly(`User reputation has been updated`);

      await interaction.editReply({
        embeds: [
          {
            title: "[:loudspeaker:] Give",
            description: `You have given a ${optionType} repute to ${optionTarget}`,
            timestamp: new Date(),
            color: successColor,
            footer: {
              iconURL: footerIcon,
              text: footerText,
            },
          },
        ],
      });
    });
  },
};
