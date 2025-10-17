import React from 'react';

function SortProducts({ setPage, setSort, sortList, setSortList, toggleActive, active }) {
    const handleSortDefault = () => {
        const newList = [...sortList];
        setSortList(newList);
        setPage(1);
        toggleActive();
    };

    const handleSortAscName = () => {
        setSort('name&order=asc')
        setPage(1);
        toggleActive();
    };

    const handleSortDescName = () => {
        setSort('name&order=desc')
        setPage(1);
        toggleActive();
    };

    const handleSortAscCost = () => {
        setSort('price&order=asc')
        setPage(1);
        toggleActive();
    };

    const handleSortDescCost = () => {
        setSort('price&order=desc')
        setPage(1);
        toggleActive();
    };

    const handleSortSale = () => {
        setSort('sale=asc')
        setPage(1);
        toggleActive();
    };

    const handleSortNew = () => {
        const newList = [...sortList.reverse()];
        setSortList(newList);
        setPage(1);
        toggleActive();
    };
    return (
        <>
            <button
                onClick={toggleActive}
                className=" bg-[#FFF9F6] text-center w-[151px]  flex justify-between items-center"
            >
                {active ? (
                    <>
                        <h4 className="font-bold text-base tracking-[0.15px]"> Sắp xếp theo</h4>
                        <img className="caretupfill " src="/assets/icon/caretupfill.png" about="" />
                    </>
                ) : (
                    <>
                        <h4 className="font-bold text-base tracking-[0.15px]"> Sắp xếp theo</h4>
                        <img className="caretdownfill" src="/assets/icon/caretdownfill.png" about="" />
                    </>
                )}
            </button>

            <ul
                className={
                    active
                        ? ' pl-2 font-medium text-base tracking-[-1.9%] bg-white w-[151px]  absolute z-20 '
                        : ' pl-2 font-medium text-base tracking-[-1.9%] bg-white w-[151px] hidden absolute z-20 '
                }
            >
                <li
                    onClick={handleSortDefault}
                    className="h-6 cursor-pointer hover:opacity-100 opacity-80"
                >
                    Mặc định
                </li>
                <li
                    onClick={handleSortAscName}
                    className="h-6 cursor-pointer hover:opacity-100 opacity-80"
                >
                    A-Z
                </li>
                <li
                    onClick={handleSortDescName}
                    className="h-6 cursor-pointer hover:opacity-100 opacity-80"
                >
                    Z-A
                </li>
                <li
                    onClick={handleSortAscCost}
                    className="h-6 cursor-pointer hover:opacity-100 opacity-80"
                >
                    Giá tăng dần
                </li>
                <li
                    onClick={handleSortDescCost}
                    className="h-6 cursor-pointer hover:opacity-100 opacity-80"
                >
                    Giá giảm dần
                </li>
                <li
                    onClick={handleSortNew}
                    className="h-6 cursor-pointer hover:opacity-100 opacity-80"
                >
                    Sản phẩm mới
                </li>
                <li
                    onClick={handleSortSale}
                    className="h-6 cursor-pointer hover:opacity-100 opacity-80"
                >
                    Sản phẩm ưu đãi
                </li>
            </ul>
        </>
    );
}

export default SortProducts;