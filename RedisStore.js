'use strict';

const redis = require('redis');

/**
 * @class
 *
 * @private
 *
 * @description
 *
 * Caching implementation that uses Redis as data storage.  If an existing
 * client instance is not provided, this constructor will create one. Utilizes
 * the [node-redis](https://github.com/NodeRedis/node_redis) library.
 *
 * @param {Object} [options]
 * @param {Object} [options.client] A redis client instance
 * @param {Object} [options.connection] Redis client constructor connection options
 * @param {Number} [options.connection.port] DB port number
 * @param {String} [options.connection.host] DB host name
 * @param {*} [options.*] Other options to pass to the Redis client constructor.
 */
class RedisStore {
  constructor( opt ) {
    this._options = opt || {};
    this.redis = opt.client || this._createClient(opt);
    this.redis.debug_mode = /redis/i.test(process.env.DEBUG);
  }

  _createClient(opt) {
   let conn = (opt && opt.connection) || {port:'6379',host:'127.0.0.1'};
   return redis.createClient(conn.port, conn.host, opt.options);
  }

  get(key, cb) {
    this.redis.get(key, function(err, entry){
      return cb(err, !entry ? null : JSON.parse(entry));
    });
  }

  set(key, val, cb) {
    let entry = JSON.stringify(val);
    this.redis.set(key, entry, cb);
    if (this._options.ttl) {
      this.redis.expire(key, this._options.ttl);
    }
  }

  del(key, cb) {
    this.redis.del(key, cb);
  }

  clear(cb) {
    this.redis.flushdb(cb);
  }

  size(cb) {
    this.redis.dbsize(cb);
  }
}

module.exports = RedisStore;
