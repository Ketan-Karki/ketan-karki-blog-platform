module.exports = {
  apps: [
    {
      name: "slow-down-time-client",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
