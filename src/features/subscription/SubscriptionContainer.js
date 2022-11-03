import SubscriptionPackage from './SubscriptionPackage';

function SubscriptionContainer() {
  return (
    <div className='bg-slate-200'>
      <div className='h-full w-full rounded-t-3xl px-7 py-5 text-center flex flex-col items-center gap-5'>
        <div className='w-full  text-center flex flex-col items-center gap-3 py-3'>
          <div className='text-2xl font-bold text-cyan-800'>SUBSCRIPTION</div>
          <div className='text-md text-cyan-600'>
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
