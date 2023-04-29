module.exports = {
  apps: [
    {
      name: 'blog client',
      script: 'npm',
      args: 'start',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
