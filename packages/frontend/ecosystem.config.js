module.exports = {
  apps: [{
      name: 'frontent-api',
      script: './build/server.js',
      instances: 1
    },
    {
      name: 'frontent-static',
      script: 'serve',
      args: '-s build',
      instances: 1
    }
  ]
}