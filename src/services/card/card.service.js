import * as _ from 'lodash'

const cardValues = [
    2,3,4,5,6,7,8,9,10,11,12,13,14
];

const cardColors = [
    'hearts', 'diamonds', 'spades', 'clubs'
];

export const cardService = {
    getAllCards: function () {
        return _.flatMap(cardColors, (symbol)=> {
            return cardValues.map((value)=> {
                return {
                    value: value,
                    symbol: symbol
                }
            });
        });
    }
};