import React from 'react';

function Circle(props) {
  return (
    <div>
      {/* bg-circle */}
      <div
        className="rounded-full bg-circle1 w-[177px] h-[177px] 
        absolute
        top-[1615px]
        left-[-87px]
        z-10
        "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[221px] h-[221px] 
        absolute
        top-[1592px]
        left-[-109px]
        z-10
        "
      ></div>

      {/* bg-circle */}
      <div
        className="rounded-full bg-circle1 w-[180px] h-[180px] 
        absolute
        top-[2048px]
        left-[1368px]
        z-10
        "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[225px] h-[225px] 
        absolute
        top-[2026px]
        left-[1346px]
        z-10
        "
      ></div>

      {/* bg-circle */}
      <div
        className="rounded-full bg-circle1 w-[441px] h-[441px] 
        absolute
        top-[3100px]
        left-[29px]
        z-[-1]
        "
      ></div>
      <div
        className="rounded-full bg-circle2 w-[551px] h-[551px] 
        absolute
        top-[3045px]
        left-[-26px]
        z-[-1]
        "
      ></div>
    </div>
  );
}

export default Circle;
