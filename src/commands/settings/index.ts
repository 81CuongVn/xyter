import { SlashCommandBuilder } from '@discordjs/builders';
import { Permissions, CommandInteraction } from 'discord.js';
import guild from './guild';
import user from './user';

export default {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Manage settings.')
    .addSubcommandGroup((group) =>
      group
        .setName('guild')
        .setDescription('Manage guild settings.')
        .addSubcommand((command) =>
          command
            .setName('pterodactyl')
            .setDescription('Controlpanel.gg')
            .addStringOption((option) =>
              option
                .setName('url')
                .setDescription('The api url')
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName('token')
                .setDescription('The api token')
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName('credits')
            .setDescription('Credits')
            .addBooleanOption((option) =>
              option
                .setName('status')
                .setDescription('Should credits be enabled?')
            )
            .addNumberOption((option) =>
              option
                .setName('rate')
                .setDescription('Amount of credits per message.')
            )
            .addNumberOption((option) =>
              option
                .setName('minimum-length')
                .setDescription('Minimum length of message to earn credits.')
            )
            .addNumberOption((option) =>
              option
                .setName('work-rate')
                .setDescription('Maximum amount of credits on work.')
            )
            .addNumberOption((option) =>
              option
                .setName('work-timeout')
                .setDescription(
                  'Timeout between work schedules (milliseconds).'
                )
            )
            .addNumberOption((option) =>
              option
                .setName('timeout')
                .setDescription(
                  'Timeout between earning credits (milliseconds).'
                )
            )
        )
        .addSubcommand((command) =>
          command
            .setName('points')
            .setDescription('Points')
            .addBooleanOption((option) =>
              option
                .setName('status')
                .setDescription('Should credits be enabled?')
            )
            .addNumberOption((option) =>
              option
                .setName('rate')
                .setDescription('Amount of credits per message.')
            )
            .addNumberOption((option) =>
              option
                .setName('minimum-length')
                .setDescription('Minimum length of message to earn credits.')
            )
            .addNumberOption((option) =>
              option
                .setName('timeout')
                .setDescription(
                  'Timeout between earning credits (milliseconds).'
                )
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName('user')
        .setDescription('Manage user settings.')
        .addSubcommand((command) =>
          command
            .setName('appearance')
            .setDescription('Manage your appearance')
            .addStringOption((option) =>
              option
                .setName('language')
                .setDescription('Configure your language')
                .addChoice('English', 'en')
                .addChoice('Swedish', 'sv')
            )
        )
    ),
  async execute(interaction: CommandInteraction) {
    // If subcommand group is guild
    if (interaction.options.getSubcommandGroup() === 'guild') {
      // Execute guild group
      await guild(interaction);
    }
    // If subcommand group is user
    else if (interaction.options.getSubcommandGroup() === 'user') {
      // Execute user group
      await user(interaction);
    }
  },
};
