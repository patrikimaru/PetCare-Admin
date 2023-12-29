import { Link, useNavigate } from 'react-router-dom';
import { CiShop, CiViewBoard, CiCircleMinus, CiCircleMore, CiCircleCheck , CiLogout } from "react-icons/ci";
import { useAuth } from '../AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const homeRoutes = [
    {
      path: "/home/dashboard",
      icon: <CiViewBoard />,
      name: "Dashboard"
    },
    {
      path: "/home/unconfirmed",
      icon: <CiCircleMinus  />,
      name: "Unconfirmed"
    },
    {
      path: "/home/confirmed",
      icon: <CiCircleMore  />,
      name: "Confirmed"
    },
    {
      path: "/home/done",
      icon: <CiCircleCheck />,
      name: "Done"
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className='sidebar'>
      <div>
        <h1 className='logo'><CiShop />PetCare</h1>
        <ul className='sidebarMenu'>
          {homeRoutes.map((route, index) => (
            <li key={index} className='sidebarLinks'>
              {route.icon}
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button className='logoutButton' onClick={handleLogout}>
        <CiLogout />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
