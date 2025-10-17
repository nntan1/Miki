import React from 'react'
import Button from './Button'
import Animation from './animations/Animation'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function ProductCard({ id, src, nameProduct, price, }) {

  const navigate = useNavigate()
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

  return (
    <div>
      <div className='productDetailads'
        onClick={() => {
          navigate(`/products`);
        }}>
        <Animation gestures>
          <img className='cursor-pointer' src={src} alt='anh' style={{
            width: '254px',
            height: '300px',
          }} />
        </Animation>
      </div>
      <div className='productDetailads'
        onClick={() => {
          navigate(`/products`);
        }}>
        <p className='font-bold max-w-[267px] textTitle mt-[24px] cursor-pointer'>{nameProduct}</p>
      </div>
      <p className='mt-[6px] textTitle text-primary_1'>{formatter.format(price)}</p>
      <Link to={`/products`}>
        <Button
          title={'Thêm vào giỏ hàng'}
          className={'rounded-btnB w-[254px] h-[40px] bg-btn text-[#ffffff] font-bold text-[16px] leading-6 hover:bg-[#0000] hover:text-neutral_1 hover:border-solid hover:border-[1px] hover:border-[#000] mt-5'}
        />
      </Link>
    </div>
  )
}
