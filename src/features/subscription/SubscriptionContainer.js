import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { getEndDate } from '../../store/subscribeSlice';
import SubscriptionPackage from './SubscriptionPackage';
import * as subscriptionApi from '../../api/subscriptionApi';

function SubscriptionContainer() {
  const [loading, setLoading] = useState(true);
  const [allPackages, setAllPackages] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // setLoading(true);
    const fetchAll = async () => {
      console.log('d');
      await firstGetPackages();
      dispatch(getEndDate());
      setLoading(false);
    };

    fetchAll();
  }, []);

  const firstGetPackages = async () => {
    try {
      const res = await subscriptionApi.getAllPackage();
      if (res) {
        setAllPackages(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!loading ? (
        <div className='bg-slate-300 rounded-t-3xl '>
          <div className='h-full w-full rounded-t-3xl px-7 py-5 text-center flex flex-col items-center gap-5'>
            <div className='w-full  text-center flex flex-col items-center gap-3 py-3'>
              <div className='text-2xl font-bold'>SUBSCRIPTION</div>
              <div className='text-md'>
                There are 2 packages available for now.
                <br /> Try your new experience !
              </div>
            </div>
          </div>

          <SubscriptionPackage
            setLoading={setLoading}
            allPackages={allPackages}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default SubscriptionContainer;
