import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModalSubscribe({ closeModal }) {
  const navigate = useNavigate();
  const handleSubscribe = () => {
    navigate('/subscription');
    closeModal();
  };
  return (
    <div className="flex justify-center  h-auto w-full text-black">
      <div className=" flex flex-col  w-80 bg-white  rounded-xl p-10  items-center gap-3 text-center">
        <div>
          <div>Please subscribe to save</div>
          <div>favorite place and get LINE notification.</div>
        </div>

        <div className="flex gap-3">
          <div
            className="bg-yellow-400 rounded-lg  my-1 p-2 w-[120px]"
            onClick={handleSubscribe}
          >
            SUBSCRIBE
          </div>
          <div
            className="bg-gray-300 rounded-lg my-1 p-2 w-[120px]"
            onClick={closeModal}
          >
            LATER
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSubscribe;
