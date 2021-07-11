/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import logo from "./Images/cyf_logo.jpeg";
import ScrollToTop from "./ScrollToTop";
import { globalState } from "./LogIn";


//all useStates- to collate all students and lessons from the dropdown selection box
const Mentor = (props) => {
	const [lessons, setLessons] = useState({ lessons: {} });
	const [lessonsDropDown, setLessonsDropDown] = useState([]);
	const [updateCompetency, setUpdateCompetency] = useState({
		lesson: "",
		obj_id: 0,
		competencyId: 0,
		user: {},
	});
	const [addObj, setAddObj] = useState({
		newObj:"",
		lesson:"",
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [competency, setCompetency] = useState([]);
	const [students, setStudents] = useState([]);
	const handleChange = (event) => {
		const stdUserId = parseInt(event.currentTarget.selectedOptions[0].id);
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
					body: JSON.stringify({ userId: stdUserId }),
				})
					.then((result) => result.json())
					.then((lessons) => {
						setLessons(lessons);
					});
			});
		// useEffect - this token recognizes the Student account selected & provides access to their Overview page
	};
	useEffect(() => {
		fetch("api/get-students-only", {
			method: "POST",
			headers: {
				Authorization: `Token ${globalState.token}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: props.user.userId }),
		})
			.then((result) => result.json())
			.then((students) => {
				setStudents(students);
			});
		fetch("api/lessons")
			.then((result) => result.json())
			.then((students) => {
				setLessonsDropDown(students);
			});
	}, [props]);

	const handleObjAdd = (event) => {
		const { name, value } = event.target;
		setAddObj({
			...addObj,
			[name]:value,
		});
	};

	const handleObjSubmit = (event) => {
		event.preventDefault();
		fetch("/api/objectives", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(addObj),
		})
			.then((result) => result.json())
			.then((res) => {
				if (res.message === "New LearningObjectives inserted!") {
					setIsSubmitted(true);
					alert("New Objective Added");
				} else {
					setIsSubmitted(false);
					alert("Check fields are entered correctly");
				}
			});
	};

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
		<>
			<div className="header">
				<div className="logo-image">
					<img className="image" src={logo} alt="cyf_logo" />
				</div>
				<h2>Mentor Overview</h2>
			</div>
			<div className="Mentor-Name">
				<h2>{props.user.userName}</h2>
				<div className="Mlogout">
					<Link className="mentor-logout-link" to="/">

            Log out
					</Link>
				</div>
			</div>
			<div>
				<h2 className="dropdown"> Select Student</h2>
			</div>
			<div className="main-dropdown">
				<select className="Stulabel" name="student" onChange={handleChange}>
					<option className="option">Select Student</option>
					{students.map((student, index) => (
						<option id = {student.id} key={index} value={student.name}>
							{student.name}
						</option>
					))}
				</select>
			</div>
			<div className="mentor-sentence">
				<label className="Objtitle" htmlFor="newObj">
					<h2>New Objectives</h2>
				</label>
				<h3>
          As a Mentor you have the opportunity to add new objectives for each
          subject. Please note, you cannot amend this once the course has begun.
				</h3>
			</div>
			<div>
				<form action="/action_page.php" method="post">
					<br></br>
					<div className="select-dropdown">
						<input
							type="text"
							id="NewObj"
							onChange={handleObjAdd}
							className="new-obj"
							name="newObj"
							value={addObj.newObj}
							placeholder="Insert new objectives here"
						></input>
						{/* {errors.lesson && <p className="error">{errors.lesson}</p>} */}
					</div>
					<div className="lesson-dropdown">
						<select className="lesson-select" name="lesson" onChange={handleObjAdd}>
							<option className="option">Select Lesson</option>
							{lessonsDropDown.map((lesson, index) => (
								<option key={index} value={lesson.lessons}>
									{lesson.lessons}
								</option>
							))}
						</select>
					</div>

					<button
						className="submitbutn"
						type="submit"
						onClick={handleObjSubmit}
					>Submit New Objective</button>
					<button
						className="deletebutn"
						type="submit"
					>Delete Objective</button>
				</form>
			</div>
			<div className="skills-btn-container">
				{Object.keys(lessons).map((lesson, index) => (
					<button className="skills-btn" key={index}>
						<a href={"#" + lesson}>{lesson}</a>
					</button>
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
									<button disabled = {true} key={index}
										onClick={() => {
											updateCompetencyOnClick(
												lesson,
												obj.id,
												comp.id,
												obj.objectives,
												comp.competency
											);
										}}
										style={
											isActive(lesson, obj.objectives, comp.competency)
												? { backgroundColor: "red", color: "white" }
												: {}
										}
									>{comp.competency}</button>
								))}
							</div>
						</div>
					))}
				</div>
			))}
			<ScrollToTop />
			<Footer />
		</>
	);
};
export default Mentor;
