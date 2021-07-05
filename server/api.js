/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
import { Router } from "express";
import db from "./db";
const bcrypt = require ("bcrypt");
const { v4: uuidv4 } = require("uuid");
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//-------------------------------------function to validate------------------------------------
const checkInputs = (txt) =>{
	if (txt.toString().trim().length === 0){
		return false;
	}
};

//----------------------------------home route--------------------------------------------------

const router = new Router();
router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

//----------------------query to get all users(mentors, admins and students)--------------------

router.get("/allUsers", (req, res) =>{
	const allUsersQuery = "SELECT name FROM users";
	db.query(allUsersQuery).then((result) => res.status(200).json(result.rows))
		.catch((e) => res.status(500).json({ "message":e }));});

//---------------------query to display student page;-------------------------------------------

// const selectedStudentQuery = `SELECT competency,users_id, lessons, objectives, name 
	// FROM competencylevels 
	// INNER JOIN mappingskills ON competencylevels.id = mappingskills.comp_id 
	// INNER JOIN users ON users.id = mappingskills.users_id 
	// INNER JOIN learningobjectives ON mappingskills.obj_id = learningobjectives.id 
	// INNER JOIN techskills ON learningobjectives.lesson_id = techskills.id 
	// WHERE mappingskills.users_id = '${user_id}'`;
// db.query(selectedStudentQuery).then((result) => {
// 	let lessonsObject = {};
// 	console.log(result.rows[0]);
// 	result.rows.forEach((row) =>{
// 		if(lessonsObject.hasOwnProperty(row.name)){
// 			lessonsObject[row.name].push({ lessons:row.lessons, objectives:row.objectives, competency:row.competency });
// 		} else {
// 			lessonsObject[row.name] = [ {lessons:row.lessons, objectives:row.objectives, competency:row.competency }];
// 		}
// 	});
// 	res.status(200).json(lessonsObject);
// }).catch((e) => console.error(e));

//---------------------query to get all lessons from database------------------------------------

router.get("/lessons", (req, res) => {
	const lessonQuery = "SELECT lessons FROM techskills";
	db.query(lessonQuery).then((result) => res.status(201).send(result.rows))
		.catch((e) => res.status(500).json({"message":e}));
});

// -----------------------query to get all competency levels---------------------------------

router.get("/competency", (req, res) => {
	const competencyQuery = "SELECT * FROM competencylevels";
	db.query(competencyQuery).then((result) => res.status(201).send(result.rows))
		.catch((e) => res.status(500).json({"message":e}));
});

// -----------------------query to get allstudents Only---------------------------------
router.get("/getstudentsonly", (req, res) => {
	const getStudentsForMentorQuery = "SELECT name FROM users WHERE roles_id = 2";
	db.query(getStudentsForMentorQuery).then((result) => res.status(201).send(result.rows))
		.catch((e) => res.status(500).json({ "message":e }));
});

// -----------------------query to get students update for mentor and returning students---------------------------------
router.post("/students-page", (req, res) => {
	const lessonsOnlyQuery = `SELECT objectives, learningobjectives.id as id, lessons 
	FROM learningobjectives 
	INNER JOIN techskills ON  learningobjectives.lesson_id = techskills.id ORDER BY lessons`;
	console.log(req.body);
	const user_id = req.body.userId;
	const obj_id = req.body.obj_id;
	const updatedSkillsQuery = `SELECT objectives, learningobjectives.id as id, lessons, competency, users_id 
	FROM learningobjectives 
	INNER JOIN techskills ON learningobjectives.lesson_id = techskills.id 
	INNER JOIN mappingskills ON learningobjectives.id = mappingskills.obj_id 
	INNER JOIN users ON users.id = mappingskills.users_id 
	INNER JOIN competencylevels ON mappingskills.comp_id = competencylevels.id 
	WHERE users_id = '${user_id}'`;
	// const skillsUpdate = db.query(updatedSkillsQuery).then((result) => res.status(201).send(result.rows))
	// .catch((e) => res.status(500).json({ "message":e }));
	// console.log(skillsUpdate);
	
	const studentMappingSkills = `SELECT EXISTS(SELECT * FROM mappingskills WHERE users_id = '${user_id}')`;
	db.query(studentMappingSkills).then((result)=>{
		console.log(result.rows[0].exists);
		if(result.rows[0].exists){
	db.query(lessonsOnlyQuery).then((result) => {
		let lessonsArray = {};
		result.rows.forEach((row) =>{
			// console.log(result.rows);
			if(!lessonsArray.hasOwnProperty(row.lessons)){
				lessonsArray[row.lessons] = [{objectives:row.objectives, id:row.id}];
			} else {
				lessonsArray[row.lessons].push({objectives:row.objectives, id:row.id});
			}
		});
		res.status(200).json(lessonsArray);
	}).catch((e) => res.status(500).json({"message":e}));
} else {
	db.query(lessonsOnlyQuery).then((result) => {
		let lessonsArray = {};
		result.rows.forEach((row) =>{
			// console.log(result.rows);
			if(!lessonsArray.hasOwnProperty(row.lessons)){
				lessonsArray[row.lessons] = [{objectives:row.objectives, id:row.id}];
			} else {
				lessonsArray[row.lessons].push({objectives:row.objectives, id:row.id});
			}
		});
		res.status(200).json(lessonsArray);
	}).catch((e) => res.status(500).json({"message":e}));
}
});
});

