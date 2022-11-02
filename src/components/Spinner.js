import { HashLoader } from 'react-spinners';

function Spinner() {
  return (
    <>
      <div className="bg-black opacity-90 h-[100vh] flex justify-center items-center flex-col gap-6 z-30 absolute w-screen overflow-hidden">
        <HashLoader color="#ffffff" />
        <div className="text-white"> Loading . . </div>
      </div>
    </>
  );
}

export default Spinner;
