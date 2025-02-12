import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';
import { registerUser } from '../api';

const AdminDashBoard = () => {
  // State for form fields
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    realname: '',
    email: '',
    password: '',
    role: '',
  });
  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  // This function will return the role name based on the role id
  // this is optional, you can use the role id directly
  // Or get role name from the backend

  const getRoleName = (role) => {
    switch (role) {
      case '1':
        return 'Admin';
      case '2':
        return 'Volunteer';
      case '3':
        return 'Employee';
      default:
        return 'Unknown';
    }
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add  form submission logic
    console.log(formData); // log form data to console
    registerUser(formData)
      .then((data) => {
        console.log(data);

        setUserCreated(true);
        setSuccess(
          `User ${formData.username} with role ${getRoleName(
            formData.role
          )} has been created successfully!`
        );
        setTimeout(() => {
          setUserCreated(false);
        }, 5000);

        //clear form fields
        setFormData({
          username: '',
          realname: '',
          email: '',
          password: '',
          role: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
    // Handle form submission here
    // const { username, realname, email, password, role } = formData;
    // try {
    //   const response = await axios.post('http://localhost:4000/api/register', {
    //     username,
    //     realname,
    //     email,
    //     password,
    //     role,
    //   });
    //   //clear form fields
    //   setUserCreated(true);
    //   setSuccess(` User ${formData.username} with role ${formData.role} has been
    //   created successfully!`);
    //   setTimeout(() => {
    //     setUserCreated(false);
    //   }, 5000);
    //   console.log('response', response);
    //   setFormData({
    //     username: '',
    //     realname: '',
    //     email: '',
    //     password: '',
    //     role: '',
    //   }); // default role
    // } catch (error) {
    //   console.error('Error registering user');
    // }

    // console.log(formData);
  };

  return (
    <>
      <NavBar />

      <Container className="bg-white p-4 rounded shadow">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2>User Registration</h2>
            {/* Conditionally render the alert when userCreated is true */}
            {userCreated && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formRealName">
                <Form.Label>Real Name</Form.Label>
                <Form.Control
                  type="text"
                  name="realname"
                  value={formData.realname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formRole" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="1">Admin</option>
                  <option value="2">Volunteer</option>
                  <option value="3">Employee</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashBoard;
