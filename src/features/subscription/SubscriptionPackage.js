import { useEffect, useState } from 'react';
import * as subscriptionApi from '../../api/subscriptionApi';
import SubscriptionCard from './SubscriptionCard';

function SubscriptionPackage() {
  const [allPackages, setAllPackages] = useState([]);
  // const sortAllPackages =

  // allPackages.forEach((pac,index)=> {
  //   pac.
  // }

  // )
  useEffect(() => {
    firstGetPackages();
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
    <div className="bg-slate-100 w-full  rounded-t-3xl p-10 text-center flex flex-col gap-5">
      {allPackages.length !== 0 &&
        allPackages.map((allPac, index) => (
          <SubscriptionCard key={allPac.id} allPac={allPac} />
        ))}
    </div>
  );
}

export default SubscriptionPackage;
