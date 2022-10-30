import SubscriptionPackage from './SubscriptionPackage';

function SubscriptionContainer() {
  return (
    <div className="bg-slate-300 rounded-t-3xl ">
      <div className="h-full w-full rounded-t-3xl px-7 py-5 text-center flex flex-col items-center gap-5">
        <div className="w-full  text-center flex flex-col items-center gap-3 py-3">
          <div className="text-2xl font-bold">SUBSCRIPTION</div>
          <div className="text-md">
            There are 2 packages available for now.
            <br /> Try your new experience !
          </div>
        </div>
      </div>

      <SubscriptionPackage />
    </div>
  );
}

export default SubscriptionContainer;
