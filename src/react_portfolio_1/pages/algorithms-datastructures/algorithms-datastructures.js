import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Fade from 'react-reveal/Fade';
import "./algorithms-datastructures.css"
import SoftwareDevelopmentImg from "../../utils/skillSVGs/SoftwareDevelopmentImg";
import WebAppDevelopment from "../../utils/skillSVGs/WebAppDevelopment";
import { programming } from "../../utils/programmingData";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import ProgrammingPatternAccordian from "../promgramming/programmingProblems/programmingPattern";
import ProgrammingPlatForms from "../promgramming/programmingPlatforms/programmingPlatforms"


class AlgorithmsDataStructures extends Component {

    render() {
        const currentTheme = this.props.theme

        return (
            <div className='algorithms-datastructures-page' style={{
                'color': currentTheme.contrast_color
            }} >

                <Fade duration={4000}>
                    <Grid container className="algorithms-heading">
                        <Grid item xs={12} md={7} className="algorithms-heading-text" >
                            <div className="algorithms-heading-text-title">
                                Algorithm & Data Structures
                            </div>
                            <div className="algorithms-heading-text-description">
                                A comprehensive collection of fundamental algorithms and data structures concepts.
                                This section covers essential topics including Arrays, Linked Lists, Trees, Graphs,
                                Dynamic Programming, Sorting, Searching, Bit Manipulation, and more. Each topic
                                includes problem statements, solutions in multiple programming languages (Python,
                                Java, C++), and detailed explanations to help you master these core computer
                                science concepts.
                            </div>

                            <ProgrammingPlatForms programmingPlatforms={programming.competitiveProgrammingPlatforms} />

                        </Grid>

                        <Grid item xs={12} md={5} className="algorithms-heading-image">
                            <WebAppDevelopment theme={currentTheme} />
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
)(AlgorithmsDataStructures)

