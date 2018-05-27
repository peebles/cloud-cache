"use strict";

// Usage
//
// cache = require( 'cloud-cache' )({
//    type: 'memory' or 'redis',
//    options: {
//      ttl:  ttl for redis in seconds
//      connection: {
//        port: redis-port,
//        host: redis-host
//      }
//    }
// });
//
const MemoryStore = require( './MemoryStore' );
const RedisStroe  = require( './RedisStore' );

module.exports = function( options ) {
  if ( options.type === 'memory' ) return new MemoryStore( options.options );
  if ( options.type === 'redis' )  return new RedisStore( options.options );
  throw Error( 'Unsupported cache type!' );
};

