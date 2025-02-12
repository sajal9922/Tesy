import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from '../images/Logo-lapinakyva.gif';
import { loginUser } from '../api';

const Login = ({ setUser, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/animalregister');
    } else {
      navigate('/');
    }
  }, [user]);

  // Log in handler to connect to the backend

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/login', {
        username,
        password,
      });
      const user = response.data;
      console.log('user', user);
      console.log('Username', user.username);
      console.log('Roles', user.roles);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      setUser(user);
      setUsername('');
      setPassword('');
      //navigate to AdminDashBoard after login
      if (user.roles.includes('admin') || user.roles.includes('volunteer'))
        navigate('/animalregister');
      else navigate('/animalreport');
    } catch (exception) {
      console.error('Wrong credentials');
    }
  };

  return (
    <div className="bg-cover min-vh-100 d-flex justify-content-center align-items-center">
      <Container
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <div>
          <img
            src={logo}
            width="80"
            height="80"
            className=" d-flex align-items-center justify-content-center mx-auto my-3"
            alt="Tesy logo"
          />
          <h1 className="text-center">Login</h1>
        </div>
        <form onSubmit={handleLogin} className="mb-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Login
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
