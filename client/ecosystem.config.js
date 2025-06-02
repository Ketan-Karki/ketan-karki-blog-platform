module.exports = {
  apps: [
    {
      name: "ketan-blog-client",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
