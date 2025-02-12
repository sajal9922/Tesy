const pool = require('../utils/db');
console.log('pool');
const loger = require('../utils/logger');

// endpoint is http://localhost:5001/animal/:id
// we want to get the animalid from the request parameters
const updateAnimal = (req, res) => {
  const {
    species_id,
    population,
    reason,
    animal_name,
    microchip_no,
    animal_age,
    color,
    breed,
    reason_euthanized,
    sey_stat,
    shelter_no,
    notes,
    animal_location,
    age_class,
    sex,
    created_by,
  } = req.body;
  const { id } = req.params; // get id from request parameters

  const animalUpdateQuery = `
    UPDATE public.animal
    SET species_id = $1, population = $2, reason = $3, animnal_name = $4, microchip_no = $5, animal_age = $6, color = $7, breed = $8, reason_euthanized = $9, sey_stat = $10, shelter_no = $11, notes = $12, animal_location = $13, age_class = $14, sex = $15,  edited_by = $17
    WHERE id = $16
  `;

  pool
    .query(animalUpdateQuery, [
      species_id,
      population,
      reason,
      animal_name,
      microchip_no,
      animal_age,
      color,
      breed,
      reason_euthanized,
      sey_stat,
      shelter_no,
      notes,
      animal_location,
      age_class,
      sex,
      created_by,
      id,
    ])
    .then(() => {
      // After updating, fetch the updated data
      return pool.query('SELECT * FROM public.animal WHERE id = $1', [id]);
    })
    .then((result) => {
      res.status(200).json({
        message: 'Animal updated successfully.',
        updatedAnimal: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message:
          'Error updating animal. age_class and sex have hardcoded values. Accepted values for age_class are (pregnant, adult, young, dam) and for sex (male, female, probably male, probably female)',
      });
    });
};

const getAnimalDataFromId = (req, res) => {
  const { id } = req.params; // get id from request parameters
  console.log('id', req.params);
  loger.info('id', id);
  loger.error('id', id);

  const animalSelectQuery = `
    SELECT 
      animal.id, 
      animal.species_id, 
      species.name AS species_name, 
      animal.population, 
      animal.reason, 
      animal.animal_name, 
      animal.microchip_no, 
      animal.animal_age, 
      animal.color, 
      animal.breed, 
      animal.reason_euthanized, 
      animal.sey_stat, 
      animal.shelter_no, 
      animal.notes, 
      animal.animal_location, 
      animal.age_class, 
      animal.sex,
      array_agg(DISTINCT jsonb_build_object('id', observation.id, 'type_id', observation.type_id, 'people_id', observation.people_id, 'date', observation.date, 'value', observation.value)) AS observations,
      array_agg(DISTINCT jsonb_build_object('id', treatment.id, 'treatment_type_id', treatment.treatment_type_id, 'people_id', treatment.people_id, 'date', treatment.date, 'description', treatment.description, 'dosage', treatment.dosage)) AS treatments
    FROM 
      public.animal 
    LEFT JOIN 
      public.species ON animal.species_id = species.id
    LEFT JOIN 
      public.observation ON animal.id = observation.animal_id
    LEFT JOIN 
      public.treatment ON animal.id = treatment.animal_id
    WHERE 
      animal.id = $1
    GROUP BY 
      animal.id, 
      species.name
  `;

  pool
    .query(animalSelectQuery, [id])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log('id', id);
        console.log('result', result.rows[0]);
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Animal not found.' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching animal data.' });
    });
};

// POST http://localhost:5001/animal/35
// Content-Type: application/json

