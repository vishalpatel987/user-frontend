


// import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useForm } from 'react-hook-form';
// import api from '../services/api';
// import { toast } from 'react-hot-toast';

// const Profile = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const { register, handleSubmit, setValue } = useForm({ defaultValues: user });
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState(user.avatar || null);

//   // Ensure form default values update when user changes
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
//       formData.append('name', data.name);
//       formData.append('email', data.email);
//       if (data.password) formData.append('password', data.password);
//       if (data.avatar && data.avatar[0]) formData.append('avatar', data.avatar[0]);

//       const res = await api.put('/users/me', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setUser(res.data);
//       setPreview(res.data.avatar || null);
//       toast.success('Profile updated');
//     } catch (err) {
//       console.error(err);
//       toast.error('Update failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Preview selected avatar before submit
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setPreview(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   return (
//     <div className="flex justify-center mt-10">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4"
//       >
//         <h2 className="text-2xl font-bold text-orange-600 text-center">Profile</h2>

//         <input
//           {...register('name')}
//           placeholder="Name"
//           className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//         <input
//           {...register('email')}
//           placeholder="Email"
//           className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//         <input
//           {...register('password')}
//           type="password"
//           placeholder="New Password"
//           className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//         <input
//           {...register('avatar')}
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />

//         {preview && (
//           <img src={preview} alt="avatar" className="w-24 h-24 rounded-full mx-auto object-cover" />
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className={`p-2 rounded text-white ${
//             loading ? 'bg-orange-300' : 'bg-orange-600 hover:bg-orange-500'
//           } transition`}
//         >
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

  // Update form default values when user changes
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
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (data.password) formData.append('password', data.password);
      if (data.avatar && data.avatar[0]) formData.append('avatar', data.avatar[0]);

      const res = await api.put('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser(res.data);

      // Handle full URL for image
      setPreview(
        res.data.avatar?.startsWith('/uploads')
          ? `http://localhost:5000${res.data.avatar}`
          : res.data.avatar || null
      );

      toast.success('Profile updated');
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  // Show preview immediately when user selects a file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center">Profile</h2>

        <input
          {...register('name')}
          placeholder="Name"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          {...register('email')}
          placeholder="Email"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          {...register('password')}
          type="password"
          placeholder="New Password"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          {...register('avatar')}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {preview && (
          <img
            src={preview}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`p-2 rounded text-white ${
            loading ? 'bg-orange-300' : 'bg-orange-600 hover:bg-orange-500'
          } transition`}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
