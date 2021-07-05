import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./Validation";
import Footer from './Footer';
import Student from './Student';
import logo from "./Images/cyf_logo.jpeg";


function LogIn() {
const [loginValues, setLoginValues] = useState({email: "", password: ""})
const [errors, setErrors] = useState({});
// const [loginStatus, setLoginStatus] = useState();
const [isLogged, setIsLogged] = useState(false);
const [details, setDetails] = useState({errorMessage: "", userId: "", userName: ""});


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
    fetch('/api/users/log-in', {
      method: "POST",
      headers: {
        // "Authorization":`Token ${newToken}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginValues),
    })
    .then((result) => result.json())
    .then((res) => {
      console.log(res);
       if(res.message === "wrong password" || res.message === "cannot find user"){
        setIsLogged(false);
        setDetails({ errorMessage:res.message, userId:"" })
        // setLoginStatus();
      } else if(res.message === 2) {
        setDetails({ errorMessage:"", userId:res.id, userName: res.name });
        setIsLogged(true);
      }
    });
  }
    return (
      <>
      {isLogged ? <Student user={{userId:details.userId, userName:details.userName}} /> 
        :
          <div className="container">
              <div className="header">
                <div className="logo-image">
                  <img className="image" src={logo} alt="cyf_logo" />
                </div>
                <h2>login</h2>
            </div>
            <div className="signUp-wrapper login">
              <form action="/" method="POST" autoComplete="off">
                {details === "false" && <p>Password or Username invalid</p>}
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
            {/* <h2>{loginStatus}</h2> */}
            <p className="login-signup-link">Don't have an account. <Link className="link login-signup" to="/SignUp">
              Sign Up
            </Link></p>
            <Footer />
          </div>
      }
      </>
    );
};
export default LogIn;