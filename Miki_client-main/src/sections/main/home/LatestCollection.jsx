import Button from '../../../Components/Button';
import { motion } from 'framer-motion';
import { BOTTOM_TOP, LEFT_RIGHT, PATH_OUT, SCALE_ZOOM } from '../../../Components/animations';
import Animation from '../../../Components/animations/Animation';
import { Link } from 'react-router-dom';

export function LatestCollectionSection() {
  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="w-full h-[732px] relative ">
        <div
          className=" w-full h-[732px] 
        overflow-hidden
     
      relative
      my-[60px]
      "
        >
          <img
            src="/assets/images/latestCollection.jpg"
            className="absolute left-6 scale-[1.4] translate-x-[15rem] translate-y-[-85px] "
          />
          {/* <img className="absolute top-[109px] left-[793px]" src="/assets/vectorLatest/Line2.png " /> */}
          <svg className='absolute top-[109px] left-[793px]' xmlns="http://www.w3.org/2000/svg" width="7" height="394" viewBox="0 0 7 394" fill="none">
            <motion.path
              variants={PATH_OUT}
              d="M3.99561 3L3.99557 391" stroke="#EEE0D7" strokeWidth="6" strokeLinecap="round" />
          </svg>
          {/* <img
          className="absolute top-[109px] left-[152px]"
          src="/assets/vectorLatest/Vector 1.png "
        /> */}
          <svg className="absolute top-[109px] left-[152px]" xmlns="http://www.w3.org/2000/svg" width="647" height="490" viewBox="0 0 647 490" fill="none">
            <motion.path
              variants={PATH_OUT}
              d="M643.5 3H11C6.58174 3 3 6.58172 3 11V478.5C3 482.918 6.58172 486.5 11 486.5H396.5" stroke="white" strokeOpacity="0.75" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <Animation scroll variant={LEFT_RIGHT} >
            <h2 className="text-5xl text-neutral_5 leading-[64px] absolute top-[153px] left-[208px] font-medium font-main">
              Bộ sưu tập mới nhất
            </h2>
          </Animation>
          <Animation
            scroll
            variant={BOTTOM_TOP}
          >
            <h2 className="text-5xl text-neutral_5 leading-[64px] absolute top-[273px] left-[250px] font-semibold font-playfair">
              Ánh trăng người tình
            </h2>
            <p className="absolute top-[353px] left-[250px] font-playfair font-semibold w-[353px] h-[84px] text-[16px] leading-[21,33px] text-neutral_5">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
              consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
          </Animation>

          <Animation scroll variant={SCALE_ZOOM}>
            <Link to={"/products"}>
              <Button
                title="Xem thêm"
                className={
                  'w-[152px] h-[50px] text-center text-[#2D2D2D2] font-bold leading-[26px] bg-neutral_5 rounded-btnB absolute top-[501px] left-[250px]'
                }
              />
            </Link>
          </Animation>
        </div>
        <img
          className="absolute top-[374px] left-[1112px]"
          src="/assets/vectorLatest/Ellipse3.png "
        />
        <img
          className="absolute top-[508px] left-[1244px]"
          src="/assets/vectorLatest/Ellipse4.png "
        />
        <img
          className="absolute top-[668px] left-[1405px]"
          src="/assets/vectorLatest/Ellipse5.png "
        />
      </div>
    </motion.section>
  );
}
