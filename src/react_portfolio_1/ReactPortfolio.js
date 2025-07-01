import { Container, Grid } from "@material-ui/core";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import WorkExperience from "./pages/workExperience/workExperience";
import Home from "./pages/home/Home";

import { HashRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import "./reactPortfolio.css";
import Fade from 'react-reveal/Fade';
import Education from "./pages/education/education";
import Projects from "./pages/projects/projects";
import Programming from "./pages/promgramming/programming";
import { useEffect, useState } from "react";

// Enhanced Scroll to top component with comprehensive scroll management
function ScrollToTop() {
  const { pathname } = useLocation();

  const scrollToTop = () => {
    // Use multiple methods to ensure scrolling works
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also try scrolling the main content area
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    // Force scroll on the app container
    const appContainer = document.querySelector('.app');
    if (appContainer) {
      appContainer.scrollTop = 0;
    }
  };

  useEffect(() => {
    // Scroll to top on route change
    scrollToTop();
  }, [pathname]);

  useEffect(() => {
    // Scroll to top on initial page load
    scrollToTop();

    // Handle hash changes for hash router
    const handleHashChange = () => {
      scrollToTop();
    };

    // Handle popstate (browser back/forward)
    const handlePopState = () => {
      scrollToTop();
    };

    // Handle load event
    const handleLoad = () => {
      scrollToTop();
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('load', handleLoad);

    // Multiple timeouts to ensure it works
    const timeoutId1 = setTimeout(scrollToTop, 50);
    const timeoutId2 = setTimeout(scrollToTop, 200);
    const timeoutId3 = setTimeout(scrollToTop, 500);
    const timeoutId4 = setTimeout(scrollToTop, 1000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      clearTimeout(timeoutId4);
    };
  }, []);

  return null;
}

function ReactPortfolio(props) {

  const theme = props.theme
  const setTheme = props.setTheme
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Additional scroll management at component level
  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Scroll immediately when component mounts
    forceScrollToTop();

    // Scroll after delays to handle any dynamic content
    const timeouts = [50, 100, 200, 500, 1000].map(delay =>
      setTimeout(forceScrollToTop, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Apply theme background color to body and html elements
  useEffect(() => {
    document.body.style.backgroundColor = theme.body_color;
    document.documentElement.style.backgroundColor = theme.body_color;

    return () => {
      // Cleanup on unmount
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, [theme.body_color]);

  return (
    <div style={{
      'background-color': theme.body_color,
      // 'overflow':'auto',
    }}>
      <Router>
        <ScrollToTop />

        {/* Show Header on Mobile, Sidebar on Desktop */}
        {isMobile ? (
          <Header theme={theme} setTheme={setTheme} />
        ) : (
          <Sidebar theme={theme} setTheme={setTheme} />
        )}

        <div
          className="main-content-wrapper"
          style={{
            marginLeft: isMobile ? '0px' : '80px',
            marginTop: isMobile ? '15px' : '20px'
          }}
        >
          <Container maxWidth="xl" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Fade duration={1000} bottom>
                  <div className="main_content main_border container_shadow "
                    style={{
                      'background-color': theme.body_color,
                      'border-color': theme.contrast_color,
                      'margin-top': 20,
                      // 'max-height' : '200px',
                      // 'overflow-y': 'scroll',
                    }}>
                    <Switch>
                      <Route path="/programming">
                        <Programming theme={theme} />
                      </Route>
                      <Route path="/projects">
                        <Projects theme={theme} />
                      </Route>
                      <Route path="/education">
                        <Education />
                      </Route>
                      <Route path="/workExperience">
                        <WorkExperience />
                      </Route>
                      <Route path="/">
                        <Home />
                      </Route>
                    </Switch>
                  </div>
                </Fade>

                <Footer />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default ReactPortfolio;
