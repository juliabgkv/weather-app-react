import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions } from "../../api";
import classes from "./Search.module.css";

function Search({ onSubmitSearchForm }) {
  const [search, setSearch] = useState(null);

  function handleOnChange(searchData) {
    setSearch(searchData);
    onSubmitSearchForm(searchData);
  }

  function loadOptions(input) {
    return fetch(
      `${process.env.REACT_APP_GEO_API_URL}/cities?minPopulation=10000&sort=-population&namePrefix=${input}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((data) => {
        return {
          options: data.data
            ? data.data.map((city) => {
                return {
                  coordinates: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                  },
                  label: `${city.name}, ${city.country}`,
                };
              })
            : [],
          hasMore: false,
        };
      })
      .catch((error) => console.error(error));
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "2px solid #ccc",
      boxShadow: state.isFocused ? "0 0 0 2px #3699FF" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#3699FF" : null,
      color: state.isFocused ? "white" : null,
    }),
  };

  return (
    <AsyncPaginate
      placeholder="Enter city name..."
      debounceTimeout={700}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className={classes.search}
      styles={customStyles}
    />
  );
}

export default Search;
