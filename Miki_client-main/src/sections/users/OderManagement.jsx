import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { useRecoilState } from "recoil";
import { dataUser } from "../../recoils/dataUser";
import axios from "axios";
import { FormatMoney } from "../../utils/formatMoney";
import { toast } from "react-toastify";

function OderManagement({ tab, setTab }) {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useRecoilState(dataUser);
  const [update,setUpdate] = useState(false);
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios({
          method: "GET",
          url: `https://localhost:7226/api/Order?UserID=${user.userInforId}`,
        });
        setOrders(res.data);
      };
      fetch();
    } catch (ex) {
      console.log(ex);
    }
  }, [update]);

  const handleReceiveOrders = async (orderId) => {
    const res = axios({
      method: 'POST',
      url: `https://localhost:7226/api/Order/ReceiveOrder?orderId=${orderId}`,
    });
    res.then(() => {
        toast.success("Cập nhật thành công");   
        setUpdate(prev => !prev);
    })
      .catch((e) =>{ 
        toast.error(e.response.data.message)});
  }

  return (
    <div>
      {orders.map((items) => {
        console.log(items)
        return (
          <div className="relative z-10 h-auto bg-white w-1440px ">
            <p className="mb-6 ml-40 text-xl font-bold text-neutral_2 ">
                Mã đơn hàng: {items.id}
              </p>
              {items.products.map( item => (
                <div className="px-[196px] pt-8">
              <div className="flex justify-between">
                <div className="flex ">
                  <div
                    className="w-[120px] h-[120px] text-center border-solid
                                    border-[1px]
                                    border-primary_2
                                    flex
                                    justify-center
                                    items-center
                                    relative"
                  >
                    <img
                      className=" w-[100px] h-[100px] 
                                    "
                      src={item.url}
                      alt=""
                    />
                    <p
                      className="
                                    rounded-tl-[4px]
                                    font-medium text-sm text-neutral_5
                                    w-[22px] h-[22px]
                                    absolute right-0 bottom-0 bg-primary_2
                                    "
                    >{`x${item.quantity}`}</p>
                  </div>
                  <div className="ml-10">
                    <h3 className="text-xl font-bold font-main text-neutral_1 ">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium font-main ">
                      Màu sắc: Gold
                    </p>
                    <p className="mt-3 text-red-600">{items.status}</p>
                  </div>
                </div>
                <div className="text-xl font-bold text-right text-primary_2 ">
                  <h3>{<FormatMoney money={item.price} />}</h3>
                </div>
              </div>
              

              <div className="flex items-center justify-between mt-12 text-right cursor-pointer">
                <div className="flex">
                <h3 className="font-main font-bold text-xl tracking-[0.15px] text-[#251C17]">
                  Tổng tiền :
                </h3>
                <h3 className="ml-6 text-xl font-bold text-primary_2 ">
                  {<FormatMoney money={item.price * item.quantity} />}
                </h3>
                </div>
              </div>
              <div className="w-full h-[1px] bg-primary_5 my-4"></div>
              <div className="w-full h-[1px] bg-primary_5 my-4"></div>

              <div className="flex items-center justify-end text-right cursor-pointer">
                <img
                  className="w-4 h-4 ml-4 "
                  src="/assets/icon/doubleArrowdown.png"
                />
              </div>
              {/*  */}
            </div>
              ) )}
              
              <div className='flex items-center justify-end mt-12 mr-48 text-right cursor-pointer'>
                  {
                    items.status == "Duyệt thành công" && 
                    <Button 
                    title='Đã nhận được hàng'
                    className='font-bold text-[#251C17] text-base tracking-[0.15px]
                rounded-btnB p-2 h-10
                border-[1px]
                border-solid
                border-black
                cursor-pointer
                hover:bg-btn
                hover:text-neutral_5
                ' 
                onClick={() => {
                  handleReceiveOrders(items.id)
                }}
                />
                  }                            
              </div>
              <div className="pb-10"></div>
          </div>
        );
      })}
      {/* bg-circle */}
      <div
        className="rounded-full bg-circle1 w-[177px] h-[177px] 
                    absolute
                    top-[2348px]
                    left-[-89px]
                      -z-10
                    "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[221px] h-[221px] 
                    absolute
                    top-[2326px]
                    left-[-111px]
                    -z-10
                    
                    "
      ></div>

      {/* bg-circle */}
      <div
        className="rounded-full bg-circle1 w-[180px] h-[180px]  
                    absolute
                    top-[565px]
                    left-[1349px]
                    -z-10
                    
                    "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[225px] h-[225px] 
                    absolute
                    top-[543px]
                    left-[1327px]
                    -z-10
                    
                    "
      ></div>

      {/* bg-circle */}
      <div
        className="rounded-full bg-circle1 w-[441px] h-[441px]  
                    absolute
                    top-[3196px]
                    left-[-111px]
                    -z-10

                    "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[551px] h-[551px] 
                    absolute
                    top-[3141px]
                    left-[-166px]
                    -z-10
                    "
      ></div>
    </div>
  );
}

export default OderManagement;
