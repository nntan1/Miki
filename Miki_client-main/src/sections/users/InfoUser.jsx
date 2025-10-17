import React, { useState } from 'react';
import Button from '../../Components/Button';
import ProfileForm from '../auth/ProfileForm';
import { useRecoilValue } from 'recoil';
import { dataUser } from '../../recoils/dataUser';

function InfoUser() {
    const [isOpen, setIsOpen] = useState(false);

    const user = useRecoilValue(dataUser);
    console.log(user)

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div className='flex px-[152px]'>

                {/* Info user */}
                <div className='flex-1'>
                    <div className='font-bold text-xl tracking-[-0.019em] text-black pb-11'>
                        <h3>
                            Thông tin cá nhân :
                        </h3>
                    </div>
                    <div className='flex gap-10 pb-10'>
                        <div className='flex-1 font-bold text-right text-black align'>
                            <p className='pb-12 text-left'>Họ và tên</p>
                            <p className='text-left'>Ngày sinh</p>
                        </div>
                        <div className='flex-[2_2_0%] align text-left text-black font-medium'>
                            <p className='pb-12'>{user?.firstName}</p>
                            <p>04/03/2002</p>
                        </div>
                    </div>


                </div>


                {/* Phone and security */}
                <div className='flex-1'>
                    <div className='font-bold text-xl tracking-[-0.019em] text-black pb-11'>
                        <h3>
                            Điện thoại và bảo mật:
                        </h3>
                    </div>
                    <div className='flex gap-10 pb-10'>
                        <div className='flex-1 font-bold text-right text-black align'>
                            <p className='pb-12 text-left'>Số điện thoại</p>
                            <p className='pb-12 text-left'>Email</p>
                            <p className='text-left'>Mật khẩu</p>
                        </div>
                        <div className='flex-[2_2_0%] align text-left text-black font-medium'>
                            <p className='pb-12'>{user?.phoneNumber}</p>
                            <p className='pb-12'>{user?.email}</p>

                            <p>********</p>
                        </div>
                    </div>



                </div>




            </div>
            <div className='text-right pb-[120px] px-[152px]'>
                <Button

                    title="Cập nhật"
                    className=" bg-black py-2  w-[170px] h-10 rounded-btnB 
                font-bold text-base font-main leading-6 text-center tracking-[0.15px] text-white
                hover:bg-[#0000] 
                hover:text-neutral_1
                hover:border-solid
                 hover:border-[1px]
                  hover:border-[#000]
                "
                    onClick={() => toggle()}
                />
            </div>

            {isOpen ? <ProfileForm setIsOpen={() => setIsOpen(!isOpen)} /> : null}

            {/* bg-circle */}
            <div
                className="rounded-full bg-circle1 w-[177px] h-[177px] 
                    absolute
                    top-[1048px]
                    left-[-82px]
                    z-10
                    "
            ></div>
            <div
                className="rounded-full bg-circle2 w-[221px] h-[221px] 
                    absolute
                    top-[1026px]
                    left-[-104px]
                    z-10
                    "
            ></div>

            {/* bg-circle */}
            <div
                className="rounded-full bg-circle1 w-[180px] h-[180px]  
                    absolute
                    top-[1835px]
                    left-[1363px]
                    z-10
                    "
            ></div>
            <div
                className="rounded-full bg-circle2 w-[225px] h-[225px] 
                    absolute
                    top-[1812px]
                    left-[1341px]
                    z-10
                    "
            ></div>

            {/* bg-circle */}
            <div
                className="rounded-full bg-circle1 w-[441px] h-[441px]  
                    absolute
                    top-[2103px]
                    left-[-48px]
                    -z-10

                    "
            ></div>
            <div
                className="rounded-full bg-circle2 w-[551px] h-[551px] 
                    absolute
                    top-[2048px]
                    left-[-103px]
                    -z-10
                    "
            ></div>
        </div>
    );
}

export default InfoUser;