import { GuildMember } from "discord.js";
import updatePresence from "../../helpers/updatePresence";
import dropUser from "../../helpers/dropUser";

export default {
  name: "guildMemberRemove",
  async execute(member: GuildMember) {
    const { client, user, guild } = member;

    await dropUser(user, guild);

    await updatePresence(client);
  },
};