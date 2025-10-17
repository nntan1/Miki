import axios from 'axios';
import React from 'react';
import { PlusIcon, MinusIcon } from './icons/Icons_2'


export default function AddAndRemoveItems(props) {
  const { product, index, itemState, setItemState } = props
  const handleAddProduct = async (indexofProduct, method) => {
    setItemState((prev) =>
      prev.map((pro, index) => {
        if (index == indexofProduct) {
          let quantity = itemState[indexofProduct].quantity
          if (method == 'remove') {
            pro = { ...itemState[indexofProduct], quantity: itemState[indexofProduct].quantity - 1 };
            quantity -= 1;
          }
          else {
            pro = { ...itemState[indexofProduct], quantity: itemState[indexofProduct].quantity + 1 };
            ++quantity;
          }
          //handleModifyQuantityApi(itemState[indexofProduct]._id, quantity)
        }
        return pro;
      }),
    );
  };

  return (
    <div className="flex items-center justify-between w-[104px] h-8">
      <button
        disabled={product.quantity == 1}
        onClick={() => handleAddProduct(index, 'remove')}
        className="w-[32px] h-[32px] rounded-full flex justify-center items-center font-bold cursor-pointer active:bg-black active:text-[#D4BBAA]"
      >
        <MinusIcon className="w-6 h-6 active:text-white" />
      </button>
      <p className="font-bold text-[20px] leading-[28px]">{product.quantity}</p>
      <div
        onClick={() => handleAddProduct(index, 'add')}
        className="w-[32px] h-[32px] rounded-full flex justify-center items-center font-bold cursor-pointer active:bg-black active:text-[#D4BBAA]"
      >
        <PlusIcon className={'active:text-white w-8 h-8'} />
      </div>
    </div>
  )
}
