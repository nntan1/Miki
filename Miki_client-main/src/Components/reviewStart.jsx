import React from 'react'

export default function ReviewStar({ type  }) {
  return (
    <div className='ml-[16px] mt-[16px] text-base font-bold text-neutral_3 px-[18px] py-[5px] border-[1px] border-solid border-neutral_3 rounded-[8px] cursor-pointer'>
      {type}
    </div>
  )
}
