-- Inserting test data into related tables first
INSERT INTO species (species_id, name) VALUES (1, 'Test Species');
INSERT INTO people (people_id, role_id, username, passwd, realname, active) VALUES (1, 1, 'test_user', 'password', 'Test User', true);
INSERT INTO observation_types (type_id, applicable, name) VALUES (1, 1, 'Test Type');
INSERT INTO animals (animal_id, species_id, status_id, inclass_id, tesy_id, in_date, in_tesy_date, out_date, population, reason, name, microchip_no, age_class, age, sex, color, breed, reason_euthanized, sey_stat, notes, "from", create_date, createdby, edited_date, edited_by) VALUES (1, 1, 1, 1, 'Test', '2024-04-21', '2024-04-21', '2024-04-21', 'Test', 'Test', 'Test Animal', 'Test Microchip', 'Test Age Class', 'Test Age', 'Test Sex', 'Test Color', 'Test Breed', 'Test Reason Euthanized', 'Test Sey Stat', 'Test Notes', 'Test From', '2024-04-21', 1, '2024-04-21', 1);

-- Inserting test data into the observations table
INSERT INTO observations (observation_id, animal_id, type_id, people_id, date, value) VALUES (1, 1, 1, 1, '2024-04-21', 'Test Observation');
