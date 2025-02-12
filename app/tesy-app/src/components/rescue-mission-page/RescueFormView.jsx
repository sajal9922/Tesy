// import 'bootstrap/dist/css/bootstrap.min.css';
import RescueForm from './RescueForm';
import AnimalRescueTable from './AnimalRescueTable';
import { useState } from 'react';

function RescueFormView() {
  const [animals, setAnimals] = useState([]);

  return (
    <>
      <RescueForm
        onSubmit={(newAnimal) => {
          setAnimals([...animals, { ...newAnimal, id: animals.length + 1 }]);
        }}
      />
      <AnimalRescueTable animals={animals} />
    </>
  );
}

export default RescueFormView;
