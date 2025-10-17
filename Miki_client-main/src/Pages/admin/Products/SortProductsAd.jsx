import React from 'react'
import PropTypes from 'prop-types'

SortProductsAd.propTypes = {
  setSortOption: PropTypes.func,
  productSort: PropTypes.func,
  setPage: PropTypes.func,
};

function SortProductsAd(props) {

  const { setSortOption, productSort, setPage } = props;

  return (
    <div>
      <select name="" id=""
        className='p-1 rounded-md border-[1px] border-gray-600 ml-3 mr-14'
        onChange={
          (e) => {
            e.target.value != 'new' ? setSortOption(e.target.value) : productSort((prev) => [...prev].reverse())
            setPage(1);
          }
        }
      >
        <option className='p-6 ml-2'>Mặc định</option>
        <option className='p-6 ml-2' value="name&order=asc">A-Z</option>
        <option className='p-6 ml-2' value="name&order=desc">Z-A</option>
        <option className='p-6 ml-2' value="price&order=asc">Giá tăng dần</option>
        <option className='p-6 ml-2' value="price&order=desc">Giá giảm dần</option>
        <option className='p-6 ml-2' value="sale&order=desc">Sản phẩm ưu đãi</option>
        <option className='p-6 ml-2' value="new">Sản phẩm mới</option>
      </select>
    </div>
  )
}


export default SortProductsAd