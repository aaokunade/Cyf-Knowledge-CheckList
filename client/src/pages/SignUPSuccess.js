import React from 'react';
import { Link } from "react-router-dom";
import Footer from './Footer';
import logo from "./Images/cyf_logo.jpeg";


const SignUPSuccess = () => {
    return (
      <div className="signup-success">
        <div className="header">
            <div className="logo-image">
              <img className="image" src={logo} alt="cyf_logo" />
            </div>
        </div>
        <div className="registered-container">
          <div className="registered">
            <h1>Account Created</h1>
          </div>
          <Link className="link registered-login" to="/login">
            Login
          </Link>
        </div>
        <Footer />
      </div>
    );
}
export default SignUPSuccess;