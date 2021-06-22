/* eslint-disable no-trailing-spaces */
import {  Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import IncorrectUrlError from "./IncorrectUrlError";
// import Student from "./pages/Student";
// import LearningObjectives from "./pages/LearningObjectives";
import React, { useState } from "react";

function App() {
	const adminUser = {
		email: "admin@admin.com",
		password: "admin123"
	}
	const [user, setUser] = useState({ name: "", email: "" });
	const [error, setError] = useState("");

	const Login = details => {
		console.log(details);
		if (details.email == adminUser.email && details.password == adminUser.password) {
			console.log("Logged in");
			setUser({
				email: details.email,
				password: details.password
			})
		}
		else {
			console.log("Details do not match!");
		}

		return (
			<div>
				{(user.email != "") ? (
					<div className="welcome">
						<h2>Welcome, <span>{user.name}</span></h2>
					</div>
				) : (
						{/* <Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							<Route path="/LogIn"> */}
						< LogIn Login={Login} error={error} />
				{/* </Route>
							<Route path="/SignUp">
								<SignUp />
							</Route>
							<Route>
								<IncorrectUrlError />
							</Route> */}
				{/* <Route path="/" exact>
				<Student />
			</Route> */}
				{/* <Route path="/" exact>
				<LearningObjectives />
			</Route> */}

				{/* <Route path="/about/this/site"><About /></Route> */}
				{/* <Route path="/" exact component={LogIn} /> */}
						// </Switch>
		)
	})</div >


}

export default App;
