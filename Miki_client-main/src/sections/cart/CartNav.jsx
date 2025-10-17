import React from 'react'
import { Link } from 'react-router-dom'

export default function CartNav() {
  return (
    <ul className="w-[510px] h-[24px] flex items-center justify-start text-neutral_2 mb-12 pt-4">
    <Link to={'/'}>
      <>
      <li className="text-base hover:opacity-80 hover:cursor-pointer">Trang chủ</li>
      </>
    </Link>
    <li className='mx-4'>
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
    <li className="text-base font-bold hover:opacity-80 hover:cursor-pointer">Giỏ hàng</li>
  </ul>
  )
}
