import expect from 'expect';
import { createPersistentMap } from '../src';
import PouchDB from 'pouchdb';

describe('PersistentMap', function () {
  const destroy = (name) => {
    const db = new PouchDB(name);
    return db.destroy();
  };

  it('should return an instance of a PersistentMap', function () {
    return createPersistentMap('myMap').then((myMap) => {
      expect(myMap.set).toExist();
      expect(myMap.get).toExist();
      expect(myMap.size).toExist();
      expect(myMap.delete).toExist();
      return destroy('myMap');
    });
  });

  it('should persist a value and return the updated instance of the PersistentMap', function () {
    return createPersistentMap('myMap').then((myMap) => {
      return myMap.set('myItem', 1).then(() => {
        expect(myMap.get('myItem')).toEqual(1);
      });
    });
  });

  it('should retrieve a value', function () {
    return createPersistentMap('myMap').then((myMap) => {
      expect(myMap.get('myItem')).toEqual(1);
      return destroy('myMap');
    });
  });
});
