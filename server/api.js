/* eslint-disable brace-style */
import { Router } from "express";
import db from "./db";
import app from "./app";
// const cors = require("cors");
// app.use(cors());

const router = new Router();

router.get("/", (_, res) => {
	console.log(db.query);
	res.json({ message: "Hello, world!" });
});

router.get("/users", (req, res) => {
	const getRole = req.query.role;
	let query = `SELECT * FROM students`;
	if(getRole === "mentor"){
		query = "SELECT * FROM mentors";
	}
	db.query(query).then((result) => res.status(200).json(result.rows));
});

// router.get('/users/:id', (req, res) => {
// 	const userID = req.params.id;
// 	const getStudUserById = `SELECT * FROM students WHERE id=1$`;
// 	const getMentUserById = `SELECT * FROM mentors WHERE id=1$`;
// })

router.get("/classes", (req, res) => {
	const getLesson = req.query.lesson;
	console.log(getLesson);
	// let lessonQuery = SELECT * FROM techskills;
	const lessonQuery = `SELECT objectives FROM learningobjectives INNER JOIN techskills ON learningobjectives.lesson_id = techskills.id WHERE techskills.lessons = '${getLesson}'`;
	db.query(lessonQuery).then((result) => res.status(201).send(result.rows[0])).catch((error) => console.error(error));
});
// router.use(express.json())
router.post("/users/signup/:role", (req, res) => {
	console.log(req.body);
	const regExpression = /^[a-zA-Z0-9 -]{1,60}$/;
	let newRole = req.params.role;
	console.log(newRole);
	const newRoleName = req.body.name;
	const newRoleEmail = req.body.email;
	const newRolePassword = req.body.password;
	const newRoleLocation = req.body.region;
	const newRoleSubject = req.body.subject;
	const insertMentorQuery = `INSERT INTO mentors (name, email, password, subject, location) VALUES ($1, $2, $3, $4, $5) RETURNING ID`;
	const insertStudentQuery = `INSERT INTO students (name, email, password, location) VALUES ($1, $2, $3, $4) RETURNING ID`;
	if (!regExpression.exec(newRoleName)) {
		res.status(500).send("Fill in correct field");
	} else if(newRole === "mentor") {
		// console.log(result.rows)
		db.query(insertMentorQuery, [
			newRoleName,
			newRoleEmail,
			newRolePassword,
			newRoleLocation,
			newRoleSubject,
		]).then((result) => res.status(201).send(result.rows[0]))
		.catch((error) => console.error(error));
			
	} else if(newRole === "student") {
		db.query(insertStudentQuery, [
			newRoleName,
			newRoleEmail,
			newRolePassword,
			newRoleLocation,
		]) .then((result) => res.status(201).send(result.rows[0]))
		.catch((error) => console.error(error));
		}
});

export default router;
