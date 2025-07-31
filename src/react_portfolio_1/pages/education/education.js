import {  Grid } from "@material-ui/core";
import React from "react";
import EducationImg from "../../utils/educationSVGs/educationImg";
import './education.css'

import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { education } from "../../utils/educationData";
import Fade from 'react-reveal/Fade';
import { Flip } from "react-reveal";
// import ProgrammingPlatFroms from "./programmingPlatforms/programmingPlatforms";
import Certifications from "./certifications/Certifications";



const Education = () => {

  const currentTheme = useContext(ThemeContext)

 
  return (


      <div class='educationPage' style={{
        'color':currentTheme.contrast_color
      }} >

      <Fade  duration={4000}>

        <Grid container className="educationHeading">

          <Grid item xs={12} md={6} className="educationHeadingImage">
              <EducationImg theme={currentTheme}/>
          </Grid>

          <Grid item xs={12} md={4} className="educationHeadingText" >

            <div className="educationHeadingTextTitle">
              {education['title']}
            </div>

      

            <div className="educationHeadingTextDescription">
              {education['description']}
             
            </div>

            {/* <ProgrammingPlatFroms programmingPlatforms={education.competitiveProgrammingPlatforms} /> */}


          </Grid>

        </Grid> 

      </Fade>


        <div className="educationDegreesDiv">

          <Fade bottom duration={2000} distance="20px">

            {/* <h1 className="educationDegreesDivHeader">
              Degrees Received
            </h1> */}

          </Fade>

          <div className="educationDegreesDivBody">

            {education['degrees'].map((degree)=>{

            return <div className="degreeCard">
              <Flip left duration={2000}>

                <div 
                className = "degreeCardImage"

                style = {{
                
                  border: `1px solid ${currentTheme.accentColor}`,
                  boxShadow: `0px 0px 5px ${currentTheme.accentColor}`,
                  transition: "all 0.2s ease-in-out",
                  ':hover': {
                    boxShadow: `0 5px 15px ${currentTheme.accentColor} `,
                  },
                  borderRadius : "50%",
                  padding: "30px",
                  width: "200px",
                  marginRight: "50px",



                }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    
                    src={require(`../../assets/degreeImages/${degree['logo_path']}`).default}
                    alt={degree.alt_name}
                  />
                </div>

              </Flip>

              <Fade right duration={2000} distance="40px">

                <div className = "degreeCardBody"
                  style={{
                    borderBottom: `1px solid ${currentTheme.accentColor}`,
                    borderLeft: `1px solid ${currentTheme.accentColor}`,
                    borderRight: `1px solid ${currentTheme.accentColor}`,
                    borderRadius: "10px",
                    width: "90%",
                    margin: "10px",
                    boxShadow: `0px 1px 5px ${currentTheme.accentColor}`,
                    transition: "all 0.2s ease-in-out",
                    ":hover": {
                      color: "rgba(255, 255, 255, 1)",
                      boxShadow: `0 5px 15px ${currentTheme.accentColor}`,
                    },
                    "@media (max-width: 768px)": {
                      width: "100%",
                    },
                  }}>

                  <div
                    className="degreeCardBodyHeader"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  >

                    <div className="degreeCardBodyHeaderTitle">

                      <h2 className="degreeCardBodyHeaderCardTitle" style={{ color: "#FFFFFF" }}>
                        {degree.title}
                      </h2>
                  
                      <h3 className="degreeCardBodyHeaderCardSubTitle" style={{ color: "#FFFFFF" }}>
                        {degree.subtitle}
                      </h3>
                    </div>

                    <div className="degreeCardBodyHeaderDuration">
                      <h3 className="duration" style={{ color: "#FFFFFF" }}>
                        {degree.duration}
                      </h3>
                    </div>

                  </div>

                  <div classname="degreeCardBodyContent" style={{
                    maxWidth: 'inherit',
                    borderRadius: `0px 0px 7px 7px`,
                    padding: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>

                    {degree.descriptions.map((sentence) => {
                      return (
                        <p className="degreeCardBodyContentLine" style={{ color: currentTheme.contrast_color }}>
                          {sentence}
                        </p>
                      );
                    })}

                    {/* <a
                      href={degree.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textAlign: "center",  }}
                    >
                      <p
                        style={{
                          textDecoration: "none",
                          color: "rgba(255, 255, 255, 1)",
                          padding: "15px 15px",
                          marginTop: "25px",
                          borderRadius: "7px",
                          borderWidth: "0px",
                          marginBottom: "20px",
                          width: "200px",
                          fontWeight: "bold",
                          fontFamily: "Google Sans Regular",
                          fontSize: "17px",
                          transition: "all 0.2s ease-in-out",
                          cursor: "pointer",

                          ":hover": {
                            color: "rgba(255, 255, 255, 1)",
                            boxShadow: `0 5px 10px ${currentTheme.accentColor}`,
                          },
                          marginRight: "23px",
                          textDecoration: "none",
                          float: "right",
                          background: currentTheme.accentColor,
                        }}
                      >
                        Visit Website
                      </p>
                    </a> */}
                  </div>

                </div>
                
              </Fade>


            </div>
                          
            })}

          </div>

          <Certifications theme={currentTheme} certifications={education['certifications']} />



        </div>


      </div>


  );
};

export default Education;
