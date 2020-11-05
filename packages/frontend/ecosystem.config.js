module.exports = {
  apps: [{
      name: 'frontent-api',
      script: './build/server.js',
      instances: 1
    },
    {
      name: 'frontent-static',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: '.build',
        PM2_SERVE_PORT: 8080
      },
      instances: 1
    }
  ]
}