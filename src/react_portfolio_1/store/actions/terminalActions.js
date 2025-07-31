
export const addHistory = (entry) => ({
    type: 'ADD_HISTORY',
    payload: entry
});

export const updateHistoryItem = (index, updatedEntry) => ({
    type: 'UPDATE_HISTORY_ITEM',
    payload: { index, updatedEntry }
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
export const fetchApiResponse = (question) => {
    return async (dispatch, getState) => {
        dispatch(fetchApiRequest());

        const maxRetries = 2;
        let attempt = 0;
        let lastError;
        while (attempt < maxRetries) {
            try {
                const response = await fetch('https://vercel-dev-portfolio-api.vercel.app/api/ask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: question,
                        sessionId: getState().terminal.sessionId
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                dispatch(fetchApiSuccess(data));
                if (data && data.content) {
                    const content = data.content;
                    // Store the sessionId if it exists
                    if (data.sessionId) {
                        dispatch(fetchApiSuccess({ sessionId: data.sessionId }));
                    }
                    if (typeof content === 'string') {
                        try {
                            const parsed = JSON.parse(content);
                            return parsed;
                        } catch (parseError) {
                            // If parsing fails, return the original string
                            return content;
                        }
                    }
                    // If content is already an object, just return it
                    return content;
                } else {
                    throw Error("Invalid structure");
                }
            } catch (error) {
                lastError = error;
                if (attempt < maxRetries - 1) {
                    // Wait 500ms before retrying
                    await new Promise(res => setTimeout(res, 500));
                }
            }
            attempt++;
        }
        console.error('API call failed after retries:', lastError);
        dispatch(fetchApiFailure(lastError.message));
        throw lastError;
    };
};