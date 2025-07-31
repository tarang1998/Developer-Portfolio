import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import ProjectImg from "../../utils/projectSVGs/projectImg";

import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { projectData } from "../../utils/projectData";
import Fade from 'react-reveal/Fade';
import './project.css'
import ProjectCard from "./projectCard/projectCard";
import { style } from "glamor";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

const LABELS = [
  { name: "All", type: "ALL" },
  ...projectData.projectTypes.map(pt => ({ name: pt.name, type: pt.type }))
];

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: "ALL"
    };
  }

  handleLabelClick = (type) => {
    this.setState({ selectedLabel: type });
  };

  getFilteredProjects() {
    const { selectedLabel } = this.state;
    if (selectedLabel === "ALL") return this.props.projects;
    // Each project should have a 'type' field matching one of the projectTypes
    return this.props.projects.filter(project => project.type === selectedLabel);
  }

  render() {
    const currentTheme = this.props.theme;
    const styles = style({
      'color': currentTheme.contrast_color,
      marginTop: '20px',
    });
    const { selectedLabel } = this.state;
    const filteredProjects = this.getFilteredProjects();

    return (
      <div className="projects-main"
        style={{
          'color': currentTheme.contrast_color
        }}>
        <div className="basic-projects">
          <Fade duration={4000} >
            <Grid container className="projects-heading-div">
              <Grid item xs={12} md={6} className="projectHeadingImage">
                <ProjectImg theme={currentTheme} />
              </Grid>
              <Grid item xs={12} md={5} className="projectHeadingText" >
                <div className="projectHeadingTextTitle">
                  {projectData['title']}
                </div>
                <div className="projectHeadingTextSubtitle">
                  {projectData['subtitle']}
                </div>
                <div className="projectHeadingTextDescription">
                  {projectData['description']}
                </div>
              </Grid>
            </Grid>
          </Fade>
        </div>

        {/* LABEL BUTTONS */}
        <div className="project-labels-row">
          {LABELS.map(label => (
            <button
              key={label.type}
              className={`project-label-btn${selectedLabel === label.type ? ' selected' : ''}`}
              onClick={() => this.handleLabelClick(label.type)}
              style={{
                color: selectedLabel === label.type ? currentTheme.body_color : currentTheme.contrast_color,
                background: selectedLabel === label.type ? currentTheme.contrast_color : 'transparent',
                borderColor: currentTheme.contrast_color
              }}
            >
              {label.name}
            </button>
          ))}
        </div>

        <div className="repo-cards-div-main">
          {filteredProjects.map((project) => {
            return <ProjectCard repo={project} theme={currentTheme} />;
          })}
        </div>
        <br />
        <a
          {...styles}
          className="general-btn"
          target="_blank"
          href="https://github.com/tarang1998"
        >
          More Projects (Github)
        </a>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const projects = state.firestore.ordered.projects ?? []
  return {
    projects: projects,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['priority', 'asc'] },
  ])
)(Projects)

