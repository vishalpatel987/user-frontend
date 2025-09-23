
// import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useForm } from 'react-hook-form';
// import api from '../services/api';
// import { toast } from 'react-hot-toast';

// const Profile = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const { register, handleSubmit, setValue } = useForm({ defaultValues: user });
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState(user?.avatar || null);

//   useEffect(() => {
//     if (user) {
//       setValue('name', user.name);
//       setValue('email', user.email);
//       setPreview(user.avatar || null);
//     }
//   }, [user, setValue]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('name', data.name || user.name);
//       formData.append('email', data.email || user.email);
//       if (data.password) formData.append('password', data.password);
//       if (data.avatar && data.avatar[0]) formData.append('avatar', data.avatar[0]);

//       // ❌ Do NOT set Content-Type manually
//       const res = await api.put('/users/me', formData);

//       setUser(res.data);
//       setPreview(res.data.avatar || null); // Cloudinary URL
//       toast.success('Profile updated successfully');
//     } catch (err) {
//       console.error('🔥 Backend Error:', err.response?.data || err.message);
//       toast.error(err.response?.data?.message || 'Update failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setPreview(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   return (
//     <div className="flex justify-center mt-10">
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
//         <h2 className="text-2xl font-bold text-orange-600 text-center">Profile</h2>
//         <input {...register('name')} placeholder="Name" className="border p-2 rounded" />
//         <input {...register('email')} placeholder="Email" className="border p-2 rounded" />
//         <input {...register('password')} type="password" placeholder="New Password" className="border p-2 rounded" />
//         <input {...register('avatar')} type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
//         {preview && <img src={preview} alt="avatar" className="w-24 h-24 rounded-full mx-auto object-cover" />}
//         <button type="submit" disabled={loading} className="p-2 rounded text-white bg-orange-600 hover:bg-orange-500">
//           {loading ? 'Saving...' : 'Save'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;


import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm({ defaultValues: user });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user?.avatar || null);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setPreview(user.avatar || null);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name || user.name);
      formData.append('email', data.email || user.email);
      if (data.password) formData.append('password', data.password);
      if (data.avatar && data.avatar[0]) formData.append('avatar', data.avatar[0]);

      const res = await api.put('/users/me', formData);

      setUser(res.data);
      setPreview(res.data.avatar || null);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('🔥 Backend Error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-orange-600 text-center">Profile</h2>
        <input {...register('name')} placeholder="Name" className="border p-2 rounded" />
        <input {...register('email')} placeholder="Email" className="border p-2 rounded" />
        <input {...register('password')} type="password" placeholder="New Password" className="border p-2 rounded" />
        <input {...register('avatar')} type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
        {preview && <img src={preview} alt="avatar" className="w-24 h-24 rounded-full mx-auto object-cover" />}
        <button type="submit" disabled={loading} className="p-2 rounded text-white bg-orange-600 hover:bg-orange-500">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
