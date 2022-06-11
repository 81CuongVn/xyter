// Dependencies
import { Client } from "discord.js";
import logger from "../../logger";

// Function
export default async (client: Client) => {
  if (!client?.user) throw new Error("Client's user is undefined.");
  const { guilds } = client;

  const memberCount = guilds.cache.reduce((a, g) => a + g.memberCount, 0);
  const guildCount = guilds.cache.size;

  const status = `${memberCount} users in ${guildCount} guilds.`;
  client.user.setPresence({
    activities: [{ type: "LISTENING", name: status }],
    status: "online",
  });

  logger.info(`Client's presence is set to "${status}"`);
};
