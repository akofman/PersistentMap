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
  set () {}
  get () {}
  delete () {}
}

export default PersistentMap;
