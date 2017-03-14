import _ from 'lodash';

const sortDesc = o => {
    return -o
};

const currentIsBetter = (pairs) => {
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        if (pair[1] > pair[0]) {
            return true;
        } else if (pair[1] < pair[0]) {
            return false;
        }
    }
    return false;
};

export const resultService = {
    checkResult: (array) => {
        const bestCombination = resultService.bestCombination(array);
        const bestCombinationResult = _.filter(array, (o) => {
            return o.combinationId === bestCombination.combinationId;
        });
        if(bestCombinationResult.length === 1) {
            return resultService.bestCombination(array);
        } else {
            const bestValue = resultService.bestValue(bestCombinationResult);
            const bestValueResult = _.filter(array, (o) => {
                return o.value === bestValue.value;
            });
            if(bestValueResult.length === 1){
                return bestValue;
            } else {
                const bestKicker = resultService.bestKicker(bestValueResult);
                return bestKicker;
            }
        }
    },
    bestCombination: (array) => {
        const highestCombinationId = _.maxBy(array, 'combinationId').combinationId;
        return _.filter(array, {combinationId: highestCombinationId})[0];
    },
    bestValue: (array) => {
        const combinationId = array[0].combinationId;

        if (combinationId === 1 ||
            combinationId === 3 ||
            combinationId === 7 ||
            combinationId === 5 ||
            combinationId === 8 ||
            combinationId === 4) {
            const highestvalue = _.maxBy(array, 'value').value;
            return _.filter(array, {value: highestvalue})[0];
        }

        if (combinationId === 2) {
            const highestHigh = _.maxBy(array, 'highPair').highPair;
            if (_.filter(array, {highPair: highestHigh}).length > 1) {
                const highestLow = _.maxBy(array, 'lowPair').lowPair;
                return _.filter(array, {lowPair: highestLow})[0]
            }
            return _.filter(array, {highPair: highestHigh})[0];
        }

        if (combinationId === 6) {
            const highestHigh = _.maxBy(array, 'threeOfKind').threeOfKind;
            if (_.filter(array, {threeOfKind: highestHigh}).length > 1) {
                const highestLow = _.maxBy(array, 'pair').pair;
                return _.filter(array, {pair: highestLow})[0]
            }
            return _.filter(array, {threeOfKind: highestHigh})[0];
        }
    },
    bestKicker: (array) => {
        return _.reduce(array, (prev, current) => {
            const bestKickers = _.sortBy(prev.kickers, sortDesc);
            const currentKickers = _.sortBy(current.kickers, sortDesc);
            const kickerPairs = _.zip(bestKickers, currentKickers);

            return currentIsBetter(kickerPairs) ? current : prev;
        });
    }
};