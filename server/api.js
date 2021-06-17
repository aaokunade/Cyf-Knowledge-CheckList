/* eslint-disable brace-style */
import { Router } from "express";
import db from "./db";


const router = new Router();

router.get("/", (_, res) => {
	console.log(db.query);
	res.json({ message: "Hello, world!" });
});

router.get("/test", (req, res) => {
	const getRole = req.body;
	console.log(getRole);
	const allMentors = "SELECT * FROM mentors";
	const allStudents = "SELECT * FROM students";
	if(getRole.role === "mentors"){
	db.query(allMentors).then((result) => res.status(200).json(result.rows));
	} else {
		db.query(allStudents).then((result) => res.status(200).json(result.rows));
	}
});

// router.use(express.json())
router.post("/roles", (req, res) => {
	console.log(req.body);
	const regExpression = /^[a-zA-Z0-9 -]{1,60}$/;
	const newMentor = req.body;
	const newRoleName = req.body.name;
	const newRoleEmail = req.body.email;
	const newRolePassword = req.body.password;
	const newRoleLocation = req.body.location;
	const insertMentorQuery = `INSERT INTO mentors (name, email, password, location) VALUES ($1, $2, $3, $4) RETURNING ID`;
	const insertStudentQuery = `INSERT INTO students (name, email, password, location) VALUES ($1, $2, $3, $4) RETURNING ID`;
	if (!regExpression.exec(newRoleName)) {
		res.status(500).send("Fill in correct field");
	} else if(req.body.role === "mentor") {
		// console.log(result.rows)
		db.query(insertMentorQuery, [
			newRoleName,
			newRoleEmail,
			newRolePassword,
			newRoleLocation,
		])
			
	} else {
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
