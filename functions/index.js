const MAX_RETRIES = 10;
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

const workers = {
  welcomeEmail: async (options) => {
    console.log("Sending welcome email =>", options);

    return {
      success: false,
      error: "Error sending welcome email",
    };
  },
};

exports.backgroundJob = functions
  .runWith({ memory: "512MB" })
  .pubsub.schedule("* * * * *")
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();

    const query = db
      .collection("queue")
      .where("performAt", "<=", now)
      .where("status", "==", "scheduled")
      .where("retries", "<=", MAX_RETRIES);

    const queue = await query.get();
    const jobs = [];

    queue.forEach(async (spapshot) => {
      const { worker, options, retries } = spapshot.data();
      const job = await workers[worker](options);

      if (job.success) {
        spapshot.ref.update({ status: "complete", error: null });
      } else {
        spapshot.ref.update({
          status: "failed",
          retries: retries + 1,
          error: job.error,
        });
      }

      jobs.push(job);
    });

    return await Promise.all(jobs);
  });
