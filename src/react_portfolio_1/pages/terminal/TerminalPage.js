import React, { useState, useRef, useEffect } from 'react';
import './terminalPage.css';
import { yellow } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { addHistory, addCommandHistory, clearHistory } from '../../store/actions/terminalActions';

const COMMANDS = ['help', 'about', 'projects', 'resume', 'contact', 'clear'];
const ASCII_BANNER = `
██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗  ██╗
██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██║ ██║
███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║ ██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║ ╚═╝  
██║  ██║███████╗███████╗███████╗╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝ ██╗ 
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═╝   
`



const TerminalPage = ({ theme, history, commandHistory, addHistory, addCommandHistory, clearHistory }) => {
    const [input, setInput] = useState(""); // for display
    const [historyIndex, setHistoryIndex] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const handleCommand = (cmd) => {
        switch (cmd) {
            case 'help':
                return 'Available commands: help, about, projects, resume, contact, clear';
            case 'about':
                return 'Tarang Nair - Software Developer. Passionate about building scalable cloud-native applications.';
            case 'projects':
                return 'Visit /projects or use the GUI for a full list.';
            case 'resume':
                return 'Opening resume...';
            case 'contact':
                return 'Email: tarangnair98@gmail.com | LinkedIn: tarang-nair-752aa8179';
            case 'clear':
                clearHistory();
                return '<>';
            case "":
                return '';

            default:
                return `Command not found: ${cmd} `;
        }
    };

    const handleInput = (e) => {
        if (e.key === 'Enter') {
            const trimmed = input.trim();
            const output = handleCommand(trimmed);
            if (output != "<>") {
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

                }}>Welcome to my little corner of the internet. Meet my personal assistant—ask anything, drop an anonymous message, or just stick around and play a game!
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
            <div className="terminal-input-line">
                <span className="terminal-prompt" style={{
                    color: theme.contrast_color
                }}>tarang@dev-$</span>
                <input
                    ref={inputRef}
                    className="terminal-input"
                    style={{ color: theme.color === 'dark' ? "#00ff00" : "red" }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInput}
                    autoFocus={true}
                />
                {/* <span className="terminal-cursor" /> */}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    history: state.terminal.history,
    commandHistory: state.terminal.commandHistory
});

const mapDispatchToProps = {
    addHistory,
    addCommandHistory,
    clearHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(TerminalPage); 