import expect from 'expect';
import getTrailMap from './trails';
import createMap from './maps';

describe('Maps', () => {
    it('Creates a simple map object', async done => {
        const m = await getTrailMap('int');
        m.target = document.createElement('map');
        const actual = createMap(m);
        expect(actual).toBeA('object');
        done();
    });
});