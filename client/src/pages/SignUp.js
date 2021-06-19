import React, { useState } from "react";
import Validation from "./Validation";
import { Link } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		email2: "",
		password: "",
		password2: "",
		role: "",
		region: "",
	});
	const [errors, setErrors] = useState({});

	// const signUp = () => {
	//   axios
	//     .post("https://cyf-knowledge-checklists.herokuapp.com/SignUp", values)
	//     .then((response) => {
	//       console.log("Data: ", response.data);
	//     })
	//     .catch((error) => {
	//       console.error("Something went wrong!", error);
	//     });
	// };
const localUrl = "http://127.0.0.1:3000/";
const prodUrl = "/";

	function handleFormSubmit(event) {
		event.preventDefault();
		setErrors(Validation(values));
		console.log(values);
		const role = values.role;
		fetch(`${prodUrl}api/users/signup/${role}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((result) => result.json())
			.then((res) => {
				console.log(res);
			});
		// // signUp();
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<div className="signUp-container">
			<div className="signUp-wrapper">
				<div>
					<h2 className="signUp-title">Create Account</h2>
				</div>
				<form
					className="signUp-form"
					action="/"
					method="POST"
					autoComplete="off"
				>
					<div>
						<label className="s-name" htmlFor="name">
              Full Name
						</label>
						<input
							id="name"
							onChange={handleChange}
							className="s-input-n"
							type="text"
							name="name"
							value={values.name}
							placeholder="Full Name"
							required
						/>
						{errors.name && <p className="error">{errors.name}</p>}
					</div>
					<div>
						<label htmlFor="email" className="s-email">
              Email
						</label>
						<input
							id="email"
							onChange={handleChange}
							className="s-input-e"
							type="email"
							name="email"
							value={values.email}
							placeholder="Email"
						/>
						{errors.email && <p className="error">{errors.email}</p>}
					</div>
					<div>
						<label htmlFor="email2" className="s-confirm-e">
              Confirm Email
						</label>
						<input
							id="email2"
							onChange={handleChange}
							className="s-input-confirm-e"
							type="email2"
							name="email2"
							value={values.email2}
							placeholder="Confirm Email"
						/>
						{errors.email2 && <p className="error">{errors.email2}</p>}
					</div>
					<div>
						<label htmlFor="password" className="s-password">
              Password
						</label>
						<input
							id="password"
							onChange={handleChange}
							className="s-input-p"
							type="password"
							name="password"
							value={values.password}
							placeholder="Password"
						/>
						{errors.password && <p className="error">{errors.password}</p>}
					</div>
					<div>
						<label htmlFor="password2" className="s-confirm-p">
              Confirm Password
						</label>
						<input
							id="password2"
							onChange={handleChange}
							className="s-input-confirm-p"
							type="password"
							name="password2"
							value={values.password2}
							placeholder="Confirm Password"
						/>
						{errors.password2 && <p className="error">{errors.password2}</p>}
					</div>
					<div>
						<select name='role' onChange={handleChange}>
							<option>Select Role</option>
							<option value="admin">Admin</option>
							<option value="mentor">Mentor</option>
							<option value="student">Student</option>
						</select>
					</div>
					<div>
						<select name='region' onChange={handleChange}>
							<option>Select Region</option>
							<option value="West Midlands">West Midlands</option>
							<option value="London">London</option>
						</select>
					</div>
					<div>
						<button
							className="signUp-btn"
							type="submit"
							onClick={handleFormSubmit}
						>
              Sign Up
						</button>
						<button className="signUp-btn">
							<Link className="signUp-link" to="/">
                Cancel
							</Link>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;






// <div>
//     <form action="/action_page.php">
//         <div class="container">
//             <h1>Register</h1>
//             <p>Please fill in this form to create an account.</p>
//             <hr>
//             <label for="email"><b>Email</b></label>
//             <input type="text" placeholder="Enter Email" name="email" id="email" required>

//             <label for="psw"><b>Password</b></label>
//             <input type="password" placeholder="Enter Password" name="psw" id="psw" required>

//             <label for="psw-repeat"><b>Repeat Password</b></label>
//             <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
//             <hr>
//             <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

//             <button type="submit" class="register-btn">Register</button>
//         </div>
//         <div class="container signIn">
//             <p>Already have an account? <a href="#">Sign in</a>.</p>
//         </div>
//     </form>
// </div>

