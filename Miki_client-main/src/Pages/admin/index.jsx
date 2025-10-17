import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Console() {
    const [data,setData] = useState([]);
    const [overview,setOverView] = useState([]);
    const backgroundStatus = ["#4e73de","#858796","#1cc88a","#e74a3b"];

    useEffect( () => {
        async function fetch(){
            const res = await axios({
                method: 'GET',
                url: 'https://localhost:7226/api/Statisticals',
              });
              console.log(res.data)
              setData(res.data.data);
              setOverView(res.data.overview);
        }
        fetch();
    },[] )
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh Thu Theo Ngày (đồng)',
            },
        },
    };

    const chartData = {
        labels: data.map(entry => entry.date),
        datasets: [
            {
                label: 'Doanh Thu',
                data: data.map(entry => entry.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
  return (
    <div className="bg-[#f8f9fd]">
      <div className='p-[20px]'>            
            <div className='shadow-[0px_-10px_30px_-10px_rgba(0,0,0,0.3)] text-white mt-5'>
                <p className='text-[#4e73de] font-bold p-[15px] border-b-[1px] border-[#ccc]'>Thống kê</p>
                <div className='p-[30px] grid grid-cols-4 gap-8'>
                    {
                        backgroundStatus.map( (item,index) => (
                            <div className={`text-center bg-[${item}] h-[80px]`} style={{
                                backgroundColor :item,
                            }}>
                                <p className='mt-[15px]'>{overview[index]?.soDonHang}</p>
                                <p>{overview[index]?.name}</p>
                             </div>
                        ) )
                    }
                </div>
            </div>
        </div>
        <Bar options={options} data={chartData} />
        <div className="mb-10"></div>
    </div>
  );
}
