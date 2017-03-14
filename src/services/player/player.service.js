export const player = (state, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return {
                id: action.id,
                name: action.name,
                hand: []
            };
        default:
            return state;
    }
};

export const players = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return [
                ...state,
                player(undefined, action)
            ];
        default:
            return state;
    }
};