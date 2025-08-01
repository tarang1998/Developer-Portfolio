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
import TextType from "../../utils/TextType/TextType";

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
                <span>I'm {personalData.name}.</span>
              </p>
              <div className="greeting-p">
                  <TextType 
                    text={[
                      `Great to have you here!`, 
                      "A Software Developer",
                      "Masters Of Engineering@University of Maryland",
                      "Bachelors in Computer Engineering",
                      "A Flutter Dev",
                      "AI Enthusiast",
                    
                      ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    loop={true}
                    color={currentTheme.contrast_color}
                    textColors={[currentTheme.contrast_color]}
                  />
                </div>
              <p className="greeting-p" style={{marginTop: '10px'}}>{introduction.aboutMe}</p>

              <ContactPlatFroms className="contact-platforms" contactPlatforms={contactPlatforms} />

              <Button
                className="resume-button"
                onClick={() => window.location.hash = '#/resume'}
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

          <Grid item xs={12} className="greeting-text-grid-div" style={{
                color: currentTheme.contrast_color,
                marginTop: '50px'
              }}>

            <p className="greeting-sub-title" style={{marginBottom: '30px'}}>
                <span>A Quick Intro About Me</span>
            </p>

            <p className="greeting-p" style={{marginTop: '20px'}}>
              <span> 🎓 I have a Masters degree in Software Engineering from the University Of Maryland - College Park and a Bachelors in Computer Engineering from the University Of Mumbai.</span>
            </p>

          </Grid>

          <Grid item xs={12} md={9} lg={9} xl={9} className="greeting-text-grid-div" style={{
                color: currentTheme.contrast_color,
                marginTop: '30px'
              }}>
            <p className="greeting-p">
              <span>📦 Developed a scalable cloud-native billing and inventory managent SaaS platform <a href="https://billingfast.com"  target="_blank" rel="noopener noreferrer">billingFast</a> used by thousands of businesses globally and managing millions of SKUs, featuring barcode support, user data imports and exports, multi-user roles, and custom domain webstores on GCP boosting merchant sales.</span>
            </p>
          </Grid>

          <Grid item xs={12} md={2} lg={2} xl={2} style={{marginTop: '10px'}}>
            <a href="https://www.billingfast.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://www.billingfast.com/dist/images/logopng1.png"
                alt="BillingFast Logo"
                style={{
                  maxWidth: '150px',
                  height: 'auto',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            </a>
          </Grid>

          <Grid item xs={12} md={9} lg={9} xl={9} className="greeting-text-grid-div" style={{
                color: currentTheme.contrast_color,
                marginTop: '50px'
              }}>
            <p className="greeting-p">
              <span>⚛️ Built a cross-platform mobile XR platform  <a href="https://www.myracle.io/"  target="_blank" rel="noopener noreferrer">myracle.io</a> delivering offline-capable AR/VR science labs to students using only tablets/phones, enabling hands-on experiments with multi-sensory logic workflows resulting in measurable learning gains.</span>
            </p>
          </Grid>

          <Grid item xs={12} md={2} lg={2} xl={2} style={{marginTop: '10px', justifyContent: 'center', alignContent: 'center'}}>
            <a href="https://www.myracle.io/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://static.wixstatic.com/media/4a82d1_e48e076a8b2f46ee9e02928d27a0c096~mv2.png/v1/fill/w_370,h_106,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Frame%201.png"
                alt="BillingFast Logo"
                style={{
                  maxWidth: '150px',
                  height: 'auto',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            </a>
          </Grid>

          <Grid item xs={12} className="greeting-text-grid-div" style={{
                color: currentTheme.contrast_color,
                marginTop: '30px'
              }}>

            <p className="greeting-p" style={{marginTop: '10px'}}>
              <span> 🤖 Currently learning about Artificial Intelligence and Deep Learning</span>
            </p>

          </Grid>




        </Grid>



      </Fade>


    </>
  );
};

export default Greetings;
