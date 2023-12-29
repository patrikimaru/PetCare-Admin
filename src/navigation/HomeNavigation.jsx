import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Sidebar from '../components/Sidebar';

const HomeNavigation = () => {
  const { token, } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {

    if (!token) {
      navigate('/');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
    }
  }, [navigate]);

  return (
    <div className='home'>
      <Sidebar />
      <main className='pages'>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeNavigation;
