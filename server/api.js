import { Router } from "express";
import db from "./db";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
//-------------------------------------function to validate------------------------------------
//----------------------------------home route--------------------------------------------------
const router = new Router();
router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});
//----------------------query to get all users(mentors, admins and students)--------------------
router.get("/all-users", (req, res) => {
	const allUsersQuery = "SELECT name FROM users";
	db.query(allUsersQuery)
		.then((result) => res.status(200).json(result.rows))
		.catch((e) => res.status(500).json({ message: e }));
});
//---------------------query to get all lessons from database------------------------------------
router.get("/lessons", (req, res) => {
	const lessonQuery = "SELECT lessons FROM techskills";
	db.query(lessonQuery)
		.then((result) => res.status(201).send(result.rows))
		.catch((e) => res.status(500).json({ message: e }));
});
// -----------------------query to get all competency levels---------------------------------
router.get("/competency", (req, res) => {
	const competencyQuery = "SELECT * FROM competencylevels";
	db.query(competencyQuery)
		.then((result) => res.status(201).send(result.rows))
		.catch((e) => res.status(500).json({ message: e }));
});
// -----------------------query to get allstudents Only---------------------------------
router.post("/get-students-only", (req, res) => {
	const getStudentsForMentorQuery = "SELECT name FROM users WHERE roles_id = 2";
	db.query(getStudentsForMentorQuery)
		.then((result) => res.status(201).send(result.rows))
		.catch((e) => res.status(500).json({ message: e }));
});
// -----------------------query to get students update for mentor and returning students---------------------------------
router.post("/students-page", (req, res) => {
	const lessonsOnlyQuery = `SELECT objectives, learningobjectives.id as id, lessons
    FROM learningobjectives
    INNER JOIN techskills ON  learningobjectives.lesson_id = techskills.id ORDER BY lessons`;
	console.log(req.body);
	const user_id = req.body.userId;
	const obj_id = req.body.obj_id;
	const tokenSent = req.headers.authorization;
	if (tokenSent === undefined) {
		res.sendStatus(401);
		return;
	}
	const token = tokenSent.split(" ")[1];
	const tokenQuery = `SELECT users_id, roles_id FROM tokens INNER JOIN users ON tokens.users_id = users.id WHERE token = '${token}'`;
	db.query(tokenQuery).then((result) => {
		if (result.rows.length === 0) {
			res.sendStatus(401);
			return;
		}
		const user = result.rows[0];
		if (user.roles_id === 2 && user.users_id !== user_id) {
			res.sendStatus(401);
			return;
		}
		const updatedSkillsQuery = `SELECT objectives, learningobjectives.id as id, lessons, competency, users_id
    FROM learningobjectives
    INNER JOIN techskills ON learningobjectives.lesson_id = techskills.id
    INNER JOIN mappingskills ON learningobjectives.id = mappingskills.obj_id
    INNER JOIN users ON users.id = mappingskills.users_id
    INNER JOIN competencylevels ON mappingskills.comp_id = competencylevels.id
    WHERE users_id = '${user_id}'`;
		const studentMappingSkills = `SELECT EXISTS(SELECT * FROM mappingskills WHERE users_id = '${user_id}')`;
		db.query(lessonsOnlyQuery).then((result) => {
			let lessonsArray = {};
			result.rows.forEach((row) => {
				// console.log(result.rows);
				if (!lessonsArray.hasOwnProperty(row.lessons)) {
					lessonsArray[row.lessons] = [
						{ objectives: row.objectives, id: row.id },
					];
				} else {
					lessonsArray[row.lessons].push({
						objectives: row.objectives,
						id: row.id,
					});
				}
			});
			//  check if student has filled some competency levels
			db.query(studentMappingSkills)
				.then((result) => {
					console.log(result.rows[0].exists);
					if (result.rows[0].exists) {
						db.query(updatedSkillsQuery)
							.then((result) => {
								res
									.status(200)
									.json({ lessons: lessonsArray, competencies: result.rows });
							})
							.catch((e) => res.status(500).json({ message: e }));
					} else {
						res.status(200).json({ lessons: lessonsArray , competencies: [] });
					}
				})
				.catch((e) => res.status(500).json({ message: e }));
		});
	});
});
//------------------------query to post data at creation of account to database------------------
router.post("/users/sign-up", async (req, res) => {
	console.log(req.body);
	const regExpression = /^[a-zA-Z0-9 -]{1,60}$/;
	const newRoleName = req.body.name;
	const newRoleEmail = req.body.email;
	const newRole = req.body.role;
	const newRoleLocation = req.body.region;
	let newRoleID;
	if (newRole === "mentor") {
		newRoleID = 1;
	} else if (newRole === "admin") {
		newRoleID = 3;
	} else {
		newRoleID = 2;
	}
	let newRegionID;
	if (newRoleLocation === "West Midlands") {
		newRegionID = 1;
	} else if (newRoleLocation === "Scotland") {
		newRegionID = 2;
	} else if (newRoleLocation === "London") {
		newRegionID = 3;
	} else if (newRoleLocation === "North West") {
		newRegionID = 4;
	} else if (newRoleLocation === "Cape Town") {
		newRegionID = 5;
	}
	const insertUserQuery
    = "INSERT INTO users (name, email, password, roles_id, region_id) VALUES ($1, $2, $3, $4, $5) RETURNING ID";
	try {
		const newRolePassword = await bcrypt.hash(req.body.password, 10);
		if (
			!regExpression.exec(newRoleName)
      || newRoleName.toString().trim().length === 0
		) {
			res.status(500).send({ message: "Fill in correct field" });
		} else {
			db.query(insertUserQuery, [
				newRoleName,
				newRoleEmail,
				newRolePassword,
				newRoleID,
				newRegionID,
			]).then((result) => res.status(201).json({ message: "Account created" }));
		}
	} catch {
		(e) => res.status(500).json({ message: e });
	}
});
//-----------------------router to get all regions---------------------------------
router.get("/regions", (req, res) => {
	const regionQuery = "SELECT location FROM region";
	db.query(regionQuery)
		.then((result) => res.status(200).json(result.rows))
		.catch((e) => res.status(500).json({ message: e }));
});
//---------------query to update and insert the learning objectives in mappingskills;----------------
router.post("/mapping-skills", function (req, res) {
	console.log(req.body);
	const insertMappingskillsQuery
    = "INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES ($1, $2, $3) RETURNING ID";
	const updateQuery
    = "UPDATE mappingskills SET comp_id=$1 WHERE users_id=$2 AND obj_id =$3";
	const user_id = req.body.user.userId;
	const userName = req.body.user.userName;
	const comp_id = req.body.competencyId;
	const obj_id = req.body.obj_id;
	const checkUpdate = `SELECT EXISTS(SELECT * FROM mappingskills WHERE users_id = '${user_id}' AND obj_id = '${obj_id}')`;
	db.query(checkUpdate)
		.then((result) => {
			if (result.rows[0].exists) {
				db.query(updateQuery, [comp_id, user_id, obj_id])
					.then((result) =>
						res.json({ message: `mappingskills ${user_id} updated!` })
					)
					.catch((e) => res.status(500).json({ message: e }));
			} else {
				db.query(insertMappingskillsQuery, [user_id, obj_id, comp_id])
					.then((result) => {
						const newCompId = result.rows[0].id;
						const updatedSkillsQuery = `SELECT objectives, learningobjectives.id as id, lessons, competency, users_id
    FROM learningobjectives
    INNER JOIN techskills ON learningobjectives.lesson_id = techskills.id
    INNER JOIN mappingskills ON learningobjectives.id = mappingskills.obj_id
    INNER JOIN users ON users.id = mappingskills.users_id
    INNER JOIN competencylevels ON mappingskills.comp_id = competencylevels.id
    WHERE users_id = '${user_id}' and mappingskills.id = ${newCompId}`;
						db.query(updatedSkillsQuery).then((result) =>
							res.json({
								message: `mappingskills, ${user_id} inserted!`,
								test: "test",
								competency: result.rows[0],
							})
						);
					})
				// res.json({ "message":`mappingskills, ${user_id} inserted!` }))
					.catch((e) => res.status(500).json({ message: e }));
			}
		})
		.catch((e) => res.status(500).json({ message: e }));
});
//-----------------query to get userlogin details.-------------------------------------
router.post("/users/log-in", (req, res) => {
	const userEmail = req.body.email;
	const userPassword = req.body.password;
	const loginQuery = `SELECT name, password, roles_id, id FROM users WHERE email = '${userEmail}'`;
	const tokenInsert
    = "INSERT INTO tokens (token, users_id, creation_date) VALUES ($1, $2, $3)";
	db.query(loginQuery).then((result) => {
		res.status(200);
		const loginResult = result.rows[0];
		if (loginResult === undefined) {
			return res.status(400).json({ message: "cannot find user" });
		}
		try {
			const hashed = loginResult["password"];
			const userName = loginResult["name"];
			const userRole = loginResult["roles_id"];
			const userId = loginResult["id"];
			const isValid = bcrypt.compareSync(userPassword, hashed);
			if (isValid) {
				const newToken = uuidv4();
				console.log(newToken);
				const creationDate = new Date().toLocaleString();
				console.log(creationDate);
				db.query(tokenInsert, [newToken, userId, creationDate])
					.then((result) =>
						res
							.status(200)
							.json({
								message: userRole,
								id: userId,
								name: userName,
								tokenMsg: "token created",
								token: newToken,
							})
					)
					.catch((e) => console.error(e));
				//----------------------------------------direct to the home page---------------------------------
			} else {
				res.status(401).json({ message: "wrong password" });
			}
		} catch {
			(e) => res.status(500).json({ message: e });
		}
	});
});

