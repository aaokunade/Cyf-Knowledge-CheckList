import React from 'react';
import { Link } from "react-router-dom";


function LogIn() {
    return (
      <div className="container">
          <h1>CODE YOUR FUTURE</h1>
        <div className="signUp-wrapper login">
          <form action="/" method="POST" autocomplete="off">
            <div>
              <label htmlFor="email" className="s-email">
                Email
              </label>
              <input
                id="email"
                // onChange={handleChange}
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
                // onChange={handleChange}
                className="s-input-p"
                type="password"
                name="password"
                // value={values.password}
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
    );
};

export default LogIn;
