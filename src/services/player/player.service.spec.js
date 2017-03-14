import * as Redux from 'redux';
import {players, player} from './player.service';

describe('Players service', () => {

    describe('Player reducer', () => {

        let store;

        beforeEach(()=> {
            store = Redux.createStore(player);
        });

        describe('Add new player', () => {

            const action = {
                type: 'ADD_PLAYER',
                id: 0,
                name: 'Player1'
            };
            deepFreeze(action);
            const afterState = {
                id: 0,
                name: 'Player1',
                hand: []
            };

            it('returns object with new player', ()=> {
                store.dispatch(action);
                expect(store.getState()).toEqual(afterState);
            });

        });

    });

    describe('Players reducer', () => {

        let store;

        beforeEach(()=> {
            store = Redux.createStore(players);
        });

        describe('Add new player', () => {

            const action = {
                type: 'ADD_PLAYER',
                id: 0,
                name: 'Player1'
            };
            deepFreeze(action);
            const afterState = [{
                id: 0,
                name: 'Player1',
                hand: []
            }];

            it('returns array with new player object', ()=> {
                store.dispatch(action);
                expect(store.getState()).toEqual(afterState);
            });

        });

    });
});