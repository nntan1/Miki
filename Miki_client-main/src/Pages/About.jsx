import React from "react";
import { Decoration } from "../Components/Decoration";

export default function About() {
  return (
    <>
      <Decoration className="absolute top-[2100px]" width="504" height="551" />
      <Decoration
        className="absolute top-[-179px] left-[-180px]"
        width="359"
        height="359"
      />
      <Decoration
        className="absolute top-[1125px] left-[1140px]"
        width="359"
        height="359"
      />
      <div className="w-[1440px] h-[660px] relative z-[10] bg-[url('/assets/images/about1.jpg')] bg-center bg-cover bg-no-repeat mb-[123px]">
        <h1 className="w-[544px] h-[114px] absolute font-playfair text-[48px] font-bold leading-[58px] top-[59px] left-[152px]">
          “Miki Jewelry - Tales of Happiness”
        </h1>
        <div className="w-[544px] h-[240px] grid grid-rows-2 absolute top-[205px] left-[154px] text-[16px] leading-[24px] font-medium">
          <p>
            Lần đầu ra mắt thị trường vào năm 2015, Miki mong muốn mang tới
            những sản phẩm Nữ trang được đầu tư về thiết kế, minh bạch về thông
            tin giao dịch hàng hoá và mang đến khách hàng dịch vụ hậu mãi trọn
            vẹn.
          </p>
          <p>
            Đến năm 2022, cùng với sự tái định vị thương hiệu, Miki thay đổi
            nhận diện và chiến lược kinh doanh. Vẫn giữ những giá trị cốt lõi về
            sản phẩm, Miki mong muốn mỗi món quà trang sức đều giúp khách hàng
            ghi dấu những khoảnh khắc, những câu chuyện hạnh phúc trong suốt
            cuộc đời.
          </p>
        </div>
      </div>
      <div className="flex justify-between px-[154px] h-[383px] mb-[120px]">
        <div className="w-[544px]">
          <h1 className="text-[32px] font-bold leading-[40px] w-full h-[57px] pb-[32px]">
            Thiết kế độc quyền từ Hàn Quốc
          </h1>
          <p className="h-[192px] w-full">
            Lấy tầm nhìn trở thành “Nhà bán lẻ trang sức dẫn đầu xu hướng",
            trang sức Miki mang phong cách trẻ trung, hiện đại, liên tục cập
            nhật những xu hướng mới từ Hàn Quốc. Ba dòng sản phẩm chủ lực của
            Miki Jewelry gồm có: Nhẫn, Đồng hồ, Lắc tay, Dây chuyền và các Trang
            sức hiện đại cho nữ giới. Khách hàng sở hữu trang sức từ Miki
            Jewelry đồng thời sở hữu xu hướng mới nhất đến từ thế giới, được thể
            hiện bằng sản phẩm mang tính sáng tạo, đột phá trong thiết kế và
            công nghệ chế tác.
          </p>
        </div>
        <div className="w-[548px] h-full bg-[url('/assets/images/about2.jpg')]"></div>
      </div>
      <div className="flex justify-between px-[154px] h-[383px] mb-[120px]">
        <div className="w-[548px] h-full bg-[url('/assets/images/about3.jpg')]"></div>
        <div className="w-[544px]">
          <h1 className="text-[32px] font-bold leading-[40px] w-full h-[57px] pb-[32px]">
            Những câu chuyện hạnh phúc
          </h1>
          <p className="h-[192px] w-full">
            Mang trong mình sứ mệnh sẽ trở thành bạn đồng hành luôn thấu hiểu và
            trân trọng từng khoảnh khắc trong cuộc sống của khách hàng, Miki
            Jewelry là “Tales of Happines” (Câu chuyện của hạnh phúc). Hạnh
            phúc, tình yêu, kỉ niệm,… được hình hóa thành những món quà ở lại
            mãi với thời gian, mà luôn gợi nhắc mỗi người từng dấu mốc đáng nhớ
            đã trải qua. Như chiếc lắc tay cô gái tự thưởng cho mình nhân dịp
            thăng chức sau thời gian nỗ lực trong công việc. Hay sợi dây chuyền
            bạn trai đích thân chọn mua tặng người yêu nhân kỉ niệm của hai
            người......
          </p>
        </div>
      </div>
      <div className="flex justify-between px-[154px] h-[383px] mb-[120px]">
        <div className="w-[544px]">
          <h1 className="text-[32px] font-bold leading-[40px] w-full h-[89px] pb-[32px]">
            Lợi thế cạnh tranh trong sản xuất & chế tác
          </h1>
          <p className="h-[192px] w-full">
            Sở hữu xưởng sản xuất rộng hơn 3000m2 tại Vĩnh Phúc dây chuyền sản
            xuất hiện đại cùng với kinh nghiệm hơn 15 năm trong ngành sản xuất
            kim hoàn, Miki tự hào được nhà nước bảo hộ cấp phép chế tác các loại
            nữ trang. Miki cam kết mang đến khách hàng những sản phẩm chất lượng
            tốt nhất với mức giá dễ tiếp cận nhất, để trang sức không còn là một
            món đồ xa xỉ, mà là món quà, món phụ kiện mà bất kì ai cũng có thể
            sở hữu hoặc trao tặng.
          </p>
        </div>
        <div className="w-[548px] h-full bg-[url('/assets/images/about4.jpg')]"></div>
      </div>
      <div className="flex justify-between px-[154px] h-[383px] mb-[120px]">
        <div className="w-[548px] h-full bg-[url('/assets/images/about5.jpg')]"></div>
        <div className="w-[544px]">
          <h1 className="text-[32px] font-bold leading-[40px] w-full h-[57px] mb-[32px]">
            Dịch vụ hậu mãi tận tâm-chu đáo
          </h1>
          <p className="h-[192px] w-full">
            Mỗi sản phẩm, giao dịch tại Miki đều cam kết minh bạch, đầy đủ hoá
            đơn cho toàn bộ giao dịch. Miki mang đến dịch vụ chăm sóc và hậu mãi
            trọn đời với những đặc quyền hấp dẫn để khách hàng có thể có trải
            nghiệm mua sắm trọn vẹn nhất.
          </p>
        </div>
      </div>
    </>
  );
}
