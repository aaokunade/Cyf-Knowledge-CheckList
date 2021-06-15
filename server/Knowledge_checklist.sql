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
    objectives   VARCHAR (50)NOT NULL,
    lesson_id    INT NOT NULL  
);

CREATE TABLE mapping_skills (
    id          SERIAL PRIMARY KEY,
    stud_id     INT NOT NULL,
    obj_id      INT NOT NULL,    
    comp_id     INT NOT NULL   
);

CREATE TABLE tech_skills (
    id          SERIAL PRIMARY KEY,
    lessons     VARCHAR(50)NOT NULL     
);

CREATE TABLE competency_level (
    id          SERIAL PRIMARY KEY,
    stud_id     integer references,
    competency  integer references
);

INSERT INTO students (name, location, email, password) VALUES ('student', 'west mids', 'email@email.com','password');
INSERT INTO mentors (name, location, email, password) VALUES ('mentors', 'west mids', 'email@email.com', 'password');
INSERT INTO region (location) VALUES ('west mids');
INSERT INTO learning_objectives (objectives, lesson_id) VALUES ('fundmentals', 1);
INSERT INTO mapping_skills (stud_id, obj_id, comp_id) VALUES (2,3,4);
INSERT INTO tech_skills (lessons) VALUES ('react');
INSERT INTO competency_level(stud_id, competency) VALUES (2,3);








