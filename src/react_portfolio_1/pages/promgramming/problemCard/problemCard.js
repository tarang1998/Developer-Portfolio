import React from "react";
import './problemCard.css'

import { DarkTheme, LightTheme, ThemeProvider } from "baseui"; // Default Theming of BaseUI
import ProblemSolutionLinks from "./problemSolutionLinks/problemSolutionLinks";
import { programming } from "../../../utils/programmingData";


function ProblemCard(props) {

    const problem = props.problem;
    const theme = props.theme;

    console.log(programming.problemDifficulty[problem['difficulty']])

    return (

        <ThemeProvider theme={theme.name === "light" ? LightTheme : DarkTheme}>

            <div className="problemCard" style={{
                'border': `1px solid `,
                'background-color': theme.projectCard,
            }}>



                <div className="problemCardBodyDiv">

                    <div className="problemCardHeaderDiv">

                        <div className="problemCardHeaderLeftDiv">

                            <h3 className="problemCardHeaderTitle">
                                <a
                                    href={problem["questionUrl"]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: theme.text_color

                                    }}
                                >
                                    {problem["title"]}
                                </a>
                            </h3>

                        </div>

                        <div className="problemCardHeaderRightDiv">

                            <ProblemSolutionLinks
                                links={problem['solution']} />

                            <div className="problemCardDifficultTag" style={{
                                backgroundColor: programming.problemDifficulty[problem['difficulty']].color,
                                borderColor: programming.problemDifficulty[problem['difficulty']].color,
                                width: "60px",
                                height: "22px"
                            }}>
                                <p
                                    className="problemCardDifficultText"
                                    style={{
                                        textAlign: "center",
                                        margin: "0px",
                                        fontSize: "15px"
                                    }}>
                                    {programming.problemDifficulty[problem['difficulty']].name}
                                </p>
                            </div>
                        </div>

                    </div>




                </div>


            </div>

        </ThemeProvider>

    );












}

export default ProblemCard;
