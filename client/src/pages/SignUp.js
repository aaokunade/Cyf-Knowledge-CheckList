import React, { useState, useEffect } from "react";
import Validation from "./Validation";
import { Link } from "react-router-dom";
import SignUPSuccess from "./SignUPSuccess";
import Footer from "./Footer";
import logo from "./Images/cyf_logo.jpeg";


const SignUp = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [region, setRegion] = useState([]);
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

	//fetch data
	useEffect(()=> {
		fetch("/api/regions")
			.then((res) => res.json())
			.then((region) => setRegion(region));
	},[]);

	function handleFormSubmit(event) {
		event.preventDefault();
		// console.log(Validation(values));
		setErrors(Validation(values));
		if ( Object.keys(Validation(values)).length === 0){
			fetch("/api/users/sign-up", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then((result) => result.json())
				.then((res) => {
					console.log(res);
					if (res.message === "Account created") {
						setIsSubmitted(true);
					} else {
						setIsSubmitted(false);
					}
				});
		}else{
			setIsSubmitted(false);
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<div>
			{isSubmitted ? (
				<SignUPSuccess />
			) : (
				<div className="signUp-container">
					<div className="header">
						<div className="logo-image">
							<img className="image" src={logo} alt="cyf_logo" />
						</div>
						<h2>Sign up</h2>
					</div>
					<div className="signUp-wrapper">
						<div>
							<h2 className="signUp-title">Create Account</h2>
						</div>
						{isSubmitted === "err" && <p>Unsuccessful. Please try again.</p>}
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
								{errors.password2 && (
									<p className="error">{errors.password2}</p>
								)}
							</div>
							<div className="sign-up-dropdown">
								<div>
									<select name="role" onChange={handleChange}>
										<option>Select Role</option>
										<option value="admin">Admin</option>
										<option value="mentor">Mentor</option>
										<option value="student">Student</option>
									</select>
									{errors.role && <p className="error">{errors.role}</p>}
								</div>
								<div>
									<select name="region" onChange={handleChange}>
										<option>Select Region</option>
										{region.map((r, index)=> (
											<option  key={index} value={r.location}>{r.location}</option>
										))}
									</select>
									{errors.region && <p className="error">{errors.region}</p>}
								</div>
							</div>

							<div>
								<a
									className="signUp-btn"
									type="submit"
									onClick={handleFormSubmit}>
                 				 Sign Up
								</a>
								<Link className="link-home" to="/">
                   				 Cancel
								</Link>
							</div>
						</form>
					</div>
					<p className="login-signup-link">Already have an account.
						<Link className="link login-signup" to="/login">
              				Login
						</Link>
					</p>
					<Footer />
				</div>
			)}

		</div>
	);
};

export default SignUp;
