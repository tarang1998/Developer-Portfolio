import React from "react";
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import './home.css'
import Greetings from "../../components/greetings/greeting";
import Skills from "../../components/skills/skills";
import CurrentWork from "../../components/currentWork/currentWork";


const Home = () => {
  const currentTheme = useContext(ThemeContext);

  return (
    <>
      {/* <Grid container className="section">
        <Grid item className="section_title">
          <span></span>
          <h6 className="section_title_text" style={{
            'color':props.theme.contrast_color
          }}>About Me</h6>
        </Grid>

        <Grid item xs={12}>
          <Typography className="about_me_text" style={{
            'color':props.theme.contrast_color
          }}>
            {introduction.aboutMe}
          </Typography>
        </Grid>
      </Grid> */}

      <Greetings />
      <CurrentWork />

      <Skills />

      {/* <Grid container className="section"></Grid>

      <Grid container className="section"></Grid> */}
    </>
  );
};

export default Home;
