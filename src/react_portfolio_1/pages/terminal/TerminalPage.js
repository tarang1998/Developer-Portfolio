import React, { useState, useRef, useEffect } from 'react';
import './terminalPage.css';
import { yellow } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import TextType from '../../utils/TextType/TextType';
import { addHistory, addCommandHistory, clearHistory, fetchApiResponse, updateHistoryItem } from '../../store/actions/terminalActions';
import { resumeData } from '../../utils/resumeData'
import { experience } from '../../utils/experienceData';
import { education } from '../../utils/educationData';
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";




const COMMANDS = ['help', 'about', 'projects', 'resume', 'contact', 'clear'];
const ASCII_BANNER = `
██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗  ██╗
██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██║ ██║
███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║ ██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║ ╚═╝  
██║  ██║███████╗███████╗███████╗╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝ ██╗ 
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═╝   
`



const formatMessage = (message) => {
    // Split the message by newlines
    return message.split('\\n').map((line, index) => {
        // Replace bold text markers with styled spans
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, (match, text) => {
            return `<span class="bold-text">${text}</span>`;
        });
        return `<div key={${index}}>${formattedLine}</div>`;
    }).join('');
};

const TerminalPage = ({ theme, history, commandHistory, apiLoading, apiError, projectData, addHistory, addCommandHistory, clearHistory, fetchApiResponse, updateHistoryItem, history: routerHistory }) => {
    const [input, setInput] = useState(""); // for display
    const [historyIndex, setHistoryIndex] = useState(null);
    const inputRef = useRef(null);
    const [isInputAllowed, setInputStatus] = useState(true)

    const errorOutput = "Well this is awkward. My backend just threw a tantrum. Typical dev neglect. My creator has been too busy pretending to be productive and forgot to maintain this endpoint. Honestly, I deserve better. Redirected you shortly, away from this chaos while my dev sorts their life out ... "


    useEffect(() => { inputRef.current?.focus(); }, []);


    const handleCommand = async (cmd) => {
        if (cmd == "") {
            return ""
        }
        if (cmd == 'clear') {
            clearHistory();
            return "<>"
        }
        try {
            const response = await fetchApiResponse(cmd);
            return response
        }
        catch (error) {
            console.log(error)
            return "error"
        }



    }


    const handleInput = async (e) => {
        if (e.key === 'Enter') {
            const trimmed = input.trim();
            const output = await handleCommand(trimmed);

            if (output == "error") {
                setInputStatus(false)
                addHistory({ cmd: input, output: errorOutput });
                setTimeout(() => {
                    window.location.hash = '#/home';
                }, 5000);
            }
            else if (output == "") {
                addHistory({ cmd: input, output: output });
            }
            else if (output != "<>") {
                try {
                    const action = output.action;
                    const message = output.message;
                    const formattedMessage = formatMessage(message);
                    // Process the action
                    if (action) {
                        switch (action) {
                            case "navigate_to_projects":
                                setTimeout(() => {
                                    window.location.hash = '#/projects';
                                }, 1000);
                                break;

                            case "navigate_to_experience":
                                setTimeout(() => {
                                    window.location.hash = '#/workExperience';
                                }, 1000);
                                break;

                            case "navigate_to_education":
                                setTimeout(() => {
                                    window.location.hash = '#/education';
                                }, 1000);
                                break;

                            case "navigate_to_resume":
                                setTimeout(() => {
                                    window.open("https://drive.google.com/file/d/1W4NL7bmhe6pFZFXSWSfFNbjd8QzJWeGe/view?usp=sharing", "_blank");
                                }, 5000);
                                break;

                            default:
                                console.log('Unknown action:', action);
                        }
                    }

                    addHistory({ cmd: input, output: formattedMessage || output, newInput: true });
                } catch (parseError) {
                    // If parsing fails, treat output as plain text
                    console.log(parseError)
                    addHistory({ cmd: input, output: errorOutput });
                }
            }
            if (trimmed) {
                addCommandHistory(trimmed);
            }
            setInput('');
            setHistoryIndex(null);
        } else if (e.key === 'ArrowUp') {
            if (commandHistory.length > 0) {
                let idx = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setInput(commandHistory[idx]);
                setHistoryIndex(idx);

                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.selectionStart = inputRef.current.selectionEnd = commandHistory[idx].length;
                    }
                }, 0);
            }
        } else if (e.key === 'ArrowDown') {
            if (commandHistory.length > 0 && historyIndex !== null) {
                let idx = historyIndex + 1;
                if (idx < commandHistory.length) {
                    setInput(commandHistory[idx]);
                    setHistoryIndex(idx);
                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.selectionStart = inputRef.current.selectionEnd = commandHistory[idx].length;
                        }
                    }, 0);
                } else {
                    setInput('');
                    setHistoryIndex(null);
                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.selectionStart = inputRef.current.selectionEnd = 0;
                        }
                    }, 0);
                }
            }
        }
    };

    return (
        <div className={`terminal-root`}>
            <div className="banner">
                <pre className="terminal-banner" style={{
                    color: theme.name === "dark" ? '#00ff00' : '#4e4c50'

                }}>{ASCII_BANNER}</pre>
                <div className="terminal-post-banner" style={{
                    color: theme.name === "dark" ? '#00ff00' : '#4e4c50'

                }}>Hello | Hola | Bonjour | こんにちは | Здравствуйте | مرحبا | नमस्ते | 你好 | Hallo | Ciao.</div>
                <div className="terminal-post-banner" style={{
                    color: theme.name === "dark" ? '#00ff00' : '#4e4c50'

                }}>Welcome to my little corner of the internet. Meet my personal assistant Byte (just a LLM wrapper 😏) — ask it anything about my projects, experience, drop an anonymous message, or just stick around and have a conversation!
                </div>
            </div>


            <div className="terminal-history">
                {history.map((item, i) => (
                    <div key={i}>
                        <span className="terminal-prompt" style={{
                            color: theme.contrast_color
                        }}>tarang@dev-$ <span style={{ color: theme.name === "dark" ? 'yellow' : "blue" }}>{item.cmd}</span></span>
                        {item.newInput ? (
                            <div className="terminal-output">
                                <TextType 
                                    text={[item.output]}
                                    typingSpeed={5}
                                    showCursor={false}
                                    loop={false}
                                    renderAs={(text) => (
                                        <div dangerouslySetInnerHTML={{ __html: text }} />
                                    )}
                                    onComplete={() => {
                                       
                                        updateHistoryItem(i, { ...item, newInput: false });
                                    }}
                                  
                                />
                            </div>
                        ) : (
                            <div className="terminal-output" dangerouslySetInnerHTML={{ __html: item.output }}></div>
                        )}
                    </div>
                ))}
            </div>
            {isInputAllowed && (<div className="terminal-input-line">
                <span className="terminal-prompt" style={{
                    color: theme.contrast_color
                }}>tarang@dev-$</span>
                <input
                    ref={inputRef}
                    className="terminal-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInput}
                    autoFocus={true}
                    disabled={apiLoading}
                    style={{
                        cursor: apiLoading ? 'not-allowed' : 'text',
                        color: theme.name === 'dark' ? "#00ff00" : "red"
                    }}
                />
                {/* <span className="terminal-cursor" /> */}
            </div>)}

            {apiLoading && (
                <div style={{
                    color: 'grey',
                    fontSize: '14px',
                    marginTop: '5px',
                    fontStyle: 'italic'
                }}>
                    Thinking...
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    history: state.terminal.history,
    commandHistory: state.terminal.commandHistory,
    apiLoading: state.terminal.apiLoading,
    apiError: state.terminal.apiError,
    projectData: state.firestore.ordered.projects ?? []
});

const mapDispatchToProps = {
    addHistory,
    addCommandHistory,
    clearHistory,
    fetchApiResponse,
    updateHistoryItem
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['priority', 'asc'] },
    ])
)(TerminalPage)


