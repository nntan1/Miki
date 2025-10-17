import { Link } from 'react-router-dom';
import { Arrow, FbIcon, TwiterIcon, InstaIcon, TiktokIcon, VectorIcon } from '../../../Components/icons';
export function Footer() {
  return (
    <>
      <div className="px-[152px] text-center h-[506px]">
        <div className="h-[160px] flex justify-between border-b-[1px] border-solid border-[#692b0e]">
          <div>
            <h1 className="promotion-title">Đăng kí để nhận khuyến mãi</h1>
            <div className="flex mt-[38px] rounded-[8px] w-[380px] h-[42px] border-[1px] border-[#692b0e] overflow-hidden bg-white items-center">
              <input
                className="outline-none w-full ml-[16px] my-[9px] leading-[24px] pr-14"
                type="text"
                placeholder="Email"
              />
              <Arrow className="mr-[16px] cursor-pointer" fill='#000000'/>
            </div>
          </div>
          <div className="relative">
            <h1 className="promotion-title">Kết nối với chúng tôi tại</h1>
            <div className="flex mt-[38px] absolute right-0">
              <p className="mr-[32px]">
                <FbIcon />
              </p>
              <p className="mr-[32px]">
                <TwiterIcon />
              </p>
              <p className="mr-[32px]">
                <InstaIcon />
              </p>
              <p className="mr-[32px]">
                <TiktokIcon />
              </p>
              <p>
                <VectorIcon />
              </p>
            </div>
          </div>
        </div>
        <div className="h-[346px]">
          <div className="relative flex py-[33px]">
            <div className="w-[352px] overflow-hidden">
              <h1 className="logo">MIKI JEWELRY</h1>
              <div className="mt-[12px]">
                <p className="absolute left-0">Số GCNĐKDN: 2500150335</p>
                <br />
                <p className="absolute left-0">Cấp lần đầu: Ngày 26/03/2007</p>
                <br />
                <p className="absolute left-0">Đăng ký thay đổi lần thứ 16: Ngày</p>
                <br />
                <p className="absolute left-0">07/05/2018</p>
                <br />
                <p className="absolute left-0">Cơ quan cấp: Sở kế hoạch và đầu tư</p>
                <br />
                <p className="absolute left-0"> tỉnh Vĩnh Phúc</p>
                <br />
                <p className="absolute left-0">Địa chỉ: Phường Phúc Thắng, Thành</p>
                <br />
                <p className="absolute left-0">phố Phúc Yên, Tỉnh Vĩnh Phúc, Việt Nam</p>
              </div>
            </div>
            <div className="flex justify-between  mt-[5px]">
              <ul className="ml-[100px] relative">
                <Link to={'about'}>
                <li className="absolute font-bold w-[140px] pr-[32px]">Về chúng tôi</li>
                </Link>
                <br />
                <li className="mt-[20px]">Thương hiệu</li>
                <Link to={'about'}>
                <li className="absolute mt-[20px]">Lịch sử</li>
                </Link>
                <br />
                <Link to={'/tuyendung'}>
                <li className="absolute mt-[40px]">Tuyển dụng</li>
                </Link>
                <br />
              </ul>
              <ul className="relative ml-[108px]">
                <li className="absolute font-bold">Tài khoản</li>
                <br />
                <li className="mt-[20px]">Lịch sử mua hàng</li>
                <li className="absolute mt-[20px]">Giỏ hàng</li>
                <br />
                <li className="absolute mt-[40px]">Thông tin</li>
                <br />
              </ul>
              <ul className=" ml-[90px]">
                <li className="absolute font-bold">Dịch vụ khách hàng</li>
                <br />
                <li className="mt-[20px]">Thanh toán</li>
                <li className="absolute mt-[20px]">Cẩm nang sử dụng</li>
                <br />
                <li className="absolute mt-[40px]">Câu hỏi thường gặp</li>
              </ul>
            </div>
          </div>
          <br />
          <div>
            <p className="text-[#868585] text-center">MikiShop © 2022</p>
          </div>
        </div>
      </div>
    </>
  );
}