// {
//     "species_name": "Dog",
//     "in_date": "2022-01-01",
//     "in_tesy_date": "2022-01-02",
//     "out_date": "2022-01-03",
//     "population": "Population1",
//     "reason": "Reason1",
//     "animal": "Max",
//     "microchip_no": "1234567890",
//     "age": "2 years",
//     "color": "Black",
//     "breed": "Breed2",
//     "reason_euthanized": "Reason3",
//     "sex": "male",
//     "shelter_no": "Shelter-a",
//     "notes": "Notes3",
//     "from": "Location9",
//     "create_date": "2022-01-04",
//     "createdby": 1,
//     "edited_date": "2022-01-05",
//     "edited_by": 2,
//     "age_class": "adult",
//     "tesy_id": "Tesy1",
//     "sey_stat": "Stat1",
//     "observation": "Observation4",
//     "treatment": "Treatment5"
// }
// this creates a new animal, observation, and treatment
const insertAnimalObservationTreatment = (req, res) => {
  const {
    species_name,
    in_date,
    in_tesy_date,
    out_date,
    population,
    reason,
    animal_name,
    microchip_no,
    animal_age,
    color,
    breed,
    reason_euthanized,
    sex,
    shelter_no,
    notes,
    animal_location,
    currentUserId,
    age_class,
    tesy_id,
    sey_stat,
    observation,
    treatment,
  } = req.body; // get data from request body
  const currentDate = new Date().toISOString().split('T')[0];

  pool
    .connect()
    .then((client) => {
      return client
        .query('BEGIN')
        .then(() => {
          return client.query(
            `
            WITH species_insert AS (
              INSERT INTO public.species (name)
              SELECT $1
              WHERE NOT EXISTS (SELECT 1 FROM public.species WHERE name = $1)
              RETURNING id
            )
            SELECT id FROM species_insert
            UNION ALL
            SELECT id FROM public.species WHERE name = $1
            LIMIT 1;
          `,
            [species_name]
          );
        })
        .then((speciesResult) => {
          const species_id = speciesResult.rows[0].id;
          return client.query(
            `
            INSERT INTO public.animal
            (species_id, in_date, in_tesy_date, out_date, population, reason, animal_name, microchip_no, animal_age, color, breed, reason_euthanized, sex, shelter_no, notes, animal_location, create_date, created_by, edited_date, edited_by, age_class, tesy_id, sey_stat)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::sex_enum, $14, $15, $16, $17, $18, $19, $20, $21::age_class_enum, $22, $23)
            RETURNING id
          `,
            [
              species_id,
              in_date,
              in_tesy_date,
              out_date,
              population,
              reason,
              animal_name,
              microchip_no,
              animal_age,
              color,
              breed,
              reason_euthanized,
              sex,
              shelter_no,
              notes,
              animal_location,
              currentDate,
              currentUserId,
              null,
              null,
              age_class,
              tesy_id,
              sey_stat,
            ]
          );
        })
        .then((animalResult) => {
          const animal_id = animalResult.rows[0].id;
          return Promise.all([
            client.query(
              `
              INSERT INTO public.observation (animal_id, value, people_id)
              VALUES ($1, $2, $3)
            `,
              [animal_id, observation, currentUserId]
            ),
            client.query(
              `
              INSERT INTO public.treatment (animal_id, description, people_id)
              VALUES ($1, $2, $3)
            `,
              [animal_id, treatment, currentUserId]
            ),
          ]);
        })
        .then(() => client.query('COMMIT'))
        .then(() => {
          res.status(200).json({
            message:
              'Animal, observation, and treatment data inserted successfully.',
          });
          client.release();
        })
        .catch((err) => {
          return client.query('ROLLBACK').then(() => {
            console.error(err);
            res.status(500).json({ message: 'Error inserting data.' });
            client.release();
          });
        });
    })
    .catch((err) => {
      console.error('Error acquiring client', err.stack);
      res.status(500).json({ message: 'Error acquiring client.' });
    });
};

// deletes the old observation and treatment and inserts the new ones

