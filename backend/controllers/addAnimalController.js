const pool = require('../utils/db');

// POST http://localhost:5001/addanimal
// Content-Type: application/json
// Authorization: Bearer <Your-JWT-Token>

// {
//     "animalName": "Lion",
//     "animalType": "Mammal",
//     "animalDescription": "A large, carnivorous feline.",
//     "inDate": "2024-05-13",
//     "inTestDate": "2024-05-13",
//     "outDate": null,
//     "population": 1,
//     "reason": "Stray",
//     "microchipNo": "123456789",
//     "age": "5",
//     "color": "Brown",
//     "breed": "Labrador Retriever",
//     "reasonEuthanized": null,
//     "sex": "male",
//     "shelterNo": "Shelter A",
//     "notes": "Friendly and energetic dog",
//     "animal_location": "Unknown",
//     "createDate": "2024-05-13",
//     "createdBy": 1,
//     "editedDate": "2024-05-13",
//     "editedBy": 1,
//     "ageClass": "adult"
// }

const handleNewAnimal = (req, res) => {
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
  } = req.body;
  console.log(req.body);
  const currentDate = new Date().toISOString().split('T')[0];
  const insertAnimalFunctionQuery = `
    SELECT insert_animal_if_species_not_exists(
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
    )
  `;

  const queryParams = [
    species_name,
    in_date || null,
    in_tesy_date || null,
    out_date || null,
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
  ];

  pool
    .query(insertAnimalFunctionQuery, queryParams)
    .then(() => {
      // get the last animal from animal table
      return pool.query('SELECT * FROM animal ORDER BY id DESC LIMIT 1');
    })
    .then((data) => {
      res.status(201).json(data.rows[0]); // Created
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message }); // Server error
    });
};

//  get all animals from the animal table

const getAllAnimals = (req, res) => {
  pool
    .query('SELECT * FROM animal ORDER BY id DESC')
    .then((data) => {
      data.rows.forEach((row) => {
        [
          'in_date',
          'out_date',
          'in_tesy_date',
          'create_date',
          'edited_date',
        ].forEach((dateColumn) => {
          if (row[dateColumn]) {
            row[dateColumn] = new Date(row[dateColumn])
              .toISOString()
              .split('T')[0];
          }
        });
      });
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports = { handleNewAnimal, getAllAnimals };
