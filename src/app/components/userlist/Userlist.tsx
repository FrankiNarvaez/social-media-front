'use client'

import React, { useState } from 'react';


const UserList: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-[700px] h-[600px] bg-dustyGray p-4 rounded-lg shadow-lg mx-5">
      <div className="flex justify-between items-center mb-4">
        <h1>Text_Function</h1>
        <button className="text-black text-xl" onClick={handleClose}>&times;</button>
      </div>
      <div className="space-y-4">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="bg-white p-3 rounded-lg flex items-center space-x-4">
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 100-10 5 5 0 000 10zm0-3a2 2 0 110-4 2 2 0 010 4zm0 2a4 4 0 01-4-4h8a4 4 0 01-4 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-black font-bold">User name</div>
              <div className="text-gray-500 text-sm">Date 2 weeks ago</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
