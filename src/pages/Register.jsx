
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../services/api'; // fixed import from api.js
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Ensure axios instance from api.js is used
      await axios.post('/auth/register', data);
      toast.success('Registration successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-600">Register</h2>
        <input
          {...register('name', { required: true })}
          placeholder="Name"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          {...register('email', { required: true })}
          placeholder="Email"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          {...register('password', { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-500 transition"
        >
          Register
        </button>
        <Link to="/login" className="text-sm text-green-500 hover:underline text-center">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