// to get updated mappingskills;
router.get("/updated-mapping-skills", (req, res) => {
	const updatedMappingSkills = "SELECT * FROM mappingskills";
	db.query(updatedMappingSkills)
		.then((result) => res.status(201).send(result.rows))
		.catch((e) => res.status(500).json({ message: e }));
});
router.post("/objectives", (req, res) => {
	const insertObjQuery
    = "INSERT INTO learningobjectives(objectives, lesson_id) VALUES($1, $2)";
	const newObj = req.body.newObj;
	const lesson = req.body.lesson;
	let lesson_id;
	if(lesson === "HTML/CSS"){
		lesson_id = 1;
	} else if (lesson === "Git"){
		lesson_id = 2;
	} else if (lesson === "Javascript"){
		lesson_id = 3;
	} else if (lesson === "React"){
		lesson_id = 4;
	} else if (lesson === "Node.js"){
		lesson_id = 5;
	} else if (lesson === "Database"){
		lesson_id = 6;
	} else if (lesson === "Select Lesson"){
		lesson_id = 7;
	}
	const regExpression = /^[a-zA-Z0-9 -]{1,60}$/;
	if (
		!regExpression.exec(newObj)
    || newObj.toString().trim().length === 0 && (lesson_id === 7)
	) {
		res.status(500).send({ message: "Fill in correct field" });
	} else {
		db.query(insertObjQuery, [newObj, lesson_id])
			.then((result) =>
				res.json({ message: "New LearningObjectives inserted!" })
			)
			.catch((e) => console.error(e));
	} // res.status(500).json({ "message":e }));
});
router.delete("/objectives/:objId", (req, res) => {

	const objectiveId = req.params.objId;
	db.query("DELETE FROM mappingskills WHERE obj_id=$1", [objectiveId])
		.then(() => {
			db.query("DELETE FROM learningobjectives WHERE id=$1", [objectiveId])
				.then(() => res.status(200).send(`Objective ${objectiveId} deleted!`))
				.catch((e) => console.error(e));
		})
		.catch((e) => console.error(e));
});
export default router;
