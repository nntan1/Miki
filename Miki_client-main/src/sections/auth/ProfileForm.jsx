import React, { useState } from "react";
import Button from "../../Components/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataUser } from "../../recoils/dataUser";
import { toast } from "react-toastify";
import { axiosClient } from "../../utils/axios";

const ProfileForm = ({ setIsOpen }) => {
  const [user,setUser] = useState( useRecoilValue(dataUser) || {});
  const [userG , setUserG] = useRecoilState(dataUser);
  console.log(userG)

  const handleSubmitFormAccount = async ( e ) => {    
    e.preventDefault();
    let name = e.target[0].value ;
    let email = e.target[1].value ;
    let phoneNumber = e.target[2].value ;
    let id = e.target[3].value ;
    let user = {
      name , email , phoneNumber , id ,password : userG.password
    }
    console.log(user)
    const res = axiosClient({
      method: 'POST',
      url: 'https://localhost:7226/api/Users/register',
      data: user
    });
    res.then(() => {
      setIsOpen(false);
      toast.success("Cập nhật thành công");   
      setUserG({
        ...userG ,
        firstName :user.name ,
        email:user.email ,
        phoneNumber : user.phoneNumber
      });
    })
      .catch((e) =>{
        setIsOpen(false);
        toast.error("Đã có lỗi xảy ra");
      } );
  }

  const handleChangeInput = (e) => {
    var properties = e.target.name == "name" ? "firstName" : e.target.name;
    setUser(
      {
        ...user,
        [properties] : e.target.value
      }
    );
  }
  return (
    <div
      className="fixed z-[1000] flex top-0 bottom-0 left-0 right-0 bg-[#00000099]"
      onClick={() =>
        setIsOpen(false)
      }
    >
      {/* start add */}
      <div
        className="p-5 w-[60%] mx-auto h-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center bg-white">
          <button
            className="p-2 font-bold text-blue-400 border-blue-400 border-solid rounded-lg hover:opacity-80"
            onClick={() =>
              setIsOpen(false)
            }
          >
            Quay lại
          </button>
        </div>
        <form onSubmit={ handleSubmitFormAccount } className="bg-white">
          <div className="font-bold text-blue-400 bg-[#ccd1e3] px-4 h-11 leading-10 border-b-[1px] border-gray-400"></div>
          <div className="p-4 overflow-y-scroll h-[400px]">
          <div>
              <p className="my-3 text-xl font-bold">Họ và tên</p>
              <input
                className="w-full h-10 leading-9 p-2 rounded-md border-[1px] border-solid border-[#ccc]"
                type="text"
                name="name"
                required
                value={user.firstName}
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
            </div>
            {/* Category */}
            <div>
              <p className="my-3 text-xl font-bold">Email</p>
              <input
                className="w-full h-10 leading-9 p-2 rounded-md border-[1px] border-solid border-[#ccc]"
                type="text"
                name="email"
                required
                value={user.email}
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
            </div>
            <div>
              <p className="my-3 text-xl font-bold">Số điện thoại</p>
              <input
                className="w-full h-10 leading-9 p-2 rounded-md border-[1px] border-solid border-[#ccc]"
                type="text"
                name="phoneNumber"
                required
                value={user.phoneNumber}
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
            </div>
            <input name="userId" type="hidden" value={user.userInforId}/>
          <div className="mt-10 text-center bg-white">
            <button
              className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5"
              type="submit"
              disabled={false}
            >
              {"Cập nhật"}
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
