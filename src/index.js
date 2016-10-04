/**
*
* @module PersistentMap
*/

import PouchDB from 'pouchdb';

export const PersistentMap = async (name) => {
  const lazyMap = new Map();
  const db = new PouchDB(name);
  const docs = await db.allDocs({include_docs: true});
  const persistentMap = {
    set: (key, value) => _set(db, lazyMap, key, value),
    getSync: (key) => _getSync(db, key),
    delete: (key) => _delete(db, lazyMap, key)
  };

  // if the db already exists, we inject its value to the lazy map.
  docs.rows.forEach((row) => {
    lazyMap.set(row.doc._id, row.doc.value);
  });

  Object.getOwnPropertyNames(Map.prototype).forEach((method) => {
    if (typeof persistentMap[method] === 'undefined') {
      if (typeof lazyMap[method] === 'function') {
        persistentMap[method] = (...args) => lazyMap[method](...args);
      } else {
        persistentMap[method] = lazyMap[method];
      }
    }
  });

  return persistentMap;
};

const _set = async (db, lazyMap, key, value) => {
  await db.put({
    _id: key,
    value: value
  });
  lazyMap.set(key, value);
};

const _getSync = async (db, key) => {
  const entry = await db.get(key);
  return entry.value;
};

const _delete = async (db, lazyMap, key) => {
  const entry = await db.get(key);
  await db.remove(entry);
  lazyMap.delete(key);
};
