drop table if exists students cascade;
drop table if exists mentors cascade;
drop table if exists region;
drop table if exists learningobjectives cascade;
drop table if exists mappingskills cascade;
drop table if exists techskills cascade;
drop table if exists competencylevel cascade;

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
    location    VARCHAR(50) NOT NULL,
    stud_id     integer,
    ment_id     integer,
    FOREIGN KEY (stud_id) REFERENCES students(id),
    FOREIGN KEY (ment_id) REFERENCES mentors(id)
);

CREATE TABLE techskills (
    id          SERIAL PRIMARY KEY,
    lessons     VARCHAR(50)NOT NULL     
);

CREATE TABLE learningobjectives (
    id           SERIAL PRIMARY KEY,
    objectives   VARCHAR (50)NOT NULL,
    lesson_id    integer, --references techskills(id),
    FOREIGN KEY (lesson_id) REFERENCES techskills(id)
);

CREATE TABLE competencylevel (
    id          SERIAL PRIMARY KEY,
    competency  VARCHAR(50)NOT NULL
);

CREATE TABLE mappingskills (
    id          SERIAL PRIMARY KEY,
    stud_id     integer, --references students(id),
    obj_id      integer, --references learningobjectives(id),    
    comp_id     integer, -- references competencylevel(id),
    FOREIGN KEY (stud_id) REFERENCES students(id), 
    FOREIGN KEY (obj_id) REFERENCES learningobjectives(id), 
    FOREIGN KEY(comp_id) REFERENCES competencylevel(id)
);






INSERT INTO students (name, location, email, password) VALUES ('student', 'west mids', 'email@email.com','password');
INSERT INTO mentors (name, location, email, password) VALUES ('mentors', 'west mids', 'email@email.com', 'password');
INSERT INTO region (location, stud_id, ment_id) VALUES ('west mids', 1, 1);
INSERT INTO techskills (lessons) VALUES ('react');
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('fundmentals', 1);
INSERT INTO competencylevel(competency) VALUES ('very Confident');
INSERT INTO mappingskills (stud_id, obj_id, comp_id) VALUES (1,1,1);




-- modified:   client/src/pages/Home.js
        modified:   server/api.js
        modified:   server/middleware.js
         modified:   server/server.js
        knowledge_checklist.sql


