const GAME_NAME = "SeDie";

export const settings = {
    id: 2,
    name: GAME_NAME,
    observerNamespace: GAME_NAME,
    namespaces: [GAME_NAME],
    durations: {
        wholeRound: 39,
        lockingBet: 5,
        placingBet: 30,
        generatingResult: 1,
        showingResult: 6,
        startRound: 2,
    },
    numberOfRoundHistory: 100,
};

