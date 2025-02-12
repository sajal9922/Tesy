DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "animal" (
    "id" SERIAL   PRIMARY KEY,
    "species_id" BIGINT,
    "in_date" DATE,
    "in_tesy_date" DATE,
    "out_date" DATE,
    "population" TEXT,
    "reason" TEXT,
    "name" TEXT,
    "microchip_no" TEXT,
    "age" TEXT,
    "color" TEXT,
    "breed" TEXT,
    "reason_euthanized" TEXT,
    "sey_stat" TEXT,
    "shelter_no" TEXT,
    "notes" TEXT,
    "from" TEXT,
    "create_date" DATE  DEFAULT CURRENT_DATE NOT NULL,
    "createdby" BIGINT,
    "edited_date" DATE,
    "edited_by" BIGINT   
);

CREATE TABLE "species" (
    "id" SERIAL   PRIMARY KEY,
    "name" TEXT   
);

CREATE TABLE "treatment" (
    "id" SERIAL   PRIMARY KEY,
    "treatment_type_id" BIGINT,
    "animal_id" BIGINT,
    "people_id" BIGINT,
    "date" DATE DEFAULT CURRENT_DATE ,
    "description" TEXT,
    "dosage" TEXT
);

CREATE TABLE "observation_type" (
    "id" SERIAL   PRIMARY KEY,
    "applicable" BIGINT,
    "name" TEXT   
);

CREATE TABLE "observation" (
    "id" SERIAL   PRIMARY KEY,
    "animal_id" BIGINT,
    "type_id" BIGINT,
    "people_id" BIGINT,
    "date" DATE  DEFAULT CURRENT_DATE,
    "value" TEXT   
);

CREATE TABLE "people" (
    "id" SERIAL   PRIMARY KEY,
    "role_id" BIGINT,
    "username" TEXT,
    "passwd" TEXT,
    "realname" TEXT,
    "email" TEXT,
    "active" boolean   
);

CREATE TABLE "role" (
    "id" SERIAL   PRIMARY KEY,
    "people_id" BIGINT,
    "name" TEXT   
);

CREATE TABLE "people_role" (
    "people_id" BIGINT,
    "role_id" BIGINT,
    PRIMARY KEY ("people_id", "role_id"),
    FOREIGN KEY ("people_id") REFERENCES "people" ("id"),
    FOREIGN KEY ("role_id") REFERENCES "role" ("id")
);

CREATE TABLE "rescuemission" (
    "id" SERIAL   PRIMARY KEY,
    "people_id" BIGINT,
    "animal_id" BIGINT,
    "treatment_id" BIGINT,
    "date" DATE DEFAULT CURRENT_DATE,
    "time" TIME DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT,
    "outcome" TEXT,
    "info" TEXT,
    "is_active" boolean   
);

CREATE TABLE "adoption" (
    "id" SERIAL   PRIMARY KEY,
    "animal_id" BIGINT,
    "people_id" BIGINT,
    "observation_id" BIGINT,
    "date" DATE DEFAULT CURRENT_DATE,
    "location" TEXT,
    "current_owner" TEXT   
);

CREATE TABLE "treatment_type" (
    "id" SERIAL   PRIMARY KEY,
    "name" TEXT   
);

CREATE TABLE "treatment_parameter" (
    "id" SERIAL   PRIMARY KEY,
    "treatment_parameter_type_id" SERIAL,
    "treatment_id" BIGINT,
    "name" TEXT   
);

CREATE TABLE "treatment_parameter_type" (
    "id" SERIAL   PRIMARY KEY,
    "name" TEXT   
);

CREATE TABLE "observation_parameter" (
    "id" SERIAL   PRIMARY KEY,
    "observation_parameter_type_id" BIGINT,
    "observation_id" BIGINT,
    "name" TEXT   
);

CREATE TABLE "observation_parameter_type" (
    "id" SERIAL   PRIMARY KEY,
    "name" TEXT   
);

CREATE TABLE "refresh_tokens" (
    "id" SERIAL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "people_id" BIGINT NOT NULL,
    "expires_at" TIMESTAMP NOT NULL,
    FOREIGN KEY ("people_id") REFERENCES "people" ("id")
);

-- These are for "hardcoded" data

-- Define the enumerated type for age_class
CREATE TYPE age_class_enum AS ENUM ('pregnant', 'adult', 'young', 'dam');
CREATE TYPE sex_enum AS ENUM ('male', 'female', 'probably male', 'probably female');

-- Add the age_class column to the animal table
ALTER TABLE animal
    ADD COLUMN age_class age_class_enum;

-- Add a foreign key constraint to ensure the values in age_class are valid
ALTER TABLE animal
    ADD CONSTRAINT fk_animal_age_class
    CHECK (age_class IN ('pregnant', 'adult', 'young', 'dam'));

