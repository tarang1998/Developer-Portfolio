import { useContext } from 'react'
import { Fade } from 'react-reveal';
import { ThemeContext } from 'styled-components'
import './currentWork.css'
import { Grid, Card, CardMedia, CardContent } from '@material-ui/core';
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import ProjectCard from '../../pages/projects/projectCard/projectCard';



const CurrentWork = ({ currentProjects }) => {

    const currentTheme = useContext(ThemeContext)
    return (
        <>

            <Fade>

                {/* Currently Working On Section */}
                <div className="currently-working-section">
                    <div className="currently-working-container">

                        {/* Background Pattern */}
                        <div className="currently-working-pattern"></div>

                        <div className="currently-working-content">
                            <div className="currently-working-header">
                                <div className="currently-working-indicator"></div>
                                <h3 style={{ color: currentTheme.contrast_color }} className="currently-working-title">Currently Building</h3>
                            </div>

                            {currentProjects?.map((project) => {

                                // Only include the fields you want
                                const projectData = {
                                    id: project.id,
                                    name: project.name,
                                    subtitle: project.subtitle,
                                    description: "",
                                    imageUrl: project.imageUrl,
                                    techStack: [],
                                    url: []
                                };

                                const githubURL = project.urls.find(url => url.name == "GITHUB").url
                                return <Grid container className="current-works">

                                    <Grid item xs={12} md={5} lg={6} xl={6} >
                                        <p style={{ color: currentTheme.contrast_color }} className="currently-working-description">
                                            {project.description}
                                        </p>

                                        {/* <div className="currently-working-tags">
                                        {['React', 'Node.js', 'AWS', 'AI/ML', 'Open Source'].map((tech, index) => (
                                            <span key={index} className="currently-working-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div> */}
                                    </Grid>

                                    <Grid item xs={12} md={7} lg={6} xl={6} className="current-work-card">
                                        <ProjectCard
                                            href={githubURL}
                                            repo={projectData}
                                            theme={currentTheme}
                                            onClick={() => window.open(githubURL, '_blank', 'noopener,noreferrer')}
                                        />
                                    </Grid>
                                </Grid>
                            })}



                        </div>
                    </div>
                </div>
            </Fade >

        </>
    );
};



const mapStateToProps = (state) => {
    const currentProjects = state.firestore.ordered.projects?.filter((p) => p.inProgress === true) || [];
    return {
        currentProjects: currentProjects,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['priority', 'asc'] },
    ])
)(CurrentWork)



