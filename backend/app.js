const express = require('express');
const cors = require('cors');
const app = express();
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// const testRoutes = require('./routes/testRoutes');
const {
  getAnimalDataFromId,
  insertAnimalObservationTreatment,
  updateAnimalObservationTreatment,
  getAllAnimalsData,
  updateAnimalDataById,
} = require('./controllers/modifyAnimalController');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// test
// app.use('/test', testRoutes);

app.use('/all', require('./controllers/getAll'));
app.use('/login', require('./routes/auth'));
app.use('/activate', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/getAllEmployees', require('./routes/api/employees'));
app.use('/addanimal', require('./routes/addAnimal'));
app.use('/animals', require('./routes/addAnimal'));
// midify animalControler
app.use('/get/animals', getAllAnimalsData);
app.use('/get/animal/:id', getAnimalDataFromId);
app.use('/insert/animal', insertAnimalObservationTreatment);
app.use('/update/animal/:id', updateAnimalObservationTreatment);
// app.use('/update/animal/:id', updateAnimalDataById);
app.use(verifyJWT);

//app.use('/api/refresh', require('./routes/refresh'))

//
// app.use('/employees', require('./routes/api/employees'));

module.exports = app;
