import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import AddForm from './addForm';
import { Delete, Edit } from '../../../Components/icons/Icons';
import DeleteForm from './deleteForm';

export default function Categories() {
    const [currentCategories, setCurrentCategories] = useState({
        data: {},
        isEdit: false,
        modalOpen: false,
    });
    const [id,setId] = useState();
    const [update, setUpdate] = useState(false);
    const [openDelete , setOpenDelete] = useState(false);
    //func of addCategories (delete and add)
    const notify = () => {
        toast.success('Remove success', {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const handleDelete = (id) => {
        setId(id);
        setOpenDelete(true);
    }

    const handleAddCategories = () => {
        setCurrentCategories({
            data: {},
            isEdit: false,
            modalOpen: true,
        })
    }

    //handle of detailBtn

    const handleDetail = (Categories) => {
        setCurrentCategories({
            data: Categories,
            isEdit: true,
            modalOpen: true,
        });
    }

    //State of paginate 

    const [pageCount, setPageCount] = useState(null);
    const [page, setPage] = useState(1);
    const [currentCategoriesPage, setCurrentCategoriesPage] = useState(null)
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
                url:`https://localhost:7226/api/Categories?pageSize=5&pageIndex=${page}`,
            });
            const { data, pagination } = res.data;
            const { _page, _limit, _totalRows } = pagination;
            //setPagination(pagination);
            //số trang
            setPageCount(Math.ceil(_totalRows / _limit));
            //setCategoriess(Categoriess);
            setCurrentCategoriesPage(data);
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
            style: "pr-8 w-[200px] text-sm",
            label: "Tên"
        },
        {
            style: "pr-8 text-sm",
            label: "Tùy chọn"
        },
    ]

    return (
        <div className='m-5 bg-white'>
            <div className='p-3 font-bold text-blue-300 border-b-[1px] border-solid border-[#ccc]'>Thể loại</div>
            <table className='m-3'>
                <tbody>
                    <tr>
                        <th className='pr-5 text-sm font-bold pl-5 bg-[#514943] text-white'></th>
                        {tableToolbar.map((item, index) => (
                            <th key={index} className={`${item.style} font-bold pl-5 bg-[#514943] text-white border-l border-[#87807c]`}>{item.label}</th>
                        ))}
                    </tr>
                    {
                        currentCategoriesPage?.map((Categories, index) =>
                        (
                            <tr className={index % 2 == 1 ? 'bg-[#ccc]' : 'bg-white'} key={Categories.id}>
                                <td className={`border-l border-b border-[#87807c] text-center`}>{(page - 1) * 10 + index + 1}</td>
                                <td className='border-l w-[350px] border-b border-[#87807c] text-center'>
                                    {Categories.id}
                                </td>
                                <td className='border-l w-[600px] border-b border-[#87807c] text-center'>
                                    {Categories.name}
                                </td>
                                <td className='border-l border-b w-[150px] border-[#87807c] text-center border-r'>
                                    {/* <button
                                        className='p-1 text-white bg-blue-400 rounded-lg'
                                        onClick={() => handleDetail(Categories)}
                                    >Chi tiết</button> */}
                                    <button onClick={() => handleDetail(Categories)} className='mx-[5px]'>
                                        <Edit/>
                                    </button>
                                    <button onClick={
                                        () => {
                                            handleDelete(Categories.id);
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
                        handleAddCategories
                    }
                >Thêm
                </div>
                {/* ADD Categories */}
                {
                    currentCategories.modalOpen
                        ?
                        <AddForm currentCategories={currentCategories}
                            setCurrentCategories={setCurrentCategories}
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