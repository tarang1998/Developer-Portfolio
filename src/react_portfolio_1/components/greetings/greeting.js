import React from "react";

import { greetingData, introduction, personalData } from "../../utils/portfolioData";
import { Grid } from "@material-ui/core";

import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Fade from 'react-reveal/Fade';
import LevitatingMan from "../../utils/levitatingMan/levitatingMan";
import './greeting.css'
import { contactPlatforms } from "../../utils/portfolioData"
import ContactPlatFroms from "../../pages/home/contactPlatfroms/contactPlatforms";
import { Button } from "react-bootstrap";
import { GetApp } from "@material-ui/icons";
import { style } from "glamor";


const Greetings = (data) => {

  const currentTheme = useContext(ThemeContext)
  const resumeLink = data.data.resumeLink ?? personalData.resumeLink

  return (
    <>

      <Fade duration={4000}>

        {/* GitHub Contribution Grid - full width above greeting */}
        <div className="github-contribution-grid-wrapper">
          <a href="https://github.com/tarang1998" target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
            <img
              src="https://ghchart.rshah.org/tarang1998"
              alt="GitHub Contribution Chart"
              className="github-contribution-grid-img"
              style={{
                background: currentTheme.body_color,
              }}
            />
          </a>
        </div>

        <Grid container className="greeting">

          <Grid item xs={12} md={5} lg={6} xl={6} className="greeting-text-grid">
            <div
              className="greeting-text-grid-div"
              style={{
                color: currentTheme.contrast_color

              }}>
              <h1 className="greeting-title" style={{ marginBottom: '50px' }}>{greetingData.title}</h1>
              <p className="greeting-sub-title">
                <span>I'm </span>
                <span>
                  {personalData.name}.{" Great to have you here!"}
                </span>
              </p>
              <p className="greeting-p">{introduction.aboutMe}</p>

              <ContactPlatFroms className="contact-platforms" contactPlatforms={contactPlatforms} />

              <Button
                className="resume-button"
                onClick={() => window.open(resumeLink, "_blank")}
                style={{ color: currentTheme.contrast_color }}
              >
                <GetApp style={{ marginRight: '8px', fontSize: '18px' }} />
                Resume
              </Button>

            </div>
          </Grid>

          <Grid item xs={12} md={7} lg={6} xl={6} className='greeting-image-grid'>

            <LevitatingMan theme={currentTheme} />

          </Grid>

        </Grid>



      </Fade>


    </>
  );
};

export default Greetings;