//------------------------query to post data at creation of account to database------------------
router.post("/users/sign-up", async(req, res) => {
	console.log(req.body);
	const regExpression = /^[a-zA-Z0-9 -]{1,60}$/;
	const newRoleName = req.body.name;
	const newRoleEmail = req.body.email;
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
		if (!regExpression.exec(newRoleName) && newRoleName.toString().trim().length === 0) {
			res.status(500).send({ "message":"Fill in correct field" });
		} else {
			db.query(insertUserQuery, [
				newRoleName,
				newRoleEmail,
				newRolePassword,
				newRoleID,
				newRegionID,
			]).then((result) => res.status(201).json({ "message": "Account created" }));
		} } catch {((e) => res.status(500).json({ "message":e }));}
});
//-----------------------router to get all regions---------------------------------
router.get("/regions", (req, res)=>{
	const regionQuery = "SELECT location FROM region";
	db.query(regionQuery).then((result) => res.status(200).json(result.rows))
		.catch((e) => res.status(500).json({ "message":e }));});

//---------------query to update and insert the learning objectives in mappingskills;----------------
router.post("/mappingskills", function (req, res) {
	console.log(req.body);
	const insertMappingskillsQuery = "INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES ($1, $2, $3) RETURNING ID";
	const updateQuery = "UPDATE mappingskills SET comp_id=$1 WHERE users_id=$2 AND obj_id =$3";
	const user_id = req.body.user.userId;
	const userName = req.body.user.userName;
	const comp_id = req.body.competencyId;
	const obj_id = req.body.obj_id;
	const checkUpdate = `SELECT EXISTS(SELECT * FROM mappingskills WHERE users_id = '${user_id}' AND obj_id = '${obj_id}')`;

	db.query(checkUpdate).then((result)=>{
		if(result.rows[0].exists){
			db.query(updateQuery, [comp_id, user_id, obj_id])
				.then((result) => res.json({ "message":`mappingskills ${user_id} updated!` }))
				.catch((e) => res.status(500).json({ "message":e }));
		} else {
			db.query(insertMappingskillsQuery, [user_id, obj_id, comp_id])
				.then((result) => res.json({ "message":`mappingskills ${user_id} inserted!` }))
				.catch((e) => res.status(500).json({"message":e}));
		}

	}).catch((e) => res.status(500).json({ "message":e }));

});


//-----------------query to get userlogin details.-------------------------------------
router.post("/users/log-in", (req,res) => {
	const userEmail = req.body.email;
	const userPassword = req.body.password;
	const loginQuery = `SELECT name, password, roles_id, id FROM users WHERE email = '${userEmail}'`;
	const tokenInsert = `INSERT INTO tokens (token, users_id, creation_date) VALUES ($1, $2, $3)`
	db.query(loginQuery).then((result) => {res.status(200);
		const loginResult = result.rows[0];
		if(loginResult === undefined){
			return res.status(400).json({ "message": "cannot find user" });
		} try {
			const hashed = loginResult["password"];
			const userName = loginResult["name"];
			const userRole = loginResult["roles_id"];
			const userId = loginResult["id"];
			const isValid = bcrypt.compareSync(userPassword, hashed);
			if ( isValid ){
				const newToken = uuidv4();
				console.log(newToken);
				const creationDate = new Date().toLocaleString();
				console.log(creationDate);
				db.query(tokenInsert , [newToken, userId, creationDate])
				.then((result) => res.status(200).json({ "message": userRole, "id":userId, "name":userName, "token":"token created","tokenId":newToken }))
				.catch((e) => console.error(e));
				
				//-------------------direct to the home page-------------
			}else{
				res.status(401).json({ "message":"wrong password" });
			}
		} catch {
			((e) => res.status(500).json({"message":e}));
		}
	});
});

export default router;
