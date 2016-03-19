var extend = require('xtend')

var config = {
  shared: {},
  development: {
    // host: 'http://127.0.0.1:8001/api/v2/'
    host: 'http://popuparcade.azurewebsites.net/api/'
  },
  production: {}
}

module.exports = extend(config.shared, config[process.env.NODE_ENV])
