import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import AddForm from './addForm';
import { Delete, Edit } from '../../../Components/icons/Icons';
import DeleteForm from './deleteForm';

export default function Accounts() {
    const [currentAccounts, setCurrentAccounts] = useState({
        data: {},
        isEdit: false,
        modalOpen: false,
    });
    const [id,setId] = useState();
    const [update, setUpdate] = useState(false);
    const [openDelete , setOpenDelete] = useState(false);
    //func of addAccounts (delete and add)
    const notify = () => {
        toast.success('Remove success', {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const handleDelete = (id) => {
        setId(id);
        setOpenDelete(true);
    }

    const handleAddAccounts = () => {
        setCurrentAccounts({
            data: {},
            isEdit: false,
            modalOpen: true,
        })
    }

    //handle of detailBtn

    const handleDetail = (Accounts) => {
        setCurrentAccounts({
            data: Accounts,
            isEdit: true,
            modalOpen: true,
        });
    }

    //State of paginate 

    const [pageCount, setPageCount] = useState(null);
    const [page, setPage] = useState(1);
    const [currentAccountsPage, setCurrentAccountsPage] = useState(null)
    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }
    const handleActivePage = (e) => {
        console.log(e);
    }

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const res = await axios({
                method: 'GET',
                url:`https://localhost:7226/api/Users?pageSize=5&pageIndex=${page}`,
            });
            const { data, pagination } = res.data;
            const { _page, _limit, _totalRows } = pagination;
            //setPagination(pagination);
            //số trang
            setPageCount(Math.ceil(_totalRows / _limit));
            //setAccountss(Accountss);
            setCurrentAccountsPage(data);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [page, update])

    const tableToolbar = [
        {
            style: "pr-5 text-sm",
            label: "ID"
        }, {
            style: "pr-8 w-[140px] text-sm",
            label: "Tên"
        }, {
            style: "pr-8 w-[200px] text-sm",
            label: "Email"
        }, {
            style: "pr-8 text-sm w-[150px]",
            label: "Số điện thoại"
        },
        {
            style: "pr-8 text-sm",
            label: " Chi tiết"
        },
    ]

    return (
        <div className='m-5 bg-white'>
            <div className='p-3 font-bold text-blue-300 border-b-[1px] border-solid border-[#ccc]'>Tài khoản</div>
            <table className='m-3'>
                <tbody>
                    <tr>
                        <th className='pr-5 text-sm font-bold pl-5 bg-[#514943] text-white'></th>
                        {tableToolbar.map((item, index) => (
                            <th key={index} className={`${item.style} font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]`}>{item.label}</th>
                        ))}
                    </tr>
                    {
                        currentAccountsPage?.map((Accounts, index) =>
                        (
                            <tr className={index % 2 == 1 ? 'bg-[#ccc]' : 'bg-white'} key={Accounts.id}>
                                <td className={`border-l border-b border-[#87807c] text-center`}>{(page - 1) * 10 + index + 1}</td>
                                <td className='border-l w-[350px] border-b border-[#87807c] text-center'>
                                    {Accounts.id}
                                </td>
                                <td className='border-l w-[350px] border-b border-[#87807c] text-center'>
                                    {Accounts.name}
                                </td>
                                <td className='border-l w-[350px] border-b border-[#87807c] text-center'>
                                    {Accounts.email}
                                </td>
                                <td className='border-l border-b border-[#87807c] text-center'>
                                    {Accounts.phoneNumber}
                                </td>
                                <td className='border-l border-b w-[150px] border-[#87807c] text-center border-r'>
                                    {/* <button
                                        className='p-1 text-white bg-blue-400 rounded-lg'
                                        onClick={() => handleDetail(Accounts)}
                                    >Chi tiết</button> */}
                                    <button onClick={() => handleDetail(Accounts)} className='mx-[5px]'>
                                        <Edit/>
                                    </button>
                                    <button onClick={
                                        () => {
                                            handleDelete(Accounts.id);
                                        }
                                    } className='mx-[5px]'>
                                        <Delete/>
                                    </button>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
            <div className='flex justify-between pb-6'>
                <div
                    className='p-3 border-[1px] border-solid border-blue-400 text-blue-400 rounded-lg font-bold hover:opacity-80 ml-3 cursor-pointer'
                    onClick={
                        handleAddAccounts
                    }
                >Thêm
                </div>
                {/* ADD Accounts */}
                {
                    currentAccounts.modalOpen
                        ?
                        <AddForm currentAccounts={currentAccounts}
                            setCurrentAccounts={setCurrentAccounts}
                            setUpdate={setUpdate}
                        />
                        : null
                }
                {
                    openDelete && <DeleteForm setOpen={setOpenDelete} id={id} setUpdate={setUpdate}/>                    
                }
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    onPageActive={handleActivePage}
                    activeLinkClassName='active'
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    pageClassName='pageLi'
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName={'paginationAdmin'}
                    pageLinkClassName={'pageBtn'}
                    previousLinkClassName={'pageBtn'}
                    nextLinkClassName={'pageBtn'}
                />
            </div >
        </div >
    )
}