module.exports = {
  apps : [{
    name: 'client',
    script: 'npm',

    env: {
      PORT: 3030,
      NODE_ENV: 'production',
    },
    cwd: '/home/debian/blog/client',

    args: 'run start',

    autorestart: true,

    output: '~/my-client/logs/out.log',
    error: '~/my-client/logs/error.log',
  }]
};
