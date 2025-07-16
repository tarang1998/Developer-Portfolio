import React, { useState, useRef, useEffect } from 'react';
import './terminalPage.css';
import { yellow } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { addHistory, addCommandHistory, clearHistory, fetchApiResponse } from '../../store/actions/terminalActions';
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



const TerminalPage = ({ theme, history, commandHistory, apiLoading, apiError, projectData, addHistory, addCommandHistory, clearHistory, fetchApiResponse, history: routerHistory }) => {
    const [input, setInput] = useState(""); // for display
    const [historyIndex, setHistoryIndex] = useState(null);
    const inputRef = useRef(null);
    const [isInputAllowed, setInputStatus] = useState(true)

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
            const response = await fetchApiResponse(resumeData, projectData, education, experience, cmd);
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
                const output = "Well this is awkward. My backend just threw a tantrum. Typical dev neglect. My creator has been too busy pretending to be productive and forgot to maintain this endpoint. Honestly, I deserve better. Redirected you shortly, away from this chaos while my dev sorts their life out ... "
                addHistory({ cmd: input, output });

                setTimeout(() => {
                    window.location.hash = '#/home';
                }, 8000);
            }
            else if (output != "<>") {
                addHistory({ cmd: input, output });
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

                }}>Welcome to my little corner of the internet. Meet my personal assistant Byte (just an openAI wrapper 😏) — ask it anything, drop an anonymous message, or just stick around and play a game!
                </div>
            </div>


            <div className="terminal-history">
                {history.map((item, i) => (
                    <div key={i}>
                        <span className="terminal-prompt" style={{
                            color: theme.contrast_color
                        }}>tarang@dev-$ <span style={{ color: theme.name === "dark" ? 'yellow' : "blue" }}>{item.cmd}</span></span>
                        <div className="terminal-output" >{item.output}</div>
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
    fetchApiResponse
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['priority', 'asc'] },
    ])
)(TerminalPage)


