import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Clean form on component mount
  useEffect(() => {
    reset({ email: '', password: '' });
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password);
      if (user) {
        toast.success(`Welcome ${user.name}!`);
        if (user.role === 'admin') {
          navigate('/admin-dashboard'); // Admin route
        } else {
          navigate('/'); // User dashboard
        }
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4"
        autoComplete="off" // Prevent browser autofill
      >
        {/* Hidden dummy fields to block browser autofill */}
        <input type="text" name="fakeusername" style={{ display: 'none' }} />
        <input type="password" name="fakepassword" style={{ display: 'none' }} />

        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

        <input
          {...register('email', { required: true })}
          placeholder="Email"
          autoComplete="off"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition"
        >
          Login
        </button>

        {/* Forgot Password Link */}
        <Link
          to="/forgot-password"
          className="text-sm text-blue-500 hover:underline text-center"
        >
          Forgot Password?
        </Link>

        <Link
          to="/register"
          className="text-sm text-blue-500 hover:underline text-center"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
