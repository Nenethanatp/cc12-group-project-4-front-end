import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/localStorage';

function LineConfirm({ endDate, closeModal }) {
  const me = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const lineloginUrl = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=XfyZEDKOR7ihHaJwCDaqkh&redirect_uri=http://localhost:8080/user/line/callback&scope=notify&state=${accessToken}`;
  return (
    <div className="flex justify-center  h-auto w-full">
      <div className=" flex flex-col  w-80 bg-white  rounded-xl p-10  items-center gap-3 text-center">
        <div>
          <div>Your subscribe will expire on</div>
          <div>{endDate}</div>
        </div>
        <hr />
        <div>Please sign in LINE to get notify near favorite place.</div>
        <div className="flex gap-3">
          <div
            className="bg-yellow-400 rounded-lg mt-4 p-2 w-[120px]"
            onClick={() => {
              closeModal();
            }}
          >
            <a target="_blank" rel="noreferrer" href={lineloginUrl}>
              SIGN IN
            </a>
          </div>
          <div
            className="bg-gray-300 rounded-lg mt-4 p-2 w-[120px]"
            onClick={() => {
              navigate(`/profile/${me.id}`);
            }}
          >
            LATER
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineConfirm;
