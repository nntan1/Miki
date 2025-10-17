import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import uniqid from 'uniqid';
import "react-toastify/dist/ReactToastify.css";
import { axiosClient } from "../../../utils/axios";

export default function AddForm({
  currentCategories,
  setCurrentCategories,
  setUpdate,
}) {
  
  const notify = (edit) => {
    toast.success(edit ? "Edit success" : "Add success", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [disable , setDisable] = useState(false);
  const [category,setCategory] = useState(currentCategories.data || {});

  const handleSubmitFormAccount = async ( e ) => {    
    e.preventDefault();
    let name = e.target[0].value ;
    let id = e.target[1].value ;
    if ( id == "" )
    {
      id = -1;      
    }
    let category = {
      name ,id
    }
    console.log(category)
    const res = axiosClient({
      method: 'POST',
      url: 'https://localhost:7226/api/Categories',
      data: category
    });
    res.then(() => {
      setCurrentCategories( {
        ...currentCategories ,
        modalOpen : false,        
      } )
      toast.success("Cập nhật thành công");   
      setUpdate( prev => !prev );
    })
      .catch((e) => {
        setCurrentCategories( {
          ...currentCategories ,
          modalOpen : false,        
        } )
        setError("Đã có lỗi xảy ra")
      });
        
  }

  const handleChangeInput = (e) => {
    setCategory(
      {
        ...category,
        [e.target.name] : e.target.value
      }
    );
  }

  console.log(currentCategories)
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
              setCurrentCategories((prev) => ({ ...prev, modalOpen: false }))
            }
          >
            Quay lại
          </button>
        </div>
        <form onSubmit={ handleSubmitFormAccount } className="bg-white">
          <div className="font-bold text-blue-400 bg-[#ccd1e3] px-4 h-11 leading-10 border-b-[1px] border-gray-400"></div>
          <div className="p-4 overflow-y-scroll h-[300px]">
          <div>
              <p className="my-3 text-xl font-bold">Tên thể loại</p>
              <input
                className="w-full h-10 leading-9 p-2 rounded-md border-[1px] border-solid border-[#ccc]"
                type="text"
                name="name"
                required
                value={category.name}
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
            </div>
            {/* Category */}
            <input name="categoryId" type="hidden" value={category.id}/>
          <div className="mt-10 text-center bg-white">
            <button
              className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5"
              type="submit"
              disabled={disable}
            >
              {currentCategories.isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
