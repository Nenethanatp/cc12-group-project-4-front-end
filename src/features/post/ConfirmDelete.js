import React from 'react';

function ConfirmDelete({ postContent, cancel, confirm }) {
  return (
    <>
      <div className="bg-white w-[80%] rounded-xl text-center mx-auto mt-28 flex flex-col gap-5 py-8 px-5">
        <div className=" text-lg">
          {`Are you sure you want to delete post '${postContent}'`}
        </div>
        <div className="flex gap-2 justify-center">
          <div
            className="bg-yellow-400 w-[120px] py-2 rounded-lg"
            onClick={confirm}
          >
            Confirm
          </div>
          <div
            className="bg-gray-300 w-[120px] py-2 rounded-lg"
            onClick={cancel}
          >
            Cancel
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmDelete;
