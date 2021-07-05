drop table if exists region cascade;
drop table if exists roles cascade;
drop table if exists users cascade;
drop table if exists techskills cascade;
drop table if exists learningobjectives cascade;
drop table if exists competencylevels cascade;
drop table if exists mappingskills cascade;
drop table if exists tokens cascade;

CREATE TABLE region (
id  SERIAL PRIMARY KEY,
location    VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
id  SERIAL PRIMARY KEY,
role    VARCHAR(50)
);

CREATE TABLE users (
id  SERIAL PRIMARY KEY,
name    VARCHAR (50)NOT NULL,
email   VARCHAR (150) NOT NULL,
password    VARCHAR(70) NOT NULL,
roles_id    integer,
region_id   integer,
FOREIGN KEY (region_id) REFERENCES region(id),
FOREIGN KEY (roles_id)  REFERENCES roles(id)
);

CREATE TABLE tokens (
token VARCHAR(70) PRIMARY KEY,
users_id integer,
creation_date   TIMESTAMP NOT NULL,
FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE techskills (
id  SERIAL PRIMARY KEY,
lessons VARCHAR(50)NOT NULL
);

CREATE TABLE learningobjectives (
id  SERIAL PRIMARY KEY,
objectives  VARCHAR (500)NOT NULL,
lesson_id   integer, --references techskills(id),
FOREIGN KEY (lesson_id) REFERENCES techskills(id)
);

CREATE TABLE competencylevels (
id  SERIAL PRIMARY KEY,
competency  VARCHAR(50)NOT NULL
);

CREATE TABLE mappingskills (
id  SERIAL PRIMARY KEY,
users_id    integer,
obj_id  integer,--references learningobjectives(id),
comp_id integer, -- references competencylevel(id),
FOREIGN KEY (users_id) REFERENCES users(id),
FOREIGN KEY (obj_id) REFERENCES learningobjectives(id),
FOREIGN KEY (comp_id) REFERENCES competencylevels(id)
);




INSERT INTO region (location)  VALUES ('West Midlands');
INSERT INTO region (location)  VALUES ('Scotland');
INSERT INTO region (location) VALUES ('London');
INSERT INTO region (location) VALUES ('North West');
INSERT INTO region (location) VALUES ('Cape Town');
INSERT INTO roles (role) VALUES ('mentor');
INSERT INTO roles (role) VALUES ('student');
INSERT INTO roles (role) VALUES ('admin');
-- INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('s2','email@email.com','password', 2, 2);
-- INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('s1','email@email.com','password', 1, 3);
-- INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('sue','email@email.com','password', 1, 2);
-- INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('pete','email@email.com','password', 1, 3);
-- INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('admin','admin@email.com','password', 3, 1);
INSERT INTO techskills (lessons) VALUES ('HTML/CSS');
INSERT INTO techskills (lessons) VALUES ('Git');
INSERT INTO techskills (lessons) VALUES ('Javascript');
INSERT INTO techskills (lessons) VALUES ('React');
INSERT INTO techskills (lessons) VALUES ('Node.js');
INSERT INTO techskills (lessons) VALUES ('Databases');
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what "parent" and "child" is', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can create and link a stylesheet', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what semantic tags are and how to use them', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to include a form in a web page', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to create a button', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what a selector is in CSS', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between a tag, class and ID', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what prefixes are', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what pseudo classes are', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between padding and margin', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to create a comment in HTML and CSS', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can create a media query that triggers a change / changes on another device / screen size', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand how to implement flexbox and when to use it', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand how to implement Grid and when to use it', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand how to include Bootstrap in a project',1 );
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use Bootstrap classes', 1 );
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can initialize a repo for a new project', 2);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can use a .gitignore file', 2);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can use the commands git add, git commit and git push correctly', 2);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can make a pull request on GitHub', 2);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Know how to handle a merge conflict', 2);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Know how to fork a repo and understand how this differs from cloning', 2);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to link a Javascript file in your project', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to do a console.log()', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what a console.log is used for', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what a console.log is used for', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the different types of data in Javascript e.g. string, integer, etc.', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to assign a variable with const and let', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between const and let', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to write a function', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use concatentation', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use string methods like length, indexOf(), slice(), splice(), toUpperCase(), etc.', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what a return statement does', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use a callback function', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between expressions and statements', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what a conditional is', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to write an if/else statement', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use a ternary operator', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand how to use comparision operators like < and >', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand how to use logical operators like && and ||', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between for and while loops', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to write a regular for loop', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to write a forEach loop', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use array methods like pop(), push(), shift(), unshift(), splice(), includes(), etc.', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what an anonymous function is', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use the map() method', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use filter() method', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to chain methods', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what an object is', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can access and retrieve data from an object', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Can edit data in an object', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to create a method in an object', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to call a method in an object', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use methods like map(), filter(), etc with objects', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use built-in object methods like .keys()', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to loop over an object with for...in', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to convert an object into an array', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what the DOM is', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to manipulate the DOM with query selectors like getElementById, querySelectorAll, etc.', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to set up event listeners like click', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Create HTML elements with Javascript', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Create HTML elements with Javascript', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use Javascript to modify HTML elements e.g. their CSS properties', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between synchronous and asynchronous', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between client and server', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to make GET requests', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to make POST requests', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to debug your code with tools like DevTools', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what common errors mean e.g. Syntax Error, Reference Error', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what an API is and what they are used for', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what a Promise is', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to make a fetch() request', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what JSON is', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to handle JSON data from a fetch() request', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what scope is and how it can affect your code', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use array destructuring', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the difference between class and functional components', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to create a React application with create-react-app', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what JSX is and how it is different to HTML and Javascript', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to apply a class in JSX', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to pass props', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to handle events in React', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use ternary operators in React', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use conditional rendering', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what state is and how to use it', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to update state', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what hooks are', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use the useState hook', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use the useEffect hook', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what dependencies are in relation to useEffect and how this can effect the functionality of this hook', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to handle forms in React', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use fetch in React', 4);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to create a basic express server', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what NPM is and how to use it', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to install third party libraries with NPM', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use express to create a basic API', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what a CRUD application does', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to implement a GET request', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to implement a POST request', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to implement a DELETE request', 5);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what SQL is and what it is used for', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand what table, rows and columns refer to', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to create a database', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to create a table', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to insert data into a table', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to retrieve data from a table', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Understand the different types of data', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to use conditionals in SQL statements', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to drop/delete tables', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to update data in a table', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to delete rows', 6);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('Be able to join tables', 6);
INSERT INTO competencylevels(competency) VALUES ('Not yet learned');
INSERT INTO competencylevels(competency) VALUES ('In progress');
INSERT INTO competencylevels(competency) VALUES ('Support needed');
INSERT INTO competencylevels(competency) VALUES ('Mastered');
-- INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (1, 1, 1);
-- INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (1, 3, 2);
-- INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (3, 1, 3);
-- INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (3, 2, 4);