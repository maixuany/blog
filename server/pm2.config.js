module.exports = {
    apps: [
        {
            name: 'blog server',
            script: 'npm',
            args: 'start',
            instances: 'max',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3030,
            },
        },
    ],
};
