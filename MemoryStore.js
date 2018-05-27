'use strict';

class MemoryStore {

  constructor() {
    this.store = {};
  }

  get(key, cb) {
    return cb(null, this.store[key]);
  };

  set(key, val, cb) {
    this.store[key] = val;
    return cb(null, val);
  };

  del(key, cb) {
    delete this.store[key];
    return cb(null);
  };

  clear(cb) {
    this.store = {};
    cb(null);
  };

  size(cb) {
    cb(null, Object.keys(this.store).length);
  };
}

module.exports = MemoryStore;
