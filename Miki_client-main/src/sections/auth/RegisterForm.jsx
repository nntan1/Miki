import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Button from '../../Components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import uniqid from 'uniqid';
import { toast } from 'react-toastify';
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup.string().required('*Bắt buộc'),
  lastName: yup.string().required('*Bắt buộc'),
  email: yup
    .string()
    .required('*Vui lòng nhập email hoặc số điện thoại của bạn')
    .matches(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/, '*It is not an email or phone number'), 
  phoneNumber : yup.string().required('*Bắt buộc'),  
  dateOfBirth: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('*Bắt buộc'),

  password: yup.string().required('*Vui lòng nhập mật khẩu của bạn').min(6),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  agree: yup.boolean().oneOf([true], '*Bạn cần đồng ý với điều khoản của chúng tôi!')
});

function RegisterForm() {
  const navigate = useNavigate();
  const [errorState, setError] = useState('');
  const [otp,setOtp] = useState(null);
  const [message,setMessage] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    const user = {
      id: uniqid(),
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}` ,
      phoneNumber : data.phoneNumber
    }
    if (otp == null)
    {
      const res = await axios({
        method: 'POST',
        url: 'https://localhost:7226/api/Users/sendOtp',
        data: user
      });
      setMessage("Chúng tôi đã gửi mã OTP đăng ký cho bạn , vui lòng kiểm tra email !");
    }    
    else {
      try {
        const res = await axios({
          method: 'POST',
          url: `https://localhost:7226/api/Users/verifyOTP?Otp=${otp}`,
          data: user
        });
          toast("Đăng ký thành công !");
          navigate("/login")
      }
      catch{
         toast.error("OTP không hợp lệ");
      }
    }
  };



  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="absolute left-[686px] w-[410px] top-[216px] mr-10"
    >
      <h4 className="text-xl font-bold leading-7 text-black">Đăng ký tài khoản</h4>
      <div className="flex gap-3 mt-8">
        {/* FirstName */}
        <div
          className="w-[129px]
                 "
        >
          <input
            type="text"
            {...register('firstName')}
            placeholder="Họ"
            className="rounded-lg border-solid
                  border
                  border-primary_1
                  w-full
                  h-[48px]
                  font-main
                  font-medium
                  text-base
                  leading-6
                  tracking-[-0.019rem]
                  text-neutral_3
                  pl-4
                  "
          />
          <p className="text-[#D2311B] text-base font-medium h-5 mb-2">
            {errors.firstName?.message}
          </p>
        </div>

        {/* LastName */}
        <div className="w-[129px]">
          <input
            type="text"
            {...register('lastName')}
            placeholder="Tên"
            className="rounded-lg border-solid
                  border
                  border-primary_1
                  w-[129px]
                  h-[48px]
                  font-main
                  font-medium
                  text-base
                  leading-6
                  tracking-[-0.019rem]
                  text-neutral_3
                  pl-4
                  "
          />
          <p className="text-[#D2311B] text-base font-medium h-5 mb-2 ">
            {errors?.lastName?.message}
          </p>
        </div>

        {/* DateOfBirth */}
        <div className="w-[129px]">
          <input
            type="date"
            {...register('dateOfBirth')}
            placeholder="Năm sinh"
            className="rounded-lg border-solid
                  border
                  border-primary_1
                  w-full
                  h-[48px]
                  font-main
                  font-medium
                  text-base
                  leading-6
                  tracking-[-0.019rem]
                  text-neutral_3
                  pl-4
                  uppercase
                  "
          />
          <p className="mb-2 text-[#D2311B] text-base font-medium h-5">
            {errors.dateOfBirth?.message}
          </p>
        </div>
      </div>

      {/*email*/}
      <div className="py-3 pt-2">
        <input
          type="text"
          {...register('email')}
          placeholder="Nhập email"
          className="rounded-lg border-solid
                    border
                    border-primary_1
                    w-full
                    h-[48px]
                    font-main
                    font-medium
                    text-base
                    leading-6
                    tracking-[-0.019rem]
                    text-neutral_3
                    pl-4
                    "
        />
        <p className="text-[#D2311B] text-base font-medium h-5">
          {errors.email?.message || errorState}
        </p>
      </div>
      <div className="py-3 pt-2">
        <input
          type="text"
          {...register('phoneNumber')}
          placeholder="Nhập số điện thoại"
          className="rounded-lg border-solid
                    border
                    border-primary_1
                    w-full
                    h-[48px]
                    font-main
                    font-medium
                    text-base
                    leading-6
                    tracking-[-0.019rem]
                    text-neutral_3
                    pl-4
                    "
        />
        <p className="text-[#D2311B] text-base font-medium h-5">
          {errors.phoneNumber?.message || errorState}
        </p>
      </div>
      {/* Password */}
      <div className="py-1">
        <input
          type="password"
          {...register('password')}
          placeholder="Nhập mật khẩu từ 6-8 kí tự"
          className="rounded-lg border-solid
                    border
                    border-primary_1
                    w-full
                    h-[48px]
                    font-main
                    font-medium
                    text-base
                    leading-6
                    tracking-[-0.019rem]
                    text-neutral_3
                    pl-4
                    "
        />
        <p className="text-[#D2311B] text-base font-medium h-5 ">{errors?.password?.message}</p>
      </div>
      {/* Password confirm */}
      <div className="py-1">
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="Xác thực lại mật khẩu"
          className="rounded-lg border-solid
                    border
                    border-primary_1
                    w-full
                    h-[48px]
                    font-main
                    font-medium
                    text-base
                    leading-6
                    tracking-[-0.019rem]
                    text-neutral_3
                    pl-4
                    "
        />
        <p className="text-[#D2311B] text-base font-medium h-5 mb-2">
          {errors?.confirmPassword && '*Xác nhận mật khẩu không đúng'}
        </p>
      </div>
      {/* OTP*/}
      <div className="py-1">
        <input
          type="text"
          placeholder="OTP xác thực"
          name="otp"
          value={otp}
          disabled={message == undefined}
          onChange={(e) => setOtp(e.target.value)}
          className="rounded-lg border-solid
                    border
                    border-primary_1
                    w-full
                    h-[48px]
                    font-main
                    font-medium
                    text-base
                    leading-6
                    tracking-[-0.019rem]
                    text-neutral_3
                    pl-4
                    "
        />
        <p className="text-[#D2311B] text-base font-medium h-5 mb-2">
          {message}
        </p>
      </div>

      <div className="flex pb-3 mt-6">
        <input type="checkbox" className="w-6 h-6 cursor-pointer register-checkbox" />
        <p className="font-medium font-main text-base tracking-[-0.019rem] pl-[9px]">
          Nhận thông tin khuyến mãi qua email
        </p>
      </div>

      <div className="flex ">
        <input
          {...register('agree')}
          type="checkbox"
          className="w-6 h-6 cursor-pointer register-checkbox "
        />

        <div className="w-[374px] font-medium font-main text-base tracking-[-0.019rem] ml-[9px]">
          <span className="">
            Tôi đã đọc và đồng ý với các
            <Link to="/">
              <p className="hover:text-amber-800 text-primary_3 inline px-[6px] m-0 cursor-pointer">
                điều khoản và chính sách
              </p>
            </Link>
            của Miki Jewelry
          </span>
        </div>
      </div>
      <p className="text-[#D2311B] text-base font-medium h-5 -translate-y-1 ">
        {errors?.agree?.message}
      </p>

      <Button
        type="submit"
        title="Đăng ký"
        className="mt-3 bg-black py-2 px-[46px] w-full h-10 rounded-btnB 
              font-bold text-base font-main leading-6 text-center tracking-[0.15px] text-white
              hover:bg-[#0000] 
              hover:text-neutral_1
              hover:border-solid hover:border-[1px] hover:border-[#000]
              "
      />

      <div className="mt-[18px] w-[255px] flex items-center ">
        <span className="font-medium flex font-main text-[14px] leading-[22px] tracking-[-0.019rem] text-black">
          Bạn đã có tài khoản?{' '}
        </span>
        <Link to="/login">
          <h4
            className="inline
                      uppercase  font-main text-base leading-6 font-bold  tracking-[-0.019rem]
                      text-primary_3
                      pl-1
                      cursor-pointer
                      hover:text-amber-800
                       "
          >
            Đăng nhập
          </h4>
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
