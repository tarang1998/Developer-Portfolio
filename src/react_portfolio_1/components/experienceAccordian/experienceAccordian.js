import React from "react";
import { Accordion, Panel } from "baseui/accordion";
import './experienceAccordian.css'

import { DarkTheme, LightTheme, ThemeProvider } from "baseui"; // Default Theming of baseUI


import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import ExperienceCard from "../experienceCard/experienceCard";


function ExperienceAccordion(props) {

  const currentTheme = useContext(ThemeContext)


  return (
    <div className="experienceAccordian" style={{
    
      'border-width': '0.1px',
      'border-style': 'groove',
      'border-color': currentTheme.contrast_color,
      'border-radius' : '5px'

    }}>

    <ThemeProvider theme={currentTheme.name === "light" ? LightTheme : DarkTheme}>

        <Accordion onChange={({ expanded }) => console.log(expanded)}>
          {props.sections.map((section) => {
            return (
              <Panel
                expanded="True"
                className="accordianPanel"
                title={section["title"]}
                key={section["title"]}
              >
                
                {section["experiences"].map((experience) => {
                  return (
                    <ExperienceCard experience={experience} theme={currentTheme} />
                  );
                })}
              </Panel>
            );
          })}
        </Accordion>

    </ThemeProvider>

    </div>
  );
}

export default ExperienceAccordion;
