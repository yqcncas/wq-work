var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: 'http://api.wq1516.com:8989',
  API_ROOT: '"http://api.wq1516.com:8989"'
})
