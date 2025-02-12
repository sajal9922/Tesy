-- Define the enumerated type for age_class
CREATE TYPE age_class_enum AS ENUM ('pregnant', 'adult', 'young', 'dam');
-- Add the age_class column to the animal table
ALTER TABLE animal
    ADD COLUMN age_class age_class_enum;
-- Add a foreign key constraint to ensure the values in age_class are valid
ALTER TABLE animal
    ADD CONSTRAINT fk_animal_age_class
    CHECK (age_class IN ('pregnant', 'adult', 'young', 'dam'));


-- Define the enumerated type for sex
CREATE TYPE sex_enum AS ENUM ('male', 'female', 'probably male', 'probably female');
-- Add the sex column to the animal table
ALTER TABLE animal
    ADD COLUMN sex sex_enum;
-- Add a foreign key constraint to ensure values in sex are valid
ALTER TABLE animal
    ADD CONSTRAINT fk_animal_sex
    CHECK (sex IN ('male', 'female', 'probably male', 'probably female'));

