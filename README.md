# Cloud Cache

A very simple abstraction of a key/value store that can be configured as im-memory for
local testing, or with a pointer to a redis host for deployment.  Supports TTL when 
using redis.

## Usage 

```javascript
cache = require( 'cloud-cache' )({
  type: 'memory' or 'redis',
  options: {
    ttl:  ttl for redis in seconds
    connection: {
      port: redis-port,
      host: redis-host
    }
  }
});

cache.set( 'key', { value: 15 }, (err) => {
  if ( err ) console.log( err );
});

cache.get( 'key', (err, val) => {
  if ( err ) console.log( err );
  else console.log( JSON.stringify( val, null, 2 ) );
});

cache.del( 'key', (err) => {
  if ( err ) console.log( err );
});
```

