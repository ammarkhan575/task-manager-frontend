import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  }, [localStorage.getItem('token')]);

  return isAuthenticated;
};

export default useAuth;
