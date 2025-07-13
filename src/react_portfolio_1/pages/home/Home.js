import React from "react";
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

import './home.css'
import Greetings from "../../components/greetings/greeting";
import Skills from "../../components/skills/skills";
import CurrentWork from "../../components/currentWork/currentWork";
import { personalData } from "../../utils/portfolioData";


const Home = ({ data }) => {
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

      <Greetings data={data} />
      <CurrentWork />

      <Skills />

      {/* <Grid container className="section"></Grid>

      <Grid container className="section"></Grid> */}
    </>
  );
};

const mapStateToProps = (state) => {
  const personalData = state.firestore.ordered.personal ?? []

  // Check if personalData is empty array, assign empty object if so
  const data = personalData.length === 0 ? {} : personalData[0]

  return {
    data: data,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'personal' },
  ])
)(Home);
