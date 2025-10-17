import React from 'react'
import AddAndRemoveItems from '../../Components/AddAndRemoveItems';
import { IconXX } from '../../Components/icons';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { dataUser } from '../../recoils/dataUser';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function 
CartItemsList({ items, setItemState }) {

  const user = useRecoilValue(dataUser);
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

  const handleDeleteCart =  async (id,sizeId,index) => {
    try {
      console.log(items);      
      let idProduct = id;
      if (!idProduct)
      {
        idProduct = items[index].productId;
      }
      const respone = await axios({
        method: 'DELETE',
        url:`https://localhost:7226/api/Cart?productId=${idProduct}&userId=${user.userInforId}&sizeID=${sizeId}`,
      });
      const res = await axios({
        method: 'GET',
        url:`https://localhost:7226/api/Cart?userID=${user.userInforId}`,
      });
      console.log(res.data)
      setItemState(res.data);
      toast.success("Xóa thành công");
    }
    catch{

    }
  }

  return (
    <div className='pb-10'>
      <div className='text-2xl font-bold'>Giỏ hàng</div>
      <div className='w-[548px]'>
        {
          items?.map((item, index) => <div
            key={index}
            className='py-12 border-b border-solid border-[#D8D8D8] flex
            p-5 shadow-lg
            '
          >
            <div className='w-[136px] h-[136px] overflow-hidden mr-10'>
              <img src={item?.url} alt="img" className='object-cover object-center duration-200 hover:scale-125' />
            </div>
            <div className=''>
              <Link to={`/products/${item.productId}`}>
              <div className='text-xl font-bold'>{item?.name}</div>
              </Link>
              <div className='text-sm text-[#707070] mt-2l;l;l;l;l;'>{`Kích cỡ :${item.sizeId + 15}`}</div>
              <AddAndRemoveItems
                product={item}
                index={index}
                itemState={items}
                setItemState={setItemState}
              />
            </div>
            <div className='flex flex-col justify-between ml-auto'>
              <div className='flex justify-end font-bold'>
                <span
                  className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral_1 hover:text-white hover:cursor-pointer'
                  onClick={() => {
                    handleDeleteCart(item.productID,item.sizeId,index);
                  }}
                >
                  <IconXX
                    className='fill-neutral_1 hover:fill-white'
                  />
                </span>
              </div>
              <div className='text-2xl font-bold text-primary_2'>{formatter.format((item.price))}</div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}
