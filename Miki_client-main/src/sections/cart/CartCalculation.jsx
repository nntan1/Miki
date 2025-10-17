import React from 'react'
import { Link } from 'react-router-dom'

export default function CartCalculation({total}) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      })
    const text = [
        {
            key : 'Giá sản phẩm',
            value : total
        },
        {
            key : 'Phí giao hàng',
            value : 40000
        },
        {
            key : 'Giảm giá',
            value : 200000
        },
    ]
  return (
    <div className='pb-10 w-[450px]'>
      <div className='text-2xl font-bold'>Tạm tính</div>
      <div className='flex items-center justify-between mt-10 border-[#D8D8D8] border-solid pb-12 border-b-[1px] mb-[23px]'>
        <div className='text-xl font-bold'>Ưu đãi</div>
        <input type="text" placeholder='Nhập ưu đãi' className='w-[351px] border-[1px] rounded-[8px] border-primary_2 py-3 px-4'/>
      </div>
      {
        text.map( (item) => {
            return (
            <div className='flex justify-between mt-7' key={item}>
                <div className='text-base text-neutral_1'>{item.key}</div>
                <div className='text-xl font-bold'>{formatter.format((item.value))}</div>
            </div>
            )
        } )
      }
      <div className='border-b-[1px] border-solid border-[#D8D8D8] my-12'></div>
      <div className='flex justify-between mt-7'>
                <div className='text-base text-neutral_1'>Tổng</div>
                <div className='text-2xl font-bold text-primary_2'>{
                formatter.format((total - text[1].value -text[2].value))
                }</div>
            </div>
            <div className='flex justify-end'>
            <Link to="/checkout">
      <>
      <button className="py-2 px-[46px] border-[1px] border-btn rounded-lg hover:bg-btn text-btn hover:text-neutral_5 font-bold mt-10">
                  Thanh toán
                </button>
      </>
            </Link>
            </div>
    </div>
  )
}
