import React, {useContext} from 'react'
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal/Fade';
import './skills.css'
import { skills } from '../../utils/portfolioData';
import CloudInfraImg from '../../utils/skillSVGs/CloudInfraImg';
import WebAppDevelopment from '../../utils/skillSVGs/WebAppDevelopment';
import { Grid } from '@material-ui/core';
import MobileDevelopmentImg from '../../utils/skillSVGs/MobileDevelopmentImg';
import SoftwareSkill from '../softwareSkills/softwareSkill';
import SoftwareDevelopmentImg from '../../utils/skillSVGs/SoftwareDevelopmentImg';



function Skills(){

    const currentTheme = useContext(ThemeContext)

    return(
        <>
            <div className="skills">
                <div className="skills-header-div">
                    <Fade bottom duration={2000} >
                        <h1 className="skills-header" style={{ color: currentTheme.contrast_color }}>
                            Here's what I do
                        </h1>
                    </Fade>

                    <SkillSection />
                </div>

            </div>
        </>
    )


}

function GetSkillSvg(props) {

    if (props.fileName === "FullStackImg")
        return <WebAppDevelopment theme={props.theme} />;
    else if (props.fileName === "CloudInfraImg")
        return <CloudInfraImg theme={props.theme} />;
    else if (props.fileName === "MobileDevelopmentImg")
        return <MobileDevelopmentImg theme={props.theme} />;
    else if (props.fileName === "SoftwareDevelopmentImg")
        return <SoftwareDevelopmentImg theme={props.theme}/>
    else
        return <></>

  }
  
function SkillSection() {

    const currentTheme = useContext(ThemeContext)

    return (
      <div>
        {skills.data.map((skill, index) => {
          if (index % 2 === 0) {
            return (
              <div className="skills-section">

                <Fade left duration={2000}>
                  <div className="skills-section-image-div">
                    <GetSkillSvg fileName={skill.fileName} theme={currentTheme} />
                  </div>
                </Fade>
  
                <div className="skills-section-text-div">

                  <Fade right duration={1000}>
                    <h1 className="skills-section-heading" style={{ color: currentTheme.contrast_color }}>
                      {skill.title}
                    </h1>
                  </Fade>

                  <Fade right duration={1500}>
                    <SoftwareSkill logos={skill.softwareSkills} />
                  </Fade>

                  <Fade right duration={2000}>
                    <div>
                      {skill.skills.map((skillSentence) => {
                        return (
                          <p
                            className="skills-text"
                            style={{ color: currentTheme.contrast_color }}
                          >
                            {skillSentence}
                          </p>
                        );
                      })}
                    </div>
                  </Fade>

                </div>
              </div>
            );
          } else {
            return (

              <Grid container className='skills-section' xs={12} style={{
                'margin-top': '0px'
              }}>

                <Grid item xs={6} className='skills-section-text-div' >

                  <Fade left duration={1000}>
                      <h1 className="skills-section-heading" style={{ color: currentTheme.contrast_color }}>
                        {skill.title}
                      </h1>
                    
                  </Fade>

                  <Fade left duration={1500}>
                    <SoftwareSkill logos={skill.softwareSkills} />
                  </Fade>

                  <Fade left duration={2000}>
                    <div>
                      {skill.skills.map((skillSentence) => {
                        return (
                          <p
                            className="skills-text"
                            style={{ color: currentTheme.contrast_color }}>
                            {skillSentence}
                          </p>
                        );
                      })}
                    </div>
                  </Fade>
                </Grid>

                <Grid item xs={6}>

                  <Fade right duration={2000}>
                    <div className="skills-section-image-div">
                      <GetSkillSvg fileName={skill.fileName} theme={currentTheme} />
                    </div>
                  </Fade>

                </Grid>

                


              </Grid>

            );
          }
        })}
      </div>
    );
}
    

export default Skills;


