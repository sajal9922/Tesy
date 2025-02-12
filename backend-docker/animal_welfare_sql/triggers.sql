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

----------------------------------------------

-- Declare a variable to hold the species ID
DO $$
DECLARE new_species_id BIGINT;
BEGIN
-- Check if the species already exists
SELECT id INTO new_species_id FROM species WHERE name = 'Horse';

-- If the species doesn't exist, insert it
IF NOT FOUND THEN
    INSERT INTO species (name) VALUES ('Horse') RETURNING id INTO new_species_id;
END IF;

-- Now, new_species_id contains the ID of the 'Horse' species, whether it's newly inserted or existing

-- Use the new_species_id value to insert the animal record
INSERT INTO animal (species_id, status_id, inclass_id, tesy_id, in_date, in_tesy_date, out_date, population, reason, name, microchip_no, age, color, breed, reason_euthanized, sey_stat, notes, "from", createdby, edited_by)
VALUES
    (new_species_id, 1, 1, 'test', '2023-01-01', '2023-01-02', NULL, 'Population', 'Reason', 'Animal', 'MICRO123', 'Adult', 'Black', 'Labrador', NULL, 'Sey stat', 'Some notes', 'Source', 1, 1);
END $$;

-- update people table to set active to true where id = 16
UPDATE people SET active = true WHERE id = 16;