import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    HomeRounded,
    WorkOutline,
    School,
    Code,
    FolderOpen,
    Group,
    Computer
} from "@material-ui/icons";
import { CgSun } from "react-icons/cg/";
import { HiMoon } from "react-icons/hi";
import styled from "styled-components";
import Fade from 'react-reveal/Fade';
import HeadShake from 'react-reveal/HeadShake';
import "./Sidebar.css";

const Sidebar = (props) => {
    const location = useLocation();
    const pathName = location.pathname;
    const [count, changeCount] = useState(0);

    function changeTheme() {
        changeCount(count + 1);
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
            <HiMoon className="theme-icon" color={"#A7A7A7"} />
        ) : (
            <CgSun className="theme-icon" color={"#F9D784"} />
        );

    const navItems = [
        { path: "/", icon: <Computer />, label: "Terminal" },
        { path: "/home", icon: <HomeRounded />, label: "Home" },
        { path: "/projects", icon: <FolderOpen />, label: "Projects" },
        { path: "/workExperience", icon: <WorkOutline />, label: "Experience" },
        { path: "/education", icon: <School />, label: "Education" },
        { path: "/programming", icon: <Code />, label: "Programming" },
    ];

    return (
        <Fade duration={1000} left>
            <div
                className="sidebar container_shadow"
                style={{
                    borderColor: props.theme.contrast_color,
                    backgroundColor: props.theme.body_color,
                }}
            >
                <div className="sidebar-content">
                    {/* Navigation Items */}
                    <nav className="sidebar-nav">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`sidebar-nav-item ${pathName === item.path ? 'active' : ''}`}
                                style={{
                                    'color': props.theme.contrast_color,
                                }}
                                title={item.label}
                            >
                                <div className="sidebar-icon">
                                    {React.cloneElement(item.icon, {
                                        className: 'nav-icon',
                                        style: {
                                            color: pathName === item.path ? props.theme.accentColor : props.theme.contrast_color,
                                        }
                                    })}
                                </div>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Theme Toggle */}
                    <div className="sidebar-theme-toggle">
                        <HeadShake spy={count}>
                            <button
                                className="theme-toggle-button"
                                style={{
                                    backgroundColor: props.theme.name === "light" ? "#7CD1F7" : "#292C3F",
                                }}
                                onClick={changeTheme}
                                title="Toggle Theme"
                            >
                                {icon}
                            </button>
                        </HeadShake>
                    </div>

                    {/* Online Users Info */}
                    <div className="sidebar-online-users" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '18px',
                        marginBottom: '8px',
                        padding: 0,
                        borderRadius: 0,
                        background: 'none',
                        color: props.theme.contrast_color,
                        fontWeight: 500,
                        fontSize: '1.02rem',
                        fontFamily: 'var(--font-google-sans-medium, sans-serif)',
                        minWidth: '0',
                        width: '100%',
                        boxShadow: 'none',
                        gap: '2px',
                        userSelect: 'none',
                    }}>
                        <Group style={{ fontSize: '1.35em', color: props.theme.contrast_color, marginBottom: 0 }} />
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '1em', letterSpacing: '0.1px', color: props.theme.contrast_color, marginTop: 2 }}>
                            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', marginRight: -1, background: '#27c93f', boxShadow: '0 0 2px #27c93f99' }}></span>
                            {props.onlineCount} online
                        </span>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Sidebar; 