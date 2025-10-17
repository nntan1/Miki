import React from 'react';
import CartNav from './CartNav';
import CartItemsList from './CartItemsList';
import CartCalculation from './CartCalculation';
import { cartState } from '../../recoils/cartState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataUser } from '../../recoils/dataUser';
import { Link } from 'react-router-dom';

export default function CartMain() {
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const user = useRecoilValue(dataUser);
  const totalCost = cartItem?.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  return (
    <div className="container mt-[35px] bg-white mb-[140px]">
      <CartNav />
      {cartItem.length != 0 && user ? (
        <div className="flex justify-between">
          <CartItemsList items={cartItem} setItemState={setCartItem} />
          <CartCalculation total={totalCost} />
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <div className="w-[240px] flex flex-col justify-center items-center">
            <img
              className="w-[108px] h-[98px] mx-auto"
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
            />
            <div className="text-primary_3 text-[1rem] leading-4 mt-[1rem] font-bold">
              Giỏ hàng của bạn còn trống
            </div>
            <Link to="/products">
              <>
                <button className="py-2 px-[46px] border-[1px] border-btn rounded-lg hover:bg-btn text-btn hover:text-neutral_5 font-bold mt-5 mx-auto">
                  Mua hàng
                </button>
              </>
            </Link>
          </div>
        </div>
      )}
    </div>
  ) 
}
