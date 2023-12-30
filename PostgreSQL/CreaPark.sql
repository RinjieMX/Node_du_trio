-- SCHEMA: projeta4

-- DROP SCHEMA IF EXISTS "projeta4" ;

-- CREATE SCHEMA IF NOT EXISTS "projeta4"
    -- AUTHORIZATION postgres;
	
DROP TABLE IF EXISTS projeta4.learning_fact CASCADE;
DROP TABLE IF EXISTS projeta4.learning_package CASCADE;

CREATE TABLE projeta4.learning_fact (
	id_fact SERIAL PRIMARY KEY NOT NULL, 
	recto varchar(500), 
	verso varchar(500),
	id_package INT,
	state_fact varchar(50),
	next_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
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

ALTER TABLE projeta4.learning_fact ADD CONSTRAINT FK_learning_fact_id_fact FOREIGN KEY (id_package) REFERENCES projeta4.learning_package (id_package);

ALTER TABLE projeta4.learning_fact
ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

ALTER TABLE projeta4.learning_package
ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();