// 3rd party dependencies
import { Guild } from "discord.js";

// Dependencies
import updatePresence from "../../../helpers/updatePresence";
import dropGuild from "../../../helpers/dropGuild";
import logger from "../../../logger";
import { IEventOptions } from "../../../interfaces/EventOptions";

export const options: IEventOptions = {
  type: "on",
};

export const execute = async (guild: Guild) => {
  const { client } = guild;

  logger?.silly(`Deleted from guild: ${guild.name} (${guild.id})`);

  await dropGuild(guild.id);
  await updatePresence(client);

  logger.silly(`guildDelete: ${guild}`);
};
