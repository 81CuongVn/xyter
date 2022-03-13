const { SlashCommandBuilder } = require('@discordjs/builders');

const lookup = require('./addons/lookup');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('utilities')
    .setDescription('Common utilities.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('lookup')
        .setDescription(
          'Lookup a domain or ip. (Request sent over HTTP, proceed with caution!)'
        )
        .addStringOption((option) =>
          option
            .setName('query')
            .setDescription('The query you want to look up.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('users').setDescription('Iterate all users (ADMIN)')
    ),
  async execute(interaction) {
    // If subcommand is lookup
    if (interaction.options.getSubcommand() === 'lookup') {
      // Execute lookup addon
      await lookup(interaction);
    }
  },
};
