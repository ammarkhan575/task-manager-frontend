import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import LoginForm from './screens/auth/components/LoginForm';
import Tasks from './screens/task';
// import ProtectedRoute from './shared/components/ProtectedRoute';
import SignupForm from './screens/auth/components/SignupForm';
// import TaskManager from './screens/task/components/TaskManager';
import useAuth from './hooks/useAuth';

const App = () => {
  const isAuthenticated = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Tasks />,
    },
    {
      path: '/login',
      element: !isAuthenticated ? <LoginForm /> : <Navigate to="/" />,
    },
    {
      path: '/signup',
      element: !isAuthenticated ? <SignupForm /> : <Navigate to="/" />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
