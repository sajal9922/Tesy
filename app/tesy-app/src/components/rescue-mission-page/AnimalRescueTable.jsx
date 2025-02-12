import React from 'react';
import Table from 'react-bootstrap/Table';

const AnimalRescueTable = ({ animals }) => {
  return (
    <Table
      striped
      bordered
      hover
      className="shadow p-3 mb-5 bg-white rounded m-3"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Spieces</th>
          <th>What happened</th>
          <th>Caller's phone number</th>
          <th>Owner (if known)</th>
          <th>Origin</th>
          <th>Outcome</th>
          <th>Additional information</th>
        </tr>
      </thead>
      <tbody>
        {animals.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.date}</td>
            <td>{row.time}</td>
            <td>{row.location}</td>
            <td>{row.spieces}</td>
            <td>{row.whatHappened}</td>
            <td>{row.callerNumber}</td>
            <td>{row.owner}</td>
            <td>{row.origin}</td>
            <td>{row.outcome}</td>
            <td>{row.additionalInformation}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AnimalRescueTable;
