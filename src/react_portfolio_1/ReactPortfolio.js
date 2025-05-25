import { Container, Grid } from "@material-ui/core";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import WorkExperience from "./pages/workExperience/workExperience";
import Home from "./pages/home/Home";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./reactPortfolio.css";
import Fade from 'react-reveal/Fade';
import Education from "./pages/education/education";
import Projects from "./pages/projects/projects";
import Programming from "./pages/promgramming/programming";



function ReactPortfolio(props) {


  const theme = props.theme
  const setTheme = props.setTheme

  return (
    <div style={{
      'background-color': theme.body_color,
      // 'overflow':'auto',
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>

          {/* <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <div>
              <Profile theme = {theme}/>
            </div>
          </Grid> */}

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Router>

              <Header theme={theme} setTheme={setTheme} />

              <Fade duration={1000} bottom>
                <div className="main_content main_border container_shadow "
                  style={{
                    'background-color': theme.body_color,
                    'border-color': theme.contrast_color,
                    // 'max-height' : '200px',
                    // 'overflow-y': 'scroll',
                  }}>
                  <Switch>
                    {/* <Route path="/programming">
                      <Programming theme={theme} />
                    </Route> */}
                    <Route path="/projects">
                      <Projects theme={theme} />
                    </Route>
                    {/* <Route path="/education">
                      <Education />
                    </Route>
                    <Route path="/workExperience">
                      <WorkExperience />
                    </Route> */}
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </Fade>

              <Footer />
            </Router>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ReactPortfolio;
