import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./Validation";
import Footer from './Footer';
import Student from './Student';


function LogIn() {
const [loginValues, setLoginValues] = useState({email: "", password: ""})
const [errors, setErrors] = useState({});
// const [loginStatus, setLoginStatus] = useState();
const [isLogged, setIsLogged] = useState(false);


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
    fetch('/api/users/login', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginValues),
    })
    .then((result) => result.json())
    .then((res) => {
      console.log(res.message);
       if(res){
        setIsLogged(true);
        // setLoginStatus();
      }
    });
  }
    return (
      <>
      {isLogged ? <Student /> 
        :
          <div className="container">
              <h1>CODE YOUR FUTURE</h1>
            <div className="signUp-wrapper login">
              <form action="/" method="POST" autoComplete="off">
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
                <div>
                  <button type="submit" onClick={handleLoginFormSubmit}>
                    {/* <Link className="link" to="/Student"> */}
                      Login
                    {/* </Link> */}
                    </button>
                  <button>Forgot Password</button>
                  <button>
                    <Link className="link" to="/">
                      Cancel
                    </Link>
                  </button>
                </div>
              </form>
            </div>
            {/* <h2>{loginStatus}</h2> */}
            <Footer />
          </div>
      }
      </>
    );
};
export default LogIn;