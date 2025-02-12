import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import NavBar from '../NavBar';

const RescueForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data, typeof data);
  //   const jsonData = JSON.stringify(data);
  //   console.log(jsonData, typeof jsonData);
  //   reset();
  // };

  return (
    <>
      <NavBar />
      <div className="mb-3 m-3">
        <h2>Animal Rescue Form</h2>
      </div>
      <Form
        className="shadow p-3 m-3 mb-5 bg-white rounded"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          console.log(data);
          // reset();
        })}
      >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="date" className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              name="date"
              {...register('date', { required: true })}
            />
            {errors.status && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="time" className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Time"
              name="time"
              {...register('time', { required: true })}
            />
            {errors.password && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="location" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              name="location"
              {...register('location', { required: true })}
            />
            {errors.inclasses && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="spieces" className="mb-3">
            <Form.Label>Spieces</Form.Label>
            <Form.Control
              type="text"
              placeholder="Spieces"
              name="spieces"
              {...register('spieces', { required: true })}
            />
            {errors.people && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="whatHappened" className="mb-3">
            <Form.Label>What happened</Form.Label>
            <Form.Control
              type="text"
              placeholder="What happened"
              name="whathappened"
              {...register('whathappened', { required: true })}
            />
            {errors.speciesobsjoin && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="callerNumber" className="mb-3">
            <Form.Label>Contact number</Form.Label>
            <Form.Control
              type="text"
              placeholder="callerNumber"
              name="callerNumber"
              {...register('callerNumber', { required: true })}
            />
            {errors.specie && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="owner" className="mb-3">
            <Form.Label>Owner (if known)</Form.Label>
            <Form.Control
              type="text"
              placeholder="owner"
              name="owner"
              {...register('owner', { required: true })}
            />
            {errors.rolerightjoin && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="origin" className="mb-3">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              placeholder="origin"
              name="origin"
              {...register('origin', { required: true })}
            />
            {errors.role && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="outcome" className="mb-3">
            <Form.Label>Outcome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Outcome"
              name="outcome"
              {...register('outcome', { required: true })}
            />
            {errors.observationtype && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="additionalInformation"
            className="mb-3"
          >
            <Form.Label>Additional Info</Form.Label>
            <Form.Control
              type="text"
              placeholder="Additional Information"
              name="addInfo"
              {...register('additionalInformation', { required: true })}
            />
            {errors.observation && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RescueForm;
