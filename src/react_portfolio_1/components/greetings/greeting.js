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


const Greetings = () => {

  const currentTheme = useContext(ThemeContext)

  return (
    <>


      <Fade duration={4000}>

        <Grid container className="greeting">

          <Grid item xs={12} md={5} lg={6} xl={6} className="greeting-text-grid">
            <div
              className="greeting-text-grid-div"
              style={{
                color: currentTheme.contrast_color

              }}>
              <h1 className="greeting-title">{greetingData.title}</h1>
              <p className="greeting-sub-title">
                <span>I'm </span>
                <span>
                  {personalData.name}.{" Great to have you here!"}
                </span>
              </p>
              <p className="greeting-p">{introduction.aboutMe}</p>


              <ContactPlatFroms className="contact-platforms" contactPlatforms={contactPlatforms} />

              <Button className = "resume-button" onClick={() => window.open(personalData.resumeLink, "_blank")}> Resume</Button>

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
