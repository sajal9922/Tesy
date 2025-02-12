-- populate species table first before add any animal
INSERT INTO public.species
(id, "name")
VALUES
(nextval('species_id_seq'::regclass), 'Dog'),
(nextval('species_id_seq'::regclass), 'Cat'),
(nextval('species_id_seq'::regclass), 'Bird');

-- Checking is the species exist if it dies not add new species into species table
-- and then adding the data into the animal table

WITH species_insert AS (
    INSERT INTO public.species (name)
    SELECT 'Wild bird' -- Specify the species name here
    WHERE NOT EXISTS (SELECT 1 FROM public.species WHERE name = 'Wild bird') -- Check if species already exists
    RETURNING id
)
INSERT INTO public.animal
(id, species_id, in_date, in_tesy_date, out_date, population, reason, "name", microchip_no, age, color, breed, reason_euthanized, sex, shelter_no, notes, "from", create_date, createdby, edited_date, edited_by, age_class)
SELECT
    nextval('animal_id_seq'::regclass),
    COALESCE((SELECT id FROM species_insert), (SELECT id FROM public.species WHERE name = 'Dog')), -- Use the species ID from species_insert if it was inserted, otherwise get the existing ID
    '2024-05-13',
    '2024-05-13',
    NULL,
    1,
    'Stray',
    'Buddy',
    '123456789',
    '5',
    'Brown',
    'Labrador Retriever',
    NULL,
    'male',
    'Shelter A',
    'Friendly and energetic dog',
    'Unknown',
    CURRENT_DATE,
    1,
    CURRENT_DATE,
    1,
    'adult';

   
   
   -- function for adding new animal.
   -- This function will insert a new animal into the database.
   -- It will also insert a new species if the species does not exist.
   -- This need modification with the 'sax'datatype to work properly. 
   
   
   CREATE OR REPLACE FUNCTION add_animal(
    species_name character varying,
    in_date date,
    in_tesy_date date,
    out_date date,
    population integer,
    reason character varying,
    animal_name character varying,
    microchip_no character varying,
    age integer,
    color character varying,
    breed character varying,
    reason_euthanized character varying,
    sex sex_enum ,
    shelter_no character varying,
    notes character varying,
    animal_from character varying,
    current_user_id integer, -- New parameter for current user ID
    age_class character varying
) RETURNS void AS
$$
BEGIN
    -- Insert or get species ID
    INSERT INTO public.species (name)
    SELECT species_name
    WHERE NOT EXISTS (SELECT 1 FROM public.species WHERE name = species_name);

    -- Insert animal data
    INSERT INTO public.animal
    (id, species_id, in_date, in_tesy_date, out_date, population, reason, "name", microchip_no, age, color, breed, reason_euthanized, sex, shelter_no, notes, "from", create_date, createdby, edited_date, edited_by, age_class)
    SELECT
        nextval('animal_id_seq'::regclass),
        (SELECT id FROM public.species WHERE name = species_name),
        in_date,
        in_tesy_date ,
        out_date,
        population,
        reason,
        animal_name,
        microchip_no,
        age,
        color,
        breed,
        reason_euthanized,
        sex,
        shelter_no,
        notes,
        animal_from,
        CURRENT_DATE,
        current_user_id, -- Use the current user ID
        CURRENT_DATE,
        current_user_id, -- Use the current user ID
        age_class;
END;
$$ LANGUAGE plpgsql;