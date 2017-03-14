import {DeckService} from '../deck/deck.service';
import {resultService} from '../result/result.service';
import {combinationService} from '../combination/combination.service';

const gamePhases = ['preflop', 'flop', 'turn', 'river', 'result'];

export class GameService {

    constructor() {
        this.deckService = new DeckService();
        this.players = {};
        this.flop;
        this.turn;
        this.river;

        this.currentPhase = 0;
    }

    nextPhase() {
        this.currentPhase++;
        switch (gamePhases[this.currentPhase]) {
            case 'flop':
                this.pullOutFlop();
                break;
            case 'turn':
                this.pullOutTurn();
                break;
            case 'river':
                this.pullOutRiver();
                break;
            case 'result':
                this.result();
                break;
        }
    }

    pullOutPlayerCards(playerName) {
        return this.players[playerName] = [
            this.deckService.pullOutRandomCard(),
            this.deckService.pullOutRandomCard()
        ]
    }

    pullOutFlop() {
        return this.flop = [
            this.deckService.pullOutRandomCard(),
            this.deckService.pullOutRandomCard(),
            this.deckService.pullOutRandomCard()
        ]
    }

    pullOutTurn() {
        return this.turn = this.deckService.pullOutRandomCard();
    }

    pullOutRiver() {
        return this.river = this.deckService.pullOutRandomCard();
    }

    result() {
        const playersCombination = _.map(this.players, (cards, player)=> {
            return {
                player,
                combination: combinationService.checkCombination(cards)
            }
        });

        const combinations = _.map(playersCombination, 'combination');
        const best = resultService.checkResult(combinations);
        const winner = _.find(playersCombination, {'combination': best}).player;

        return winner+' won';
    }
}