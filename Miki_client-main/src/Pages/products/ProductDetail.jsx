import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ToastMessage from "../../Components/ToastMessage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { tabUIState } from "../../recoils/tabUIState";
import { FormatMoney } from "../../utils/formatMoney";
import { cartState } from "../../recoils/cartState";
import { MinusIcon, PlusIcon, Arrow, IconStar } from "../../Components/icons";
import { dataUser } from "../../recoils/dataUser";
import ProductDetailsSection2 from "../../sections/main/products/ProductDetailsSection2";
import ProductDetailsSection3 from "../../sections/main/products/ProductDetailsSection3";

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useRecoilState(cartState);
  //handle Tab UI
  const setToogleTab = useSetRecoilState(tabUIState);
  const handleScroll = (index) => {
    setToogleTab(index);
  };
  //Size review
  const [stock, setStock] = useState();
  const [selectSizeState, setSelectSizeState] = useState();
  const handleSelectSize = (size) => {
    setSelectSizeState(size);
  };
  //quantity select
  const [quantityState, setQuantityState] = useState(1);
  //handle image review
  const [imageState, setImageState] = useState(1);
  //handleAddToCart
  const user = useRecoilValue(dataUser);
  const handleAddToCart = async (product) => {
    const item = product.stocks.filter(
      (item) => item.sizeId == +selectSizeState
    )[0];
    const productId = product.id;
    const size = +selectSizeState;
    const name = product?.name;
    const cost = item?.price;
    const quantity = quantityState;
    const userId = user.userInforId;
    const picture = product.pictures[0].url;
    const selectedPro = {
      productId,
      name,
      price : cost,
      quantity,
      sizeId : size,
      userId,
      url : picture,
      cartId : user.cartId ,
    };
    console.log(cart)
    let cartItems = cart;
    const indexHavedItem = cart.findIndex( item => item.productId == productId && item.size == size );
    if ( indexHavedItem != -1 )
    {
      cartItems[indexHavedItem].quantity = quantity + cart[indexHavedItem].quantity;
    }
    else {
      cartItems = [...cart, selectedPro] ;
    }
    setCart(cartItems);
    const respone = await axios({
      method: 'POST',
      data : selectedPro,
      url:`https://localhost:7226/api/Cart`,
    });
    console.log(respone);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2200);
  };
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios({
          method: "GET",
          url: `https://localhost:7226/api/Products/${id}`,
        });
        setProduct(res.data);
        setSelectSizeState(res.data?.stocks[0].sizeId);
        setStock(res.data?.stocks?.[0]);
      };
      fetch();
      window.scrollTo(0, 0);
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  useEffect(() => {
    const selectedStock = product?.stocks.find(
      (stock) => stock.sizeId == selectSizeState
    );
    setStock(selectedStock);
  }, [selectSizeState]);
  const [toast, setToast] = useState(false);
  return (
    <div>
      {toast && <ToastMessage />}
      <>
        <div className="mb-[69px] mt-[18px]">
          <ul className="flex text-base pl-[152px] pb-[32px]">
            <li className="flex items-center">
              <p className="pr-[4px] text-neutral_2 cursor-pointer">
                Trang chủ
              </p>
              <Arrow fill="#626262" />
            </li>
            <li className="flex items-center pl-[4px]">
              <p className="pr-[4px] text-neutral_2 cursor-pointer">
                Tất cả sản phẩm
              </p>
              <Arrow fill="#626262" />
            </li>
            <li className="flex items-center pl-[4px]">
              <p className="pr-[4px] font-bold text-neutral_2 cursor-pointer">
                {product?.name}
              </p>
            </li>
          </ul>
          <div className="px-[152px] flex">
            <div className="h-[465px] pr-[40px] flex-col justify-between overflow-hidden">
              {product?.pictures?.map((pic, index) => {
                return (
                  <img
                    className={
                      imageState === index + 1
                        ? "imgProductDetail border-[3px] border-neutral_3"
                        : "imgProductDetail border-[1px] border-neutral_3"
                    }
                    onClick={() => setImageState(index + 1)}
                    key={pic.index}
                    src={pic.url}
                    alt=""
                    width={156}
                    height={107}
                  />
                );
              })}
            </div>
            <div
              className={`mr-[40px] w-[450px] h-[465px] `}
              style={{
                backgroundImage: `url(${
                  product?.pictures[imageState - 1].url
                })`,
              }}
            >
              <img
                className="imagePreview mb-[12px] w-full h-full border-[2px] border-neutral_3 rounded-imgB"
                src={product?.pictures[imageState - 1].url}
                alt=""
              />
            </div>
            <div className="min-w-[420px]">
              <h1 className="h-[50px] text-[22px] leading-[30px] font-bold">
                {product?.name}
              </h1>
              <div className="flex mt-[20px]">
                <span
                  className="flex"
                  href="#review"
                  onClick={() => handleScroll(4)}
                >
                  <p className="font-medium text-neutral_3 leading-[22px] mr-[8px]">
                    4.0
                  </p>
                  <div className="flex mt-[2px] border-r-[2px] border-neutral_2 w-[80px] h-[15px] mr-[8px]">
                    {[...Array(4)].map(() => {
                      return <IconStar fill="#FBBC05" />;
                    })}
                    {(() => {
                      const arr = [];
                      for (let i = 1; i <= 5 - product?.rating; i++) {
                        const Item = <IconStar fill="#A9A9A9" />;
                        arr.push(Item);
                      }
                      return arr;
                    })()}
                  </div>
                </span>
                <p className="text-[14px] leading-[22px] font-medium mb-[2px] mr-[30px]">
                  0 Đã bán
                </p>
                <p className="text-base font-medium text-[#58C27D] leading-[20px]">
                  Còn {stock?.quantity} sản phẩm
                </p>
              </div>
              <div className="flex items-center mt-[25px]">
                <div className="h-[31px] relative text-neutral_2 text-[24px] leading-[32px] font-semibold min-w-[100px]">
                  {+product?.sale !== 0 && <FormatMoney money={stock?.price} />}
                  {+product?.sale !== 0 && (
                    <div className="absolute w-full h-[2px] bg-neutral_2 bottom-1/2"></div>
                  )}
                </div>
                {+product?.sale !== 0 && (
                  <div className="h-[20px] border-r-[2px] border-neutral_2 ml-[14px]"></div>
                )}
                {+product?.sale !== 0 && (
                  <div className="w-[50px] ml-[8px] bg-primary_2 text-white text-base font-medium rounded-[4px] text-center">
                    {product?.sale}%
                  </div>
                )}
              </div>
              <h1 className="text-[48px] leading-[58px] text-primary_2 mt-[14px] font-bold mb-[32px]">
                {+product?.sale === 0 ? (
                  <FormatMoney money={stock?.price} />
                ) : (
                  <FormatMoney
                    money={stock?.price - (stock?.price / 100) * product?.sale}
                  />
                )}
              </h1>
              <div className="flex items-center">
                <p className="pr-[88px] text-base font-medium">Kích thước:</p>
                {product?.stocks?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => handleSelectSize(item.sizeId)}
                      className={
                        selectSizeState == item.sizeId
                          ? "selectSize bg-neutral_1 text-white"
                          : "selectSize"
                      }
                    >
                      {item.sizeId + 15}
                    </p>
                  );
                })}
              </div>
              <div className="flex items-center mt-[8px] mb-10">
                <p className="pr-[107px] text-base font-medium">Số lượng: </p>
                <h1
                  onClick={() =>
                    quantityState > 1 && setQuantityState(quantityState - 1)
                  }
                  className="w-[32px] h-[32px] rounded-full flex justify-center items-center font-bold cursor-pointer active:bg-black active:text-[#D4BBAA]"
                >
                  <MinusIcon className="w-6 h-6 active:text-white" />
                </h1>
                <h1 className="w-[22px] text-[22px] font-semibold ml-[32px]">
                  {quantityState}
                </h1>
                <h1
                  onClick={() => setQuantityState(quantityState + 1)}
                  className="w-[32px] h-[32px] rounded-full flex justify-center items-center font-bold cursor-pointer active:bg-black active:text-[#D4BBAA]"
                >
                  <PlusIcon className={"active:text-white w-8 h-8"} />
                </h1>
              </div>
              <div className="h-[40px]">
                <button
                  className="btnAddCartProDetail"
                  onClick={() => {
                    if (user) {
                      handleAddToCart(product);
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
                <button className="btnBuyingProDetail">Mua ngay</button>
              </div>
            </div>
          </div>
        </div>
      </>
      <ProductDetailsSection2 product={product} />
      <ProductDetailsSection3 />
    </div>
  );
}
