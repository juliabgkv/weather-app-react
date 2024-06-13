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
          options: data.data.map((city) => {
            return {
              coordinates: {
                latitude: city.latitude,
                longitude: city.longitude,
              },
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      })
      .catch((error) => console.error(error));
  }

  return (
    <AsyncPaginate
      placeholder="Enter city name..."
      debounceTimeout={700}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className={classes.search}
    />
  );
}

export default Search;
