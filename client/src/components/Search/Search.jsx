import { UilTimes } from "@iconscout/react-unicons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserBySearch } from "../../Redux/Actions/UserActions";
import "./Search.css";
const Search = () => {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        dispatch(getUserBySearch(search));
      }
      if (search === "") {
        dispatch(getUserBySearch(null));
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [dispatch, search]);

  return (
    <div className="Search" >
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
        placeholder="Search..."
      />
      {search ? (
        <UilTimes onClick={() => setSearch("")} />
      ) : (
        <i className="fa-solid fa-magnifying-glass"></i>
      )}
    </div>
  );
};
export default Search;
