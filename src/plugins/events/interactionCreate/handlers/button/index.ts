// Dependencies
import { Interaction } from "discord.js";

import deferReply from "../../../../../helpers/deferReply";
import * as cooldown from "../../../../../helpers/cooldown";

export default async (interaction: Interaction) => {
  if (!interaction.isButton()) return;

  const { guild, customId, memberPermissions } = interaction;

  const currentButton = await import(`../../../buttons/${customId}`);

  if (!currentButton) throw new Error(`Unknown button ${customId}`);

  const metadata = currentButton.metadata;

  await deferReply(interaction, metadata.ephemeral || false);

  if (metadata.guildOnly && !guild)
    throw new Error("This command is guild only.");

  if (
    metadata.permissions &&
    metadata.guildOnly &&
    !memberPermissions?.has(metadata.permissions)
  )
    throw new Error("You don't have the required permissions");

  if (metadata.dmOnly && guild)
    throw new Error("This command is only available in DM");

  if (metadata.cooldown) await cooldown.button(interaction, metadata.cooldown);

  await currentButton.execute(interaction);
};
