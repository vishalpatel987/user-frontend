
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const VerifyEmail = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify/${token}`);
        toast.success('Email verified successfully');
      } catch (err) {
        toast.error('Verification failed');
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  if (loading) return <p>Verifying...</p>;
  return <p>Email verification complete. You can now login.</p>;
};

export default VerifyEmail;
