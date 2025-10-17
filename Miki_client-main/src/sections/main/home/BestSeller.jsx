import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Animation from '../../../Components/animations/Animation';
import { Link } from 'react-router-dom';
import Button from '../../../Components/Button';

export function BestSellerSection({ products }) {

  const settings = {
    draggable: true,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 4,
  }

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

  return (
    <div className="mx-[150px] mt-[122px] h-[669px] relative">
      <p className="absolute w-[296px] h-[39px] left-0 top-[2px] font-bold text-[32px] leading-[39px] text-neutral_1">Sản phẩm nổi bật</p>
      <Link to={"/products"}>
        <Button
          title={'Xem tất cả'}
          className={'rounded-btnB w-[184px] h-[40px] left-[950px] top-[1px] bg-btn text-[#ffffff] absolute font-bold text-[16px] leading-6 z-[1000] hover:bg-[#0000] hover:text-neutral_1 hover:border-solid hover:border-[1px] hover:border-[#000]'}
        />
      </Link>
      <Slider {...settings} 
      className='pt-[112px]'
      >
        {
          products?.map(item => {
            return (
              <div key={item.id} className='text-center'>
                <Animation gestures>
                  <img src={item?.pictures[0].url} alt="" className='w-[254px] h-[300px] object-contain object-center' />
                </Animation>
                <Link to={`/products/${item.id}`}>
                <p className='min-h-[52px] mt-[24px] mb-[8px] text-[20px] font-bold leading-[26px]'>{item.name}</p>
                </Link>                
                <p className='text-primary_2 mb-[16px] text-[20px] leading-[28px] font-bold'>{formatter.format(item?.stocks[0]?.price)}</p>
                <Link to={`/products/${item.id}`}>
                  <Button
                    title={'Thêm vào giỏ hàng'}
                    className={'rounded-btnB w-[254px] h-[40px] bg-btn text-[#ffffff] font-bold text-[16px] leading-6 hover:bg-[#0000] hover:text-neutral_1 hover:border-solid hover:border-[1px] hover:border-[#000]'}
                  />
                </Link>
              </div>
            )
          })
        }
      </Slider>
    </div>
  );
}
