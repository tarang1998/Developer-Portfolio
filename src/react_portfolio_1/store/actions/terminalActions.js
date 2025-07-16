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

        try {
            const prompt = getPortfolioAssistantPrompt({
                resumeData: resumeData,
                projectData: projectData,
                experienceData: experienceData,
                educationData: educationData
            })


            const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system', content: prompt
                        },

                        { role: 'user', content: question }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            dispatch(fetchApiSuccess(data));
            return data

        } catch (error) {
            console.error('API call failed:', error);
            dispatch(fetchApiFailure(error.message));
            throw error;
        }
    };
};