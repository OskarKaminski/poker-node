import {GameService} from './game.service';
import mocks from '../combination/combination.mock.json';

describe('Game service', () => {

    const gameService = new GameService();

    describe('PullOutPlayerCards method', () => {

        it(`returns 2 cards`, ()=> {
            expect(gameService.pullOutPlayerCards('Oskar').length).toBe(2);
        });

        it(`update user cards to users array`, ()=> {
            gameService.pullOutPlayerCards('Oskar');
            expect(gameService.players['Oskar'].length).toBe(2);
        });

    });

    describe('PullOutFlop method', () => {

        it(`returns 3 cards`, ()=> {
            expect(gameService.pullOutFlop().length).toBe(3);
        });

        it(`update flop cards`, ()=> {
            gameService.pullOutFlop();
            expect(gameService.flop.length).toBe(3);
        });

    });

    describe('PullOutTurn method', () => {

        it(`returns 1 card`, ()=> {
            expect(gameService.pullOutTurn().value).toBeDefined();
        });

        it(`update turn cards`, ()=> {
            gameService.pullOutTurn();
            expect(gameService.turn.value).toBeDefined();
        });

    });

    describe('PullOutRiver method', () => {

        it(`returns 1 card`, ()=> {
            expect(gameService.pullOutRiver().value).toBeDefined();
        });

        it(`update river cards`, ()=> {
            gameService.pullOutRiver();
            expect(gameService.river.value).toBeDefined();
        });

    });

    it(`has property currentPhase and it's inital set to flop`, ()=> {
        expect(gameService.currentPhase).toBeDefined();
        expect(gameService.currentPhase).toEqual(0);
    });

    it(`has method nextPhase`, ()=> {
        expect(gameService.nextPhase).toBeDefined();
    });

    describe('Method nextPhase', () => {

        let gameService;

        beforeEach(()=> {
            gameService = new GameService();
        });

        it(`after call increment the currentPhase property`, ()=> {
            gameService.nextPhase();
            expect(gameService.currentPhase).toEqual(1);
        });

        it(`pull out cards for current phase`, ()=> {
            spyOn(gameService, 'pullOutFlop');
            gameService.nextPhase();
            expect(gameService.pullOutFlop).toHaveBeenCalled();

            spyOn(gameService, 'pullOutTurn');
            gameService.nextPhase();
            expect(gameService.pullOutTurn).toHaveBeenCalled();

            spyOn(gameService, 'pullOutRiver');
            gameService.nextPhase();
            expect(gameService.pullOutRiver).toHaveBeenCalled();

            spyOn(gameService, 'result');
            gameService.nextPhase();
            expect(gameService.result).toHaveBeenCalled();
        });

    });

    it(`has method result`, ()=> {
        expect(gameService.result).toBeDefined();
    });

    describe('Result method', () => {


        it(`returns 'Oskar won' when Oskar has better combination`, ()=> {
            gameService.players = {
                Oskar: mocks.twoPairs[0].input,
                Opponent: mocks.onePair[0].input
            };

            expect(gameService.result()).toBe('Oskar won');
        });

        it(`returns 'Opponent won' when opponent has better combination`, ()=> {
            gameService.players = {
                Opponent: mocks.twoPairs[0].input,
                Oskar: mocks.onePair[0].input
            };

            expect(gameService.result()).toBe('Opponent won');
        });


        describe(`returns "Oskar lost" when`, ()=> {

            xit(`Oskar has one pair and his opponent two pairs`, ()=> {
                gameService.players = {
                    Oskar: mocks.onePair,
                    Opponent: mocks.twoPairs
                };

                expect(gameService.gameResult()).toBe('Opponent won');
            });

        });

    });

});