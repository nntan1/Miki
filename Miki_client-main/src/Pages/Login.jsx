import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Footer } from '../Layout/default/Footer/index';
import { dataUser } from '../recoils/dataUser';
import LoginFormSection from "../sections/auth/LoginForm";

export default function Login() {

  const navigate = useNavigate();
  const user = useRecoilValue(dataUser)

  useEffect(() => {
    if (user?.role) {
       navigate('/') ;
    }
  })

  return (
    <div className="overflow-hidden">
      <LoginFormSection />
      <Footer />
    </div>
  );
}