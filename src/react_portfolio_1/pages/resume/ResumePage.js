import React, { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Grid } from '@material-ui/core';
import { personalData } from '../../utils/portfolioData';
import Fade from 'react-reveal/Fade';
import './resumePage.css';
import { PlayArrow, Pause, GetApp, ZoomIn, ZoomOut, NavigateBefore, NavigateNext } from '@material-ui/icons';
import ResumeAudio from './Resume.mp3';

const ResumePage = () => {
    const currentTheme = useContext(ThemeContext);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    
    // Audio event handlers
    const handlePlayPause = async () => {
        console.log(audioRef)
        try {
            if (!audioRef.current) {
                console.error('Audio ref is null');
                return;
            }

            if (audioRef.current.paused) {
                await audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        } catch (error) {
            console.error('Error playing/pausing audio:', error);
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (!isDragging && audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            console.log('Audio loaded, duration:', audioRef.current.duration);
        }
    };

    const handleAudioError = (e) => {
        console.error('Audio error:', e.target.error);
        setIsPlaying(false);
    };

    const handleCanPlay = () => {
    };

    const handleSliderChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handleSliderMouseDown = () => {
        setIsDragging(true);
    };

    const handleSliderMouseUp = () => {
        setIsDragging(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

  

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            // Add event listeners
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', () => setIsPlaying(false));
            audio.addEventListener('error', handleAudioError);
            audio.addEventListener('canplay', handleCanPlay);

            // Try to load the audio
            audio.load();

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('ended', () => setIsPlaying(false));
                audio.removeEventListener('error', handleAudioError);
                audio.removeEventListener('canplay', handleCanPlay);
            };
        }
    }, []);

    return (
        <Fade duration={2000}>
            <div className="resume-page-container">
                <Grid container spacing={3}>
                    {/* Audio Section */}
                    <Grid item xs={12}>
                        <div className="audio-section" style={{ color: currentTheme.contrast_color }}>
                            <h2>Listen to My Resume</h2>
                          
                            <div className="audio-player">
                                <button 
                                    className="play-button"
                                    onClick={handlePlayPause}
                                    style={{ 
                                        backgroundColor: currentTheme.name === 'dark' ? '#2c2c2c' : '#f0f0f0',
                                        color: currentTheme.contrast_color 
                                    }}
                                >
                                    {isPlaying ? <Pause /> : <PlayArrow />}
                                </button>
                                
                                <div className="audio-controls">
                                    <div className="time-display">
                                        <span>{formatTime(currentTime)}</span>
                                    </div>
                                    
                                    <div className="slider-container">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={duration ? (currentTime / duration) * 100 : 0}
                                            onChange={handleSliderChange}
                                            onMouseDown={handleSliderMouseDown}
                                            onMouseUp={handleSliderMouseUp}
                                            className="audio-slider"
                                            style={{
                                                background: `linear-gradient(to right, ${currentTheme.name === 'dark' ? '#4a9eff' : '#1976d2'} 0%, ${currentTheme.name === 'dark' ? '#4a9eff' : '#1976d2'} ${duration ? (currentTime / duration) * 100 : 0}%, ${currentTheme.name === 'dark' ? '#444' : '#ddd'} ${duration ? (currentTime / duration) * 100 : 0}%, ${currentTheme.name === 'dark' ? '#444' : '#ddd'} 100%)`
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="time-display">
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>
                                
                                <audio 
                                    ref={audioRef} 
                                    src={ResumeAudio}
                                    preload="metadata"
                                    controls={false}
                                    onError={handleAudioError}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onCanPlay={handleCanPlay}
                                />
                            </div>
                        </div>
                    </Grid>

                    {/* PDF Section */}
                    <Grid item xs={12}>
                        <div className="pdf-section">
                            <div className="pdf-header">
                                <h2 style={{ color: currentTheme.contrast_color }}>My Resume</h2>
                                
                            </div>
                            
                            
                            <div className="pdf-container">
                                <iframe
                                    src={`https://r.tiiny.site/pdf/Resume`}
                                    title="Resume PDF"
                                    width="100%"
                                    height="600px"
                                    style={{
                                        border: `1px solid ${currentTheme.name === 'dark' ? '#404040' : '#e0e0e0'}`,
                                        borderRadius: '8px',
                                        transformOrigin: 'top left'
                                    }}
                                />
                            </div>
                            
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Fade>
    );
};

export default ResumePage;