var request = require('request')
var base64 = require('base-64')

module.exports = function (config) {

  config = config || {}
  var host = config.host || 'http://127.0.0.1:8001/api/'
  var app = {}

  /*
   * GET all players
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
  },

  /*
   * GET a specific player
   */
  // TODO: this doesn't seem to work
  app.getPlayer = function (options, callback) {
    request({
      url: host + 'players',
      method: 'GET',
      json: options.body,
      headers: { 'Content-Type': 'application/json' }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  },

  /*
   * GET our leader players
   */
  app.getLeaderPlayers = function (options, callback) {
    request({
      url: host + 'players?type=leaders',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  },

  /*
   * PUT a player
   */
  app.putPlayer = function (options, callback) {
    request({
      url: host + 'players',
      method: 'POST',
      json: options.body,
      headers: { 'Content-Type': 'application/json'
               }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  }

  return app

}
