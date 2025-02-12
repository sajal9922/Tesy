SELECT *
    FROM animal
    JOIN treatment ON animal.id = treatment.animal_id
    JOIN observation ON animal.id = observation.animal_id
      
  
    select * from animal    
    CREATE OR REPLACE FUNCTION public.insert_animal_observation_treatment(
  p_species_name text, p_in_date date, p_in_tesy_date date, p_out_date date, 
  p_population text, p_reason text, p_animal_name text, p_microchip_no text, 
  p_animal_age text, p_color text, p_breed text, p_reason_euthanized text, 
  p_sex text, p_shelter_no text, p_notes text, p_animal_location text, 
  p_create_date date, p_created_by integer, p_edited_date date, 
  p_edited_by integer, p_age_class text, p_tesy_id text, p_sey_stat text,
  p_observation text, p_treatment text
)
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
    species_id INT;
    animal_id INT;
BEGIN
    -- Insert species if it does not exist and get the species ID
    WITH species_insert AS (
        INSERT INTO public.species (name)
        SELECT p_species_name
        WHERE NOT EXISTS (SELECT 1 FROM public.species WHERE name = p_species_name)
        RETURNING id
    )
    SELECT COALESCE((SELECT id FROM species_insert), (SELECT id FROM public.species WHERE name = p_species_name))
    INTO species_id;

    -- Insert animal
    INSERT INTO public.animal
    (species_id, in_date, in_tesy_date, out_date, population, reason, animal_name , microchip_no, animal_age , color, breed, reason_euthanized, sex, shelter_no, notes, animal_location, create_date, created_by, edited_date, edited_by, age_class, tesy_id, sey_stat)
    VALUES (
        species_id,
        p_in_date,
        p_in_tesy_date,
        p_out_date,
        p_population,
        p_reason,
        p_animal_name,
        p_microchip_no,
        p_animal_age,
        p_color,
        p_breed,
        p_reason_euthanized,
        p_sex::sex_enum,  -- Casting the text parameter to sex_enum
        p_shelter_no,
        p_notes,
        p_animal_location,
        p_create_date,
        p_created_by,
        p_edited_date,
        p_edited_by,
        p_age_class :: age_class_enum,
        p_tesy_id,
        p_sey_stat
    ) RETURNING id INTO animal_id;

    -- Insert observation
    INSERT INTO public.observation (animal_id, value)
    VALUES (animal_id, p_observation);

    -- Insert treatment
    INSERT INTO public.treatment (animal_id, description)
    VALUES (animal_id, p_treatment);
  
END;
$function$
;






SELECT public.insert_animal_observation_treatment(
  'Dog', -- p_species_name
  '2022-01-01', -- p_in_date
  '2022-01-02', -- p_in_tesy_date
  '2022-01-03', -- p_out_date
  'Population1', -- p_population
  'Reason1', -- p_reason
  'Max', -- p_animal_name
  '1234567890', -- p_microchip_no
  '2 years', -- p_animal_age
  'Black', -- p_color
  'Breed2', -- p_breed
  'Reason3', -- p_reason_euthanized
  'male', -- p_sex
  'Shelter-a', -- p_shelter_no
  'Notes3', -- p_notes
  'Location9', -- p_animal_location
  '2022-01-04', -- p_create_date
  1, -- p_created_by
  '2022-01-05', -- p_edited_date
  2, -- p_edited_by
  'adult', -- p_age_class
  'Tesy1', -- p_tesy_id
  'Stat1', -- p_sey_stat
  'Observation4', -- p_observation
  'Treatment5' -- p_treatment
);