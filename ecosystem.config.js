module.exports = {
    apps: [
        {
            name: 'IRIS-TIME',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production',
                IRIS_URL: 'http://35.160.143.122:3000'
            }
        }
    ],
    deploy: {
        production: {
            user: 'node',
            host: '35.167.25.80',
            ref: 'origin/master',
            repo: 'https://github.com/lynda-danielkhan/iris-time.git',
            path: '/srv/production',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart --env production'
        }
    }
};