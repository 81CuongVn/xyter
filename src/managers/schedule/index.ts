import logger from "../../logger";
import { Client } from "discord.js";

import { IJob } from "../../interfaces/Job";

import listDir from "../../helpers/listDir";

import schedule from "node-schedule";

export const start = async (client: Client) => {
  logger.info("⏰ Started job management");

  const jobNames = await listDir("jobs");
  if (!jobNames) return logger.warn("No available jobs found");

  await Promise.all(
    jobNames.map(async (jobName) => {
      const job: IJob = await import(`../../jobs/${jobName}`);

      schedule.scheduleJob(job.options.schedule, async () => {
        logger.verbose(`⏰ Performed the job "${jobName}"`);
        await job.execute(client);
      });
    })
  );
};
