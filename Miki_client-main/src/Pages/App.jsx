import axios from 'axios';
import { useEffect, useState } from 'react';
import { AboutSection, BestSellerSection, HeroSection, LatestCollectionSection, ProductCategorySection } from "../sections/main/home"
import { cartState } from '../recoils/cartState';
import { dataUser } from '../recoils/dataUser';
import { useRecoilState } from 'recoil';
import { ordersState } from '../recoils/ordersState';

function App() {
  
  const [products, setProducts] = useState([]);
  const [user, setUser] = useRecoilState(dataUser);
  const [cart, setCart] = useRecoilState(cartState);
  const [orders,setOrders] = useRecoilState(ordersState);

  useEffect( () => {
    async function fetchData() {
      await dataProducts();
      await dataCarts();
      await dataOrders();
    }
    fetchData();
  }, []);

  const dataProducts = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url:`https://localhost:7226/api/Products?page=${1}&sortBy=name&order=asc&limit=${12}`,
      });
      const datas = res.data;
      const { data, pagination } = datas;
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const dataCarts = async () => {
    try {
      console.log(user);
      const res = await axios({
        method: 'GET',
        url:`https://localhost:7226/api/Cart?userID=${user.userInforId}`,
      });
      setCart(res.data);
    } catch (err) {
      setCart([])
      console.log(err);
    }
  };

  const dataOrders = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://localhost:7226/api/Order?UserID=${user.userInforId}`,
      });
      console.log(res.data)
      setOrders(res.data);
      console.log('set')
    }
    catch(err) {
      
    }
  }

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <BestSellerSection products={products} />
      <LatestCollectionSection />
      <ProductCategorySection />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[1329px] top-[3920px]"
        width="111"
        height="387"
        viewBox="0 0 111 387"
        fill="none"
      >
        <circle
          cx="275.5"
          cy="275.5"
          r="275.5"
          fill="#B78D71"
          fillOpacity="0.15"
        />
        <circle
          cx="275.5"
          cy="275.5"
          r="220.453"
          fill="#B78D71"
          fillOpacity="0.1"
        />
      </svg>
    </div>
  );
}

export default App;
