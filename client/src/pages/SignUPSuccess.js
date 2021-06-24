import React from 'react';
import { Link } from "react-router-dom";
import Footer from './Footer';


const SignUPSuccess = () => {
    return (
      <div className="signup-success">
        <h1>CODE YOUR FUTURE</h1>
        <div className="registered-container">
          <div className="registered">
            <h1>Account Created</h1>
          </div>
          <button>
          <Link className="link" to="/LogIn">
            Login
          </Link>
        </button>
        </div>
        <Footer />
      </div>
    );
}
export default SignUPSuccess;