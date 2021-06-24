drop table if exists region cascade;
drop table if exists roles cascade;
drop table if exists users cascade;
drop table if exists techskills cascade;
drop table if exists learningobjectives cascade;
drop table if exists competencylevels cascade;
drop table if exists mappingskills cascade;

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

CREATE TABLE techskills (
id  SERIAL PRIMARY KEY,
lessons VARCHAR(50)NOT NULL
);

CREATE TABLE learningobjectives (
id  SERIAL PRIMARY KEY,
objectives  VARCHAR (50)NOT NULL,
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
INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('s2','email@email.com','password', 2, 2);
INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('s1','email@email.com','password', 1, 3);
INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('sue','email@email.com','password', 1, 2);
INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('pete','email@email.com','password', 1, 3);
INSERT INTO users (name, email, password,roles_id, region_id) VALUES ('admin','admin@email.com','password', 3, 1);
INSERT INTO techskills (lessons) VALUES ('react');
INSERT INTO techskills (lessons) VALUES ('html');
INSERT INTO techskills (lessons) VALUES ('css');
INSERT INTO techskills (lessons) VALUES ('node');
INSERT INTO techskills (lessons) VALUES ('sql');
INSERT INTO techskills (lessons) VALUES ('javascript');
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('fundmentals', 1);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('bootstrap', 3);
INSERT INTO learningobjectives (objectives, lesson_id) VALUES ('crud', 4);
INSERT INTO competencylevels(competency) VALUES ('Not yet learned');
INSERT INTO competencylevels(competency) VALUES ('In progress');
INSERT INTO competencylevels(competency) VALUES ('Support needed');
INSERT INTO competencylevels(competency) VALUES ('Mastered');
INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (1, 1, 1);
INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (1, 3, 2);
INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (3, 1, 3);
INSERT INTO mappingskills (users_id, obj_id, comp_id) VALUES (3, 2, 4);