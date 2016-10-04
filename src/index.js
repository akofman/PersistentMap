/**
*
* @module PersistentMap
*/

import PouchDB from 'pouchdb';

export const PersistentMap = async (name) => {
  const lazyMap = new Map();
  const persistentMap = new PouchDB(name);
  const docs = await persistentMap.allDocs({include_docs: true});
  docs.rows.forEach((row) => {
    lazyMap.set(row.doc._id, row.doc.value);
  });
  return {
    set: (key, value) => _set(persistentMap, lazyMap, key, value),
    get: (key) => _get(lazyMap, key),
    getSync: (key) => _getSync(persistentMap, key),
    size: () => _size(lazyMap),
    has: (key) => _has(lazyMap, key),
    delete: (key) => _delete(persistentMap, lazyMap, key)
  };
};

const _set = async (persistentMap, lazyMap, key, value) => {
  await persistentMap.put({
    _id: key,
    value: value
  });
  lazyMap.set(key, value);
};

const _get = (lazyMap, key) => {
  return lazyMap.get(key);
};

const _getSync = async (persistentMap, key) => {
  const entry = await persistentMap.get(key);
  return entry.value;
};

const _size = (lazyMap) => {
  return lazyMap.size;
};

const _has = (lazyMap, key) => {
  return lazyMap.has(key);
};

const _delete = async (persistentMap, lazyMap, key) => {
  const entry = await persistentMap.get(key);
  await persistentMap.remove(entry);
  lazyMap.delete(key);
};
