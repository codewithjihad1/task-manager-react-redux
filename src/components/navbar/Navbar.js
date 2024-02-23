import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.svg";
import { updateFilter } from "../../features/filters/filterSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();

  useEffect(() => {
    dispatch(updateFilter({ search }));
  }, [dispatch, search]);

  //  search value change
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logoImage} alt="Logo img" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
    </nav>
  );
}
