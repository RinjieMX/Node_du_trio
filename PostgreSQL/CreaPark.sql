-- SCHEMA: projeta4

-- DROP SCHEMA IF EXISTS "projeta4" ;

-- CREATE SCHEMA IF NOT EXISTS "projeta4"
    -- AUTHORIZATION postgres;
	
DROP TABLE IF EXISTS projeta4.userpackagelearning CASCADE;
DROP TABLE IF EXISTS projeta4.userlearningfact CASCADE;
DROP TABLE IF EXISTS projeta4.learning_fact CASCADE;
DROP TABLE IF EXISTS projeta4.learning_package CASCADE;
DROP TABLE IF EXISTS projeta4.users CASCADE;

CREATE TABLE projeta4.users (
	email_user VARCHAR(100) NOT NULL PRIMARY KEY,
	password_user VARCHAR(50) NOT NULL,
	firstname_user VARCHAR(50) NOT NULL,
	lastname_user VARCHAR(50) NOT NULL
);

CREATE TABLE projeta4.learning_fact (
	id_fact SERIAL PRIMARY KEY NOT NULL, 
	recto varchar(500), 
	verso varchar(500),
	id_package INT,
	state_fact varchar(50)
);
	
CREATE TABLE projeta4.learning_package (
	id_package SERIAL PRIMARY KEY NOT NULL, 
	title_package varchar(50), 
	description_package varchar(200), 
	category varchar(50), 
	target_audience varchar(500), 
	difficulty_level varchar(50),
	finished_package boolean NOT NULL DEFAULT false
); 

CREATE TABLE projeta4.userpackagelearning (
	email_user VARCHAR(100) NOT NULL, 
	id_package INT NOT NULL, 
	startdate TIMESTAMP, 
	expectedenddate TIMESTAMP, 
	minutesperdayobjective int,
	PRIMARY KEY (email_user, id_package)
);  

CREATE TABLE projeta4.userlearningfact (
	email_user VARCHAR(50) NOT NULL, 
	id_fact INT NOT NULL, 
	number_watched int, 
	confidence_level int, 
	lastrevieweddate TIMESTAMP,
	PRIMARY KEY (email_user, id_fact)
);  

ALTER TABLE projeta4.learning_fact ADD CONSTRAINT FK_learning_fact_id_fact FOREIGN KEY (id_package) REFERENCES projeta4.learning_package (id_package);
ALTER TABLE projeta4.userlearningfact ADD CONSTRAINT FK_userlearningfact_email_user FOREIGN KEY (email_user) REFERENCES projeta4.users (email_user);  
ALTER TABLE projeta4.userlearningfact ADD CONSTRAINT FK_userlearningfact_id_fact FOREIGN KEY (id_fact) REFERENCES projeta4.learning_fact (id_fact);
ALTER TABLE projeta4.userpackagelearning ADD CONSTRAINT FK_userpackagelearning_id_package FOREIGN KEY (id_package) REFERENCES projeta4.learning_package (id_package);
ALTER TABLE projeta4.userpackagelearning ADD CONSTRAINT FK_userpackagelearning_email_user FOREIGN KEY (email_user) REFERENCES projeta4.users (email_user);

ALTER TABLE projeta4.learning_fact
ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

ALTER TABLE projeta4.learning_package
ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();