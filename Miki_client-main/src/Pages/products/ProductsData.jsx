import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Animation from "../../Components/animations/Animation";

export default function Datas(props) {
  const { data } = props;

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  return (
    <>
      <div className="flex flex-wrap gap-10 ">
        {data.map((product) => {
          return (
            <div
              key={product.id}
              className="w-[254px] h-[442px] relative mt-10 border-none"
            >
              <Link to={`/products/${product.id}`}>
                <>
                  <Animation gestures>
                    <img
                      src={product.pictures[0].url}
                      className="w-full rounded-imgB h-[254px] "
                      alt={product.name}
                    />
                  </Animation>
                  <h5 className="mt-6 h-14 overflow-hidden text-center font-main font-bold text-xl tracking-[-1.9%] text-neutral_1">
                    {product.name}
                  </h5>
                  <h5 className="absolute bottom-[56px] left-0 right-0 text-center font-main font-bold text-xl tracking-[0.019rem] text-primary_2">
                    {formatter.format(product?.stocks?.[0]?.price)}
                  </h5>
                </>
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
            </div>
          );
        })}
      </div>
    </>
  );
}
