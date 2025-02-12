-- 1. Inserting Duplicate Observation Values
-- Assuming observation_id is auto-generated and not part of the unique constraint
INSERT INTO observations (animal_id, type_id, people_id, date, value) 
VALUES (existing_animal_id, existing_type_id, existing_people_id, '2024-04-21', 'Test observation');

-- 2. Inserting Observation with Non-existent References
INSERT INTO observations (animal_id, type_id, people_id, date, value) 
VALUES (non_existent_animal_id, existing_type_id, existing_people_id, '2024-04-21', 'Test observation');

-- 3. Updating Observation to Violate Unique Constraint
UPDATE observations 
SET animal_id = existing_animal_id, type_id = existing_type_id, people_id = existing_people_id 
WHERE observation_id = existing_observation_id;

-- 4. Updating Observation with Non-existent References
UPDATE observations 
SET animal_id = non_existent_animal_id, type_id = existing_type_id, people_id = existing_people_id 
WHERE observation_id = existing_observation_id;

-- 5. Deleting Referenced Records
DELETE FROM animals WHERE animal_id = existing_animal_id;
