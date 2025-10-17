import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ datas, pageCount, setPage }) {

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                //className for CSS
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="pre-page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </>)
}

export default Pagination;