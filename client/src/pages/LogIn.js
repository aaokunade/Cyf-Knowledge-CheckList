import React, {useState} from "react";
import {Link, Route, Switch} from "react-router-dom";
import Validation from "./Validation";
import Footer from "./Footer";
import Student from "./Student";
import Mentor from "./Mentor";

import logo from "./Images/cyf_logo.jpeg";

export const globalState = {
	errorMessage: "",
	userId: "",
	userName: "",
	token: "",
};

function LogIn() {

	const [loginValues, setLoginValues] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const [isStudent, setIsStudent] = useState(false);
	const [isMentor, setIsMentor] = useState(false);
	const [notValid, setNotValid] = useState(false);

	const [details, setDetails] = useState({
		errorMessage: "",
		userId: "",
		userName: "",
	});

	const handleLogChange = (e) => {
		const { name, value } = e.target;
		setLoginValues({
			...loginValues,
			[name]: value,
		});
	};

	function handleLoginFormSubmit(event) {
		event.preventDefault();
		setErrors(Validation(loginValues));
		fetch("/api/users/log-in", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginValues),
		})
			.then((result) => result.json())
			.then((res) => {
				if (
					res.message === "wrong password"
          || res.message === "cannot find user"
				) {
					setNotValid(true);
					setIsStudent(false);
          setIsMentor(false);
					setDetails({ errorMessage: res.message, userId: "" });
				} else if (res.message === 2) {
					globalState.userId = res.id;
					globalState.userName = res.name;
					globalState.token = res.token;
					setIsStudent(true);
				} else if (res.message === 1) {
					globalState.userId = res.id;
					globalState.userName = res.name;
					globalState.token = res.token;
					setIsMentor(true);
				}

			});
	}

	return (
    <>
      {isStudent ? (
          <Student
            user={{
              userId: globalState.userId,
              userName: globalState.userName,
            }}
          />
      ) : isMentor ? (
        <Mentor
          user={{ userId: globalState.userId, userName: globalState.userName }}
        />
      ) : (
        <div className="container">
          <div className="header">
            <div className="logo-image">
              <img className="image" src={logo} alt="cyf_logo" />
            </div>
            <h2>login</h2>
          </div>
          <div className="signUp-wrapper login">
            <form action="/" method="POST" autoComplete="off">
              {notValid && <p>Password or Username invalid</p>}
              <div>
                <label htmlFor="email" className="s-email">
                  Email
                </label>
                <input
                  id="email"
                  onChange={handleLogChange}
                  className="s-input-e"
                  type="email"
                  name="email"
                  value={loginValues.email}
                  placeholder="Email"
                  required
                  autoComplete="on"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="s-password">
                  Password
                </label>
                <input
                  id="password"
                  onChange={handleLogChange}
                  className="s-input-p"
                  type="password"
                  name="password"
                  value={loginValues.password}
                  placeholder="Password"
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className="login-btn">
                <button type="submit" onClick={handleLoginFormSubmit}>
                  Login
                </button>
                <button>Forgot Password</button>
                <Link className="link_home" to="/">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <p className="login-signup-link">
            Don't have an account.
            <Link className="link login-signup" to="/sign-up">
              Sign Up
            </Link>
          </p>
          <Footer />
        </div>
      )}
    </>
  );
}
export default LogIn;
