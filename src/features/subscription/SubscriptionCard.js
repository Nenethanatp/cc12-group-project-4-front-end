import { useEffect, useState } from 'react';
import Script from 'react-load-script';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { payment } from '../../api/subscriptionApi';
import { getEndDate } from '../../store/subscribeSlice';
import { dateObjToString, genStartEndDate } from '../../utils/formatDate';

let OmiseCard;
const handleLoadScript = () => {
  OmiseCard = window.OmiseCard;
  OmiseCard.configure({
    publicKey: 'pkey_test_5ti90olxm9uackwxe26',
    currency: 'thb',
    frameLabel: 'GOOGLEME',
    submitLabel: 'PAY NOW',
    buttonLabel: 'Pay with Omise'
  });
};

function SubscriptionCard({ allPac }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const me = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const subEndDate = useSelector((state) => state.subscribe.endDate);

  const { type, price, id, detail } = allPac;

  // const [resCharge, setResCharge] = useState({ amount: null, status: null });
  // console.log(resCharge);

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card'
      //   otherPaymentMethod: [],
    });
    OmiseCard.configureButton('#credit-card'); //bind configbutton
    OmiseCard.attach(); //execute binding config button
  };

  const createCharge = async (token) => {
    try {
      const res = await payment({
        email: me.email,
        name: me.firstName,
        amount: String(Number(price) * 100),
        token,
        packageId: id,
        type,
        headers: { 'Content-Type': 'application/json' }
      });
      // if (res) {
      //   console.log(res);
      // }
      navigate('/');
      const { startDate, endDate } = genStartEndDate(type);
      dispatch(getEndDate());
      toast.success(`Subscribed expire on ${endDate}`);
    } catch (err) {
      console.log(err);
    }
  };
  const OmiseCardHandler = () => {
    //do all config before open
    OmiseCard.open({
      amount: String(Number(price) * 100),
      onCreateTokenSuccess: (token) => {
        createCharge(token);
      },
      onFormClose: () => {}
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    handleLoadScript();
    creditCardConfigure();
    OmiseCardHandler();
  };

  return (
    <div className="bg-white w-full p-5 rounded-2xl flex flex-col gap-3">
      <div>
        <div className="text-lg font-semibold">{type.toUpperCase()}</div>
        <div className="text-lg font-semibold">{`${Math.round(
          price
        )} THB`}</div>
      </div>
      <hr />
      <div className="flex flex-col gap-1 font-normal text-sm m-3">
        <div>
          info info info info info infonfo info info fdghjkdhgkjd dfghkdfhg
          fdjghikdfh gdfoj ofdihgj fosd fdiohgpso
        </div>
      </div>
      <hr />

      {subEndDate === 'expired' ? (
        <div className="flex flex-col gap-5 mt-3">
          <div className="text-center text-red-400 font-normal text-md ">
            <p>Subscribe today will expire on</p>
            <p>{`${genStartEndDate(type).endDate}`}</p>
          </div>

          <div className="">
            <Script url="https://cdn.omise.co/omise.js" />
            <form className="">
              <button
                id="credit-card"
                className={`bg-yellow-400 text-lg p-1 font-semibold rounded-2xl w-full`}
                type="button"
                onClick={handleClick}
              >
                SELECT
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-3">
          <div className="text-center text-red-400 font-semibold text-md ">
            <p>You already subscribe!!</p>
            <p className="font-normal">You can subscribe again</p>
            <p className="font-normal">after {dateObjToString(subEndDate)}</p>
          </div>
          <button
            className={`bg-yellow-400 text-lg p-1 font-semibold rounded-2xl w-full
        opacity-30 text-black`}
            type="button"
            onClick={handleClick}
            disabled={true}
          >
            SELECT
          </button>
        </div>
      )}
    </div>
  );
}

export default SubscriptionCard;
