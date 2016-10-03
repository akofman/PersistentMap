import expect from 'expect';
import PersistentMap from '../src';

module.exports = () => {
  describe('create', function () {
    it('should return an instance of a PersistentMap', function () {
      const myMap = new PersistentMap('myMap');
      expect(myMap.import).toExist();
      expect(myMap.set).toExist();
      expect(myMap.get).toExist();
      expect(myMap.delete).toExist();
      myMap.persistentMap.destroy();
    });
  });
};
