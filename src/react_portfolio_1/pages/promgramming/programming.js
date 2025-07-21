import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { programming } from "../../utils/programmingData";
import Fade from 'react-reveal/Fade';
import "./programming.css"
import SoftwareDevelopmentImg from "../../utils/skillSVGs/SoftwareDevelopmentImg";



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

              <div className="programmingHeadingTextDescription">
                {programming['description']}
              </div>



            </Grid>

            <Grid item xs={12} md={5} className="programmingHeadingImage">
              <SoftwareDevelopmentImg theme={currentTheme} />
            </Grid>



          </Grid>

        </Fade>

        {/* NOTES CARDS */}
        <Fade duration={2000} bottom>
          <div className="notes-cards-section">
            <Grid container spacing={3}>
              {programming.notesPages.map((page, index) => (
                <Grid item xs={12} lg={6} key={index}>
                  <div
                    className="notes-card"
                    onClick={() => {
                      if (page.route) {
                        window.location.hash = page.route;
                      } else {
                        // Show toast message for coming soon
                        const toast = document.createElement('div');
                        toast.className = 'toast-message';
                        toast.textContent = 'Coming Soon!';
                        toast.style.cssText = `
                          position: fixed;
                          top: 60px;
                          right: 40px;
                          background: ${currentTheme.contrast_color};
                          color: ${currentTheme.body_color};
                          padding: 12px 24px;
                          border-radius: 8px;
                          font-weight: 500;
                          z-index: 1000;
                          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                          animation: slideIn 0.3s ease;
                        `;

                        // Add animation CSS
                        const style = document.createElement('style');
                        style.textContent = `
                          @keyframes slideIn {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                          }
                        `;
                        document.head.appendChild(style);

                        document.body.appendChild(toast);

                        // Remove toast after 3 seconds
                        setTimeout(() => {
                          toast.style.animation = 'slideOut 0.3s ease';
                          setTimeout(() => {
                            document.body.removeChild(toast);
                          }, 300);
                        }, 3000);

                        // Add slideOut animation
                        const slideOutStyle = document.createElement('style');
                        slideOutStyle.textContent = `
                          @keyframes slideOut {
                            from { transform: translateX(0); opacity: 1; }
                            to { transform: translateX(100%); opacity: 0; }
                          }
                        `;
                        document.head.appendChild(slideOutStyle);
                      }
                    }}
                    style={{
                      borderColor: currentTheme.contrast_color,
                      color: currentTheme.contrast_color,
                      backgroundColor: currentTheme.body_color
                    }}
                  >
                    {page.imageUrl && (
                      <div className="notes-card-image">
                        <img
                          src={page.imageUrl}
                          alt={page.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="notes-card-content">
                      <h3 className="notes-card-title">{page.name}</h3>
                      <p className="notes-card-description">{page.description}</p>
                    </div>
                    <div className="notes-card-arrow">
                      →
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </Fade>



      </div>




    );
  }
}


export default Programming


