import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <NavBar />
      <section className="d-flex flex-column align-items-center justify-content-center">
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div className="flexGrow">
          <button className="btn btn-secondary" onClick={goBack}>
            Go Back
          </button>
        </div>
      </section>
    </>
  );
};

export default Unauthorized;
