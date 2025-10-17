import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AvartarChat from "../../../Components/avartarChat";
import { IconStar, IconTheEnd, IconUpload } from "../../../Components/icons";
import ReviewStar from "../../../Components/reviewStart";
import { tabUIState } from "../../../recoils/tabUIState";
import { dataUser } from "../../../recoils/dataUser";
import { ordersState } from "../../../recoils/ordersState";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetailsSection2({ product }) {

  const p = useParams();
  const [toogleTab, setToogleTab] = useRecoilState(tabUIState);
  const user = useRecoilValue(dataUser);
  const [stateDsc, setStateDsc] = useState("");
  const [stateStar, setStateStar] = useState({});
  const orders = useRecoilValue(ordersState);
  const [comments,setComments] = useState([]);
  const [update,setUpdate] = useState();

  const checkHaveRoleToComment = (id) => {
    return orders.some( (d) => d.status == "Giao thành công" && d.products.some( p => p.productID == id ) );
  };

  const handleSubmitReview = async () => {
    setStateDsc("");
    setStateStar({});
    const data = {
      rating: ("" + stateStar?.index).length,
      content: stateDsc,
      productId: product.id,
      userId: user?.userInforId,
    };
    const res = await axios({
      method : "POST",
      url : "https://localhost:7226/api/Comments" ,
      data : data
    })
    setUpdate(prev => !prev);
  };

  useEffect( () => {
    const fetch = async () => {
      const res = await axios({
        method : "GET",
        url : `https://localhost:7226/api/Comments?productId=${p?.id}` ,
      })
      setComments(res.data.data);
    }
    fetch();
  },[update] )

  return (
    <>
      <div className="px-[152px] tracking-[-0.019em] scroll-smooth">
        <ul className="ulTabUiPro_2">
          <li
            className={
              toogleTab === 1
                ? "activeTabItem cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => setToogleTab(1)}
          >
            Mô tả
          </li>
          <li
            className={
              toogleTab === 2
                ? "activeTabItem cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => setToogleTab(2)}
          >
            Bảo hành và Hoàn trả
          </li>
          <li
            className={
              toogleTab === 3
                ? "activeTabItem cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => setToogleTab(3)}
          >
            Vận chuyển
          </li>
          <li
            className={
              toogleTab === 4
                ? "activeTabItem cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => setToogleTab(4)}
          >
            Đánh giá
            <p className="inline-block">(02)</p>
          </li>
        </ul>
        <div
          className={toogleTab === 1 ? "pDescPro_2 activeContent" : "hidden"}
        >
          <p>{product?.desc}</p>
        </div>
        <div
          className={toogleTab === 2 ? "pDescPro_2_2 activeContent" : "hidden"}
        >
          <div className="flex justify-between w-full">
            <div>
              <h1 className="textTitle">Chính sách bảo hành:</h1>
              <p>(Áp dụng cho vàng 18k) </p>
            </div>
            <table className="w-[800px] h-[128px] boderTable text-justify rounded-[4px]">
              <thead>
                <tr>
                  <th className="h-[42px] px-[8px] boderTable">Nội dung</th>
                  <th className="h-[42px] px-[8px] bboderTable">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="h-[42px] px-[8px] boderTable">
                    Làm sạch sản phẩm
                  </td>
                  <td className="h-[42px] px-[8px] boderTable">Trọn đời</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="h-[42px] px-[8px] boderTable">
                    Đánh bóng và xi mới
                  </td>
                  <td className="h-[42px] px-[8px] boderTable">05 lần</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex w-full justify-between mt-[32px]">
            <h1 className="textTitle">Phí bảo hành:</h1>
            <table className="w-[800px] h-[128px] boderTable text-justify rounded-[4px]">
              <thead>
                <tr>
                  <th className="h-[42px] px-[8px] boderTable">
                    Nội dung bảo hành
                  </th>
                  <th className="h-[42px] px-[8px] boderTable">
                    {" "}
                    Chi phí bảo hành (/lần)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="h-[42px] px-[8px] boderTable">
                    Sửa độ rung với sản phẩm Ladanse
                  </td>
                  <td className="h-[42px] px-[8px] boderTable">200.000 đ</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="h-[42px] px-[8px] boderTable">
                    Làm mới sản phẩm
                  </td>
                  <td className="h-[42px] px-[8px] boderTable">50.000 đ</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <h1 className="textTitle mt-[32px]">Lưu ý: </h1>
          <p>
            Sản pẩm không còn nguyên vẹn hoặc mất hóa đơn, Miki sẽ thâu mua lại
            với 80% giá trị sản phẩm.
          </p>
          <p>
            Các sản pẩm trang sức bạc, mạ vàng, vòng đá, dây da các loại, chuỗi
            ngọc trai: Miki không mua lại
          </p>
        </div>
        <div
          className={
            toogleTab === 3
              ? "font-medium mt-[44px] w-[1132px] tracking-[-0.019em] activeContent"
              : "hidden"
          }
        >
          <div className="w-full leading-[34px]">
            <div>
              <h1 className="textTitle">Chính sách vận chuyển</h1>
              <p>
                Với đối tác giao hàng uy tín, có mua bảo hiểm hàng hóa, thời
                gian giao hàng nhanh và đúng hẹn:
              </p>
            </div>
            <table className="w-[940px] borderTable ml-[110px] mt-[24px]">
              <thead>
                <tr>
                  <th className="boderTable h-[42px] px-[8px] text-left">
                    Nội dung
                  </th>
                  <th className="boderTable h-[42px] px-[8px] text-left">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="boderTable h-[42px] px-[8px] text-left">
                    Làm sạch sản phẩm
                  </td>
                  <td className="boderTable h-[42px] px-[8px] text-left">
                    Trọn đời
                  </td>
                </tr>
                <tr>
                  <td className="boderTable h-[42px] px-[8px] text-left">
                    Đánh bóng và xi mới
                  </td>
                  <td className="boderTable h-[42px] px-[8px] text-left">
                    05 lần
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-[28px] text-red-500 font-medium">**** Chú ý: </p>
            <p>
              Với sản phẩm giảm giá khuyến mãi từ 20% trở lên khách hàng sẽ chịu
              hoàn toàn phí giao hàng.
            </p>
          </div>
        </div>
        <div
          id="review"
          className={
            toogleTab === 4
              ? "font-medium mt-[44px] w-[1132px] tracking-[-0.019em] activeContent"
              : "hidden"
          }
        >
          <h1 className="textTitle">Đánh giá sản phẩm</h1>
          <div className="flex">
            <div className="ml-[60px]">
              <p className="font-medium text-base ml-[24px] mt-[13px]">4.0</p>
              <div className="flex mt-[2px] w-[80px] h-[15px] mr-[8px]">
                {[...Array(4)].map(() => {
                  return <IconStar fill="#FBBC05" />;
                })}
                {(() => {
                  const arr = [];
                  for (let i = 1; i <= 1; i++) {
                    const Item = <IconStar fill="#A9A9A9" />;
                    arr.push(Item);
                  }
                  return arr;
                })()}
              </div>
            </div>
            <div className="flex flex-wrap mt-[2px]">
              <ReviewStar type="Tất cả" />
              <ReviewStar type={`5 Sao (${"0"})`} />
              <ReviewStar type={`4 Sao (${"0"})`} />
              <ReviewStar type={`3 Sao (${"0"})`} />
              <ReviewStar type={`2 Sao (${"2"})`} />
              <ReviewStar type={`1 Sao (${"0"})`} />
              <ReviewStar type={`Có bình luận (${"0"})`} />
              <ReviewStar type={`Có hình ảnh/ video (${"0"})`} />
            </div>
          </div>
          {/* map comment */}
          {
            comments.map( item => (
              <AvartarChat
                userName={item.name}
                userId={item.userId}
                time={item.createAt}
                content={item.content}
                rating={item.rating}
                commentsId={item.id}
                setUpdate={setUpdate}
          />
            ) )
          }
          <div className="w-full py-[17px] px-[58px] mt-[24px] bg-[#FFFFFF]">
            <p className="text-base font-bold">Đánh giá sản phẩm này*</p>
            <div className="flex">
              <div
                onClick={() => setStateStar({ index: 1, fillState: "#FBBC05" })}
              >
                <IconStar
                  className="starReviewPro_2"
                  fill={stateStar.index >= 1 ? stateStar.fillState : "#A9A9A9"}
                />
              </div>
              <div
                onClick={() =>
                  setStateStar({ index: 12, fillState: "#FBBC05" })
                }
              >
                <IconStar
                  className="starReviewPro_2"
                  fill={stateStar.index >= 12 ? stateStar.fillState : "#A9A9A9"}
                />
              </div>
              <div
                onClick={() =>
                  setStateStar({ index: 123, fillState: "#FBBC05" })
                }
              >
                <IconStar
                  className="starReviewPro_2"
                  fill={
                    stateStar.index >= 123 ? stateStar.fillState : "#A9A9A9"
                  }
                />
              </div>
              <div
                onClick={() =>
                  setStateStar({ index: 1234, fillState: "#FBBC05" })
                }
              >
                <IconStar
                  className="starReviewPro_2"
                  fill={
                    stateStar.index >= 1234 ? stateStar.fillState : "#A9A9A9"
                  }
                />
              </div>
              <div
                onClick={() =>
                  setStateStar({ index: 12345, fillState: "#FBBC05" })
                }
              >
                <IconStar
                  className="starReviewPro_2"
                  fill={
                    stateStar.index === 12345 ? stateStar.fillState : "#A9A9A9"
                  }
                />
              </div>
            </div>
            <ul className="flex justify-between mt-[16px]">
              <li className="text-base font-bold">Bình luận*</li>
            </ul>
            <div className="wrapInProDetail_2">
              <input
                value={stateDsc}
                disabled={user == null ? true : !checkHaveRoleToComment(product?.id) }
                onChange={(e) => setStateDsc(e.target.value)}
                className="inputDescProDetail_2"
                type="text"
                placeholder="Nhập mô tả tại đây"
              />
            </div>
            {/* <ul className='flex mt-[16px] items-center'>
                     <li className='text-base font-bold text-neutral_1'>Thêm hình ảnh/video sản phẩm nếu có:</li>
                     <input
                        id='picReview'
                        className='hidden'
                        type="file"
                        multiple
                        onChange={(e) => { }
                        }
                     />
                     <label
                        htmlFor="picReview"
                        className='uploadImgProDetail_2'>
                        <IconUpload className='ml-[13px] mr-[9px]' />
                        Ảnh/Video
                     </label>
                  </ul> */}
            <div className="mt-[16px] flex justify-end">
              <button className="btnSkipProDetail_2">Bỏ qua</button>
              <button
                onClick={() => handleSubmitReview()}
                className="btnSendProDetail_2"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
        <IconTheEnd className="ml-[26%] mt-[60px]" />
      </div>
    </>
  );
}
