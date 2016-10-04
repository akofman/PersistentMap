import expect from 'expect';
import { createPersistentMap } from '../src';
import PouchDB from 'pouchdb';

describe('PersistentMap', function () {
  const destroy = (name) => {
    const db = new PouchDB(name);
    return db.destroy();
  };

  after(() => {
    destroy('myMap');
  });

  it('should return an instance of a PersistentMap', function () {
    return createPersistentMap('myMap').then((myMap) => {
      expect(myMap.set).toExist();
      expect(myMap.get).toExist();
      expect(myMap.size).toExist();
      expect(myMap.delete).toExist();
    });
  });

  it('should persist a value', function () {
    return createPersistentMap('myMap').then((myMap) => {
      return myMap.set('myItem', 1).then(() => {
        expect(myMap.get('myItem')).toEqual(1);
      });
    });
  });

  it('should retrieve a value', function () {
    return createPersistentMap('myMap').then((myMap) => {
      expect(myMap.get('myItem')).toEqual(1);
    });
  });

  it('should delete a value', function () {
    return createPersistentMap('myMap').then((myMap) => {
      return myMap.delete('myItem').then(() => {
        expect(myMap.get('myItem')).toNotExist();
      });
    });
  });
});
