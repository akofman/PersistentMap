import expect from 'expect';
import persistentMap from '../src';
import PouchDB from 'pouchdb';

describe('persistentMap', function () {
  const destroy = (name) => {
    const db = new PouchDB(name);
    return db.destroy();
  };

  after(() => {
    return destroy('myMap');
  });

  it('should return a Map plus some extra methods', function () {
    return persistentMap('myMap').then((myMap) => {
      expect(myMap.set).toExist();
      expect(myMap.get).toExist();
      expect(myMap.has).toExist();
      expect(myMap.clear).toExist();
      expect(myMap.size).toEqual(0);
      expect(myMap.delete).toExist();
      expect(myMap.forEach).toExist();
      expect(myMap.keys).toExist();
      expect(myMap.values).toExist();
      expect(myMap.entries).toExist();
    });
  });

  it('should set a value', function () {
    return persistentMap('myMap').then((myMap) => {
      return myMap.set('myItem', 1).then(() => {
        expect(myMap.get('myItem')).toEqual(1);
      });
    });
  });

  it('should delete a value', function () {
    return persistentMap('myMap').then((myMap) => {
      return myMap.delete('myItem').then(() => {
        expect(myMap.get('myItem')).toNotExist();
      });
    });
  });
});
