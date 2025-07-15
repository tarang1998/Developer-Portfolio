export const addHistory = (entry) => ({
    type: 'ADD_HISTORY',
    payload: entry
});

export const addCommandHistory = (command) => ({
    type: 'ADD_COMMAND_HISTORY',
    payload: command
});

export const clearHistory = () => ({
    type: 'CLEAR_HISTORY'
});

export const clearCommandHistory = () => ({
    type: 'CLEAR_COMMAND_HISTORY'
});