import * as _ from 'lodash';

import {cardService} from '../card/card.service';

export class DeckService {

    constructor(){
        this._deck = this.createNewDeck();
    }

    get deck(){
        return this._deck;
    }

    createNewDeck() {
        return this.shuffle(cardService.getAllCards());
    }

    shuffle(deck) {
        return _.shuffle(deck);
    }

    pullOutRandomCard() {
        const randomCardIndex = Math.floor(Math.random() * this._deck.length);
        return this._deck.splice(randomCardIndex, 1)[0];
    }
}