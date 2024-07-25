
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../../../shared/components/Navbar';
import { authService } from '../../../api/authService';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required().min(3, 'First Name must be atleast 3 character').max(25, 'First name should be less than 25 character'),
  lastName: yup.string().required().min(3, 'Last Name must be atleast 3 character').max(25, 'Last name should be less than 25 character'),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const response = authService.signup(data);
    if(response)
      localStorage.setItem('token', response.token)
    return response;
  };

  return (
    <div>
        <Navbar/>
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6">Signup</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm mb-1">First Name</label>
                    <input {...register('firstName')} className="w-full px-3 py-2 border rounded-md" />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Last Name</label>
                    <input {...register('lastName')} className="w-full px-3 py-2 border rounded-md" />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Email</label>
                    <input {...register('email')} className="w-full px-3 py-2 border rounded-md" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Password</label>
                    <input type="password" {...register('password')} className="w-full px-3 py-2 border rounded-md" />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Confirm Password</label>
                    <input type="password" {...register('confirmPassword')} className="w-full px-3 py-2 border rounded-md" />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Signup</button>
                </form>
                <div className="mt-4 text-center">
                <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default SignupForm;
