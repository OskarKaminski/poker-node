import {DeckService} from './deck.service';
import allCardsMock from '../card/card.mock.json';

describe('Deck service', () => {

    const deckService = new DeckService();
    
    it('Has deck property', ()=> {
        expect(deckService.deck).toBeDefined();
    });

    describe('After initialize deck property', () => {

        it('returns new deck with 52 cards', ()=> {
            expect(deckService.deck.length).toBe(52);
            expect(deckService.deck[0]).toBeDefined();
            expect(deckService.deck[51]).toBeDefined();
        });

        it('returns deck shuffled', ()=> {
            expect(deckService.deck).not.toEqual(allCardsMock.allCards);
        });

    });

    it('has pullOutRandomCard method', ()=> {
        expect(deckService.pullOutRandomCard).toBeDefined();
    });

    describe('When pullOutRandomCard method is called', () => {

        let card;

        beforeEach(()=>{
            card = card || deckService.pullOutRandomCard();
        });

        it('card is returned', ()=> {
            expect(card).toBeDefined();
        });

        it('deck property returns 51 cards', ()=> {
            expect(deckService._deck.length).toBe(51);
        });

    });

});