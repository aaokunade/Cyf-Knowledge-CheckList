/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-key */
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Footer from './Footer';
import logo from "./Images/cyf_logo.jpeg";


const Student = (props) => {
	const [lessons, setLessons] = useState({})
    const [updateCompetency, setUpdateCompetency] = useState({lesson: "", obj_id: 0, competencyId: 0, user:{}});
    const [competency , setCompetency] = useState([]);


// to render skills and objectives
	useEffect(() => {
        fetch('api/competency')
        .then((result) => result.json())
        .then((competency) => {
            setCompetency(competency);
            fetch('api/studentsPage')
			.then((result) => result.json())
			.then((lessons) => {
				setLessons(lessons)
			})
        })
		
	}, [])


// to get the button's text to update
    const updateCompetencyOnClick = (lesson, obj_id, competencyId) => {        
       setUpdateCompetency({lesson: lesson, obj_id: obj_id, competencyId: competencyId, user:props.user});
        fetch(`/api//mappingskills`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateCompetency),
        })
          .then((result) => result.json())
          .then((res) => {
            console.log(res);
          });
    };

	return (
		<div className="student-page">
            <div className="header">
                <div className="logo-image">
                    <img className="image" src={logo} alt="cyf_logo" />
                </div>
                <h2>Student</h2>
            </div>
			<div className="student-header">
				<h2>{props.user.userName}</h2>
				<Link className="link student-log-out-link" to="/">
                  Log out
				</Link>
			</div>
            
			<div className="skills-btn-container">
				{Object.keys(lessons).map((lesson, index) => (
					<button className="skills-btn"  key = {index}><a href={"#" + lesson} >{lesson}</a></button>
				))}
			</div>
			{Object.keys(lessons).map((lesson, index) => (
				<div className="skill-section" id={lesson}  key = {index}>
					<h2>{lesson}</h2>
					{lessons[lesson].map((obj, index) =>(
						<div className="competency-level"  key = {index}>
							<p className="obj">{obj.objectives}</p>
                        <div className="comp-btn">
                                {competency.map((comp) => (
                                    
                                    <button key={comp.id} onClick={() =>  updateCompetencyOnClick(lesson, obj.id, comp.id)}>{comp.competency}</button>
                                ))}
                            </div>
						</div>
					))}
					
				</div>
			))}
			<Footer />
		</div>
	)
}

export default Student;
