import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import BreadCrumb from '../Components/BreadCrumb';
import Button from '../Components/Button';
import { Footer, Header } from '../Layout/default/index';
import { dataUser } from '../recoils/dataUser';
import InfoUser from '../sections/users/InfoUser';
import OderManagement from '../sections/users/OderManagement';

function Profile(props) {
    const navigate = useNavigate();
    const user = useRecoilValue(dataUser)
    const [products, setProducts] = useState([]);
    const [state, setState] = useState('a')
    const [tab, setTab] = useState(1);

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        dataProducts();
    }, []);

    const dataProducts = async (data) => {
        try {
            const res = await axios({
                method: 'GET',
                url:`https://localhost:7226/api/Products?page=${1}&sortBy=name&order=asc`,
            });
            const datas = res.data;
            const { data, pagination } = datas;
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='relative overflow-hidden'>
            <Header />
            <div className='mt-10'>
                <img src='/assets/images/user.png' alt='user'
                    className=''
                />
                <div className='text-[#666666]  font-medium leading-[123%] font-main text-base tracking-[-1.9%]'>
                    <div className='px-[152px]'>
                        <div className='flex items-center py-10'>
                            <BreadCrumb
                                params={[
                                    {
                                        to: '/',
                                        label: 'Trang chủ',
                                    },
                                    {
                                        to: '/profile',
                                        label: 'Thông tin tài khoản ',
                                    },
                                ]}
                            />
                        </div>
                        <ul className='flex pb-12'>
                            <h2
                                className={state === 'a' ? 'info-user font-bold text-[32px] leading-10 align-top  tracking-[-1.9%] pr-8 text-center  cursor-pointer underline underline-offset-8 text-black'
                                    : 'info-user font-bold text-[32px] leading-10 align-top  tracking-[-1.9%] pr-8 text-center  cursor-pointer  '}

                                onClick={() => { setState('a') }}

                            >
                                Thông tin khách hàng
                            </h2>
                            <h2
                                className={state === 'b' ? 'info-user font-bold text-[32px] leading-10 align-top  tracking-[-1.9%] pr-8 text-center  cursor-pointer underline underline-offset-8 text-black'
                                    : 'info-user font-bold text-[32px] leading-10 align-top  tracking-[-1.9%] pr-8 text-center  cursor-pointer  '}

                                onClick={() => { setState('b') }}


                            >
                                Quản lý đơn hàng
                            </h2>
                        </ul>
                    </div>

                    {state === 'a' ? <InfoUser user={user} /> : <OderManagement tab={tab} setTab={setTab} />}

                    {/* suggestions */}
                    <div className='px-[152px]'>
                        <h2
                            className=' font-bold text-[32px] leading-10 align-top  tracking-[-1.9%]
                        text-left 
                        cursor-pointer
                        text-black
                        pb-8
                        '
                        >
                            Gợi ý cho bạn :
                        </h2>
                        <div className="flex flex-wrap justify-between">
                            {
                                products?.map(product => {
                                    return (<div className="w-[254px] h-[442px] relative mt-10">
                                        <Link to={`/products/${product.id}`}>
                                                <img src={product?.pictures?.[0].url} className="w-full rounded-imgB" />
                                                <h5 className="mt-6 text-center font-main font-bold text-xl tracking-[0.019rem] text-neutral_1">
                                                    {product.name}
                                                </h5>
                                                <h5 className="mt-[6px] text-center font-main font-bold text-xl tracking-[0.019rem] text-primary_2">
                                                    {formatter.format((product?.stocks?.[0]?.price))}
                                                </h5>
                                        </Link>
                                        <Link to={`/products/${product.id}`}>
                                            <Button
                                                title="Thêm vào giỏ hàng"
                                                className="font-bold text-base tracking-[0.15px] text-center text-white 
                                    bg-[#251C17]
                                    w-full
                                    h-10
                                    rounded-btnB
                                        absolute
                                        bottom-0
                                        hover:bg-[#0000] 
                                    hover:text-neutral_1
                                    hover:border-solid
                                     hover:border-[1px]
                                      hover:border-[#000]
                                    "
                                            />
                                        </Link>
                                    </div>)
                                })
                            }
                        </div>
                    </div>

                    <div className='text-right px-[152px] pb-[120px] pt-12'>
                        <Link to={"/products"}>
                            <Button
                                type="submit"
                                title="Xem thêm"
                                className=" bg-[#251C17] py-2  w-[170px] h-10 rounded-btnB 
                                    font-bold text-base font-main leading-6 text-center tracking-[0.15px] text-white
                                    hover:bg-[#0000] 
                                    hover:text-neutral_1
                                    hover:border-solid
                                     hover:border-[1px]
                                      hover:border-[#000]
                                    "
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;