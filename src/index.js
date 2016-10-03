/**
*
* @module PersistentMap
*/

import create from './create';

class PersistentMap {
  constructor (name) {
    this.lazyMap = new Map();
    this.persistentMap = create(name);
  }

  import () {}

  async set (key, value) {
    await this.persistentMap.put({
      _id: key,
      value: value
    });
    this.lazyMap.set(key, value);
    return this;
  }

  get () {}
  delete () {}
}

export default PersistentMap;