const updateAnimalObservationTreatment = (req, res) => {
  const { id } = req.params; // get animal ID from request parameters
  const {
    species_name,
    in_date,
    in_tesy_date,
    out_date,
    population,
    reason,
    animal_name,
    microchip_no,
    animal_age,
    color,
    breed,
    reason_euthanized,
    sex,
    shelter_no,
    notes,
    animal_location,
    age_class,
    tesy_id,
    sey_stat,
    observations,
    treatments,
  } = req.body; // get data from request body

  pool
    .connect()
    .then((client) => {
      const handleError = (err) => {
        console.error(err);
        return client.query('ROLLBACK').then(() => {
          client.release();
          res.status(500).json({ message: 'Error updating data.' });
        });
      };

      return client
        .query('BEGIN')
        .then(() => {
          return client.query(
            `
            WITH species_insert AS (
              INSERT INTO public.species (name)
              SELECT $1
              WHERE NOT EXISTS (SELECT 1 FROM public.species WHERE name = $1)
              RETURNING id
            )
            SELECT id FROM species_insert
            UNION ALL
            SELECT id FROM public.species WHERE name = $1
            LIMIT 1
          `,
            [species_name]
          );
        })
        .then((speciesResult) => {
          const species_id = speciesResult.rows[0].id;
          return client.query(
            `
            UPDATE public.animal
            SET
              species_id = $1,
              in_date = $2,
              in_tesy_date = $3,
              out_date = $4,
              population = $5,
              reason = $6,
              animal_name = $7,
              microchip_no = $8,
              animal_age = $9,
              color = $10,
              breed = $11,
              reason_euthanized = $12,
              sex = $13::sex_enum,
              shelter_no = $14,
              notes = $15,
              animal_location = $16,
              age_class = $17::age_class_enum,
              tesy_id = $18,
              sey_stat = $19
            WHERE id = $20
          `,
            [
              species_id,
              in_date,
              in_tesy_date,
              out_date,
              population,
              reason,
              animal_name,
              microchip_no,
              animal_age,
              color,
              breed,
              reason_euthanized,
              sex,
              shelter_no,
              notes,
              animal_location,
              age_class,
              tesy_id,
              sey_stat,
              id,
            ]
          );
        })
        .then(() => {
          // Delete previous observations and treatments
          return client
            .query(`DELETE FROM public.observation WHERE animal_id = $1`, [id])
            .then(() => {
              return client.query(
                `DELETE FROM public.treatment WHERE animal_id = $1`,
                [id]
              );
            });
        })
        .then(() => {
          const observationPromises = observations.map((obs) => {
            return client
              .query(
                `
              WITH observation_type_insert AS (
                INSERT INTO public.observation_type (id)
                SELECT $1
                WHERE NOT EXISTS (SELECT 1 FROM public.observation_type WHERE id = $1)
                RETURNING id
              )
              SELECT COALESCE((SELECT id FROM observation_type_insert), (SELECT id FROM public.observation_type WHERE id = $1))
            `,
                [obs.type_id]
              )
              .then(() => {
                return client.query(
                  `
                INSERT INTO public.observation (animal_id, type_id, people_id, date, value)
                VALUES ($1, $2, $3, $4, $5)
              `,
                  [id, obs.type_id, obs.people_id, obs.date, obs.value]
                );
              });
          });

          const treatmentPromises = treatments.map((treat) => {
            return client
              .query(
                `
              WITH treatment_type_insert AS (
                INSERT INTO public.treatment_type (id)
                SELECT $1
                WHERE NOT EXISTS (SELECT 1 FROM public.treatment_type WHERE id = $1)
                RETURNING id
              )
              SELECT COALESCE((SELECT id FROM treatment_type_insert), (SELECT id FROM public.treatment_type WHERE id = $1))
            `,
                [treat.treatment_type_id]
              )
              .then(() => {
                return client.query(
                  `
                INSERT INTO public.treatment (animal_id, treatment_type_id, people_id, date, description, dosage)
                VALUES ($1, $2, $3, $4, $5, $6)
              `,
                  [
                    id,
                    treat.treatment_type_id,
                    treat.people_id,
                    treat.date,
                    treat.description,
                    treat.dosage,
                  ]
                );
              });
          });

          return Promise.all([...observationPromises, ...treatmentPromises]);
        })
        .then(() => client.query('COMMIT'))
        .then(() => {
          res.status(200).json({
            message:
              'Animal, observation, and treatment data updated successfully.',
          });
          client.release();
        })
        .catch(handleError);
    })
    .catch((err) => {
      console.error('Error acquiring client', err.stack);
      res.status(500).json({ message: 'Error acquiring client.' });
    });
};

