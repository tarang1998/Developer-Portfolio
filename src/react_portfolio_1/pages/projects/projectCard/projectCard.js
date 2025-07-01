import React, { useEffect, useRef } from "react";
import { Fade } from "react-reveal";
import { style } from "glamor";
import "./projectCard.css"
import ProjectLanguages from "./projectLanguages/projectLanguages";
import { Grid } from "@material-ui/core";
import ProjectLinks from "./projectLinks/projectLinks";

export default function ProjectCard({ repo, theme }) {
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if title text overflows its container
    const checkOverflow = () => {
      if (titleRef.current && containerRef.current) {
        const textElement = titleRef.current;
        const containerElement = containerRef.current;

        // Temporarily set white-space to nowrap to check actual text width
        const originalWhiteSpace = textElement.style.whiteSpace;
        textElement.style.whiteSpace = 'nowrap';

        // Get the actual width of the text content
        const textWidth = textElement.scrollWidth;
        const containerWidth = containerElement.clientWidth;

        // Restore original white-space
        textElement.style.whiteSpace = originalWhiteSpace;

        const isOverflowing = textWidth > containerWidth;

        if (isOverflowing) {
          textElement.classList.add('scroll');
        } else {
          textElement.classList.remove('scroll');
        }
      }
    };

    // Check on mount and window resize
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [repo.name]);

  // function openRepoinNewTab(url) {
  //   var win = window.open(url, "_blank");
  //   win.focus();
  // }

  const styles = style({
    color: "rgb(88, 96, 105)",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -15px",
    padding: "2rem",
    cursor: "pointer",
    borderRadius: "5px",
    height: "100%",
    transition: "all 0.2s ease-in-out",
    ":hover": {
      boxShadow: `${theme.imageDark} 0 2px 15px`,
    },
  });

  return (
    <div>
      <Fade bottom duration={2000} distance="40px">
        <div
          {...styles}
          key={repo.id}
          // onClick={() => openRepoinNewTab(repo.url)}
          style={{ backgroundColor: theme.projectCard }}
        >
          <div className="project-card-container">
            {/* Header Section */}
            <div className="project-card-header">
              <div ref={containerRef} className="repo-name-div">
                <p
                  ref={titleRef}
                  className="repo-name"
                  style={{ color: theme.contrast_color }}
                >
                  {repo.name}
                </p>
              </div>
              {repo.subtitle && (
                <div className="repo-name-div">
                  <p className="repo-subtitle" style={{ color: theme.contrast_color }}>
                    {repo.subtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="project-card-description">
              <p className="repo-description" style={{ color: theme.contrast_color }}>
                {repo.description}
              </p>
            </div>

            {/* Footer Section */}
            <div className="project-card-footer">
              <div className="repo-details">
                <Grid container>
                  <Grid item sm={6} xs={12}>
                    <ProjectLanguages techStack={repo.techStack} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <ProjectLinks urls={repo.urls ?? []} />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
