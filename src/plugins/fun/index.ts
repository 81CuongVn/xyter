import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import logger from "../../logger";

import modules from "../../plugins/fun/modules";

export const builder = new SlashCommandBuilder()
  .setName("fun")
  .setDescription("Fun commands.")

  .addSubcommand(modules.meme.builder);

export const moduleData = modules;

export const execute = async (interaction: CommandInteraction) => {
  const { options } = interaction;

  if (options.getSubcommand() === "meme") {
    await modules.meme.execute(interaction);
  } else {
    logger.silly(`Unknown subcommand ${options.getSubcommand()}`);
  }
};
