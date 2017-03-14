import _ from 'lodash';

const descLength = o => {
    return -o.length;
};
const sortDesc = o => {
    return -o
};

const combinationsHierarchy = [
    'poker',
    'fourOfKind',
    'fullHouse',
    'color',
    'straight',
    'threeOfKind',
    'twoPairs',
    'onePair'
];

export const combinationService = {
    checkCombination: (array) => {
        console.log(array);
        for (let i = 0; i < combinationsHierarchy.length; i++) {
            const result = combinationService[combinationsHierarchy[i]](array);
            if (result) {
                return result;
            }
        }
    },
    onePair: (array) => {
        const combination = combinationService.getCombination(array, 2);
        if (!combination) {
            return false;
        }
        return {
            ...combinationService.createCombinationObject(array, combination, 3),
            combinationId: 1
        }
    },
    twoPairs: (array) => {
        const combination = combinationService.getCombination(array, 2);
        if (!combination) {
            return false;
        }
        const lowPair = combinationService.createCombinationObject(array, combination, 1).value;
        const arrayWithoutHighPair = _.filter(array, o => {
            return o.value !== lowPair
        });
        const combination2 = combinationService.getCombination(arrayWithoutHighPair, 2);
        if (!combination2) {
            return false;
        }
        const l = combinationService.createCombinationObject(arrayWithoutHighPair, combination2, 1);
        return {
            lowPair,
            highPair: l.value,
            kicker: l.kicker,
            combinationId: 2
        }
    },
    threeOfKind: (array) => {
        const combination = combinationService.getCombination(array, 3);
        if (!combination) {
            return false;
        }
        return {
            ...combinationService.createCombinationObject(array, combination, 2),
            combinationId: 3
        }
    },
    straight: (array) => {
        const result = _(array)
            .map('value')
            .sortBy()
            .reduce((prev, current) => {
                if (prev.val + 1 === current || !prev.counter) {
                    prev.counter++;
                    prev.max = current;
                }
                prev.val = current;
                return prev;
            }, {max: 0, val: 0, counter: 0});

        if (result.counter < 5) {
            return false;
        }
        return {
            combinationId: 4,
            value: result.max
        }
    },
    color: (array) => {
        const longestColor = _(array)
            .map('symbol')
            .groupBy()
            .sortBy(descLength)
            .value()[0];

        if (longestColor.length < 5) {
            return false;
        }
        const {value} = _.maxBy(array, 'value');
        return {
            combinationId: 5,
            color: longestColor[0],
            value: value
        }
    },
    fullHouse: (array) => {
        if(combinationService.threeOfKind(array) && combinationService.onePair(array)){
            return {
                combinationId: 6,
                threeOfKind: combinationService.threeOfKind(array).value,
                pair: combinationService.onePair(array).value
            }
        }
    },
    fourOfKind: (array) => {
        const combination = combinationService.getCombination(array, 4);
        if (!combination) {
            return false;
        }
        return {
            ...combinationService.createCombinationObject(array, combination, 1),
            combinationId: 7
        };
    },
    poker: (array) => {
        if(combinationService.color(array).color && combinationService.straight(array).value){
            return {
                combinationId: 8,
                color: combinationService.color(array).color,
                value: combinationService.straight(array).value
            }
        }
    },


    getCombination: (array, condition) => {
        const values = combinationService.getValues(array);

        return _(values)
            .groupBy()
            .sortBy(descLength)
            .filter({'length': condition})
            .value()[0];
    },

    getValues(array){
        return _(array)
            .map('value')
            .sortBy(sortDesc)
            .value();
    },

    createCombinationObject: (array, combination, kickers) => {
        const values = combinationService.getValues(array);

        return {
            value: combination[0],
            kicker: _.difference(values, combination).slice(0, kickers)
        }
    }
};