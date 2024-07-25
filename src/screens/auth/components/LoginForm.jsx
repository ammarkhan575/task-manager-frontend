import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../../../shared/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../api/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      if (response) {
        localStorage.setItem('token', response?.token);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                {...register('email')}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">Don{"'"}t have an account? <Link to="/signup" className="text-blue-500">Signup</Link></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