const getAllAnimalsData = (req, res) => {
  const animalSelectQuery = `SELECT
  animal.id,
  animal.tesy_id,
  animal.animal_name,
  animal.species_id,
  species.name AS species_name,
  animal.population,
  animal.reason,
  animal.microchip_no,
  animal.animal_age,
  animal.color,
  animal.breed,
  animal.reason_euthanized,
  animal.sey_stat,
  animal.shelter_no,
  animal.notes,
  animal.animal_location,
  animal.age_class,
  TO_CHAR(animal.in_tesy_date, 'YYYY-MM-DD') AS in_tesy_date,
  TO_CHAR(animal.out_date, 'YYYY-MM-DD') AS out_date,
  TO_CHAR(observation.date, 'YYYY-MM-DD') AS observation_date,
  observation.type_id,
  treatment.treatment_type_id,
  observation.value AS observation,
  TO_CHAR(treatment.date, 'YYYY-MM-DD') AS treatment_date,
  treatment.description AS treatment
FROM
  animal
JOIN
  species ON animal.species_id = species.id
LEFT JOIN
  observation ON animal.id = observation.animal_id
LEFT JOIN
  treatment ON animal.id = treatment.animal_id
ORDER BY
  animal.id DESC;
`;

  pool
    .query(animalSelectQuery)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({ message: 'No animals found.' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching animals data.' });
    });
};

const updateAnimalDataById = async (req, res) => {
  const { id } = req.params; // get id from request parameters
  const {
    species_id,
    population,
    reason,
    animal_name,
    microchip_no,
    animal_age,
    color,
    breed,
    reason_euthanized,
    sey_stat,
    shelter_no,
    notes,
    animal_location,
    age_class,
    sex,
    observations, // array of observations
    treatments, // array of treatments
  } = req.body; // get the updated data from request body

  console.log('id', req.params);
  loger.info('id', id);
  loger.error('id', id);

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // begin transaction

    const animalUpdateQuery = `
      UPDATE public.animal
      SET 
        species_id = $1,
        population = $2,
        reason = $3,
        animal_name = $4,
        microchip_no = $5,
        animal_age = $6,
        color = $7,
        breed = $8,
        reason_euthanized = $9,
        sey_stat = $10,
        shelter_no = $11,
        notes = $12,
        animal_location = $13,
        age_class = $14,
        sex = $15
      WHERE id = $16
      RETURNING *
    `;

    const animalResult = await client.query(animalUpdateQuery, [
      species_id,
      population,
      reason,
      animal_name,
      microchip_no,
      animal_age,
      color,
      breed,
      reason_euthanized,
      sey_stat,
      shelter_no,
      notes,
      animal_location,
      age_class,
      sex,
      id,
    ]);

    if (animalResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Animal not found.' });
    }

    // Delete existing observations and treatments
    const deleteObservationsQuery =
      'DELETE FROM public.observation WHERE animal_id = $1';
    const deleteTreatmentsQuery =
      'DELETE FROM public.treatment WHERE animal_id = $1';

    await client.query(deleteObservationsQuery, [id]);
    await client.query(deleteTreatmentsQuery, [id]);

    // Insert new observations
    const insertObservationQuery = `
      INSERT INTO public.observation (animal_id, type_id, people_id, date, value)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const observation of observations) {
      await client.query(insertObservationQuery, [
        id,
        observation.type_id,
        observation.people_id,
        observation.date,
        observation.value,
      ]);
    }

    // Insert new treatments
    const insertTreatmentQuery = `
      INSERT INTO public.treatment (animal_id, treatment_type_id, people_id, date, description, dosage)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const treatment of treatments) {
      await client.query(insertTreatmentQuery, [
        id,
        treatment.treatment_type_id,
        treatment.people_id,
        treatment.date,
        treatment.description,
        treatment.dosage,
      ]);
    }

    await client.query('COMMIT'); // commit transaction

    console.log('id', id);
    console.log('result', animalResult.rows[0]);
    res.status(200).json(animalResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK'); // rollback transaction in case of error
    console.error(err);
    res.status(500).json({ message: 'Error updating animal data.' });
  } finally {
    client.release();
  }
};

module.exports = {
  updateAnimal,
  getAnimalDataFromId,
  insertAnimalObservationTreatment,
  updateAnimalObservationTreatment,
  getAllAnimalsData,
  updateAnimalDataById,
};
