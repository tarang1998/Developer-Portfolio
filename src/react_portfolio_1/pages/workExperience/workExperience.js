import { Grid } from '@material-ui/core'
import React from 'react'
import ExperienceImg from '../../utils/experienceSVGs/experienceImg'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import './workExperience.css'
import { experience } from '../../utils/experienceData'
import Fade from 'react-reveal/Fade';
import ExperienceAccordion from '../../components/experienceAccordian/experienceAccordian'

const WorkExperience = () => {

    const currentTheme = useContext(ThemeContext)



    return (
        <>
            <Fade duration={4000}>
                <Grid container xs={12} style={{
                
                }}>

                    <Grid item xs={12}  sm={12} md={6} className='workExperienceImageGrid' >
                        <ExperienceImg theme={currentTheme} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} className='workExperienceTextGrid'>
                        <h1
                            className="workExperienceTextGridHeadingText"
                            style={{ color: currentTheme.contrast_color }}
                        >
                            {experience['title']}
                        
                        </h1>
                        <h3
                            className="workExperienceTextGridSubHeadingText"
                            style={{ color: currentTheme.contrast_color }}
                        >
                            {experience["subtitle"]}
                        
                        </h3>
                        <p
                            className="workExperienceTextGridDescription"
                            style={{ color: currentTheme.contrast_color }}
                        >
                            {experience["description"]}
                           
                            <br/>
                            <br/>
                            {experience["description1"]}
                        </p>
                    </Grid>

                </Grid>

            </Fade>

            <Fade duration={1000} right>

                <ExperienceAccordion sections={experience['sections']}/>

            </Fade>


        </>
        
        
    )
}

export default WorkExperience
