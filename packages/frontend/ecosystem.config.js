module.exports = {
  apps: [{
      name: 'frontent-api',
      script: './build/server.js',
      instances: 1
    },
    {
      name: 'frontent-static',
      script: 'pm2',
      args: 'serve build',
      instances: 1
    }
  ]
}