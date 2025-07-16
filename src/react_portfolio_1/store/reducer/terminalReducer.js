const initialState = {
    history: [],
    commandHistory: [],
    apiLoading: false,
    apiError: null
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
        case 'FETCH_API_REQUEST':
            return {
                ...state,
                apiLoading: true,
                apiError: null
            };
        case 'FETCH_API_SUCCESS':
            return {
                ...state,
                apiLoading: false,
                apiError: null
            };
        case 'FETCH_API_FAILURE':
            return {
                ...state,
                apiLoading: false,
                apiError: action.payload
            };
        default:
            return state;
    }
};

export default terminalReducer;