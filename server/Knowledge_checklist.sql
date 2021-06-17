drop table if exists students cascade;
drop table if exists mentors cascade;
drop table if exists region;
drop table if exists learning_objectives cascade;
drop table if exists mapping_skills cascade;
drop table if exists tech_skills cascade;
drop table if exists competency_level cascade;

CREATE TABLE students (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR (50)NOT NULL,
    location    VARCHAR (50)NOT NULL,
    email       VARCHAR (150) NOT NULL,
    password    VARCHAR(70) NOT NULL
);

CREATE TABLE mentors (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR (50)NOT NULL,
    location    VARCHAR (50)NOT NULL,
    email       VARCHAR (150) NOT NULL,
    password    VARCHAR(70) NOT NULL
);

CREATE TABLE region (
    id          SERIAL PRIMARY KEY,
    location    VARCHAR(50) NOT NULL 
);

CREATE TABLE learning_objectives (
    id           SERIAL PRIMARY KEY,
    obj_id       VARCHAR (50)NOT NULL,
    lesson_id    INT NOT NULL            
);

CREATE TABLE mapping_skills (
    id          SERIAL PRIMARY KEY,
    stud_id     INT REFERENCES students(id), 
    obj_id      INT NOT NULL,    
    comp_id     INT NOT NULL
         
);

CREATE TABLE tech_skills (
    id          SERIAL PRIMARY KEY,
    tech_id     VARCHAR(50)NOT NULL,
    stud_id     INT NOT NULL,
    obj_id      INT NOT NULL
        
);

CREATE TABLE competency_level (
    id          SERIAL PRIMARY KEY,
    stud_id     INT NOT NULL,
    comp_id     INT NOT NULL
);

INSERT INTO students (name, location, email, password) VALUES ('Mister', 'west midlands', 'email@email.com','password');
INSERT INTO students (name, location, email, password) VALUES ('Miss', 'Scotland', 'missl@email.com','password1');
INSERT INTO students (name, location, email, password) VALUES ('junior', 'North West', 'junior@email.com','password2');

INSERT INTO mentors (name, location, email, password) VALUES ('tutora', 'North West', 'tutora@email.com', 'passworda');
INSERT INTO mentors (name, location, email, password) VALUES ('tutorb', 'West Mids', 'tutorb@email.com', 'passwordb');
INSERT INTO mentors (name, location, email, password) VALUES ('tutorc', 'Scotland', 'tutorc@email.com', 'passwordc');

INSERT INTO region (location) VALUES ('West Midlands');
INSERT INTO region (location) VALUES ('Scotland');
INSERT INTO region (location) VALUES ('London');
INSERT INTO region (location) VALUES ('North West');
INSERT INTO region (location) VALUES ('Cape Town');


INSERT INTO learning_objectives (obj_id, lesson_id) VALUES ('fundmentals', 1);
INSERT INTO learning_objectives (obj_id, lesson_id) VALUES ('DOM', 2);
INSERT INTO learning_objectives (obj_id, lesson_id) VALUES ('Props',3);

INSERT INTO mapping_skills (stud_id, obj_id, comp_id) VALUES (1,2,3);
INSERT INTO mapping_skills (stud_id, obj_id, comp_id) VALUES (3,2,1);
INSERT INTO mapping_skills (stud_id, obj_id, comp_id) VALUES (2,1,3);

INSERT INTO tech_skills (tech_id,stud_id,obj_id) VALUES ('html',3,2);
INSERT INTO tech_skills (tech_id,stud_id,obj_id) VALUES ('css', 1,2);
INSERT INTO tech_skills (tech_id,stud_id,obj_id) VALUES ('javascript',1,3);
INSERT INTO tech_skills (tech_id,stud_id,obj_id) VALUES ('node.js', 2,1);
INSERT INTO tech_skills (tech_id,stud_id,obj_id) VALUES ('react',3,1);
INSERT INTO tech_skills (tech_id,stud_id,obj_id) VALUES ('sql',1,1);

INSERT INTO competency_level(stud_id, comp_id) VALUES (1,1);
INSERT INTO competency_level(stud_id, comp_id) VALUES (3,2);
INSERT INTO competency_level(stud_id, comp_id) VALUES (2,3);










