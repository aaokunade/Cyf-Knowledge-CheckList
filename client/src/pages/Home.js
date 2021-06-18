import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from './Images/students.jpeg';
import "./Home.css";


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
          <span>
            CODE <span className="span-your">YOUR</span> FUTURE
          </span>
          <h1>Knowledge Checklist</h1>
        </div>
        <div className="home-buttons">
          <button>
            <Link className="link" to="/SignUp">
              Sign Up
            </Link>
          </button>
          <button>
            <Link className="link" to="/LogIn">
              Login
            </Link>
          </button>
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
    </div>
  );
}

export default Home;
