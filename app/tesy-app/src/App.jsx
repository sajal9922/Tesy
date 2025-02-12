import { useState, useEffect } from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import axios from 'axios';
import NavBar from './components/NavBar';
import AnimalRegister from './components/AnimalRegister';
import AnimalReport from './components/AnimalReport';
import Observation from './components/Observation';
import AdminDashBoard from './components/AdminDashBoard';
import RescueFormView from './components/rescue-mission-page/RescueFormView';
import Unauthorized from './components/Unauthorized';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} user={user} />} />
      <Route path="/*" element={<NavBar />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        element={
          <PrivateRoute allowedRoles={['admin', 'volunteer']} user={user} />
        }
      >
        <Route path="/animalregister" element={<AnimalRegister />} />
      </Route>

      <Route
        element={
          <PrivateRoute allowedRoles={['admin', 'volunteer']} user={user} />
        }
      >
        <Route path="/missionreport" element={<RescueFormView />} />
      </Route>

      <Route
        element={
          <PrivateRoute
            allowedRoles={['admin', 'user', 'volunteer']}
            user={user}
          />
        }
      >
        <Route path="/animalreport" element={<AnimalReport />} />
      </Route>

      <Route
        element={
          <PrivateRoute
            allowedRoles={['admin', 'user', 'volunteer']}
            user={user}
          />
        }
      >
        <Route path="/observation" element={<Observation />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={['admin']} user={user} />}>
        <Route path="/admin" element={<AdminDashBoard />} />
      </Route>
    </Routes>
  );
};

export default App;
