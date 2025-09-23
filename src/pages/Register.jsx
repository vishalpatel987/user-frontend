import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api'; 
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });
  const navigate = useNavigate();

  // Clean form on component mount
  useEffect(() => {
    reset({ name: '', email: '', password: '' });
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/register', data); // ✅ API call
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
        autoComplete="off" // Prevent browser autofill
      >
        {/* Hidden dummy fields to block browser autofill */}
        <input type="text" name="fakeusername" style={{ display: 'none' }} />
        <input type="password" name="fakepassword" style={{ display: 'none' }} />

        <h2 className="text-2xl font-bold text-center text-green-600">Register</h2>

        <input
          {...register('name', { required: true })}
          placeholder="Name"
          autoComplete="off"
          className="border p-2 rounded"
        />

        <input
          {...register('email', { required: true })}
          placeholder="Email"
          autoComplete="off"
          className="border p-2 rounded"
        />

        <input
          {...register('password', { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          className="border p-2 rounded"
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
