import React from 'react';

function Recruit() {
    return (
        <>
            <div className="relative">
                <div
                    className="rounded-full bg-circle1 w-[287px] h-[287px] 
                    absolute
                    top-[-143px]
                    left-[-144px]
                    -z-10
                    ">
                </div>
                <div
                    className="rounded-full bg-circle2 w-[359px] h-[359px] 
                        absolute
                        top-[-180px]
                        left-[180px]
                        -z-10
                        ">
                </div>


                <div className='mx-[152px]'>
                    <h3 className='font-main font-bold text-[32px] leading-10 tracking-[-0.019rem] text-neutral_1'>Cơ hội việc làm tại Miki</h3>
                    <img src='/assets/images/pageabout2.png' className='my-8' />
                    <p className='font-main font-medium text-base tracking-[-0.019%] pb-3'>Tại Miki, chúng tôi tự hào mang đến những giá trị vô hình đến Khách hàng cũng như từng Thành viên.</p>

                    <div className='pl-[5px] font-main font-medium text-base tracking-[-0.019%] '>
                        <div className='flex items-center pb-3'>
                            <img className='pr-[18px]' src='/assets/icon/Starlight.png' about='' />
                            <p>Sự hài lòng của nhân viên là ưu tiên hàng đầu và là nền tảng để mang lại sự hài lòng cho khách hàng</p>
                        </div>

                        <div className='flex items-center pb-3'>
                            <img className='pr-[18px]' src='/assets/icon/Chat.png' about='' />
                            <p>Không ngừng tập trung vào khách hàng thông qua sự am hiểu tường tận và quan tâm chu đáo</p>
                        </div>

                        <div className='flex items-center pb-3'>
                            <img className='pr-[18px]' src='/assets/icon/Done.png' about='' />
                            <p>Tinh thần trách nhiệm đối với những mục tiêu đã cam kết, bất kể những trở ngại và thử thách</p>
                        </div>

                        <div className='flex items-center pb-3'>
                            <img className='pr-[18px]' src='/assets/icon/setting.png' about='' />
                            <p>Sự tin tưởng và sự tôn trọng lẫn nhau là nền tảng tạo nên tính bền vững cho tất cả mối quan hệ xung quanh</p>
                        </div>

                        <div className='flex items-center pb-3'>
                            <img className='pr-[18px]' src='/assets/icon/File.png' about='' />
                            <p>Tôn trọng những quy định, chính sách và luôn thể hiện sự minh bạch, rõ ràng trong mọi hoạt động</p>
                        </div>

                        <div className='flex items-center pb-3'>
                            <img className='pr-[18px]' src='/assets/icon/Lineup.png' about='' />
                            <p>Kết quả đạt được trong công việc là bằng chứng thuyết phục cho năng lực và thái độ bản thân</p>
                        </div>

                        <div className='flex items-center pb-3'>
                            <img className='pr-[18px]' src='/assets/icon/Lamp.png' about='' />
                            <p>Không ngại đưa ra những cải tiến để nâng tầm hiệu quả công việc</p>
                        </div>
                    </div>

                    <div className="h-[57px] py-2 flex items-center text-neutral_1 mb-4">
                        <h2 className="font-main font-bold text-[32px] leading-10 tracking-[-0.19%] ">Mọi hồ sơ xin việc xin gửi về email: </h2>
                        <p className='text-[32px] font-main pl-2 italic'>Mikijewelry@gmail.com </p>
                    </div>
                    <h2 className="mb-[60px] font-main font-bold text-[32px] leading-10 tracking-[-0.19%] ">Chào mừng bạn gia nhập Miki!</h2>


                    <div className=" h-2 w-472 flex justify-center  items-center pb-[56px] ">
                        <div className="h-[1px] w-[180px] bg-neutral_2"></div>
                        <img src='/assets/icon/Star2.png' className="px-4" />
                        <img src='/assets/icon/Star2.png' className="pr-4" />
                        <img src='/assets/icon/Star2.png' className="pr-4" />
                        <img src='/assets/icon/Star2.png' className="pr-4" />
                        <div className="h-[1px] w-[180px] bg-neutral_2"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Recruit;