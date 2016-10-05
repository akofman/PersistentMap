/**
*
* @module persistentMap
*/

import PouchDB from 'pouchdb';

const persistentMap = async (name) => {
  const lazyMap = new Map();
  const db = new PouchDB(name);
  const docs = await db.allDocs({include_docs: true});
  const pMap = {
    set: (key, value) => _set(db, lazyMap, key, value),
    delete: (key) => _delete(db, lazyMap, key)
  };

  // if the db already exists, we inject its value to the lazy map.
  docs.rows.forEach((row) => {
    lazyMap.set(row.doc._id, row.doc.value);
  });

  Object.getOwnPropertyNames(Map.prototype).forEach((prop) => {
    if (typeof pMap[prop] === 'undefined') {
      if (typeof lazyMap[prop] === 'function') {
        pMap[prop] = (...args) => lazyMap[prop](...args);
      } else {
        pMap[prop] = lazyMap[prop];
      }
    }
  });

  return pMap;
};

const _set = async (db, lazyMap, key, value) => {
  await db.put({
    _id: key,
    value: value
  });
  lazyMap.set(key, value);
};

const _delete = async (db, lazyMap, key) => {
  const entry = await db.get(key);
  await db.remove(entry);
  lazyMap.delete(key);
};

export default persistentMap;
