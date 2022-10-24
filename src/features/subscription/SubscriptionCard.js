import { useState } from 'react';
import Script from 'react-load-script';
import { payment } from '../../api/subscriptionApi';

let OmiseCard;
const handleLoadScript = () => {
  OmiseCard = window.OmiseCard;
  OmiseCard.configure({
    publicKey: 'pkey_test_5ti90olxm9uackwxe26',
    currency: 'thb',
    frameLabel: 'GOOGLEME',
    submitLabel: 'PAY NOW',
    buttonLabel: 'Pay with Omise',
  });
};

function SubscriptionCard({ allPac }) {
  const { type, price, id } = allPac;

  const [resCharge, setResCharge] = useState({ amount: null, status: null });
  console.log(resCharge);

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      //   otherPaymentMethod: [],
    });
    OmiseCard.configureButton('#credit-card'); //bind configbutton
    OmiseCard.attach(); //execute binding config button
  };

  const createCharge = async (token) => {
    try {
      const startDate = new Date();
      const endDate = Date.today().next().month();

      console.log(startDate);
      console.log(endDate);
      const res = await payment({
        email: 'w@gmail.com',
        name: 'nene',
        amount: String(Number(price) * 100),
        token,
        packageId: id,
        headers: { 'Content-Type': 'application/json' },
      });
      if (res) {
        const amountThb = (res.data.amount / 100).toFixed(2);
        setResCharge({ amount: amountThb, status: res.data.status });
      }
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
      onFormClose: () => {},
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
      <div className="flex flex-col gap-1 font-normal text-sm mb-4">
        <div>
          info info info info info infonfo info info fdghjkdhgkjd dfghkdfhg
          fdjghikdfh gdfoj ofdihgj fosd fdiohgpso
        </div>
      </div>
      <div>
        <Script url="https://cdn.omise.co/omise.js" />
        <form className="">
          <button
            id="credit-card"
            className="bg-yellow-400 text-lg p-1 font-semibold rounded-2xl w-full"
            type="button"
            onClick={handleClick}
          >
            SELECT
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionCard;
