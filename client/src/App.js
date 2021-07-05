/* eslint-disable no-trailing-spaces */
import {  Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import IncorrectUrlError from './IncorrectUrlError';
import Student from './pages/Student';


const App = () => (
	<div>
	 <Switch>
	 	<Route path="/student"><Student /></Route>
		 <Route path="/" exact><Home /></Route>
		 <Route path="/login"><LogIn /></Route>
		 <Route path="/sign-up"><SignUp /></Route>
		 <Route><IncorrectUrlError /></Route>
		 
		 {/* <Route path="/about/this/site"><About /></Route> */}
		 {/* <Route path="/" exact component={LogIn} /> */}
	    </Switch>
	</div>	
);

export default App;
