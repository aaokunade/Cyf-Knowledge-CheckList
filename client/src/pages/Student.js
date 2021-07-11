import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import logo from "./Images/cyf_logo.jpeg";
import ScrollToTop from "./ScrollToTop";
import { globalState } from "./LogIn";

const Student = (props) => {
	const [lessons, setLessons] = useState({ lessons: {} });
	const [updateCompetency, setUpdateCompetency] = useState({
		lesson: "",
		obj_id: 0,
		competencyId: 0,
		user: {},
	});
	const [competency, setCompetency] = useState([]);
	const [active, setActive] = useState();
	// to render skills and objectives
	useEffect(() => {
		fetch("api/competency")
			.then((result) => result.json())
			.then((competency) => {
				setCompetency(competency);
				fetch("api/students-page", {
					method: "POST",
					headers: {
						Authorization: `Token ${globalState.token}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userId: props.user.userId }),
				})
					.then((result) => result.json())
					.then((lessons) => {
						setLessons(lessons);
					});
			});
	}, [props]);
	// to get the button's text to update
	const updateCompetencyOnClick = (
		lesson,
		obj_id,
		competencyId,
		objective,
		competency
	) => {
		let mappingSkills = {
			lesson: lesson,
			obj_id: obj_id,
			competencyId: competencyId,
			user: props.user,
		};
		setUpdateCompetency(mappingSkills);
		fetch("/api/mapping-skills", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(mappingSkills),
		})
			.then((result) => result.json())
			.then((res) => {
				if (res.competency) {
					updateComp(lesson, objective, res.competency);
				} else {
					updateComp(lesson, objective, competency);
				}
			});
	};
	const isActive = (lesson, objective, competency) => {
		//  lessons.competencies &&
		return lessons.competencies.find(
			(c) =>
				c.lessons === lesson
        && c.objectives === objective
        && c.competency === competency
		);
	};
	const updateComp = (lesson, objective, competency) => {
		const index = lessons.competencies.findIndex(
			(c) => c.lessons === lesson && c.objectives === objective
		);
		if (index !== -1) {
			lessons.competencies[index].competency = competency;
		} else {
			lessons.competencies.push(competency);
		}
		setLessons({ ...lessons, competencies: lessons.competencies });
	};

	return (
		<div className="student-page">
			<div className="header">
				<div className="logo-image">
					<img className="image" src={logo} alt="cyf_logo" />
				</div>
				<h2>Student Overview</h2>
			</div>
			<div className="student-header">
				<h2>{props.user.userName}</h2>
				<Link className="link student-log-out-link" to="/">
          Log out
				</Link>
			</div>
			<div className="skills-btn-container">
				{Object.keys(lessons.lessons).map((lesson, index) => (
					<a className="skills-btn" key={index} href={"#" + lesson}>
						{lesson}
					</a>
				))}
			</div>
			{Object.keys(lessons.lessons).map((lesson, index) => (
				<div className="skill-section" id={lesson} key={index}>
					<h2>{lesson}</h2>
					{lessons.lessons[lesson].map((obj, index) => (
						<div className="competency-level" key={index}>
							<p className="obj">{obj.objectives}</p>
							<div className="comp-btn">
								{competency.map((comp, index) => (
									<button
										key={comp.id}
										onClick={() => {
											updateCompetencyOnClick(
												lesson,
												obj.id,
												comp.id,
												obj.objectives,
												comp.competency
											);
											// handleColor(competency);
										}}
										style={
											isActive(lesson, obj.objectives, comp.competency)
												? { backgroundColor: "red", color: "white" }
												: {}
										}
									>
										{comp.competency}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
			))}
			<ScrollToTop />
			<Footer />
		</div>
	);
};

export default Student;
