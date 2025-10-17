import React from "react";
import { Delete, IconStar } from "./icons";
import Avatar from "react-avatar";
import { useRecoilValue } from "recoil";
import { dataUser } from "../recoils/dataUser";
import axios from "axios";

export default function AvartarChat({ userName,userId, time, content , rating ,commentsId,setUpdate}) {
  const user = useRecoilValue(dataUser);
  const handleDeleteComment = async () => {
    const res = await axios({
      method:"DELETE",
      url:`https://localhost:7226/api/Comments?commentId=${commentsId}`
    });
    setUpdate( prev => !prev );
  }
  return (
    <div>
      <div className="flex mt-[24px]">
        <Avatar size="50" round="1000px" name={userName} />
        <div className="ml-[15px]">
          <p className="text-base font-medium">{userName}</p>
          <div className="flex mt-[2px] w-[80px] h-[15px] mr-[8px]">
            {
              [...Array(5)].map( (item,index)=> (
                <IconStar fill={index+1 > rating ? '#A9A9A9':'#FBBC05'} />
              ) )
            }
          </div>
        </div>       
          {
            user?.userInforId == userId && <span onClick={()=> { handleDeleteComment() }}>
              <Delete className={'h-5 ml-2 mt-1 cursor-pointer hover:opacity-80'}/>
            </span> 
          } 
      </div>
      <div className="flex flex-col ml-[68px]">
        <p>{content}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}
