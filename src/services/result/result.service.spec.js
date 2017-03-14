import {resultService} from './result.service';
import mocks from '../combination/combination.mock.json';


describe('Result Service', () => {

    it(`has method checkResult`, ()=> {
        expect(resultService.checkResult).toBeDefined();
    });

    describe('Method checkResult', () => {

        xit(`calles method bestCombination`, ()=> {
            spyOn(resultService, 'bestCombination');
            resultService.checkResult();
            expect(resultService.bestCombination).toHaveBeenCalled();
        });

        it(`returns the best combination for different combinations`, ()=> {
            const combinations = [
                mocks.onePair[0].expected,
                mocks.color[0].expected,
                mocks.threeOfKind[0].expected
            ];
            expect(resultService.checkResult(combinations))
                .toEqual(mocks.color[0].expected);
        });

        it(`returns the best combination for two colors`, ()=> {
            const combinations = [
                mocks.color[0].expected,
                {
                    ...mocks.color[0].expected,
                    value: 14
                }
            ];

            expect(resultService.checkResult(combinations))
                .toEqual(combinations[1]);
        });

        it(`returns the best combination for two threes of a kind`, ()=> {
            const combinations = [
                mocks.threeOfKind[0].expected,
                {
                    ...mocks.threeOfKind[0].expected,
                    value: 2
                }
            ];

            expect(resultService.checkResult(combinations))
                .toEqual(combinations[0]);
        });

        it(`returns the best combination for two threes of a kind
        with the same value and different kickers`, ()=> {
            const combinations = [
                mocks.threeOfKind[0].expected,
                {
                    ...mocks.threeOfKind[0].expected,
                    kicker: [12, 11]
                }
            ];

            expect(resultService.checkResult(combinations))
                .toEqual(combinations[1]);
        });

    });

    describe('Method bestCombination', () => {

        describe(`Returns the strongest combination`, ()=> {

            it(`for different combinations`, ()=> {
                const combinations = [
                    mocks.onePair[0].expected,
                    mocks.twoPairs[0].expected,
                    mocks.threeOfKind[0].expected
                ];

                expect(resultService.bestCombination(combinations))
                    .toEqual(mocks.threeOfKind[0].expected);
            });

            it(`for equal combinations`, ()=> {
                const combinations = [
                    mocks.onePair[0].expected,
                    mocks.onePair[1].expected
                ];

                expect(resultService.bestCombination(combinations))
                    .toEqual(mocks.onePair[0].expected);
            });
        });
    });

    describe(`Best kicker method returns`, () => {

        describe(`Array of kicker indexes sorted 
        from the strongest to the weakest`, () => {

            it(`for different kickers`, ()=> {
                const combinations = [
                    {
                        id: 1,
                        pairs: 12,
                        kickers: [11, 6]
                    },
                    {
                        id: 1,
                        pair: 12,
                        kickers: [3, 10]
                    },
                    {
                        id: 1,
                        pair: 12,
                        kickers: [8, 5]
                    }
                ];
                expect(resultService.bestKicker(combinations))
                    .toEqual({
                        id: 1,
                        pairs: 12,
                        kickers: [11, 6]
                    });
            });

            it(`for the same first kicker`, ()=> {
                const combinations = [
                    {
                        id: 1,
                        pairs: 12,
                        kickers: [14, 6]
                    },
                    {
                        id: 1,
                        pair: 12,
                        kickers: [13, 14]
                    },
                    {
                        id: 1,
                        pair: 12,
                        kickers: [14, 5]
                    }
                ];
                expect(resultService.bestKicker(combinations))
                    .toEqual({
                        id: 1,
                        pair: 12,
                        kickers: [13, 14]
                    });
            });

        });

    });

    describe(`Best value method returns`, () => {

        describe(`The strongest combination`, () => {

            it(`for one pair`, ()=> {
                const combinations = [
                    mocks.onePair[0].expected,
                    mocks.onePair[1].expected
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(mocks.onePair[1].expected);
            });

            it(`for two pairs`, ()=> {
                const combinations = [
                    {
                        "combinationId": 2,
                        "highPair": 12,
                        "lowPair": 2,
                        "kicker": [
                            11
                        ]
                    },
                    {
                        "combinationId": 2,
                        "highPair": 11,
                        "lowPair": 10,
                        "kicker": [
                            11
                        ]
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[0]);
            });
            
            it(`for two pairs and equal high pair`, ()=> {
                const combinations = [
                    {
                        "combinationId": 2,
                        "highPair": 12,
                        "lowPair": 2,
                        "kicker": [
                            11
                        ]
                    },
                    {
                        "combinationId": 2,
                        "highPair": 12,
                        "lowPair": 10,
                        "kicker": [
                            11
                        ]
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[1]);
            });
            
            it(`for three of a kind`, ()=> {
                const combinations = [
                    {
                        "combinationId": 3,
                        "value": 3,
                        "kicker": [
                            12,
                            11
                        ]
                    },
                    {
                        "combinationId": 3,
                        "value": 7,
                        "kicker": [
                            12,
                            11
                        ]
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[1]);
            });
            
            it(`for four of a kind`, ()=> {
                const combinations = [
                    {
                        "combinationId": 7,
                        "value": 9,
                        "kicker": [
                            7
                        ]
                    },
                    {
                        "combinationId": 7,
                        "value": 3,
                        "kicker": [
                            7
                        ]
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[0]);
            });
            
            it(`for straight`, ()=> {
                const combinations = [
                    {
                        "combinationId": 4,
                        "value": 6
                    },
                    {
                        "combinationId": 4,
                        "value": 11
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[1]);
            });
            
            it(`for straight`, ()=> {
                const combinations = [
                    {
                        "combinationId": 5,
                        "value": 3,
                        "color": "spades"
                    },
                    {
                        "combinationId": 5,
                        "value": 12,
                        "color": "spades"
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[1]);
            });
            
            it(`for full house`, ()=> {
                const combinations = [
                    {
                        "combinationId": 6,
                        "threeOfKind": 8,
                        "pair": 12
                    },
                    {
                        "combinationId": 6,
                        "threeOfKind": 3,
                        "pair": 12
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[0]);
            });
            
            it(`for full house with equal three of a kind`, ()=> {
                const combinations = [
                    {
                        "combinationId": 6,
                        "threeOfKind": 3,
                        "pair": 6
                    },
                    {
                        "combinationId": 6,
                        "threeOfKind": 3,
                        "pair": 11
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[1]);
            });
            
            it(`for poker`, ()=> {
                const combinations = [
                    {
                        "combinationId": 8,
                        "value": 5,
                        "color": "spades"
                    },
                    {
                        "combinationId": 8,
                        "value": 13,
                        "color": "spades"
                    }
                ];

                expect(resultService.bestValue(combinations))
                    .toEqual(combinations[1]);
            });

        });

    });

});