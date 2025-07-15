const initialState = {
    history: [],
    commandHistory: []
};

const terminalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY':
            return {
                ...state,
                history: [...state.history, action.payload]
            };
        case 'ADD_COMMAND_HISTORY':
            if (!action.payload || !action.payload.trim()) return state;
            return {
                ...state,
                commandHistory: [...state.commandHistory, action.payload]
            };
        case 'CLEAR_HISTORY':
            return {
                ...state,
                history: []
            };
        case 'CLEAR_COMMAND_HISTORY':
            return {
                ...state,
                commandHistory: []
            };
        default:
            return state;
    }
};

export default terminalReducer;