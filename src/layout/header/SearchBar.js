import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { useDispatch } from "react-redux";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { setLocation } from "../../store/mapSlice";

function SearchBar() {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ requestOptions: { region: "th" } });

  const dispatch = useDispatch();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: address });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch(setLocation({ lat, lng }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Combobox className="flex-1" onSelect={handleSelect}>
      <ComboboxInput
        className="w-full h-8 bg-white flex justify-center rounded-full p-2 px-4 "
        placeholder="Search an address..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                className="bg-white p-3 border-t-2 hover:bg-slate-100"
                key={place_id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default SearchBar;
