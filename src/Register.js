import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit() {
    axios.post("http://localhost:5000/register", {
      username: username,
      password: password
    }).then(result => {
      console.log(result);
      alert("Successfully Registered!");
    }).catch(err => console.log(err));
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#6c5ce7', color: '#ecf0f1', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="form-container" style={{ backgroundColor: '#ffffff', border: '5px solid #dfe6e9', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', padding: '20px' }}>
              <h2 className="mb-4 text-center" style={{ color: '#000' }}>Register</h2>
              <table className="table">
                <tbody>
                  <tr>
                    <td style={{ color: '#000' }}>Username:</td>
                    <td>
                      <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: '#000' }}>Password:</td>
                    <td>
                      <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-warning w-100" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 mx-auto text-center">
            <Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none' }}>
              <p style={{ fontSize: '18px' }}>Already have an account? Login here.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;




