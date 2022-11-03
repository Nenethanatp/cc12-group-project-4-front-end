import { toast } from "react-toastify";

function CurrentButton({ handleClickMyLocation }) {
  return (
    <div
      className="absolute right-5 top-5 z-[1]"
      onClick={() =>
        navigator.geolocation.getCurrentPosition(
          (position) =>
            handleClickMyLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          () => {
            toast.error("can not get your position");
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0
          }
        )
      }
    >
      <button className="material-symbols-outlined text-4xl">
        my_location
      </button>
    </div>
  );
}

export default CurrentButton;
