//import ReactPortfolio from './react_portfolio_0/ReactPortfolio';
import ReactPortfolio from "./react_portfolio_1/ReactPortfolio";

import React, { useState, useEffect } from "react";

import { themes } from "./react_portfolio_1/utils/themeData"
import { ThemeProvider } from "styled-components";
import './App.css';
import { settings } from "./react_portfolio_1/settings"
import ReactGA from "react-ga";

function App() {

  useEffect(() => {
    if (settings.googleTrackingID) {
      ReactGA.initialize(settings.googleTrackingID,);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  // Force scroll to top on app initialization and page reload
  useEffect(() => {
    const forceScrollToTop = () => {
      // Multiple methods to ensure it works
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Also try scrolling the main content area
      const mainContent = document.querySelector('.main-content-wrapper');
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    };

    // Scroll immediately
    forceScrollToTop();

    // Scroll after a short delay to handle any dynamic content
    const timeoutId1 = setTimeout(forceScrollToTop, 50);
    const timeoutId2 = setTimeout(forceScrollToTop, 200);
    const timeoutId3 = setTimeout(forceScrollToTop, 500);

    // Also handle beforeunload to reset scroll position
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', '0');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Check if we need to restore scroll position
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition === '0') {
      forceScrollToTop();
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const [selectedTheme, setTheme] = useState(() => {
    // null coalescing 
    // returning light theme by default 
    return localStorage.getItem("theme") || "light"

  })

  return (
    <div className="app">
      <ThemeProvider theme={themes[selectedTheme]}>
        <ReactPortfolio
          theme={themes[selectedTheme]}
          setTheme={setTheme} />
      </ThemeProvider>
    </div>


  );
}

export default App;
