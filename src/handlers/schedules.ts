import schedule from 'node-schedule';
import { shopRoles, users, guilds } from '../helpers/database/models';
import logger from './logger';

export default async (client) => {
  schedule.scheduleJob('*/30 * * * *', async () => {
    shopRoles.find().then(async (shopRoles) => {
      shopRoles.map(async (shopRole) => {
        const payed = new Date(shopRole.lastPayed);

        oneHourAfterPayed = payed.setHours(payed.getHours() + 1);

        if (new Date() > oneHourAfterPayed) {
          // Get guild object
          const guild = await guilds.findOne({
            guildId: shopRole.guildId,
          });

          const userDB = await users.findOne({
            userId: shopRole.userId,
            guildId: shopRole.guildId,
          });
          const { pricePerHour } = guild.shop.roles;

          if (userDB.credits < pricePerHour) {
            const rGuild = await client.guilds.cache.get(`${shopRole.guildId}`);
            const rMember = await rGuild.members.fetch(`${shopRole.userId}`);

            await rMember.roles
              .remove(`${shopRole.roleId}`)
              .then(console.log)
              .catch(console.error); // Removes all roles
          }

          shopRole.lastPayed = new Date();
          shopRole.save();
          userDB.credits -= pricePerHour;
          userDB.save();
          await logger.debug(
            `${shopRole.roleId} was payed one hour later. BEFORE: ${payed} AFTER: ${oneHourAfterPayed} UPDATED: ${shopRole.updatedAt} CREATED: ${shopRole.createdAt}`
          );
        }
      });
    });

    await logger.debug('Checking schedules! (Every 30 minutes)');
  });
};
