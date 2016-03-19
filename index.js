var request = require('request')

module.exports = function (config) {
  
  config = config || {}
  var host = config.host || 'http://127.0.0.1:8001/api/'
  var app = {}

  /*
   * get all players
   */
  app.getPlayers = function (options, callback) {
    request({
      url: host + 'players',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  }
  
  return app

}
