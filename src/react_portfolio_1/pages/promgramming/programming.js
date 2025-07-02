import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { programming } from "../../utils/programmingData";
import Fade from 'react-reveal/Fade';
import "./programming.css"
import ProgrammingPlatForms from "./programmingPlatforms/programmingPlatforms"
import SoftwareDevelopmentImg from "../../utils/skillSVGs/SoftwareDevelopmentImg";
import ProgrammingPatternAccordian from "./programmingProblems/programmingPattern";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";


class Programming extends Component {

  render() {

    // const currentTheme = useContext(ThemeContext)
    const currentTheme = this.props.theme

    return (


      <div className='programmingPage' style={{
        'color': currentTheme.contrast_color
      }} >

        <Fade duration={4000}>

          <Grid container className="programmingHeading">

            <Grid item xs={12} md={7} className="programmingHeadingText" >

              <div className="programmingHeadingTextTitle">
                {programming['title']}
              </div>

              {/* <div className="programmingHeadingTextDescription">
                {programming['description']}
              </div> */}

              <ProgrammingPlatForms programmingPlatforms={programming.competitiveProgrammingPlatforms} />


            </Grid>

            <Grid item xs={12} md={5} className="programmingHeadingImage">
              <SoftwareDevelopmentImg theme={currentTheme} />
            </Grid>



          </Grid>

        </Fade>

        <Fade duration={2000} right>

          <ProgrammingPatternAccordian
            programmingProblems={this.props.programmingProblems}
            programmingPatterns={programming['programmingPatterns']} />

        </Fade>


      </div>




    );
  }
}

const mapStateToProps = (state) => {
  const problems =
    state.firestore.ordered.programming ?? []
  // [
  //   {
  //     'type' : 'LINKED_LIST',
  //     'title' : 'Reverse a Linked List',
  //     'questionUrl' : '',
  //     'solution' : [
  //       {
  //         'type' : 'PYTHON',
  //         'url' : ""
  //       },
  //       {
  //         'type' : 'TEXT',
  //         'url' : ''
  //       }
  //     ]
  //   }] 



  let programmingProblems = new Map();

  problems.map((problem) => {
    const type = problem['type']

    if (programmingProblems.has(type)) {
      programmingProblems.get(type).push(problem)

    }
    else {
      programmingProblems.set(type, [problem])
    }

  })


  return {
    programmingProblems: programmingProblems,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'programming', orderBy: ['priority', 'asc'] },
  ])
)(Programming)


