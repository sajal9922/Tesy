import NavBar from './NavBar';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

const AnimalRegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data, typeof data);
  // const jsonData = JSON.stringify(data);
  //   console.log(jsonData, typeof jsonData);
  //   reset();
  // };

  return (
    <>
      <NavBar />
      <div className="mb-3 m-3">
        <h2>Animal Registration Form</h2>
      </div>
      <Form
        className="shadow p-3 m-3 mb-5 bg-white rounded"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          // reset();
        })}
      >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="status" className="mb-3">
            <Form.Label>Animal status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Animal status"
              name="status"
              {...register('status', { required: true })}
            />
            {errors.status && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="treatment" className="mb-3">
            <Form.Label>Treatment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Treatment"
              name="treatment"
              {...register('treatment', { required: true })}
            />
            {errors.password && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="inclasses" className="mb-3">
            <Form.Label>Inclasses</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inclasses"
              name="inclasses"
              {...register('inclasses', { required: true })}
            />
            {errors.inclasses && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="people" className="mb-3">
            <Form.Label>People</Form.Label>
            <Form.Control
              type="text"
              placeholder="People"
              name="people"
              {...register('people', { required: true })}
            />
            {errors.people && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="speciesobsjoin" className="mb-3">
            <Form.Label>Species Observation Join</Form.Label>
            <Form.Control
              type="text"
              placeholder="Species Obs Join"
              name="speciesobsjoin"
              {...register('speciesobsjoin', { required: true })}
            />
            {errors.speciesobsjoin && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="specie" className="mb-3">
            <Form.Label>Specie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Specie"
              name="specie"
              {...register('specie', { required: true })}
            />
            {errors.specie && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="rolerightjoin" className="mb-3">
            <Form.Label>Role Right Join</Form.Label>
            <Form.Control
              type="text"
              placeholder="Role Right Join"
              name="rolerightjoin"
              {...register('rolerightjoin', { required: true })}
            />
            {errors.rolerightjoin && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="role" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Role"
              name="role"
              {...register('role', { required: true })}
            />
            {errors.role && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="observationtype" className="mb-3">
            <Form.Label>Observation Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Observation Type"
              name="observationtype"
              {...register('observationtype', { required: true })}
            />
            {errors.observationtype && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="observation" className="mb-3">
            <Form.Label>Observation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Observation"
              name="observation"
              {...register('observation', { required: true })}
            />
            {errors.observation && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="rescuemission" className="mb-3">
            <Form.Label>Rescue Mission</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rescue Mission"
              name="rescuemission"
              {...register('rescuemission', { required: true })}
            />
            {errors.rescuemission && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="adoption" className="mb-3">
            <Form.Label>Adoption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Adoption"
              name="adoption"
              {...register('adoption', { required: true })}
            />
            {errors.adoption && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="rights" className="mb-3">
            <Form.Label>Rights</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rights"
              name="rights"
              {...register('rights', { required: true })}
            />
            {errors.rights && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="userstatus" className="mb-3">
            <Form.Label>User Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Status"
              name="userstatus"
              {...register('userstatus', { required: true })}
            />
            {errors.userstatus && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="animal" className="mb-3">
            <Form.Label>Animal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Animal"
              name="animal"
              {...register('animal', { required: true })}
            />
            {errors.animal && (
              <span className="text-danger">This field is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="animalorigin" className="mb-3">
            <Form.Label>Animal Origin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Animal Origin"
              name="animalorigin"
              {...register('animalorigin', { required: true })}
            />
            {errors.animalorigin && (
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

export default AnimalRegisterForm;
