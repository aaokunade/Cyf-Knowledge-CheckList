import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";


function LogIn({ Login, error }) {

	const [details, setDetails] = useState({ email: "", password: "" });

	const submitHandler = (e) => {
		e.preventDefault();
		Login(details);
	};

	return (
		<form onSubmit={submitHandler}>
			<div className="container">
				<h2>Login</h2>
				<div className="signUp-wrapper login">
					<form action="/" method="POST" autoComplete="off">
						<div>
							<label htmlFor="email" className="s-email">
                Email
							</label>
							<input
								id="email"
								onChange={(e) =>
									setDetails({ ...details, email: e.target.value })
								}
								value={details.email}
								className="s-input-e"
								type="email"
								name="email"
								// value={values.email}
								placeholder="Email"
								required
							/>
							{/* {errors.email && <p className="error">{errors.email}</p>} */}
						</div>
						<div>
							<label htmlFor="password" className="s-password">
                Password
							</label>
							<input
								id="password"
								onChange={(e) =>
									setDetails({ ...details, password: e.target.value })
								}
								value={details.password}
								className="s-input-p"
								type="password"
								name="password"
								placeholder="Password"
							/>
							{/* {errors.password && <p className="error">{errors.password}</p>} */}
						</div>
						<div>
							<select>
								<option>Select Role</option>
								<option value="admin">Admin</option>
								<option value="mentor">Mentor</option>
								<option value="student">Student</option>
							</select>
						</div>
						<div>
							<select>
								<option value="0">Select Region</option>
								<option value="1">West Midlands</option>
								<option value="2">London</option>
							</select>
						</div>
						<div>
							<button type="submit">Log In</button>
							<button>
								<Link className="link" to="/">
                  Cancel
								</Link>
							</button>
						</div>
					</form>
				</div>
			</div>
		</form>
	);
}

export default LogIn;
