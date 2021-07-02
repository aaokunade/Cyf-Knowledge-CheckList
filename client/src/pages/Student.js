/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-key */
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Footer from './Footer';


const Student = () => {
	const [lessons, setLessons] = useState({});
	useEffect(() => {
		fetch('/api/studentsPage')
			.then((result) => result.json())
			.then((lessons) => {
				console.log(lessons);
				setLessons(lessons)
			})
	}, [])
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
				{Object.keys(lessons).map((lesson, index) => (
                    
					<button className="skills-btn"  key = {index}><a href={"#" + lesson} >{lesson}</a></button>
				))}
			</div>
			{Object.keys(lessons).map((lesson, index) => (
				<div className="skill-section" id= {lesson} key = {index}>
					<h2>{lesson}</h2>
					{lessons[lesson].map((obj, index) =>(
						<div className="competency-level"  key = {index}>
							<p>{obj.objectives}</p>
							<button>Not Confident</button>
							<button>Needs Revision</button>
							<button>Confident</button>
						</div>
					))}
					
				</div>
			))}
			<Footer />
		</div>
	)
}

export default Student;
