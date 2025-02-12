import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  Table,
  Pagination,
  Dropdown,
} from 'react-bootstrap';

import NavBar from './NavBar';

const AnimalReport = () => {
  // Sample data for animal table
  const [animals, setAnimals] = useState([
    {
      id: 1,
      name: 'Fluffy',
      animalType: 'Cat',
      ageType: 'Years',
      age: 3,
      color: 'White',
      breed: 'Persian',
      dateFound: '2024-04-25',
      arrival: '2024-04-25',
    },
    {
      id: 2,
      name: 'Buddy',
      animalType: 'Dog',
      ageType: 'Years',
      age: 2,
      color: 'Brown',
      breed: 'Labrador',
      dateFound: '2024-04-25',
      arrival: '2024-04-25',
    },

    {
      id: 3,
      name: 'Whiskers',
      animalType: 'Cat',
      ageType: 'Years',
      age: 5,
      color: 'Black',
      breed: 'Siamese',
      dateFound: '2024-04-24',
      arrival: '2024-04-24',
    },
    {
      id: 4,
      name: 'Max',
      animalType: 'Dog',
      ageType: 'Years',
      age: 4,
      color: 'White',
      breed: 'Poodle',
      dateFound: '2024-04-24',
      arrival: '2024-04-24',
    },
    {
      id: 5,
      name: 'Mittens',
      animalType: 'Cat',
      ageType: 'Years',
      age: 2,
      color: 'Gray',
      breed: 'Maine Coon',
      dateFound: '2024-04-23',
      arrival: '2024-04-23',
    },
    {
      id: 6,
      name: 'Rocky',
      animalType: 'Dog',
      ageType: 'Years',
      age: 3,
      color: 'Black',
      breed: 'German Shepherd',
      dateFound: '2024-04-23',
      arrival: '2024-04-23',
    },
    {
      id: 7,
      name: 'Oreo',
      animalType: 'Dog',
      ageType: 'Years',
      age: 1,
      color: 'Black and White',
      breed: 'Dalmatian',
      dateFound: '2024-04-22',
      arrival: '2024-04-22',
    },
    {
      id: 8,
      name: 'Smokey',
      animalType: 'Cat',
      ageType: 'Years',
      age: 4,
      color: 'Gray',
      breed: 'British Shorthair',
      dateFound: '2024-04-22',
      arrival: '2024-04-22',
    },
    {
      id: 9,
      name: 'Shadow',
      animalType: 'Dog',
      ageType: 'Years',
      age: 2,
      color: 'Brown',
      breed: 'Golden Retriever',
      dateFound: '2024-04-21',
      arrival: '2024-04-21',
    },
    {
      id: 10,
      name: 'Simba',
      animalType: 'Cat',
      ageType: 'Years',
      age: 3,
      color: 'Orange',
      breed: 'Tabby',
      dateFound: '2024-04-21',
      arrival: '2024-04-21',
    },
    {
      id: 11,
      name: 'Lucky',
      animalType: 'Dog',
      ageType: 'Years',
      age: 5,
      color: 'White and Brown',
      breed: 'Beagle',
      dateFound: '2024-04-20',
      arrival: '2024-04-20',
    },
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to track active page
  const [activePage, setActivePage] = useState('Report');

  // State to track current page
  const [currentPage, setCurrentPage] = useState(1);

  // State to track number of animals per page
  const [animalsPerPage, setAnimalsPerPage] = useState(10);

  // Calculate indexes of the first and last animal on the current page
  const indexOfLastAnimal = currentPage * animalsPerPage;
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
  const currentAnimals = animals
    .filter((animal) => {
      // Filter animals based on search query
      const { name, animalType, ageType, color, breed, dateFound, arrival } =
        animal;
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animalType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ageType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dateFound.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arrival.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .slice(indexOfFirstAnimal, indexOfLastAnimal);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change number of animals per page
  const handlePerPageChange = (perPage) => {
    setAnimalsPerPage(perPage);
    setCurrentPage(1); // Reset to first page
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <Form>
          <Form.Group controlId="searchBar" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search for animals"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Animal Type</th>
              <th>Age Type</th>
              <th>Age</th>
              <th>Color</th>
              <th>Breed</th>
              <th>Date Found</th>
              <th>Arrival</th>
            </tr>
          </thead>
          <tbody>
            {currentAnimals.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.animalType}</td>
                <td>{animal.ageType}</td>
                <td>{animal.age}</td>
                <td>{animal.color}</td>
                <td>{animal.breed}</td>
                <td>{animal.dateFound}</td>
                <td>{animal.arrival}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Pagination */}
        <Pagination>
          {[...Array(Math.ceil(animals.length / animalsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                onClick={() => paginate(number + 1)}
                active={number + 1 === currentPage}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
        {/* Rows per page dropdown and navigation buttons */}
        <div className="d-flex justify-content-end align-items-center">
          <div className="p-2">Rows per page:</div>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {animalsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handlePerPageChange(10)}>
                10
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePerPageChange(20)}>
                20
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePerPageChange(30)}>
                30
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePerPageChange(40)}>
                40
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePerPageChange(50)}>
                50
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="p-2">
            {indexOfFirstAnimal + 1}-
            {Math.min(indexOfLastAnimal, animals.length)} of {animals.length}
          </div>
          <Pagination>
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastAnimal >= animals.length}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AnimalReport;
