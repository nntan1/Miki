import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  EyeIcon,
  EyeIconClose,
  FbLogin,
  GoogleIcon,
  LogoIconLogin,
} from "../../Components/icons";
import * as yup from "yup";
import axios from "axios";

import { useSetRecoilState } from "recoil";
import { dataUser } from "../../recoils/dataUser";
import { toast } from "react-toastify";
import Button from "../../Components/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email hoặc số điện thoại của bạn đang trống!"),
  password: yup.string().trim().required("Mật khẩu của bạn đang trống!"),
});

export default function LoginFormSection() {
  const setUser = useSetRecoilState(dataUser);
  const navigate = useNavigate();
  const [errorState, setError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => {
    setIsShow((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const res = axios({
      method: "POST",
      url: "https://localhost:7226/api/Users/login",
      data: data,
    });
    res
      .then((rep) => {
        navigate("/")
        const dataUser = rep.data.data;
        console.log(dataUser);
        const user = {
          role: dataUser.role,
          email: dataUser.email,
          firstName: dataUser.name,
          userInforId: dataUser.id,
          accessExpire: dataUser.expire_At,
          refreshToken: dataUser.refresh_Token,
          cartId : dataUser.cartId,
          phoneNumber : dataUser.phoneNumber
        };
        setUser(user);
        const accessToken = dataUser.access_token;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expire_at", user.accessExpire.toString());
        localStorage.setItem("userId", user.userInforId);
        toast.success(`Chào mừng ${user.firstName}`);
      }
    )
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <>
      <svg
        className="absolute left-[911px] top-[1455px]"
        xmlns="http://www.w3.org/2000/svg"
        width="529"
        height="151"
        viewBox="0 0 529 151"
        fill="none"
      >
        <circle
          cx="275.5"
          cy="275.5"
          r="275.5"
          fill="#B78D71"
          fillOpacity="0.15"
        />
        <circle
          cx="275.5"
          cy="275.5"
          r="220.453"
          fill="#B78D71"
          fillOpacity="0.1"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[100px]"
        width="122"
        height="279"
        viewBox="0 0 202 359"
        fill="none"
      >
        <circle
          cx="22.5"
          cy="179.5"
          r="179.5"
          fill="#B78D71"
          fillOpacity="0.15"
        />
        <circle
          cx="22.5002"
          cy="179.5"
          r="143.634"
          fill="#B78D71"
          fillOpacity="0.1"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[400px] top-[-40px]"
        width="279"
        height="122"
        viewBox="0 0 359 207"
        fill="none"
      >
        <circle
          cx="179.5"
          cy="27.5"
          r="179.5"
          fill="#B78D71"
          fillOpacity="0.15"
        />
        <circle
          cx="179.5"
          cy="27.5"
          r="143.634"
          fill="#B78D71"
          fillOpacity="0.1"
        />
      </svg>
      <div className="wrapLogin">
        <div>
          <img
            className="w-[646px] h-[852px]"
            src="/assets/images/loginForm.jpg"
            alt="login"
          />
        </div>
        <div>
          <div className="w-[490px]">
            <Link to={"/"}>
              <div className="mt-[56px] h-[160px] cursor-pointer">
                <LogoIconLogin />
                <h1 className="logo ml-[102px]">MIKI JEWELRY</h1>
              </div>
            </Link>
            <div className="mx-[40px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <div className="inputLogin mb-[2px]">
                    <input
                      className="inputEmailLogin"
                      type="text"
                      placeholder="Nhập email hoặc số điện thoại"
                      {...register("email")}
                    />
                  </div>
                  <p className="mb-[13px] text-[15px] text-[#D2311B] h-[16px]">
                    {errors.email?.message || errorState}
                  </p>
                  <div className="inputLogin mb-[2px]">
                    <input
                      className="inputEmailLogin"
                      type={isShow ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      {...register("password")}
                    />
                    {isShow ? (
                      <EyeIcon
                        handleCick={handleShowPassword}
                        className={"w-8 h-8 mr-3 cursor-pointer"}
                      />
                    ) : (
                      <EyeIconClose
                        handleCick={handleShowPassword}
                        className={"w-8 h-8 mr-3 cursor-pointer"}
                      />
                    )}
                  </div>
                  <p className="mb-[20px] text-[15px] text-[#D2311B] h-[16px]">
                    {errors.password?.message}
                  </p>
                </div>
                <p className="misPass">Quên mật khẩu</p>
                <Button title={"Đăng nhập"} className="w-full h-[45px] rounded-btnB bg-btn text-white font-bold text-[16px] leading-6 hover:bg-[#0000] hover:text-neutral_1 hover:border-solid hover:border-[1px] hover:border-[#000] mb-5">
                Đăng nhập
              </Button>
                {/* <p className="otherLogin">Hoặc đăng nhập bằng</p>
                <div className="wrapSocialLogin">
                  <div className="fbLogin">
                    <FbLogin />
                    Facebook
                  </div>
                  <div className="googleLogin">
                    <GoogleIcon />
                    Google
                  </div>
                </div> */}
                <div className="wrapGotoRegister">
                  <p className="font-medium">Bạn chưa có tài khoản?</p>
                  <Link to="/register">
                    <p className="gotoRegister">Đăng kí</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
