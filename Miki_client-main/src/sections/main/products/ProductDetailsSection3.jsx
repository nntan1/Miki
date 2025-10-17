import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../../../Components/ProductCard'

export default function ProductDetailsSection3() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dataProducts();
  }, []);

  const dataProducts = async (data) => {
    try {
      const res = await axios({
        method: 'GET',
        url:`https://localhost:7226/api/Products?page=${1}&sortBy=name&order=asc&limit=${4}`,
      });
      const datas = res.data;
      const { data, pagination } = datas;
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='px-[152px] mt-[56px]'>
      <svg
        className='absolute top-[738px] left-0'
        xmlns="http://www.w3.org/2000/svg" width="160" height="359" viewBox="0 0 160 359" fill="none">
        <circle cx="-19.5" cy="179.5" r="179.5" fill="#B78D71" fillOpacity="0.15" />
        <circle cx="-19.5003" cy="179.5" r="143.634" fill="#B78D71" fillOpacity="0.1" />
      </svg>
      <svg
        className='absolute top-[1000px] right-0 z-10'
        xmlns="http://www.w3.org/2000/svg" width="197" height="359" viewBox="0 0 197 359" fill="none">
        <circle cx="179.5" cy="179.5" r="179.5" fill="#B78D71" fillOpacity="0.15" />
        <circle cx="179.5" cy="179.5" r="143.634" fill="#B78D71" fillOpacity="0.1" />
      </svg>
      <svg
        className='absolute top-[2764px] left-[889px]'
        xmlns="http://www.w3.org/2000/svg" width="551" height="170" viewBox="0 0 551 170" fill="none">
        <circle cx="275.5" cy="275.5" r="275.5" fill="#B78D71" fillOpacity="0.15" />
        <circle cx="275.5" cy="275.5" r="220.453" fill="#B78D71" fillOpacity="0.1" />
      </svg>
      <h1 className='text-[32px] leading-[40px] font-bold text-neutral_1'>Sản phẩm đã xem </h1>
      <div className='mt-[68px] flex justify-between text-center'>
        <ProductCard src='/assets/images/productCard_recently1.jpg' nameProduct='Lira Earrings1' price='355000  ' />
        <ProductCard src='/assets/images/productCard_recently2.jpg' nameProduct='Lira Earrings2' price='365000  ' />
        <ProductCard src='/assets/images/productCard_recently3.jpg' nameProduct='Lira Earrings3' price='395000 ' />
        <ProductCard src='/assets/images/productCard_recently4.jpg' nameProduct='Lira Earrings4' price='455000  ' />
      </div>
      <h1 className='text-[32px] leading-[40px] font-bold text-neutral_1 mt-[120px]'>Có thể bạn cũng thích</h1>
      <div className='mt-[68px] flex justify-between text-center pb-[120px]'>
        {
          products?.map(item => {
            return (
              <ProductCard
                src={`${item?.pictures[0]?.url}`}
                nameProduct={item.name}
                price={`${item?.stocks[0].price}`}
                id={item.id}
              />
            )
          })
        }
      </div>
    </div>
  )
}
