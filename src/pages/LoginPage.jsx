import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthInfo } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', formData);

      if (response.data.role === "admin") {
        alert('Login Successful!');
        setAuthInfo(response.data.token, response.data.userId);
        navigate('home/dashboard');
      } else if (response.data.role === "user") {
        alert("Admin only")
      }
      
    } catch (error) {
      alert('Login Failed!');
    }
  };

  return (
    <div className='login-page'>
      <form className='login-card' onSubmit={handleSubmit}>
        <h2>Login to continue</h2>

        <label>
          Username:
          <input
            name='email'
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name='password'
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" className='login-btn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
