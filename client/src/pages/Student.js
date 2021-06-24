import React from 'react';
import { Link } from "react-router-dom";
import Footer from './Footer';


const Student = () => {
    return (
        <div className="student-page">
            <div>
                <h1>CODE YOUR FUTURE</h1>
            </div>
            <div className="student-header">
                <h2>Name</h2>
                <button><Link className="link" to="/">
                  Log out
                </Link></button>
            </div>
            
            <div className="skills-btn-container">
                <button className="skills-btn" ><a href="#html-css" >HTML/CSS</a></button>
                <button className="skills-btn" ><a href="#javaScript">JavaScript</a></button>
                <button className="skills-btn" ><a href="#react">React</a></button>
            </div>
            <div className="skill-section" id="html-css">
                <h2>HTML/CSS</h2>
                <div className="competency-level">
                    <p>Understand what 'parent' and 'child' is </p>
                    <button>Not Confident</button>
                    <button>Needs Revision</button>
                    <button>Confident</button>
                </div>
            </div>
            <div className="skill-section" id="javaScript">
                <h2>JavaScript</h2>
                <div className="competency-level">
                    <p>Understand what 'parent' and 'child' is</p>
                    <button>Not Confident</button>
                    <button>Needs Revision</button>
                    <button>Confident</button>
                </div>
            </div>
            <div className="skill-section" id="react">
                <h2>React</h2>
                <div className="competency-level">
                    <p>Understand what 'parent' and 'child' is</p>
                    <button>Not Confident</button>
                    <button>Needs Revision</button>
                    <button>Confident</button>
                </div>
            </div>
             <Footer />
        </div>
    )
}

export default Student;
