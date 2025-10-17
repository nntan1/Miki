import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import DeleteForm from "./deleteForm";
import { axiosClient } from "../../../utils/axios";

export default function Orders() {
  const [currentOrders, setCurrentOrders] = useState({
    data: {},
    isEdit: false,
    modalOpen: false,
  });
  const [id, setId] = useState();
  const [update, setUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  //func of addOrders (delete and add)
  const notify = () => {
    toast.success("Remove success", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  };

  const handleAddOrders = () => {
    setCurrentOrders({
      data: {},
      isEdit: false,
      modalOpen: true,
    });
  };

  //handle of detailBtn

  const handleDetail = (Orders) => {
    const res = axiosClient({
        method: 'POST',
        url: `https://localhost:7226/api/Order/ApproveOrder?orderId=${Orders.id}`,
      });
      res.then(() => {
        console.log(1);
          toast.success("Cập nhật thành công");   
          setUpdate(prev => !prev);
      })
        .catch((e) =>{ 
          toast.error(e.response.data.message)});
  };

  //State of paginate

  const [pageCount, setPageCount] = useState(null);
  const [page, setPage] = useState(1);
  const [currentOrdersPage, setCurrentOrdersPage] = useState(null);
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };
  const handleActivePage = (e) => {
    console.log(e);
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const res = await axios({
        method: "GET",
        url: `https://localhost:7226/api/Order/GetOrders?pageSize=5&pageIndex=${page}`,
      });
      const { data, pagination } = res.data;
      const { _page, _limit, _totalRows } = pagination;
      //setPagination(pagination);
      //số trang
      setPageCount(Math.ceil(_totalRows / _limit));
      //setOrderss(Orderss);
      setCurrentOrdersPage(data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [page, update]);

  const tableToolbar = [
    {
      style: "pr-5 text-sm",
      label: "ID",
    },
    {
      style: "pr-8 w-[200px] text-sm",
      label: "Mã người dùng",
    },
    {
      style: "pr-8 w-[200px] text-sm",
      label: "Địa chỉ",
    },
    {
      style: "pr-8 w-[200px] text-sm",
      label: "Số điện thoại",
    },
    {
      style: "pr-8 w-[200px] text-sm",
      label: "Ngày tạo",
    },
    {
      style: "pr-8 w-[200px] text-sm",
      label: "Trạng thái",
    },
    {
      style: "pr-8 text-sm",
      label: "Tùy chọn",
    },
  ];

  const Status = [
    ,
    { style: "text-red-500", lable: "Chờ duyệt" },
    { style: "text-blue-500", lable: "Duyệt thành công" },
    { style: "text-red-500", lable: "Đã hủy" },
    { style: "text-green-500", lable: "Giao thành công" },
  ];

  return (
    <div className="m-5 bg-white">
      <div className="p-3 font-bold text-blue-300 border-b-[1px] border-solid border-[#ccc]">
        Đơn hàng
      </div>
      <table className="m-3">
        <tbody>
          <tr>
            <th className="pr-5 text-sm font-bold pl-5 bg-[#514943] text-white"></th>
            {tableToolbar.map((item, index) => (
              <th
                key={index}
                className={`${item.style} font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]`}
              >
                {item.label}
              </th>
            ))}
          </tr>
          {currentOrdersPage?.map((Orders, index) => (
            <tr
              className={index % 2 == 1 ? "bg-[#ccc]" : "bg-white"}
              key={Orders.id}
            >
              <td className={`border-l border-b border-[#87807c] text-center`}>
                {(page - 1) * 10 + index + 1}
              </td>
              <td className="border-l w-[350px] border-b border-[#87807c] text-center">
                {Orders.id}
              </td>
              <td className="border-l w-[600px] border-b border-[#87807c] text-center">
                {Orders.userId}
              </td>
              <td className="border-l w-[350px] border-b border-[#87807c] text-center">
                {Orders.address}
              </td>
              <td className="border-l w-[350px] border-b border-[#87807c] text-center">
                {Orders.phoneNumber}
              </td>
              <td className="border-l w-[350px] border-b border-[#87807c] text-center">
                {Orders.createAt}
              </td>
              <td className={`${Status[Orders.statusId].style} border-l w-[350px] border-b border-[#87807c] text-center font-bold`}>
                {Status[Orders.statusId].lable}
              </td>
              <td className="border-l border-b w-[1000px] border-[#87807c] text-center border-r">
                {/* <button
                                        className='p-1 text-white bg-blue-400 rounded-lg'
                                        onClick={() => handleDetail(Orders)}
                                    >Chi tiết</button> */}
                {
                    Orders.statusId == 1 && (
                        <>
                        <button
                  onClick={() => handleDetail(Orders)}
                  className="mx-[5px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Phê duyệt
                </button>
                <button
                  onClick={() => {
                    handleDelete(Orders.id);
                  }}
                  className="mx-[5px] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                >
                  Hủy bỏ
                </button>
                        </>
                    )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end pb-6">
        {openDelete && (
          <DeleteForm setOpen={setOpenDelete} id={id} setUpdate={setUpdate} />
        )}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          onPageActive={handleActivePage}
          activeLinkClassName="active"
          pageRangeDisplayed={3}
          pageCount={pageCount}
          pageClassName="pageLi"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={"paginationAdmin"}
          pageLinkClassName={"pageBtn"}
          previousLinkClassName={"pageBtn"}
          nextLinkClassName={"pageBtn"}
        />
      </div>
    </div>
  );
}
