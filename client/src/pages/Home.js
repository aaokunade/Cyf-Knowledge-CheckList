import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from './Images/students.jpeg';
import "./Home.css";
import Footer from './Footer';
import logo from "./Images/cyf_logo.jpeg"


export function Home() {
  const [message, setMessage] = useState("Loading...");

  // useEffect(() => {
  // 	fetch("/api")
  // 		.then((res) => {
  // 			if (!res.ok) {
  // 				throw new Error(res.statusText);
  // 			}
  // 			return res.json();
  // 		})
  // 		.then((body) => {
  // 			setMessage(body.message);
  // 		})
  // 		.catch((err) => {
  // 			console.error(err);
  // 		});
  // }, []);

  return (
    <div>
      <div>
        <div className="header">
          {/* <span>
            CODE <span className="span-your">YOUR</span> FUTURE
          </span> */}
          <div className="logo-image">
            <img className="image" src={logo} alt="cyf_logo" />
          </div>
          <h2>Knowledge Checklist</h2>
        </div>
        <div className="home-buttons">
            <Link className="link" to="/SignUp">
              Sign Up
            </Link>
            <Link className="link" to="/LogIn">
              Login
            </Link>
      
          {/* <button>Admin</button> */}
        </div>
        <div className="main">
          <div className="welcome-text">
            <p>Welcome to the Knowledge Checklist.</p>
            <p>
              At CodeYourFuture, our students gain a vast amount of knowledge
              and skills, which will result in them being able to call
              themselves a programmer. It’s important that we can track a
              student's progress over the course to make sure that they are
              keeping up with the class and developing their understanding of
              our material.
            </p>
          </div>
          <div className="home-image">
            <img className="image" src={image} alt="students" />
          </div>
        </div>

        {/* <h1 className="message" data-qa="message">{message}</h1> */}
        {/* <Link to="/about/this/site">About</Link> */}
      </div>
      <div className="home-footer">
           <div className="home-links">
                <a href="https://codeyourfuture.io/" target="_blank"><i class="fa fa-home"></i></a>
                <a href="https://www.facebook.com/codeyourfuture.io" target="_blank"><i class="fa fa-facebook-square"></i></a>
                <a href="https://twitter.com/CodeYourFuture_" target="_blank"><i class="fa fa-twitter-square"></i></a>
                <a href="https://www.linkedin.com/company/codeyourfuture" target="_blank"><i class="fa fa-linkedin-square"></i></a>
                <a href="mailto:contact@codeyourfuture.io" target="_blank"><i className="fa fa-envelope" /></a>
            </div>
            <p>Copyright &copy; 2021 Code Your Future</p>  
      </div>
           
    </div>
  );
}

export default Home;
