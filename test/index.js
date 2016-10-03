import expect from 'expect';
import PersistentMap from '../src';

describe('Test suite', function () {
  describe('PersistentMap', function () {
    it('should return an instance of a PersistentMap', function () {
      const myMap = new PersistentMap('myMap');
      expect(myMap.import).toExist();
      expect(myMap.set).toExist();
      expect(myMap.get).toExist();
      expect(myMap.delete).toExist();
      expect(myMap.lazyMap).toExist();
      expect(myMap.persistentMap).toExist();
      myMap.persistentMap.destroy();
    });
  });

  describe('set', function () {
    it('should persist a value and return the updated instance of the PersistentMap', function () {
      const myMap = new PersistentMap('myMap');
      return myMap.set('myItem', 1).then((result) => {
        expect(myMap.lazyMap.get('myItem')).toEqual(1);
        expect(result).toBeA(PersistentMap);
        myMap.persistentMap.destroy();
      });
    });
  });
});
