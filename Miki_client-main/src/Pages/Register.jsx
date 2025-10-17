import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Footer } from "../Layout/default/Footer/index";
import { dataUser } from "../recoils/dataUser";
import RegisterForm from "../sections/auth/RegisterForm";

function Register() {
  const navigate = useNavigate();
  const user = useRecoilValue(dataUser);

  useEffect(() => {
    if (user?.role) {
      navigate("/");
    }
  });
  return (
    <div className="relative overflow-hidden">
      <div className="bg-bgm overflow-hidden w-[1440px] relative ">
        <div
          className="mx-[152px] my-[120px]
        w-[1136px] h-[1000px]
        relative
        bg-[rgba(255, 249, 246, 0.8)]
        rounded-2xl
        shadow-[0_0px_86px_0px_rgba(0,0,0,0.15)]
        z-10
        "
        >
          <div className="absolute  left-0 right-[43.13%] h-full rounded-l-2xl overflow-hidden">
            <img src="/assets/images/register.jpg" alt="register" />
          </div>
          <div>
            <Link to="/">
              <div className="absolute left-[67.52%] right-[7.39%] top-[6.57%] mb-[72px] cursor-pointer">
                <img
                  className="mx-auto"
                  src="/assets/images/logo.png"
                  alt="logo"
                />
                <h2 className="uppercase font-playfair font-bold text-[40px] leading-[48px] text-neutral_1">
                  Miki jewelry
                </h2>
              </div>
            </Link>

            <RegisterForm />
          </div>
        </div>
      </div>
      <Footer />
      {/* bg-circle */}
      <div
        className="rounded-full bg-circle1 w-[287px] h-[287px] 
        absolute
        top-[-203px]
        left-[-123px]
        z-10
        "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[359px] h-[359px] 
        absolute
        top-[-239px]
        left-[-149px]
        z-10
        "
      ></div>

      <div
        className="rounded-full bg-circle1 w-[287px] h-[287px] 
        absolute
        top-[-47px]
        left-[1200px]
        z-[1]
        "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[359px] h-[359px] 
        absolute
        top-[-83px]
        left-[1165px]
        z-[1]
       
        "
      ></div>
    </div>
  );
}

export default Register;
