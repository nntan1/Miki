import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Visa, Debit, Paypal } from "../../Components/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../recoils/cartState";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { dataUser } from "../../recoils/dataUser";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  surname: yup.string().required("*Surname is required"),
  name: yup.string().required("*Name is required"),
  city: yup.string().required("*City is required"),
  district: yup.string().required("*District is required"),
  village: yup.string().required("*Village is required"),
  address: yup.string().required("*Address is required"),
  phoneNumber: yup
    .string()
    .required("*PhoneNumber is required")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "*Invalid phone number"),
  payment: yup
    .string()
    .required("*Payment is required")
    .typeError("*Payment is required"),
  cardInfo: yup.object().when("payment", {
    is: "bankCard",
    then: (schema) =>
      schema.shape({
        cardNumber: yup.string().required("*Number card is required"),
        bankCard: yup
          .string()
          .required("*Card is required,")
          .typeError("*Card is required,"),
        expiry: yup.string().required("*Expiry is required"),
        CVV: yup.string().required("*CVV is required"),
      }),
    otherwise: (schema) => schema,
  }),
});

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const [orderPro, setOrderPro] = useState(useRecoilValue(cartState));
  const [payCard, setPayCard] = useState();
  const [user, setUser] = useRecoilState(dataUser);
  const [total, setTotal] = useState(() =>
    orderPro.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0)
  );
  const navigate = useNavigate();

  const handleAddProduct = (indexofPro, method) => {
    setOrderPro((prev) =>
      prev.map((pro, index) => {
        if (index == indexofPro) {
          method == "remove"
            ? (pro = {
                ...orderPro[indexofPro],
                quantity: orderPro[indexofPro].quantity - 1,
              })
            : (pro = {
                ...orderPro[indexofPro],
                quantity: orderPro[indexofPro].quantity + 1,
              });
        }
        return pro;
      })
    );
  };

  const convertNumberToStringMoney = (number) => {
    const stringArray = number.toString().split("").reverse();
    const stringCV = stringArray
      .reduce((string, number, index) => {
        if ((index + 1) % 3 == 0) {
          return string + number + ".";
        } else {
          return string + number;
        }
      }, "")
      .split("")
      .reverse()
      .reduce((string, element) => string + element, "");
    return stringCV[0] == "." ? stringCV.slice(1) : stringCV;
  };

  const onSubmit = async (data) => {
    try {
      data["products"] = orderPro;
      data["UserID"] = user.userInforId;
      const res = await axios({
        method: "POST",
        url: "https://localhost:7226/api/Order/AddOrder",
        data: data,
      });
      console.log(data);
      toast.success("Đặt hàng thành công");
      navigate("/");
    } catch {
      navigate("/");
    }
  };

  const paymentCard = [
    {
      id: 1,
      name: "Visa",
      icon: <Visa />,
    },
    {
      id: 2,
      name: "Debit",
      icon: <Debit />,
    },
    {
      id: 3,
      name: "Paypal",
      icon: <Paypal />,
    },
  ];

  useEffect(() => {
    setTotal(() =>
      orderPro.reduce((total, product) => {
        return total + product.quantity * product.price;
      }, 0)
    );
  }, [orderPro]);

  return (
    <>
      <div className="container mt-[35px]">
        <ul className="w-[510px] h-[24px] flex items-center justify-between text-neutral_2">
          <li className="text-base">Trang chủ</li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path
                d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z"
                fill="#626262"
              />
            </svg>
          </li>
          <li className="text-base">Tất cả sản phẩm</li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path
                d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z"
                fill="#626262"
              />
            </svg>
          </li>
          <li className="text-base">Giỏ hàng</li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path
                d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z"
                fill="#626262"
              />
            </svg>
          </li>
          <li className="text-base font-bold">Trang giao hàng</li>
        </ul>
        <p className="text-[32px] leading-10 color-[#000000] font-bold mt-11">
          Trang giao hàng
        </p>
        <p className="text-base text-neutral_2 mt-[48px] font-bold">
          Địa chỉ giao hàng
        </p>
        <div className="mt-[7px] flex justify-between flex-wrap">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[548px] mt-4 inline-block mt-3"
          >
            <div>
              <div className="flex justify-between">
                <div>
                  <input
                    className="w-[254px] h-[48px] py-3 px-4 border-[1px] border-solid border-primary_1 rounded-lg"
                    type="text"
                    placeholder="Họ"
                    {...register("surname")}
                  />
                  <p className="text-[#D2311B] text-base font-medium h-5">
                    {errors.surname?.message}
                  </p>
                </div>
                <div>
                  <input
                    className="w-[254px] h-[48px] py-3 px-4 border-[1px] border-solid border-primary_1 rounded-lg"
                    type="text"
                    placeholder="Tên"
                    {...register("name")}
                  />
                  <p className="text-[#D2311B] text-base font-medium h-5">
                    {errors.name?.message}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-[20px]">
                <div>
                  <input
                    className="w-[156px] h-[48px] placeholder:text-sm py-3 px-4 border-[1px] border-solid border-primary_1 rounded-lg"
                    type="text"
                    placeholder="Tỉnh/Thành phố"
                    {...register("city")}
                  />
                  <p className="text-[#D2311B] text-base font-medium h-5">
                    {errors.city?.message}
                  </p>
                </div>
                <div>
                  <input
                    className="w-[156px] h-[48px] placeholder:text-sm py-3 px-4 border-[1px] border-solid border-primary_1 rounded-lg"
                    type="text"
                    placeholder="Quận/Huyện"
                    {...register("district")}
                  />
                  <p className="text-[#D2311B] text-base font-medium h-5">
                    {errors.district?.message}
                  </p>
                </div>
                <div>
                  <input
                    className="w-[156px] h-[48px] placeholder:text-sm py-3 px-4 border-[1px] border-solid border-primary_1 rounded-lg"
                    type="text"
                    placeholder="Phường/Xã"
                    {...register("village")}
                  />
                  <p className="text-[#D2311B] text-base font-medium h-5">
                    {errors.village?.message}
                  </p>
                </div>
              </div>
              <input
                className="py-3 px-4 mt-[20px] w-full h-[48px] border-[1px] border-solid border-primary_1 rounded-lg"
                type="text"
                placeholder="Địa chỉ cụ thể"
                {...register("address")}
              />
              <p className="text-[#D2311B] text-base font-medium h-5">
                {errors.address?.message}
              </p>
              <input
                className="py-3 px-4 mt-[20px] w-full h-[48px] border-[1px] border-solid border-primary_1 rounded-lg"
                type="text"
                placeholder="Số điện thoại"
                {...register("phoneNumber")}
              />
              <p className="text-[#D2311B] text-base font-medium h-5">
                {errors.phoneNumber?.message}
              </p>
              <p className="mt-[32px] mb-[36px] text-base font-bold text-neutral_2">
                Phương thức thanh toán
              </p>
              <div className="w-full h-[338px] border-[1px] border-[#5B5B5B] rounded-lg">
                <div className="h-[56px] flex items-center border-b-[#5B5B5B] border-b-[1px]">
                  <input
                    className="mb-3 ml-3 mr-6 register-checkbox"
                    type="radio"
                    name="checkPay"
                    value={"cash"}
                    {...register("payment")}
                  />
                  <p className="text-base text-neutral_1">Tiền mặt</p>
                </div>
                <div className="h-[56px] flex items-center justify-between border-b-[#5B5B5B] border-b-[1px]">
                  <div className="flex">
                    <input
                      className="ml-3 mr-6 register-checkbox"
                      type="radio"
                      name="checkPay"
                      value={"savedCard"}
                      {...register("payment")}
                    />
                    <p className="text-base text-neutral_1">Thẻ đã lưu</p>
                  </div>
                  <div className="flex items-center mr-3">
                    <Visa />
                    <span className="ml-4">***6699</span>
                  </div>
                </div>
                <div className="h-[60px] flex items-center justify-between">
                  <div className="flex">
                    <input
                      type="radio"
                      name="checkPay"
                      value={"bankCard"}
                      className="ml-3 mr-6 register-checkbox"
                      {...register("payment")}
                    />
                    <p className="text-base text-neutral_1">
                      Thẻ tín dụng hoặc ghi nợ
                    </p>
                  </div>
                  <div className="flex items-center mr-[52px]">
                    {paymentCard.map((item) => (
                      <>
                        <label
                          className={
                            item.name == payCard
                              ? "bg-primary_4 hover:bg-primary_4 rounded-lg cursor-pointer"
                              : "hover:bg-primary_4 rounded-lg cursor-pointer"
                          }
                          key={item.id}
                          htmlFor={item.name}
                          onClick={() => setPayCard(item.name)}
                        >
                          {item.icon}
                        </label>
                        <input
                          className="hidden"
                          value={item.name}
                          type="radio"
                          name="payment"
                          id={item.name}
                          {...register("cardInfo.bankCard")}
                        />
                      </>
                    ))}
                  </div>
                </div>
                <input
                  className="py-3 px-4 mx-3 w-[96%] h-[48px] border-[1px] border-solid border-primary_1 rounded-lg"
                  type="text"
                  placeholder="Nhập số thẻ"
                  {...register("cardInfo.cardNumber")}
                />
                <div className="text-[#D2311B] text-base font-medium h-5 ml-3 flex justify-start">
                  <p>{errors?.cardInfo?.bankCard?.message}</p>
                  <p className="mr-2">
                    {errors?.cardInfo?.cardNumber?.message}
                  </p>
                </div>
                <div className="flex justify-between mx-3 mt-5">
                  <input
                    className="w-[254px] h-[48px] py-3 px-4 border-[1px] border-solid border-primary_1 rounded-lg"
                    type="text"
                    placeholder="Ngày hết hạn (MM/YY)"
                    {...register("cardInfo.expiry")}
                  />
                  <input
                    className="w-[254px] h-[48px] py-3 px-4 border-[1px] border-solid border-primary_1 rounded-lg"
                    type="text"
                    placeholder="Mã CVV"
                    {...register("cardInfo.CVV")}
                  />
                </div>
                <div className="text-[#D2311B] text-base font-medium h-5 ml-3 flex justify-between">
                  <p>{errors?.cardInfo?.expiry?.message}</p>
                  <p className="mr-2">{errors?.cardInfo?.CVV?.message}</p>
                </div>
                <p className="text-[#D2311B] text-base font-medium h-5 mt-2 ml-3">
                  {errors.payment?.message}
                </p>
              </div>
            </div>
            <div className="mt-[40px] mb-[119px] h-[40px] flex justify-between">
              <button className="py-2 px-[46px] border-[1px] border-btn rounded-lg hover:bg-btn text-btn hover:text-neutral_5 font-bold">
                Thanh toán
              </button>
              <Link to={"/cart"}>
                <>
                  <button
                    type="button"
                    className="py-2 px-[46px] border-[1px] border-btn rounded-lg hover:bg-btn text-btn hover:text-neutral_5 font-bold"
                  >
                    Trở lại giỏ hàng
                  </button>
                </>
              </Link>
            </div>
          </form>
          <div className="bg-[url('/assets/images/payment.png')] bg-cover bg-center w-[548px] h-[780px] inline-block ml-[40px] overflow-y-scroll">
            {orderPro?.map((product, index) => (
              <div
                key={index}
                className="flex justify-between mt-[40px] mx-[57px]"
              >
                <div className="flex">
                  <img
                    src={product?.url}
                    className="w-[56px] h-[56px] round-2"
                  />
                  <p className="ml-4 font-bold">{product.name}</p>
                </div>
                <div>
                  <p className="text-[20px] leading-[28px] font-bold">{`${convertNumberToStringMoney(
                    product.price
                  )}đ`}</p>
                  <div className="flex items-center justify-between">
                    <button
                      disabled={product.quantity == 0}
                      onClick={() => handleAddProduct(index, "remove")}
                      className="w-[32px] h-[32px] rounded-full text-center font-bold cursor-pointer active:bg-black active:text-[#D4BBAA]"
                    >
                      -
                    </button>
                    <p className="font-bold text-[20px] leading-[28px]">
                      {product.quantity}
                    </p>
                    <div
                      onClick={() => handleAddProduct(index, "add")}
                      className="w-[32px] h-[32px] rounded-full text-center font-bold cursor-pointer active:bg-black active:text-[#D4BBAA] leading-8"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End display product */}
            <div className="mx-[57px] border-b-[1px] border-neutral_1 mt-[44px]"></div>
            <div className="flex justify-between items-center mt-[35px] mx-[57px]">
              <p>Giá sản phẩm</p>
              <p className="text-[20px] leading-[28px] font-bold">{`${convertNumberToStringMoney(
                total
              )}đ`}</p>
            </div>
            <div className="flex justify-between items-center mt-[20px] mx-[57px]">
              <p>Phí giao hàng</p>
              <p className="text-[20px] leading-[28px] font-bold">40.000đ</p>
            </div>
            <div className="flex justify-between items-center mt-[20px] mx-[57px] mb-[33px]">
              <p>Giảm giá</p>
              <p className="text-[20px] leading-[28px] font-bold">200.000đ</p>
            </div>
            <div className="mx-[57px] border-b-[1px] border-neutral_1 mt-[44px]"></div>
            <div className="flex justify-between items-center mt-[32px] mx-[57px]">
              <p>Tổng</p>
              <p className="text-[20px] leading-[28px] font-bold">{`${convertNumberToStringMoney(
                total - 240000
              )}đ`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
