import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import logo from "./Images/cyf_logo.jpeg";
import { globalState } from "./LogIn";

//all useStates- to collate all students and lessons from the dropdown selection box
  const Mentor = (props) => {
  const [lessons, setLessons] = useState({});
  const [lessonsDropDown, setLessonsDropDown] = useState([]);
  const [updateCompetency, setUpdateCompetency] = useState({
    lesson: "",
    obj_id: 0,
    competencyId: 0,
    user: {},
  });
  const [competency, setCompetency] = useState([]);
  const [students, setStudents] = useState([]);
  const handleChange = (event) => {
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
            setLessons(lessons.lessons);
            console.log(lessons)
          });
      });
  // useEffect - this token recogonises the Student account selected & provides access to their Overview page
  };
  useEffect(() => {
    fetch("api/getstudentsonly", {
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
            <option key={index} value={student.name}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mentor-sentence">
        <label className="Objtitle" htmlFor="fname">
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
            className="new-obj"
            name="fname"
            placeholder="Insert new objectives here"
          ></input>
           <div className="lesson-dropdown">
            <select className="lesson-select" name="select">
              <option className="option">Select Lesson</option>
        {lessonsDropDown.map((lesson, index) => (
            <option key={index} value={lesson}>
              {lesson.lessons}
            </option>
        ))}
            </select>
      </div>
           </div>
          <input
            className="submitbutn"
            type="submit"
            formTarget="_blank"
            value="Submit New Objective"
          ></input>
          <input
            className="deletebutn"
            type="submit"
            formTarget="_blank"
            value="Delete Objective"
          ></input>
        </form>
      </div>
      <div className="skills-btn-container">
        {Object.keys(lessons).map((lesson, index) => (
          <button className="skills-btn" key={index}>
            <a href={"#" + lesson}>{lesson}</a>
          </button>
        ))}
      </div>
      {Object.keys(lessons).map((lesson, index) => (
        <div className="skill-section" id={lesson} key={index}>
          <h2>{lesson}</h2>
          {lessons[lesson].map((obj, index) => (
            <div className="competency-level" key={index}>
              <p className="obj">{obj.objectives}</p>
              <div className="comp-btn">
                {competency.map((comp, index) => (
                  <button key={index}>{comp.competency}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <Footer />
    </>
  );
};
export default Mentor;
