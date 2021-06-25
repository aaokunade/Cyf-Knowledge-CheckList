/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
import { Router } from "express";
import db from "./db";
const bcrypt = require ("bcrypt");
import app from "./app";
// const cors = require("cors");
// app.use(cors());

const router = new Router();
const allUsersQuery = "SELECT * FROM users";
router.get("/", (_, res) => {
	console.log(db.query);
	res.json({ message: "Hello, world!" });
});
//query to get all users(mentors, admins and students)
router.get("/allUsers", (req, res) =>{
	db.query(allUsersQuery).then((result) => res.status(200).json(result.rows));
});

//query to get users by roles(mentors or admins or students)
router.post("/users/", (req, res) => {
	const getRole = req.body.role;
	console.log(getRole);
	let query = `SELECT name FROM users INNER JOIN roles ON users.roles_id = roles.id WHERE roles.role = '${getRole}'`;
	db.query(query).then((result) => res.status(200).json(result.rows));
});

//query to display student page;
const studentPageQuery = `SELECT lessons, objectives, competency 
FROM techskills 
INNER JOIN learningobjectives 
ON techskills.id = learningobjectives.lesson_id 
INNER JOIN mappingskills 
ON learningobjectives.id = mappingskills.obj_id 
INNER JOIN competencylevels 
ON mappingskills.comp_id = competencylevels.id GROUP BY techskills, learningobjectives, competency`;

const lessonsOnlyQuery = `SELECT COUNT (objectives) AS obj, lessons FROM learningobjectives INNER JOIN techskills ON  learningobjectives.lesson_id = techskills.id GROUP BY lessons`;

router.get("/studentsPage", (req, res) => {
	db.query(lessonsOnlyQuery).then((result) =>
	 res.status(200).json(result.rows)
	 )
	 .catch((error) => console.error(error));
});

//query to get just one user
// router.get('/oneUser', (req, res) => {
// 	const user = req.body;
// 	const getUserById = `SELECT name FROM users WHERE id=1$`;
// 	if(user.name )
// })

//query to get learning objectives from database
router.get("/classes", (req, res) => {
	// const getLesson = req.query.lesson;
	// console.log(getLesson);
	// let lessonQuery = SELECT * FROM techskills;
	const lessonQuery = `SELECT objectives, lessons FROM learningobjectives INNER JOIN techskills ON learningobjectives.lesson_id = techskills.id GROUP BY lessons`;
	db.query(lessonQuery).then((result) => res.status(201).send(result.rows[0])).catch((error) => console.error(error));
});

//query to post data at creation of account to database
// router.use(express.json())
router.post("/users/signup", async(req, res) => {
	console.log(req.body);
	const regExpression = /^[a-zA-Z0-9 -]{1,60}$/;
	const newRoleName = req.body.name;
	const newRoleEmail = req.body.email;
	// const newRolePassword = req.body.password;
	const newRole = req.body.role;
	const newRoleLocation = req.body.region;
	let newRoleID;
	if(newRole === "mentor") {
		newRoleID = 1;
	} else if (newRole === "admin"){
		newRoleID = 3;
	} else {
		newRoleID = 2;
	}

	let newRegionID;
	if(newRoleLocation === "West Midlands"){
		newRegionID = 1;
	} else if(newRoleLocation === "Scotland"){
		newRegionID = 2;
	} else if (newRoleLocation === "London"){
		newRegionID = 3;
	} else if(newRoleLocation === "North West"){
		newRegionID = 4;
	} else if(newRoleLocation === "Cape Town"){
		newRegionID = 5;
	}
	const insertUserQuery = "INSERT INTO users (name, email, password, roles_id, region_id) VALUES ($1, $2, $3, $4, $5) RETURNING ID";

	try {
		const newRolePassword = await bcrypt.hash(req.body.password, 10);
		if (!regExpression.exec(newRoleName)) {
			res.status(500).send("Fill in correct field");
		} else {
			db.query(insertUserQuery, [
				newRoleName,
				newRoleEmail,
				newRolePassword,
				newRoleID,
				newRegionID,
			]).then((result) => res.status(201).send(result.rows[0]));
		} } catch {((error) => console.error(error));}
});

//router to get all regions
router.get('/regions', (req, res)=>{
	const regionQuery = `SELECT location FROM region`;
	db.query(regionQuery).then((result) => res.status(200).json(result.rows));
})

//query to get userlogin details.
router.post("/users/login", async(req,res) => {
	console.log(req.body);
	const userEmail = req.body.email;
	const userPassword = req.body.password;
	const loginQuery = `SELECT name, password FROM users WHERE email = '${userEmail}'`;
	db.query(loginQuery).then((result) => {res.status(200);
		console.log(result.rows[0]);
		// console.log(userName);
		// console.log(hashed);
		const loginResult = result.rows[0];
		if(loginResult === undefined){
			return res.status(400).json({ "message": "cannot find user" });
		} try {
			const hashed = loginResult["password"];
			const userName = loginResult["name"];
			const isValid = bcrypt.compareSync(userPassword, hashed);
			console.log(isValid);
			if ( isValid ){
				res.json({ "message": userName });
				//direct to the home page
			}else{
				res.status(401).json({ "message":"wrong password" });
			}
		} catch {
			((error) => console.error(error));
		}
	});
});

export default router;
