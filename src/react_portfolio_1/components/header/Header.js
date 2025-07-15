import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./Header.css";

import { Nav, Navbar } from "react-bootstrap";

import { NavLink, withRouter, useLocation } from "react-router-dom";

import { HomeRounded, Terminal } from "@material-ui/icons";
import { CgSun } from "react-icons/cg/";
import { HiMoon } from "react-icons/hi";
import styled from "styled-components";
import Fade from 'react-reveal/Fade';
import HeadShake from 'react-reveal/HeadShake';



const Header = (props) => {

  //TODO : Glamor for CSS styling

  const ThemeTogglingButton = styled.button`
    cursor: pointer;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    border: none;
    background-color: ${props.theme.name === "light" ? "#7CD1F7" : "#292C3F"};
    outline: none;
    transition: all 0.2s ease-in-out;
    :hover: {
      boxShadow: 0 3px 8px ${props.theme.name === "light" ? "#F7D774" : "#646464"
    },
    },
  `


  const location = useLocation();
  const pathName = location.pathname;

  const [count, changeCount] = useState(0)

  function changeTheme() {

    changeCount(count + 1)

    if (props.theme.name === "light") {
      props.setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      props.setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  const icon =
    props.theme.name === "dark" ? (
      <HiMoon
        size={30}
        color={"#A7A7A7"}
      />
    ) : (
      <CgSun
        size={30}
        color={"#F9D784"}
      />
    );

  const headerlinkStyle = {
    'color': props.theme.contrast_color
  }

  return (
    <Fade duration={1000} top>
      <Navbar
        //sticky="top" 
        className={`header container_shadow ${props.theme.name === "light" ? "light-theme" : "dark-theme"}`}
        expand="lg"
        style={{
          'border-color': props.theme.contrast_color,
          'margin-top': 20,
        }}
      >
        {/* Home */}

        <Nav.Link as={NavLink} to="/home">
          <Navbar.Brand className="header_home" style={{
            // 'background-color':props.theme.contrast_color
          }}>
            <HomeRounded
              style={{
                'color': props.theme.contrast_color,
                'font-size': '30px'
              }} />
          </Navbar.Brand>
        </Nav.Link>


        <Navbar.Toggle style={{
          'border-color': props.theme.contrast_color,
          'background-color': 'transparent'
        }} />

        <Navbar.Collapse>
          <Nav className="header-left">
            {/* Resume Link */}
            <Nav.Link
              as={NavLink}
              to="/"
              className={pathName == "/" ? "header_link_active" : "header_link"}
              style={headerlinkStyle}
            >
              Terminal
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/home"
              className={pathName == "/home" ? "header_link_active" : "header_link"}
              style={headerlinkStyle}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/projects"
              className={
                pathName == "/projects" ? "header_link_active" : "header_link"
              }
              style={headerlinkStyle}
            >
              Projects
            </Nav.Link>

            {/* Portfolio Link */}
            <Nav.Link
              as={NavLink}
              to="/workExperience"
              className={
                pathName == "/workExperience" ? "header_link_active" : "header_link"
              }
              style={headerlinkStyle}

            >
              Experience
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/education"
              className={
                pathName == "/education" ? "header_link_active" : "header_link"
              }
              style={headerlinkStyle}

            >
              Education
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/programming"
              className={
                pathName == "/programming" ? "header_link_active" : "header_link"
              }
              style={headerlinkStyle}
            >
              Programming
            </Nav.Link>


          </Nav>

          <div className="header-right">

            {/* {Object.keys(mediaLinks.socials).map((key) => (
            <a href={mediaLinks.socials[key].link} target="_blank">
              {mediaLinks.socials[key].icon}
            </a>
          ))} */}

            {/* <CustomButton text={"Hire Me"} icon={<Telegram />} /> */}

            <HeadShake spy={count}>
              <button style={{
                cursor: "pointer",
                height: "45px",
                width: "45px",
                borderRadius: "50%",
                border: "none",
                // alignItems: "center",
                // justifyContent: "center",
                backgroundColor: props.theme.name === "light" ? "#7CD1F7" : "#292C3F",
                outline: "none",
                transition: "all 0.2s ease-in-out",
                ":hover": {
                  boxShadow: `0 3px 8px ${props.theme.name === "light" ? "#F7D774" : "#646464"
                    }`,
                },
              }}
                onClick={changeTheme}>
                {icon}
              </button>
            </HeadShake>


            {/* <ThemeTogglingButton  onClick={changeTheme}>{icon}</ThemeTogglingButton> */}

          </div>
        </Navbar.Collapse>
      </Navbar>
    </Fade>
  );
};

export default withRouter(Header);
