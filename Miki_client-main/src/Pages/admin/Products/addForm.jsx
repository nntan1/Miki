import React, { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosClient } from "../../../utils/axios";
import { convertProductToRequest } from "../../../utils/convertProductToRequest";

//validate form sao cho user phải nhập và thỏa mãn 1 số điều kiện như là ( đúng kiểu dữ liệu , tối thiểu 1 trường , ... )
const stockSchema = yup.object().shape({
  quantity: yup.string().required("*Required"),
  price: yup
    .number()
    .required("*price is required")
    .typeError("price is required"),
});

const schema = yup.object().shape({
  name: yup.string().required("*Name is require"),
  picture: yup.array().compact().min(1, "*Picture is required").nullable(),
  sale: yup
    .number()
    .required("*Sale is required")
    .typeError("*Sale is required"),
  desc: yup.string().required("*Description is required"),
  stock: yup.array().min(1, "Size is required").of(stockSchema),
  category: yup.string().required("Category is required"),
});

export default function AddForm({
  currentProduct,
  setCurrentProduct,
  setUpdate,
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: currentProduct.data.name,
      category: currentProduct.data.categoryId,
      stock: currentProduct.data.stocks,
      sale: currentProduct.data.sale,
      desc: currentProduct.data.desc,
    },
  });

  const {
    fields: size_field,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "stock",
  });

  //handle picture
  // state ảnh chính và ảnh phụ với dữ liệu mặc định được gán nếu là edit form và trống nếu là thêm mới
  const [mainPicture, setMainPicture] = useState(
    currentProduct.data.pictures?.[0] || ""
  );

  const [pictures, setPictures] = useState(
    currentProduct.data.pictures?.filter((picture, index) => {
      return index !== 0;
    }) || []
  );

  // ảnh convert từ file nằm trong bộ nhớ thông qua phương thức URL.createObjectUrl để preview
  const [picturesMemory, setPicturesMemory] = useState([]);

  // mảng các id ảnh để xóa
  const [idPictureToDelete, setIdPictureToDelete] = useState([]);

  //xử lý xóa ảnh preview khỏi memory
  const handleDeletePreviewImageFromMemory = () => {
    picturesMemory.forEach((picture) => {
      URL.revokeObjectURL(picture);
    });
  };

  //Nhận vào 1 promise và show kết quả của promise đó
  const handleStatusUpload = async (axios, type) => {
    await toast.promise(axios, {
      pending: `Uploading ${type} image....`,
      success: `Upload ${type} image successfully`,
      error: "Something error...",
    });
  };

  //chuyển đổi file blob ( binary large object ) file dạng dữ liệu nhị phân qua base64
  //mục đích chuyển đổi sang base64 để gửi dữ liệu đi và upload lên cloud
  function getBase64(blob, index) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result, index: index });
      reader.readAsDataURL(blob);
    });
  }
  //chuyển đổi 1 mảng blob qua base64 , hàm getBase64 trả về 1 promise nên xử lý 1 mảng promies qua Promise.all()
  async function convertBlobToBase64(arrayUrlBlob, productId) {
    return (
      await Promise.all(
        arrayUrlBlob.map((picture) => {
          return getBase64(picture.blob, picture.index);
        })
      )
    ).map((picture) => {
      return {
        url: picture.url,
        productId: currentProduct.data.id || productId,
        index: picture.index,
      };
    });
  }

  //tạo ra 1 URL từ 1 object blod để preview , validate size của ảnh nếu lớn hơn 4MB thì báo lỗi và đóng modal
  function convertBlobUrl(file, location) {
    if (file.size > 4 * 1024 * 1024) {
      toast.error("The file you selected is too large. Minimum size is 4MB", {
        autoClose: 5000,
      });
      setCurrentProduct((prev) => {
        return { ...prev, modalOpen: false };
      });
      return;
    }
    const picture = URL.createObjectURL(file);
    if (location == "main") {
      setMainPicture({ urlPreview: picture, blob: file });
    } else {
      setPictures((prev) => [...prev, { urlPreview: picture, blob: file }]);
    }
    setPicturesMemory((prev) => [...prev, picture]);
  }

  //xóa ảnh chính , đưa id đã xóa vào mảng
  //ảnh chưa được upload lên sever sẽ ko có id => xóa không gọi api , chỉ là thao tác trên client
  const handleDeleteMainPicture = () => {
    if (mainPicture.index == 0) {
      idPictureToDelete.includes(0)
        ? null
        : setIdPictureToDelete((prev) => [...prev, 0]);
    } else {
      URL.revokeObjectURL(mainPicture);
    }
    setMainPicture([]);
  };

  //xóa ảnh phụ , đưa index vào 1 mảng
  const handleDeleteSubPicture = (indexDelete) => {
    idPictureToDelete.includes(indexDelete)
      ? null
      : setIdPictureToDelete((prev) => [...prev, indexDelete]);
    setPictures((prev) => {
      const newListPicture = prev.filter((picture, index) => {
        if (picture.index) {
          return picture.index != indexDelete;
        } else {
          URL.revokeObjectURL(picture);
          return index !== indexDelete - 1;
        }
      });
      return newListPicture;
    });
  };

  //thay đổi ảnh chính
  const handleChangeMainPicture = (link) => {
    handleDeleteMainPicture();
    convertBlobUrl(link, "main");
  };

  //thay đổi ảnh phụ
  const handleChangePicture = (e) => {
    const file = e.target.files[0];
    convertBlobUrl(file, "sub");
    e.target.value = null;
  };

  const notify = (edit) => {
    toast.success(edit ? "Edit success" : "Add success", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //xử lý việc user có thao tác thay đổi form hay không , nếu mà form không thay đổi sẽ không bấm được upload
  const handleDisableSubmitForm = () => {
    return (
      currentProduct.data.name == watch("name") &&
      currentProduct.data.categoryId == watch("category") &&
      currentProduct.data?.stocks?.toString() == watch("stock")?.toString() &&
      currentProduct.data.sale == watch("sale") &&
      currentProduct.data.desc == watch("desc") &&
      currentProduct.data.pictures?.[0] == mainPicture &&
      currentProduct.data.pictures
        ?.filter((picture, index) => {
          return index !== 0;
        })
        .toString() == pictures.toString()
    );
  };

  const onSubmit = async (data) => {
    try {
      if (currentProduct.isEdit) {
        //Xoa anh da upload truoc do khi submit
        if (idPictureToDelete.length != 0) {
          const imagesToDelete = idPictureToDelete.map((index) => {
            return {
              productId: currentProduct.data.id,
              index: index,
            };
          });

          // goi api xoa anh o sever
          await axiosClient({
            method: "DELETE",
            url: "https://localhost:7226/api/Images/delete",
            data: imagesToDelete,
          });
          setIdPictureToDelete([]);
        }
        //upload anh chinh
        // kiem tra xem anh chinh co bi sua khong
        if (mainPicture.urlPreview) {
          const picture = await getBase64(mainPicture.blob, 0);
          const respone = await handleStatusUpload(
            axiosClient({
              method: "POST",
              url: "https://localhost:7226/api/Images",
              data: [
                {
                  url: picture.url,
                  productId: currentProduct.data.id,
                  index: 0,
                },
              ],
            }),
            "main"
          );
        }
        // // loc ra nhung anh da day len sever va chua day len sever
        const havePictureNoneConvert = pictures
          .map((picture, index) => {
            if (picture.urlPreview) {
              return { blob: picture.blob, index: index + 1 };
            }
          })
          .filter((item) => item != undefined);
        if (havePictureNoneConvert.length != 0) {
          const pictureNoneConvertedIntoCloud = await convertBlobToBase64(
            havePictureNoneConvert
          );
          // //upload nhung anh chua day len sever
          const respone = await handleStatusUpload(
            axiosClient({
              method: "POST",
              url: "https://localhost:7226/api/Images",
              data: pictureNoneConvertedIntoCloud,
            }),
            "sub"
          );
        }

        // update product
        const product = convertProductToRequest(data, currentProduct.data.id);
        const respone = await axiosClient({
          method: "PUT",
          url: "https://localhost:7226/api/Products/update",
          data: product,
        });
      } else {
        const product = convertProductToRequest(data, currentProduct.data.id);
        const responeProduct = await axiosClient({
          method: "POST",
          url: "https://localhost:7226/api/Products",
          data: product,
        });
        // //neu la them moi
        const subImage = pictures.map((picture, index) => {
          return {
            blob: picture.blob,
            index: index + 1,
          };
        });
        let images;
        if (subImage.length != 0) {
          images = await convertBlobToBase64(
            [{ blob: mainPicture.blob, index: 0 }, ...subImage],
            product.id
          );
        } else {
          images = await convertBlobToBase64(
            [{ blob: mainPicture.blob, index: 0 }],
            product.id
          );
        }
        const responePicture = await handleStatusUpload(
          axiosClient({
            method: "POST",
            url: "https://localhost:7226/api/Images",
            data: images,
            // data la anh o dang base 64
          }),
          ""
        );
        setMainPicture("");
        setPictures([]);
        reset();
      }
      setUpdate((prev) => !prev);
      notify(currentProduct.isEdit);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    size_field.length > 0 && clearErrors("stock");
  }, [size_field]);

  useEffect(() => {
    if (currentProduct.data.stocks) {
      currentProduct.data.stocks.forEach((item, index) => {
        setValue(`stock[${index}].sizeId`, item.sizeId);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      handleDeletePreviewImageFromMemory();
    };
  }, [pictures, mainPicture]);

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
              setCurrentProduct((prev) => ({ ...prev, modalOpen: false }))
            }
          >
            Quay lại
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white ">
          <div className="font-bold text-blue-400 bg-[#ccd1e3] px-4 h-11 leading-10 border-b-[1px] border-gray-400"></div>
          <div className="p-4 overflow-y-scroll h-[500px]">
            <div className="grid grid-cols-12 rounded-md border-[1px] border-solid border-[#ccc]">
              <div className="bg-[#e7edf1] col-span-2 w-[130px] text-sm p-2">
                Tên sản phẩm
              </div>
              <input
                className="col-span-10 leading-9"
                type="text"
                name="name"
                {...register("name")}
              />
            </div>
            <p className="text-[#D2311B] text-base font-medium h-5">
              {errors.name?.message}
            </p>
            {/* Category */}
            <div>
              <p className="my-3 text-xl font-bold">Thể loại</p>
              <select
                className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mr-2"
                {...register("category")}
                placeholder="Size"
              >
                <option value="14">dây chuyền</option>
                <option value="15">nhẫn</option>
                <option value="16">lắc</option>
                <option value="17">bông tai</option>
              </select>
            </div>
            <p className="text-[#D2311B] text-base font-medium h-5">
              {errors.category?.message}
            </p>
            {/* Ảnh */}

            <div className="text-[#333] my-3 text-xl font-bold">Ảnh Chính</div>
            <div className="inline-block  ml-[19px] relative">
              <input
                id="mainpic"
                className="hidden"
                type="file"
                {...register("picture", {
                  onChange: (e) => {
                    handleChangeMainPicture(e.target.files[0]);
                  },
                })}
              />
              <label
                htmlFor="mainpic"
                className="absolute top-0 bottom-0 left-0 right-0"
              ></label>
              <img
                src={mainPicture.url || mainPicture.urlPreview}
                alt="ADD PICTURE"
                className="w-[150px] h-[150px] object-contain object-center border-dashed border-blue-500 border-[2px]"
              />
            </div>
            <div
              className="mt-2 mr-[978px] text-center text-blue-500 cursor-pointer hover:opacity-60 ml-7"
              onClick={() => {
                handleDeleteMainPicture();
              }}
            >
              Xóa
            </div>

            <p className="text-[#D2311B] text-base font-medium h-5">
              {errors.picture?.message}
            </p>

            <div className="text-[#333] my-3 text-xl font-bold">Ảnh Phụ</div>
            <div className="flex flex-wrap items-center">
              {pictures?.map((picture, index) => {
                return (
                  <div key={picture._id || index} className="w-[150px] mx-4">
                    <img
                      src={picture.url || picture.urlPreview}
                      alt="ADD PICTURE"
                      className="w-[150px] h-[150px] object-contain object-center border-dashed border-blue-500 border-[2px]"
                    />
                    {index + 1 == pictures.length ? (
                      <div
                        className="mt-2 text-center text-blue-500 cursor-pointer hover:opacity-60"
                        onClick={() => {
                          if (picture.index) {
                            handleDeleteSubPicture(picture.index);
                          } else {
                            handleDeleteSubPicture(index + 1);
                          }
                        }}
                      >
                        Xóa
                      </div>
                    ) : (
                      <span className="block w-6 h-6 mt-2"></span>
                    )}
                  </div>
                );
              })}
              {pictures.length < 3 && (
                <label className="p-3 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 ml-3 cursor-pointer">
                  <input
                    type="file"
                    onChange={handleChangePicture}
                    className="hidden"
                  />
                  Add Picture
                </label>
              )}
            </div>
            {/* SIZE */}
            <div>
              <p className="text-[#333] my-3 text-xl font-bold">Size</p>
              <button
                type="button"
                className="ml-4 p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5"
                onClick={() => {
                  appendSize({});
                }}
              >
                Add Size
              </button>
              <div className="ml-4">
                {size_field?.map(({ id }, index) => {
                  return (
                    <div
                      className="p-3 my-4 drop-shadow-xl border-[1px] border-blue-400"
                      key={id}
                    >
                      <div>
                        <p className="my-3 text-xl font-bold text-blue-400">
                          Size
                        </p>
                        <select
                          className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5 mr-2"
                          {...register(`stock[${index}].sizeId`)}
                          placeholder="Size"
                        >
                          <option value="1">16</option>
                          <option value="2">17</option>
                          <option value="3">18</option>
                        </select>
                      </div>
                      <div>
                        <p className="my-3 text-xl font-bold text-blue-400">
                          Số lượng
                        </p>
                        <input
                          className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mr-2"
                          type="text"
                          {...register(`stock[${index}].quantity`)}
                          placeholder="Quantity"
                        />
                      </div>
                      <p className="text-[#D2311B] mb-5 text-base font-medium h-5">
                        {errors.stock?.[index]?.quantity?.message}
                      </p>
                      <div>
                        <p className="my-3 text-xl font-bold text-blue-400">
                          Giá bán
                        </p>
                        <input
                          className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mr-2"
                          type="number"
                          onWheelCapture={(e) => {
                            e.currentTarget.blur();
                          }}
                          {...register(`stock[${index}].price`)}
                          placeholder="Cost"
                        />
                      </div>
                      <p className="text-[#D2311B] mb-5 text-base font-medium h-5">
                        {errors.stock?.[index]?.price?.message}
                      </p>
                      <button
                        className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5"
                        type="button"
                        onClick={() => {
                          removeSize(index);
                        }}
                      >
                        Remove Size
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="text-[#D2311B] text-base font-medium h-5">
                {errors.stock?.message}
              </p>
            </div>
            <div>
              <div className="grid grid-cols-12 rounded-md border-[1px] border-solid border-[#ccc] my-2">
                <div className="bg-[#e7edf1] col-span-1 text-sm p-2">Sale</div>
                <input
                  type="number"
                  className="col-span-11 pl-2 leading-9"
                  {...register("sale")}
                  onWheelCapture={(e) => {
                    e.currentTarget.blur();
                  }}
                />
              </div>
              <p className="text-[#D2311B] text-base font-medium h-5">
                {errors.sale?.message}
              </p>
            </div>
            <div>
              <p className="text-[#333] my-3 text-xl font-bold">Mô tả</p>
              <textarea
                rows={"10"}
                {...register("desc")}
                className="w-[100%] border-[1px] border-gray-500"
              ></textarea>
            </div>
            <p className="text-[#D2311B] text-base font-medium h-5">
              {errors.desc?.message}
            </p>
          </div>
          <div className="text-center bg-white">
            <button
              className="p-2 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 mb-5"
              disabled={handleDisableSubmitForm()}
              onClick={() => {
                setValue("picture", [mainPicture, ...pictures]);
              }}
            >
              {currentProduct.isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
