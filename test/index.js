import expect from 'expect';
import { PersistentMap } from '../src';
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
    return PersistentMap('myMap').then((myMap) => {
      expect(myMap.set).toExist();
      expect(myMap.get).toExist();
      expect(myMap.size).toExist();
      expect(myMap.delete).toExist();
    });
  });

  it('should persist a value', function () {
    return PersistentMap('myMap').then((myMap) => {
      return myMap.set('myItem', 1).then(() => {
        expect(myMap.get('myItem')).toEqual(1);
      });
    });
  });

  it('should retrieve a value', function () {
    return PersistentMap('myMap').then((myMap) => {
      expect(myMap.get('myItem')).toEqual(1);
    });
  });

  it('should retrieve a synced value', function () {
    return PersistentMap('myMap').then((myMap) => {
      return myMap.getSync('myItem').then((value) => {
        expect(value).toEqual(1);
      });
    });
  });

  it('should delete a value', function () {
    return PersistentMap('myMap').then((myMap) => {
      return myMap.delete('myItem').then(() => {
        expect(myMap.get('myItem')).toNotExist();
      });
    });
  });

  it('should return the number of entries of a map', function () {
    return PersistentMap('myMap').then((myMap) => {
      expect(myMap.size()).toEqual(0);
    });
  });

  it('should return if an entry exists in the map', function () {
    return PersistentMap('myMap').then((myMap) => {
      return myMap.set('myItem', 1).then(() => {
        expect(myMap.has('myItem')).toBeTruthy();
      });
    });
  });
});
