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

// API call actions
export const fetchApiRequest = () => ({
    type: 'FETCH_API_REQUEST'
});

export const fetchApiSuccess = (response) => ({
    type: 'FETCH_API_SUCCESS',
    payload: response
});

export const fetchApiFailure = (error) => ({
    type: 'FETCH_API_FAILURE',
    payload: error
});

// Thunk action for API calls
export const fetchApiResponse = (command, query) => {
    return async (dispatch, getState) => {
        dispatch(fetchApiRequest());

        try {
            // Replace this URL with your Google Cloud Function endpoint
            const response = await fetch('YOUR_GOOGLE_CLOUD_FUNCTION_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    command: command,
                    query: query
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            dispatch(fetchApiSuccess(data));
            return data;
        } catch (error) {
            console.error('API call failed:', error);
            dispatch(fetchApiFailure(error.message));
            throw error;
        }
    };
};