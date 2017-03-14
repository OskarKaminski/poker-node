import {cardService} from './card.service';
import mock from './card.mock.json';

describe('Card Service', () => {
    
    it('has method getAllCards', ()=> {
        expect(cardService.getAllCards).toBeDefined();
    });
    
    describe('GetAllCards method', () => {
        
        const allCards = mock.allCards;
        
        it('returns all cards', ()=> {
            expect(cardService.getAllCards()).toEqual(allCards);
        });
        
    });
    
});