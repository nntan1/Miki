import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import uniqid from 'uniqid';
import "react-toastify/dist/ReactToastify.css";
import { axiosClient } from "../../../utils/axios";

export default function AddForm({
  currentAccounts,
  setCurrentAccounts,
  setUpdate,
}) {
  
  const notify = (edit) => {
    toast.success(edit ? "Edit success" : "Add success", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [disable , setDisable] = useState(false);
  const [user,setUser] = useState(currentAccounts.data || {});

  const handleSubmitFormAccount = async ( e ) => {    
    e.preventDefault();
    let name = e.target[0].value ;
    let email = e.target[1].value ;
    let password = e.target[2].value ;
    let phoneNumber = e.target[3].value ;
    let id = e.target[4].value ;
    if ( id == "" )
    {
      id = uniqid();      
    }
    let user = {
      name , email , password , phoneNumber , id
    }
    console.log(user)
    const res = axiosClient({
      method: 'POST',
      url: 'https://localhost:7226/api/Users/register',
      data: user
    });
    res.then(() => {
      setCurrentAccounts( {
        ...currentAccounts ,
        modalOpen : false,        
      } )
      toast.success("Cập nhật thành công");   
      setUpdate( prev => !prev );
    })
      .catch((e) =>{
        setCurrentAccounts( {
          ...currentAccounts ,
          modalOpen : false,        
        } )
        setError("Đã có lỗi xảy ra");
      } );
  }

  const handleChangeInput = (e) => {
    setUser(
      {
        ...user,
        [e.target.name] : e.target.value
      }
    );
  }

  console.log(currentAccounts)
  return (
    <div
      className="fixed flex top-0 bottom-0 left-0 right-0 bg-[#00000099]"
      onClick={() =>
        setCurrentProduct((prev) => ({ ...prev, modalOpen: false }))
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
              setCurrentAccounts((prev) => ({ ...prev, modalOpen: false }))
            }
          >
            Quay lại
          </button>
        </div>
        <form onSubmit={ handleSubmitFormAccount } className="bg-white">
          <div className="font-bold text-blue-400 bg-[#ccd1e3] px-4 h-11 leading-10 border-b-[1px] border-gray-400"></div>
          <div className="p-4 overflow-y-scroll h-[500px]">
          <div>
              <p className="my-3 text-xl font-bold">Họ và tên</p>
              <input
                className="w-full h-10 leading-9 p-2 rounded-md border-[1px] border-solid border-[#ccc]"
                type="text"
                name="name"
                required
                value={user.name}
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
              <p className="my-3 text-xl font-bold">Mật khẩu</p>
              <input
                className="w-full h-10 leading-9 p-2 rounded-md border-[1px] border-solid border-[#ccc]"
                type="text"
                name="password"
                required
                value={user.password}
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
            <input name="userId" type="hidden" value={user.id}/>
          <div className="mt-10 text-center bg-white">
            <button
              className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5"
              type="submit"
              disabled={disable}
            >
              {currentAccounts.isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
