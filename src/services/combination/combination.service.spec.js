import {combinationService} from './combination.service';

import mocks from './combination.mock.json';

describe('Combination service', () => {

    describe('OnePair method', () => {
       
        _.map(mocks.onePair, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.onePair(test.input).value)
                    .toEqual(test.expected.value);
            });
    
            it(`returns correct kicker for case no. ${key+1}`, ()=> {
                expect(combinationService.onePair(test.input).kicker)
                    .toEqual(test.expected.kicker);
            });
        });
    
    });
    
    describe('TwoPairs method', () => {
    
        _.map(mocks.twoPairs, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.twoPairs(test.input).value)
                    .toEqual(test.expected.value);
            });
    
            it(`returns correct kicker for case no. ${key+1}`, ()=> {
                expect(combinationService.twoPairs(test.input).kicker)
                    .toEqual(test.expected.kicker);
            });
        });
    
    });
    
    describe('ThreeOfKind method', () => {
    
        _.map(mocks.threeOfKind, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.threeOfKind(test.input).value)
                    .toEqual(test.expected.value);
            });
    
            it(`returns correct kicker for case no. ${key+1}`, ()=> {
                expect(combinationService.threeOfKind(test.input).kicker)
                    .toEqual(test.expected.kicker);
            });
        });
    
    });
    
    describe('FourOfKind method', () => {
    
        _.map(mocks.fourOfKind, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.fourOfKind(test.input).value)
                    .toEqual(test.expected.value);
            });
    
            it(`returns correct kicker for case no. ${key+1}`, ()=> {
                expect(combinationService.fourOfKind(test.input).kicker)
                    .toEqual(test.expected.kicker);
            });
        });
    
    });
    
    describe('Straight method', () => {
        _.map(mocks.straight, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.straight(test.input))
                    .toEqual(test.expected);
            });
        });
    });
    
    describe('Color method', () => {
        _.map(mocks.color, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.color(test.input))
                    .toEqual(test.expected);
            });
        });
    
    });
    
    describe('FullHouse method', () => {
        _.map(mocks.fullHouse, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.fullHouse(test.input))
                    .toEqual(test.expected);
            });
        });
    
    });
    
    describe('Poker method', () => {
        _.map(mocks.poker, (test, key) => {
            it(`returns correct value for case no. ${key+1}`, ()=> {
                expect(combinationService.poker(test.input))
                    .toEqual(test.expected);
            });
        });
    
    });
    
    describe('Method checkCombination', () => {
       
        it(`calls the onePair method when one pair is provided`, ()=> {
            spyOn(combinationService, 'onePair');
            combinationService.checkCombination(mocks.onePair[0].input);
            expect(combinationService.onePair).toHaveBeenCalled();
        });
       
        it(`calls the twoPairs method when two pairs are provided`, ()=> {
            spyOn(combinationService, 'twoPairs');
            combinationService.checkCombination(mocks.twoPairs[0].input);
            expect(combinationService.twoPairs).toHaveBeenCalled();
        });
        
        it(`returns correct combination object for provided cards`, ()=> {
            expect(combinationService.checkCombination(mocks.onePair[0].input))
                .toEqual(mocks.onePair[0].expected);
            
            expect(combinationService.checkCombination(mocks.twoPairs[0].input))
                .toEqual(mocks.twoPairs[0].expected);
            
            expect(combinationService.checkCombination(mocks.threeOfKind[0].input))
                .toEqual(mocks.threeOfKind[0].expected);
            
            expect(combinationService.checkCombination(mocks.straight[0].input))
                .toEqual(mocks.straight[0].expected);
            
            expect(combinationService.checkCombination(mocks.color[0].input))
                .toEqual(mocks.color[0].expected);
            
            expect(combinationService.checkCombination(mocks.fullHouse[0].input))
                .toEqual(mocks.fullHouse[0].expected);
            
            expect(combinationService.checkCombination(mocks.fourOfKind[0].input))
                .toEqual(mocks.fourOfKind[0].expected);
            
            expect(combinationService.checkCombination(mocks.poker[0].input))
                .toEqual(mocks.poker[0].expected);
        });
       
    });

});