import { Link, useNavigate } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const logout = ()=>{
    localStorage.removeItem('token');
  };

  const handleLogout = () => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-lg">
      <FaTasks />
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/signup" className="bg-white text-blue-500 px-4 py-2 rounded">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
