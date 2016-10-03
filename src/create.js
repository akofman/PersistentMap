import PouchDB from 'pouchdb';

export default (name) => {
  return new PouchDB(name);
};
