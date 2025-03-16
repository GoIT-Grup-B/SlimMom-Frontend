import React from 'react'

const RightSideBar = () => {
return (
  <aside className="flex flex-col gap-[60px]">
        <div className="w-[288px] h-[166px]">
          <h3 className="font-verdana font-bold leading-[14px] tracking-wider ">Summary for</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-between">
            <span>Left</span> <span> kcal</span>
            </li>
            <li className="flex justify-between">
              <span>Consumed</span> <span> kcal</span>
            </li>
            <li className="flex justify-between">
              <span>Daily rate</span> <span> kcal</span>
            </li>
            <li className="flex justify-between">
              <span>n% of normal</span> <span> 1%</span>
            </li>
          </ul>
        </div>
        <div className="w-[288px] h-[166px]">
        <h3 className="text-lg font-bold mb-2">Food not recommended</h3>
          <ul className="list-disc list-inside text-gray-700">
          </ul>
          <p className="text-gray-500"></p>
      </div>       
      </aside>

    );
  }; 
  export default RightSideBar;