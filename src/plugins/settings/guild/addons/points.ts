// Dependencies
import { CommandInteraction } from "discord.js";

// Configurations
import {
  successColor,
  errorColor,
  footerText,
  footerIcon,
} from "@config/embed";

// Handlers
import logger from "../../../../logger";

// Models
import guildSchema from "../../../../database/schemas/guild";

// Function
export default async (interaction: CommandInteraction) => {
  // Destructure member
  const { options, guild, user } = interaction;

  // Get options
  const status = options?.getBoolean("status");
  const rate = options?.getNumber("rate");
  const timeout = options?.getNumber("timeout");
  const minimumLength = options?.getNumber("minimum-length");

  // Get guild object
  const guildDB = await guildSchema?.findOne({
    guildId: guild?.id,
  });

  if (guildDB === null) return;

  // Modify values
  guildDB.points.status = status !== null ? status : guildDB?.points?.status;
  guildDB.points.rate = rate !== null ? rate : guildDB?.points?.rate;
  guildDB.points.timeout =
    timeout !== null ? timeout : guildDB?.points?.timeout;
  guildDB.points.minimumLength =
    minimumLength !== null ? minimumLength : guildDB?.points?.minimumLength;

  // Save guild
  await guildDB?.save()?.then(async () => {
    // Create embed object
    const embed = {
      title: ":hammer: Settings - Guild [Points]",
      description: "Following settings is set!",
      color: successColor,
      fields: [
        {
          name: "🤖 Status",
          value: `${guildDB?.points?.status}`,
          inline: true,
        },
        {
          name: "📈 Rate",
          value: `${guildDB?.points?.rate}`,
          inline: true,
        },
        {
          name: "🔨 Minimum Length",
          value: `${guildDB?.points?.minimumLength}`,
          inline: true,
        },
        {
          name: "⏰ Timeout",
          value: `${guildDB?.points?.timeout}`,
          inline: true,
        },
      ],
      timestamp: new Date(),
      footer: {
        iconURL: footerIcon,
        text: footerText,
      },
    };

    // Send debug message
    logger?.debug(
      `Guild: ${guild?.id} User: ${user?.id} has changed credit details.`
    );

    // Return interaction reply
    return interaction?.editReply({ embeds: [embed] });
  });
};
