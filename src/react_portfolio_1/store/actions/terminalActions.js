import { getPortfolioAssistantPrompt } from "../../utils/promptData"

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
export const fetchApiResponse = (resumeData, projectData, educationData, experienceData, question) => {
    return async (dispatch, getState) => {
        dispatch(fetchApiRequest());

        const prompt = getPortfolioAssistantPrompt({
            resumeData: resumeData,
            projectData: projectData,
            experienceData: experienceData,
            educationData: educationData
        });

        const maxRetries = 2;
        let attempt = 0;
        let lastError;
        while (attempt < maxRetries) {
            try {
                const apiKey = process.env.REACT_APP_GROQ_API_KEY;
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                        messages: [
                            {
                                role: 'system', content: prompt
                            },
                            {
                                role: 'user', content: question
                            }
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                dispatch(fetchApiSuccess(data));
                if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                    return data.choices[0].message.content;
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