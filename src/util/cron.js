var CronJob = require("cron").CronJob; // eslint-disable-line id-match
import config from "config";

import { followupEmailJob } from "../service/linc-service.js";

function init() {
  /* eslint-disable no-new, id-match */
  console.log("Starting resendConfirmationEmail job");
  new CronJob(config.get("linc.resendEmailCron"), followupEmailJob, null, true, "America/New_York");
/* eslint-enable no-new, id-match */
}

export { init };