-- Add the sex column to the animal table
ALTER TABLE animal
    ADD COLUMN sex sex_enum;
-- Add a foreign key constraint to ensure values in sex are valid
ALTER TABLE animal
    ADD CONSTRAINT fk_animal_sex
    CHECK (sex IN ('male', 'female', 'probably male', 'probably female'));


ALTER TABLE "animal" ADD CONSTRAINT "fk_animal_species_id" FOREIGN KEY("species_id")
REFERENCES "species" ("id");

ALTER TABLE "animal" ADD CONSTRAINT "fk_animal_createdby" FOREIGN KEY("createdby")
REFERENCES "people" ("id");

ALTER TABLE "treatment" ADD CONSTRAINT "fk_treatment_treatment_type_id" FOREIGN KEY("treatment_type_id")
REFERENCES "treatment_type" ("id");

ALTER TABLE "treatment" ADD CONSTRAINT "fk_treatment_animal_id" FOREIGN KEY("animal_id")
REFERENCES "animal" ("id");

ALTER TABLE "treatment" ADD CONSTRAINT "fk_treatment_people_id" FOREIGN KEY("people_id")
REFERENCES "people" ("id");

ALTER TABLE "observation" ADD CONSTRAINT "fk_observations_animal_id" FOREIGN KEY("animal_id")
REFERENCES "animal" ("id");

ALTER TABLE "observation" ADD CONSTRAINT "fk_observation_type_id" FOREIGN KEY("type_id")
REFERENCES "observation_type" ("id");

ALTER TABLE "observation" ADD CONSTRAINT "fk_observation_people_id" FOREIGN KEY("people_id")
REFERENCES "people" ("id");

ALTER TABLE "role" ADD CONSTRAINT "fk_role_people_id" FOREIGN KEY("people_id")
REFERENCES "people" ("id");

ALTER TABLE "rescuemission" ADD CONSTRAINT "fk_rescuemission_people_id" FOREIGN KEY("people_id")
REFERENCES "people" ("id");

ALTER TABLE "rescuemission" ADD CONSTRAINT "fk_rescuemission_animal_id" FOREIGN KEY("animal_id")
REFERENCES "animal" ("id");

ALTER TABLE "rescuemission" ADD CONSTRAINT "fk_rescuemission_treatment_id" FOREIGN KEY("treatment_id")
REFERENCES "treatment" ("id");

ALTER TABLE "adoption" ADD CONSTRAINT "fk_adoption_animal_id" FOREIGN KEY("animal_id")
REFERENCES "animal" ("id");

ALTER TABLE "adoption" ADD CONSTRAINT "fk_adoption_people_id" FOREIGN KEY("people_id")
REFERENCES "people" ("id");

ALTER TABLE "treatment_parameter" ADD CONSTRAINT "fk_treatment_parameter_type_id" FOREIGN KEY("treatment_parameter_type_id")
REFERENCES "treatment_parameter_type" ("id");

ALTER TABLE "treatment_parameter" ADD CONSTRAINT "fk_treatment_parameter_treatment_id" FOREIGN KEY("treatment_id")
REFERENCES "treatment" ("id");

ALTER TABLE "observation_parameter" ADD CONSTRAINT "fk_observation_parameter_observation_parameter_type_id" FOREIGN KEY("observation_parameter_type_id")
REFERENCES "observation_parameter_type" ("id");

ALTER TABLE "observation_parameter" ADD CONSTRAINT "fk_observation_parameter_observation_id" FOREIGN KEY("observation_id")
REFERENCES "observation" ("id");

CREATE OR REPLACE FUNCTION update_edited_by()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        NEW.edited_by := (SELECT id FROM people WHERE username = NEW.username); -- Assuming people's name is unique and corresponds to username
        
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_edited_by_trigger
BEFORE UPDATE ON animal
FOR EACH ROW
EXECUTE FUNCTION update_edited_by();

INSERT INTO "people" ("username", "passwd", "realname", "email", "active")
VALUES ('admin', 'admin', 'Admin', 'admin@hotmail.com', null);

INSERT INTO "people" ("username", "passwd", "realname", "email", "active")
VALUES ('volunteer', 'volunteer', 'Volunteer', 'volunteer@hotmail.com', null);

INSERT INTO "role" ("id", "name")
VALUES (1, 'admin');

INSERT INTO "role" ("id", "name")
VALUES (2, 'volunteer');

INSERT INTO "people_role" ("people_id", "role_id")
VALUES (1, 1);

INSERT INTO "people_role" ("people_id", "role_id")
VALUES (1, 2);

INSERT INTO "people_role" ("people_id", "role_id")
VALUES (2, 2);


