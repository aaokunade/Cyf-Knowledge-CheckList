/* eslint-disable brace-style */
import { Router } from "express";
import db from "./db";


const router = new Router();

router.get("/", (_, res) => {
	console.log(db.query);
	res.json({ message: "Hello, world!" });
});

router.get("/roles", (req, res) => {
	const getRole = req.query.role;
	let query = `SELECT * FROM students`;
	if(getRole === "mentor"){
		query = "SELECT * FROM mentors";		
	} 
	
	db.query(query).then((result) => res.status(200).json(result.rows));
	
});

// router.use(express.json())
router.post("/roles/signup/:role", (req, res) => {
	console.log(req.body);
	const regExpression = /^[a-zA-Z0-9 -]{1,60}$/;
	let newRole = req.params.role;
	const newRoleName = req.body.name;
	const newRoleEmail = req.body.email;
	const newRolePassword = req.body.password;
	const newRoleLocation = req.body.location;
	const insertMentorQuery = `INSERT INTO mentors (name, email, password, location) VALUES ($1, $2, $3, $4) RETURNING ID`;
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
