// src/components/UserModal.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const UserModal = ({ user, onClose, onUpdate }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => { reset(user); }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.put(`/users/${user._id}`, data);
      toast.success('User updated');
      onUpdate(res.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl mb-4">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input {...register('name')} placeholder="Name" className="border p-2 rounded"/>
          <input {...register('email')} placeholder="Email" className="border p-2 rounded"/>
          <select {...register('role')} className="border p-2 rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-300">Cancel</button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
