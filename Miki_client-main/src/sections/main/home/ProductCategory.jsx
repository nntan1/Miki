import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BOTTOM_TOP, LEFT_RIGHT, RIGHT_LEFT, SCALE_MIN, SCALE_ZOOM } from '../../../Components/animations';
import Animation from '../../../Components/animations/Animation';

export function ProductCategorySection() {
  return (
      <div className="category w-full  relative h-[741px] mt-[60px]">
          <Link to="/products">
            <>
              <div
                className=" drop-shadow-2xl drop-shadow-[(0px_4px_52px_rgba(15, 15, 15, 0.25))] 
              w-[254px] h-[254px] 
              leading-[28px]
              absolute
              top-[60px]
              left-[152px]
              rounded-tl-imgB 
              overflow-hidden"
              >
                <img className="" src="/assets/images/category1.png" alt="" />
                <h2
                  className="text-2xl font-main font-bold text-neutral_5
              absolute bottom-6  left-[88px]   "
                >
                  Nhẫn
                </h2>
              </div>
            </>
          </Link>
          <Link to="/products">
            <>
              <div
                className=" drop-shadow-2xl drop-shadow-[(0px_4px_52px_rgba(15, 15, 15, 0.25))]
                w-[254px] h-[254px] 
                
                absolute
                top-[60px]
                left-[446px]
                rounded-sm 
                "
              >
                <img className="" src="/assets/images/category2.png" alt="" />
                <h2 className="text-2xl font-main absolute bottom-6  left-[88px] font-bold text-neutral_5  ">
                  Đồng hồ
                </h2>
              </div>
            </>
          </Link>
          <Link to="/">
            <>
              <h2 className="absolute block not-italic left-[728px] top-[163px]  p-0 uppercase leading-[48px] text-[40px] font-playfair  font-bold text-[#2D2D2D]   ">
                Miki jewelry
              </h2>
            </>
          </Link>
          <Link to="/products">
            <>
              <div
                className=" drop-shadow-2xl drop-shadow-[(0px_4px_52px_rgba(15, 15, 15, 0.25))] w-[450px] h-[254px] overflow-hidden  
              absolute
              top-[354px]
              left-[152px]
              rounded-bl-imgB text-center 
              "
              >
                <img className="translate-y-[-80px] " src="/assets/images/category3.jpg" alt="" />
                <h2 className="absolute left-0 right-0 text-2xl font-bold font-main bottom-6 text-neutral_5 ">
                  Lắc tay
                </h2>
              </div>
            </>
          </Link>
          <Link to="/products">
            <>
              <div
                className="  drop-shadow-2xl drop-shadow-[(0px_4px_52px_rgba(15, 15, 15, 0.25))] w-[352px] h-[254px] overflow-hidden   
            absolute
            top-[354px]
            left-[642px]
            text-center
            "
              >
                <img
                  className=" translate-y-[-132px] w-full"
                  src="/assets/images/category4.jpg"
                  alt=""
                />
                <h2 className="text-2xl leading-[26px] font-main absolute bottom-6  left-[101px] font-bold text-neutral_5  ">
                  Dây chuyền
                </h2>
              </div>
            </>
          </Link>
          <Link to="/products">
            <>
              <div
                className=" drop-shadow-2xl drop-shadow-[(0px_4px_52px_rgba(15, 15, 15, 0.25))] w-[254px] h-[548px] 
            overflow-hidden  
            text-center
            absolute
            top-[60px]
            left-[1034px]
            rounded-r-imgB   "
              >
                <img className="h-full " src="/assets/images/category5.jpg" alt="" />
                <h2 className=" text-2xl leading-[26px] font-main absolute bottom-6  left-0 right-0 font-bold text-neutral_5  ">
                  Bông tai
                </h2>
              </div>
            </>
          </Link>

        {/* bg-circle */}
        <div
          className="rounded-full bg-circle1 w-[440px] h-[440px] 
        absolute
        top-[537px]
        left-[-384px]
        "
        ></div>
        <div
          className="rounded-full bg-circle1 w-[551px] h-[552px] 
        absolute
        top-[482px]
        left-[-439px]
        "
        ></div>
      </div>
  );
}
