import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  IconDown,
  LogoIcon,
  SearchIcon,
  UserIcon,
  CartIcon,
  Account,
  Logout,
  Loading,
} from "../../../Components/icons";
import { cartState } from "../../../recoils/cartState";
import { dataUser } from "../../../recoils/dataUser";
import { useDebounce } from "../../../hooks/useDebounce";
import { FormatMoney } from "../../../utils/formatMoney";
import { toast } from "react-toastify";

export function Header() {
  const [user, setUser] = useRecoilState(dataUser);
  const [cart, setCart] = useRecoilState(cartState);
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchDebound = useDebounce(search, 2500);

  useEffect(() => {
    const res = axios({
      method: "GET",
      url: `https://localhost:7226/api/Products?page=${1}&sortBy=name&order=asc&keySearch=${searchDebound}`,
    });
    res
      .then((res) => {
        setSearchResult(res.data.data);
      })
      .catch((e) => {});
    setLoading(false);
  }, [searchDebound]);

  const LogOut = () => {
    setUser(null);
    setCart([]);
    localStorage.clear();
    toast.success(`Đăng xuất thành công`);
  };
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  //hidden icon Cart and User
  const [hidden, setHidden] = useState(true);
  //change size Input
  const growUpInput = (parrent) => {
    setHidden(false);
    parrent.style.width = "396px";
  };

  const changeNormal = (parrent) => {
    setHidden(true);
    parrent.style.width = "252px";
  };

  return (
    <>
      <div className="px-[152px] containerHeader">
        <ul className="header-section1">
          <Link to="/">
            <li>
              <span className="font-bold cursor-pointer">Trang Chủ</span>
            </li>
          </Link>
          <div className="flex items-center group">
            <Link to="/products">
              <span className="relative ml-[50px] font-medium cursor-pointer">
                Sản phẩm
              </span>
            </Link>
            <IconDown className="ml-[14px] mt-[1px] cursor-pointer" />
            <div className="absolute top-[10px] left-0 w-[1136px] h-[186px] mt-[40px] z-20 bg-bgm justify-evenly font-medium leading-[24px] hidden group-hover:flex animate-growth origin-[20%_2%] pseudoDropdown hover:flex">
              <ul className="w-[254px] text-center h-[186px]">
                <li className="pt-[2px] pb-[13px] font-bold">Nhẫn</li>
                <li className="pb-[8px]">Nhẫn cỡ lớn</li>
                <li className="pb-[8px]">Nhẫn ngón út</li>
                <li className="pb-[8px]">Nhẫn xoay</li>
                <li>Nhẫn cưới</li>
              </ul>
              <div className="h-[129px] border-solid border-l-[1px] border-neutral_1 mt-[21px]"></div>
              <ul className="w-[254px] text-center h-[186px]">
                <li className="pt-[2px] pb-[13px] font-bold">Dây chuyền</li>
                <li className="pb-[8px]">Dây chuyền trơn</li>
                <li className="pb-[8px]">Dây chuyền có mặt</li>
                <li>Mặt dây chuyền</li>
              </ul>
              <div className="h-[129px] border-solid border-l-[1px] border-neutral_1 mt-[21px]"></div>
              <ul className="w-[254px] text-center h-[186px]">
                <li className="pt-[2px] pb-[13px] font-bold">Bông tai</li>
                <li className="pb-[8px]">Bông tai xỏ lỗ</li>
                <li className="pb-[8px]">Bông tai treo</li>
                <li>Khuyên vành tai</li>
              </ul>
              <div className="h-[129px] border-solid border-l-[1px] border-neutral_1 mt-[21px]"></div>
              <ul className="w-[254px] text-center h-[186px]">
                <li className="pt-[2px] pb-[13px] font-bold">Lắc</li>
                <li className="pb-[8px]">Lắc tay</li>
                <li className="pb-[8px]">Lắc chân</li>
                <li>Charm</li>
              </ul>
            </div>
          </div>
          <li className="relative group">
            <span className="ml-[40px] font-medium cursor-pointer">
              Về chúng tôi
            </span>
            <ul className="absolute ml-[40px] hidden group-hover:block animate-growth origin-[20%_2%] pseudoDropdown z-50 bg-bgm w-[250px] shadow-xl p-3 rounded-md">
              <Link to={"/about"}>
                <li className="p-3 hover:font-medium hover:text-primary_3 hover:cursor-pointer">
                  Thương hiệu và lịch sử
                </li>
              </Link>
              <Link to={"/tuyendung"}>
                <li className="p-3 hover:font-medium hover:text-primary_3 hover:cursor-pointer">
                  Tuyển dụng
                </li>
              </Link>
            </ul>
          </li>
        </ul>
        <div className="mt-[16px]">
          <LogoIcon />
          <h1 className="logo">MIKI JEWELRY</h1>
        </div>
        <div className="header-section3">
          <div className="relative">
            <div className="items-center duration-200 ease-linear wrapInput">
              <input
                onBlur={(e) => {
                  changeNormal(e.target.parentNode);
                }}
                onFocus={(e) => {
                  growUpInput(e.target.parentNode);
                }}
                onChange={(e) => {
                  setLoading(true);
                  setSearch(e.target.value);
                  if (e.target.value == "") {
                    setSearchResult([]);
                    setLoading(false);
                  }
                }}
                id="inputSearch"
                className="pr-8 input"
                type="text"
                placeholder="Tìm kiếm"
              />
              <label htmlFor="inputSearch">{loading && <Loading />}</label>
            </div>
            <ul className="absolute left-0 rounded right-0 top-50px shadow-lg z-[1000] bg-[#fff9f6]">
              {searchResult.map((item) => (
                <li>
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      alignItems: "center",
                      gap: ".5rem",
                      padding: "1rem",
                      borderBottom: "1px solid #ccc",
                    }}
                    onClick={() => {                      
                      setSearchResult([]);
                      setSearch("");
                    }}
                  >
                    <span className="w-[50px] h-[50px]">
                      <img
                        className="w-full h-full"
                        src={item.pictures[0].url}
                      />
                    </span>
                    <div className="flex flex-col">
                      <h4 className="text-[18px] font-bold">{item.name}</h4>
                      <h5>{<FormatMoney money={item.stocks[0].price} />}</h5>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex ml-[25px]">
            <Link to="/cart" style={{ display: "flex", alignItems: "center" }}>
              <CartIcon />
            </Link>
            {!isSSR ? (
              <div
                className={`${
                  cart.length != 0 && user ? "visible" : "invisible"
                } relative left-[-14px] rounded-full px-[0.3125rem] text-center h-6 border-solid border-neutral_1 text-white bg-red-400 mr-[-0.875rem] leading-6 min-w-[24px] w-auto top-[-9px]`}
              >
                {cart.length}
              </div>
            ) : null}
            {hidden && (
              <div className="relative group">
                <UserIcon
                  className={"ml-[35px] cursor-pointer hover:opacity-60"}
                />
                <p className="w-[150px]">{user?.firstName || ""}</p>
                <div className="absolute bottom-[-100px] right-[-52px] z-20 hidden group-hover:block animate-growth">
                  <div className="border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent w-[0px] h-[0px] border-b-[12px] border-b-primary_5 shadow-lg ml-[120px]"></div>
                  <ul className="shadow-xl cursor-pointer bg-primary_5">
                    <li
                      onClick={() => {
                        navigate(
                          user
                            ? user.role == "Admin"
                              ? "/admin"
                              : "/profile"
                            : "/login"
                        );
                      }}
                      className="w-[200px]  text-left px-3 py-2 leading-7 text-base hover:bg-primary_2 hover:text-white font-bold"
                    >
                      <span className="flex items-center justify-start">
                        <Account />
                        <span className="ml-2">Tài khoản của tôi</span>
                      </span>
                    </li>
                    <li className="w-[200px] text-left px-3 py-2 leading-7 text-base hover:bg-primary_2 hover:text-white font-bold">
                      <span
                        onClick={() => {
                          if (user) {
                            LogOut();
                          } else {
                            navigate("/login");
                          }
                        }}
                        className="flex items-center justify-start logout"
                      >
                        <Logout />
                        {!isSSR && (
                          <p className="ml-2">
                            {user ? "Đăng xuất" : "Đăng nhập"}
                          </p>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
